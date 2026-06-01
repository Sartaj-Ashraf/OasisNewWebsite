// models/jobApplicationModel.js

import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    career: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Careers",
        required: true,
        index: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    },

    experience: {
        type: Number,
        min: 0,
        default: 0
    },



 resume: {
        url: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        },
        originalName: String,
        size: Number,
        mimeType: String
    },

    status: {
        type: String,
        enum: [
            "Applied",
            "Under Review",
            "Shortlisted",
            "Interview Scheduled",
            "Interviewed",
            "Selected",
            "Rejected",
            "Withdrawn"
        ],
        default: "Applied",
        index: true
    },

    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Prevent duplicate applications
jobApplicationSchema.index(
    { career: 1, email: 1 },
    { unique: true }
);

export default mongoose.model(
    "JobApplication",
    jobApplicationSchema
);