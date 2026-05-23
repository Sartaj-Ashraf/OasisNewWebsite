import Testimonial from "../models/testimonialModel.js";
import { uploadToS3, deleteFromS3 } from "../utils/s3Upload.js";

/* =========================
   CREATE TESTIMONIAL
========================= */
export const createTestimonial = async (req, res) => {
    let uploadedKey = null; // track for rollback

    try {
        const { name, company, rating, testimonial, isFeatured, isApproved, order } =
            req.body;

        /* =========================
           IMAGE UPLOAD (OPTIONAL)
        ========================= */
        let imageData = { url: "", key: "" };

        const filesArray = Array.isArray(req.files)
            ? req.files
            : Object.values(req.files || {}).flat();

        const imageFile = filesArray.find((f) => f.fieldname === "image");

        if (imageFile) {
            const uploaded = await uploadToS3(imageFile);
            uploadedKey = uploaded.key;
            imageData = { url: uploaded.url, key: uploaded.key };
        }

        /* =========================
           CREATE
        ========================= */
        const newTestimonial = await Testimonial.create({
            name,
            company: company || "",
            rating: Number(rating),
            testimonial,
            image: imageData,
            isFeatured: isFeatured === "true",
            isApproved: isApproved === "true",
            order: order ? Number(order) : 0,
        });

        return res.status(201).json({
            success: true,
            message: "Testimonial created successfully",
            data: newTestimonial,
        });
    } catch (error) {
        console.error("CREATE TESTIMONIAL ERROR:", error);

        /* =========================
           CLEANUP (ROLLBACK S3)
        ========================= */
        if (uploadedKey) {
            await deleteFromS3(uploadedKey);
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

/* =========================
   UPDATE TESTIMONIAL
========================= */
export const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await Testimonial.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        /* =========================
           IMAGE UPDATE (OPTIONAL)
        ========================= */
        let imageUpdate = {};

        const filesArray = Array.isArray(req.files)
            ? req.files
            : Object.values(req.files || {}).flat();

        const imageFile = filesArray.find((f) => f.fieldname === "image");

        if (imageFile) {
            // upload new first
            const uploaded = await uploadToS3(imageFile);

            // delete old after success
            if (existing.image?.key) {
                await deleteFromS3(existing.image.key);
            }

            imageUpdate = {
                image: { url: uploaded.url, key: uploaded.key },
            };
        }

        /* =========================
           UPDATE
        ========================= */
        const updated = await Testimonial.findByIdAndUpdate(
            id,
            {
                name: req.body.name || existing.name,
                company: req.body.company ?? existing.company,
                rating: req.body.rating ? Number(req.body.rating) : existing.rating,
                testimonial: req.body.testimonial || existing.testimonial,
                isFeatured:
                    req.body.isFeatured !== undefined
                        ? req.body.isFeatured === "true"
                        : existing.isFeatured,
                isApproved:
                    req.body.isApproved !== undefined
                        ? req.body.isApproved === "true"
                        : existing.isApproved,
                order: req.body.order !== undefined ? Number(req.body.order) : existing.order,
                ...imageUpdate,
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Testimonial updated successfully",
            data: updated,
        });
    } catch (error) {
        console.error("UPDATE TESTIMONIAL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

/* =========================
   DELETE TESTIMONIAL
========================= */
export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial = await Testimonial.findById(id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        // delete image from S3 if exists
        if (testimonial.image?.key) {
            await deleteFromS3(testimonial.image.key);
        }

        await testimonial.deleteOne();

        return res.json({
            success: true,
            message: "Testimonial deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   GET ALL (PUBLIC - APPROVED)
========================= */
export const getAllTestimonials = async (req, res) => {
    try {
        // uses static model method
        const testimonials = await Testimonial.getApproved();

        return res.json({
            success: true,
            data: testimonials,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   GET FEATURED (PUBLIC)
========================= */
export const getFeaturedTestimonials = async (req, res) => {
    try {
        // uses static model method
        const testimonials = await Testimonial.getFeatured();

        return res.json({
            success: true,
            data: testimonials,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   ADMIN GET ALL
========================= */
export const getAllTestimonialsAdmin = async (req, res) => {
    try {
        const {
            search = "",
            status = "all",
            rating = "all",
            featured = "all",
            page = 1,
            limit = 10,
        } = req.query;

        const query = {};

        /* =========================
           SEARCH
        ========================= */
        if (search.trim()) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { testimonial: { $regex: search, $options: "i" } },
            ];
        }

        /* =========================
           APPROVAL STATUS
        ========================= */
        if (status === "approved") {
            query.isApproved = true;
        }

        if (status === "pending") {
            query.isApproved = false;
        }

        /* =========================
           FEATURED
        ========================= */
        if (featured === "true") {
            query.isFeatured = true;
        }

        if (featured === "false") {
            query.isFeatured = false;
        }

        /* =========================
           RATING
        ========================= */
        if (rating !== "all") {
            query.rating = Number(rating);
        }

        /* =========================
           PAGINATION
        ========================= */
        const skip = (Number(page) - 1) * Number(limit);

        const [testimonials, total] = await Promise.all([
            Testimonial.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean(),

            Testimonial.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            data: testimonials,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   GET BY ID
========================= */
export const getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id).lean();

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        return res.json({
            success: true,
            data: testimonial,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   TOGGLE APPROVAL
========================= */
export const toggleApproval = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        testimonial.isApproved = !testimonial.isApproved;

        await testimonial.save();

        return res.json({
            success: true,
            message: `Testimonial ${testimonial.isApproved ? "approved" : "unapproved"}`,
            data: testimonial,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   TOGGLE FEATURED
========================= */
export const toggleFeatured = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        testimonial.isFeatured = !testimonial.isFeatured;

        await testimonial.save();

        return res.json({
            success: true,
            message: `Testimonial ${testimonial.isFeatured ? "marked as featured" : "removed from featured"}`,
            data: testimonial,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* =========================
   STATS
========================= */
export const getTestimonialStats = async (req, res) => {
    try {
        // uses static model method
        const stats = await Testimonial.getStats();

        return res.json({
            success: true,
            data: stats,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};