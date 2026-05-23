// controllers/careerController.js
import Careers from '../models/careersModel.js';
import { getPaginationParams, getPaginationInfo } from '../utils/pagination.js';
import { generateUniqueSlug, validateSlug } from '../utils/slugUtils.js';

/* ─────────────────────────────────────────────
   Shared filter builder — used by both public
   and admin list endpoints to avoid repetition.
───────────────────────────────────────────── */
function buildCareerFilter(query, adminMode = false) {
    const {
        JobType,
        Location,
        Qualification,
        minSalary,
        maxSalary,
        search,
        isActive,
    } = query;

    const filter = {};

    // Public: always active only. Admin: honour ?isActive param if supplied.
    if (!adminMode) {
        filter.isActive = true;
    } else if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }

    if (JobType)       filter.JobType    = JobType;
    if (Location)      filter.Location   = new RegExp(Location, 'i');
    if (Qualification) filter.Qualification = new RegExp(Qualification, 'i');

    if (minSalary || maxSalary) {
        filter.$or = [];
        const min = parseInt(minSalary);
        const max = parseInt(maxSalary);

        if (minSalary && maxSalary) {
            filter.$or.push(
                { 'Salary.min': { $gte: min, $lte: max } },
                { 'Salary.max': { $gte: min, $lte: max } }
            );
        } else if (minSalary) {
            filter.$or.push(
                { 'Salary.min': { $gte: min } },
                { 'Salary.max': { $gte: min } }
            );
        } else {
            filter.$or.push(
                { 'Salary.min': { $lte: max } },
                { 'Salary.max': { $lte: max } }
            );
        }
    }

    if (search) {
        const rx = new RegExp(search, 'i');
        filter.$and = filter.$and || [];
        filter.$and.push({
            $or: [
                { JobTitle:               rx },
                { jobDescription:         rx },
                { Location:               rx },
                { Qualification:          rx },
                { requirementList:        { $in: [rx] } },
                { ResponsibilitiesList:   { $in: [rx] } },
            ]
        });
    }

    return filter;
}

/* ─────────────────────────────────────────────
   Shared error responder for Mongoose errors
───────────────────────────────────────────── */
function handleMongooseError(res, error, action) {
    console.error(`Error ${action}:`, error);

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: Object.values(error.errors).map(e => e.message),
        });
    }

    if (error.code === 11000 && error.keyPattern?.slug) {
        return res.status(400).json({
            success: false,
            message: 'A career with this slug already exists',
        });
    }

    return res.status(500).json({
        success: false,
        message: `Failed to ${action}`,
        error: error.message,
    });
}

/* ═══════════════════════════════════════════
   CREATE
═══════════════════════════════════════════ */
export const createCareer = async (req, res) => {
    try {
        const careerData = { ...req.body };
console.log(careerData)
        // Validate WorkHours before hitting the DB
   const { start, end } = careerData.WorkHours || {};

const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
if (
    !timeRegex.test(start || "") ||
    !timeRegex.test(end || "")
) {
    return res.status(400).json({
        success: false,
        message: "Invalid work hours format",
    });
}

        careerData.slug = await generateUniqueSlug(Careers, careerData.JobTitle, {
            fallbackPrefix: 'job',
        });

        if (careerData.isActive === undefined) careerData.isActive = true;
if (careerData.Salary) {
    careerData.Salary.min =
        careerData.Salary.min === ""
            ? undefined
            : Number(careerData.Salary.min);

    careerData.Salary.max =
        careerData.Salary.max === ""
            ? undefined
            : Number(careerData.Salary.max);
}
        const career = await new Careers(careerData).save();

        return res.status(201).json({
            success: true,
            message: 'Career created successfully',
            data: career,
        });

    } catch (error) {
        return handleMongooseError(res, error, 'create career');
    }
};

