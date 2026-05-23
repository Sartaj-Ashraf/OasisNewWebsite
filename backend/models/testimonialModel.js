import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
        },


        company: {
            type: String,
            trim: true,
            default: "",
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },

        testimonial: {
            type: String,
            required: [true, "Testimonial text is required"],
            trim: true,
            maxlength: [2000, "Testimonial cannot exceed 2000 characters"],
        },

        image: {
            url: { type: String, default: "" },
            key: { type: String, default: "" },
        },

        isApproved: {
            type: Boolean,
            default: false,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        order: {
            type: Number,
            default: 0,
        },

       
    },
    {
        timestamps: true,
    }
);

/* =========================
   INDEXES
========================= */
testimonialSchema.index({ isApproved: 1, isFeatured: -1, order: 1 });

/* =========================
   STATIC: GET APPROVED
========================= */
testimonialSchema.statics.getApproved = function () {
    return this.find({ isApproved: true })
        .sort({ isFeatured: -1, order: 1, createdAt: -1 })
        .lean();
};

/* =========================
   STATIC: GET FEATURED
========================= */
testimonialSchema.statics.getFeatured = function () {
    return this.find({ isApproved: true, isFeatured: true })
        .sort({ order: 1, createdAt: -1 })
        .lean();
};

/* =========================
   STATIC: GET STATS
========================= */
testimonialSchema.statics.getStats = async function () {
    const total = await this.countDocuments();
    const approved = await this.countDocuments({ isApproved: true });
    const featured = await this.countDocuments({ isApproved: true, isFeatured: true });
    const pending = total - approved;

    const ratingAgg = await this.aggregate([
        { $match: { isApproved: true } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    return {
        total,
        approved,
        pending,
        featured,
        averageRating: ratingAgg[0]?.avgRating
            ? parseFloat(ratingAgg[0].avgRating.toFixed(1))
            : 0,
    };
};

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;