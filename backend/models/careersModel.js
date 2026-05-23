// models/careersModel.js
import mongoose from "mongoose";

const careersSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    JobTitle: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },

    JobType: {
        type: String,
        enum: [
            'Full Time', 'Part Time', 'Internship', 'Contract',
            'Freelance', 'Temporary', 'Remote', 'Hybrid', 'Volunteer',
            'Apprenticeship', 'Seasonal', 'Commission Based', 'On-Demand', 'Gig Work'
        ],
        required: [true, 'Job type is required']
    },

    Qualification: {
        type: String,
        required: [true, 'Qualification is required'],
        trim: true
    },

    WorkHours: {
        start: {
            type: String,
            required: [true, 'Start time is required']
        },
        end: {
            type: String,
            required: [true, 'End time is required']
        }
    },

    Location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        index: true
    },

    Salary: {
        min: {
            type: Number,
            required: false,
            min: [0, 'Minimum salary cannot be negative']
        },
        max: {
            type: Number,
            required: false,
            min: [0, 'Maximum salary cannot be negative']
        }
    },

    TotalVacancies: {
        type: Number,
        required: [true, 'Total vacancies is required'],
        min: [1, 'Total vacancies must be at least 1']
    },

    jobDescription: {
        type: String,
        required: [true, 'Job description is required'],
        trim: true,
        maxlength: [2000, 'Job description cannot exceed 2000 characters']
    },

    requirementDescription: {
        type: String,
        trim: true,
        maxlength: [2000, 'Requirement description cannot exceed 2000 characters']
    },

    ResponsibilitiesDescription: {
        type: String,
        trim: true,
        maxlength: [2000, 'Responsibilities description cannot exceed 2000 characters']
    },

    requirementList: {
        type: [String],
    },

    ResponsibilitiesList: {
        type: [String],
    },

    isActive: {
        type: Boolean,
        default: true,
        index: true
    }
}, {
    timestamps: true,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true }
});

// Compound indexes for common query patterns
careersSchema.index({ isActive: 1, JobType: 1, Location: 1 });
careersSchema.index({ isActive: 1, createdAt: -1 });
careersSchema.index({ 'Salary.min': 1, 'Salary.max': 1 });

// Virtual: human-readable salary string
careersSchema.virtual('salaryRange').get(function () {
    if (!this.Salary?.min && !this.Salary?.max) return 'Not specified';
    if (this.Salary.min && this.Salary.max) return `$${this.Salary.min.toLocaleString()} – $${this.Salary.max.toLocaleString()}`;
    if (this.Salary.min) return `From $${this.Salary.min.toLocaleString()}`;
    return `Up to $${this.Salary.max.toLocaleString()}`;
});

// Virtual: status label
careersSchema.virtual('status').get(function () {
    return this.isActive ? 'Active' : 'Inactive';
});

// Pre-save: ensure salary min ≤ max
careersSchema.pre('save', function (next) {
    if (
        this.Salary?.min != null &&
        this.Salary?.max != null &&
        this.Salary.min > this.Salary.max
    ) {
        return next(new Error('Minimum salary cannot be greater than maximum salary'));
    }
    next();
});

export default mongoose.model('Careers', careersSchema);