/* ═══════════════════════════════════════════
   UPDATE
═══════════════════════════════════════════ */
export const updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        const existing = await Careers.findById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Career not found' });
        }

        // Regenerate slug only when the title changes
        if (updateData.JobTitle && updateData.JobTitle !== existing.JobTitle) {
            updateData.slug = await generateUniqueSlug(Careers, updateData.JobTitle, {
                excludeId: id,
                fallbackPrefix: 'job',
            });
        }

        const career = await Careers.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        return res.json({
            success: true,
            message: 'Career updated successfully',
            data: career,
        });

    } catch (error) {
        return handleMongooseError(res, error, 'update career');
    }
};

/* ═══════════════════════════════════════════
   GET ALL  —  Public (active only)
═══════════════════════════════════════════ */
export const getAllCareers = async (req, res) => {
    try {
        const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        const { page, limit, skip } = getPaginationParams(req);

        const filter = buildCareerFilter(req.query, false);
        const sort   = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        const [careers, totalDocs] = await Promise.all([
            Careers.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            Careers.countDocuments(filter),
        ]);

        return res.json({
            success:    true,
            message:    'Active careers fetched successfully',
            data:       careers,
            pagination: getPaginationInfo(totalDocs, page, limit),
            filters: {
                totalJobs:      totalDocs,
                appliedFilters: {
                    JobType:       req.query.JobType       || null,
                    Location:      req.query.Location      || null,
                    Qualification: req.query.Qualification || null,
                    salaryRange: {
                        min: req.query.minSalary || null,
                        max: req.query.maxSalary || null,
                    },
                    search: req.query.search || null,
                },
            },
        });

    } catch (error) {
        console.error('Error fetching careers:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch careers', error: error.message });
    }
};

/* ═══════════════════════════════════════════
   GET ALL  —  Admin (all statuses)
═══════════════════════════════════════════ */
export const getAllCareersAdmin = async (req, res) => {
    try {
        const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        const { page, limit, skip } = getPaginationParams(req);

        const filter = buildCareerFilter(req.query, true);
        const sort   = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        const [careers, totalDocs] = await Promise.all([
            Careers.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            Careers.countDocuments(filter),
        ]);

        return res.json({
            success:    true,
            message:    'Careers fetched successfully',
            data:       careers,
            pagination: getPaginationInfo(totalDocs, page, limit),
            filters: {
                totalJobs:      totalDocs,
                appliedFilters: {
                    JobType:       req.query.JobType       || null,
                    Location:      req.query.Location      || null,
                    Qualification: req.query.Qualification || null,
                    isActive:      req.query.isActive !== undefined ? req.query.isActive === 'true' : null,
                    salaryRange: {
                        min: req.query.minSalary || null,
                        max: req.query.maxSalary || null,
                    },
                    search: req.query.search || null,
                },
            },
        });

    } catch (error) {
        console.error('Error fetching careers for admin:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch careers', error: error.message });
    }
};

/* ═══════════════════════════════════════════
   GET BY SLUG  —  Public
═══════════════════════════════════════════ */
export const getCareerBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!validateSlug(slug)) {
            return res.status(400).json({ success: false, message: 'Invalid slug format' });
        }

        const career = await Careers.findOne({ slug, isActive: true }).lean();

        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found or inactive' });
        }

        return res.json({ success: true, message: 'Career fetched successfully', data: career });

    } catch (error) {
        console.error('Error fetching career by slug:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch career', error: error.message });
    }
};

/* ═══════════════════════════════════════════
   GET BY ID  —  Admin
═══════════════════════════════════════════ */
export const getCareerById = async (req, res) => {
    try {
        const career = await Careers.findById(req.params.id).lean();

        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found' });
        }

        return res.json({ success: true, message: 'Career fetched successfully', data: career });

    } catch (error) {
        console.error('Error fetching career by ID:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch career', error: error.message });
    }
};

/* ═══════════════════════════════════════════
   TOGGLE STATUS  —  Admin
═══════════════════════════════════════════ */
export const toggleCareerStatus = async (req, res) => {
    try {
        const career = await Careers.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found' });
        }

        career.isActive = !career.isActive;
        await career.save();

        return res.json({
            success: true,
            message: `Career ${career.isActive ? 'activated' : 'deactivated'} successfully`,
            data: career,
        });

    } catch (error) {
        console.error('Error toggling career status:', error);
        return res.status(500).json({ success: false, message: 'Failed to toggle career status', error: error.message });
    }
};

