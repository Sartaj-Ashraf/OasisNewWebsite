import mongoose from "mongoose";
import Career from "../models/careersModel.js";
import JobApplication from "../models/jobApplicationModel.js";
import { uploadResumeToS3, deleteFromS3 } from "../utils/s3Upload.js";
import { sendJobApplicationEmail, sendAdminJobApplicationEmail } from "../utils/sendJobApplicationEmail.js";
export const sendJobApplication = async (req, res) => {
    try {
        const {
            career,
            fullName,
            email,
            phone,
            experience,
            notes
        } = req.body;


        if (!req.file) {
            return res.status(400).json({
                message: "Resume is required"
            });
        }

        const careerObject = await Career.findById(career);

        if (!careerObject) {
            return res.status(404).json({
                message: "Career not found"
            });
        }

        const existingApplication =
            await JobApplication.findOne({
                career,
                email
            });

        if (existingApplication) {
            return res.status(409).json({
                message: "You have already applied for this position"
            });
        }

        const resume = await uploadResumeToS3(req.file);

        const application = await JobApplication.create({
            career,
            fullName,
            email,
            phone,
            experience,
            notes,
            resume
        });
        await Promise.all([
            sendJobApplicationEmail({
                fullName,
                email,
                position: careerObject.JobTitle
            }),

            sendAdminJobApplicationEmail({
                fullName,
                email,
                phone,
                experience,
                notes,
                position: careerObject.JobTitle,
                resumeUrl: resume.url
            })
        ]);
        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: application
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getApplications = async (req, res) => {
    try {
        const {
            status,
            // career,
            search,
            minExperience,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        // if (career) {
        //     filter.career = career;
        // }

        if (minExperience) {
            filter.experience = {
                $gte: Number(minExperience)
            };
        }

        if (search) {
            filter.$or = [
                {
                    fullName: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const applications = await JobApplication.find(filter)
            .populate(
                "career",
                "JobTitle JobType Location"
            )
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await JobApplication.countDocuments(filter);

        return res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: applications
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!mongoose.isValidObjectId(applicationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application id"
            });
        }
        const allowedStatuses = [
            "Applied",
            "Under Review",
            "Shortlisted",
            "Interview Scheduled",
            "Interviewed",
            "Selected",
            "Rejected",
            "Withdrawn"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const application = await JobApplication.findByIdAndUpdate(
            applicationId,
            { status },
            {
                new: true,
                runValidators: true
            }
        ).populate(
            "career",
            "JobTitle JobType Location"
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            data: application
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const deleteApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        if (!mongoose.isValidObjectId(applicationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application id"
            });
        }

        const application =
            await JobApplication.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (application.resume?.key) {
            await deleteFromS3(application.resume.key);
        }

        await application.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};