/* ═══════════════════════════════════════════
   DELETE  —  Admin
═══════════════════════════════════════════ */
export const deleteCareer = async (req, res) => {
    try {
        const career = await Careers.findByIdAndDelete(req.params.id);

        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found' });
        }

        return res.json({ success: true, message: 'Career deleted successfully', data: career });

    } catch (error) {
        console.error('Error deleting career:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete career', error: error.message });
    }
};

/* ═══════════════════════════════════════════
   STATS  —  Admin
═══════════════════════════════════════════ */
export const getCareerStats = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const [
            totalJobs,
            activeJobs,
            inactiveJobs,
            jobsByType,
            jobsByLocation,
            totalVacanciesResult,
            recentJobs,
            jobsBySalaryRange,
        ] = await Promise.all([
            Careers.countDocuments(),
            Careers.countDocuments({ isActive: true }),
            Careers.countDocuments({ isActive: false }),

            Careers.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: '$JobType', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]),

            Careers.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: '$Location', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
            ]),

            Careers.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: null, total: { $sum: '$TotalVacancies' } } },
            ]),

            Careers.countDocuments({ isActive: true, createdAt: { $gte: thirtyDaysAgo } }),

            Careers.aggregate([
                {
                    $match: {
                        isActive: true,
                        $or: [{ 'Salary.min': { $exists: true } }, { 'Salary.max': { $exists: true } }],
                    }
                },
                {
                    $addFields: {
                        salaryRange: {
                            $cond: {
                                if: { $and: [{ $gt: ['$Salary.min', 0] }, { $gt: ['$Salary.max', 0] }] },
                                then: {
                                    $switch: {
                                        branches: [
                                            { case: { $lte: ['$Salary.max', 30000]  }, then: '0-30K'    },
                                            { case: { $lte: ['$Salary.max', 50000]  }, then: '30K-50K'  },
                                            { case: { $lte: ['$Salary.max', 80000]  }, then: '50K-80K'  },
                                            { case: { $lte: ['$Salary.max', 120000] }, then: '80K-120K' },
                                        ],
                                        default: '120K+',
                                    }
                                },
                                else: 'Not specified',
                            }
                        }
                    }
                },
                { $group: { _id: '$salaryRange', count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
        ]);

        return res.json({
            success: true,
            message: 'Career statistics fetched successfully',
            data: {
                totalJobs,
                activeJobs,
                inactiveJobs,
                totalVacancies: totalVacanciesResult[0]?.total || 0,
                recentJobs,
                jobsByType,
                jobsByLocation,
                jobsBySalaryRange,
            },
        });

    } catch (error) {
        console.error('Error fetching career statistics:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch career statistics', error: error.message });
    }
};

/* ═══════════════════════════════════════════
   FILTERS  —  Public
═══════════════════════════════════════════ */
export const getCareerFilters = async (req, res) => {
    try {
        const [jobTypes, locations, qualifications] = await Promise.all([
            Careers.distinct('JobType',       { isActive: true }),
            Careers.distinct('Location',      { isActive: true }),
            Careers.distinct('Qualification', { isActive: true }),
        ]);

        return res.json({
            success: true,
            message: 'Career filters fetched successfully',
            data: {
                jobTypes:       jobTypes.sort(),
                locations:      locations.sort(),
                qualifications: qualifications.sort(),
                salaryRanges: [
                    { label: '0 – 30K',      min: 0,      max: 30000  },
                    { label: '30K – 50K',    min: 30000,  max: 50000  },
                    { label: '50K – 80K',    min: 50000,  max: 80000  },
                    { label: '80K – 120K',   min: 80000,  max: 120000 },
                    { label: '120K+',        min: 120000, max: null   },
                ],
            },
        });

    } catch (error) {
        console.error('Error fetching career filters:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch career filters', error: error.message });
    }
};