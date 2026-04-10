import mongoose from "mongoose";
import { makeSlug } from "../utils/slugUtils.js";
/* =========================
   BLOCK SCHEMA (EDITOR)
========================= */
const BlockSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true, // uuid from frontend
    },

    type: {
      type: String,
      enum: [
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p",
        "image",
        "list",
        "quote",
      ],
      required: true,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    meta: {
      alt: { type: String, default: "" },
      caption: { type: String, default: "" },
    },
  },
  { _id: false }
);

/* =========================
   MAIN BLOG SCHEMA
========================= */
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      maxlength: 400,
      trim: true,
    },

  
    content: {
      type: [BlockSchema],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Content must have at least one block",
      },
    },



    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   INDEXES (PERFORMANCE)
========================= */

// Latest blogs
BlogSchema.index({ createdAt: -1 });

// Published blogs listing
BlogSchema.index({ isPublished: 1, publishedAt: -1 });

// Search
BlogSchema.index({ title: "text", excerpt: "text" });

// Compound for fast filtering
BlogSchema.index({ isPublished: 1, tags: 1, createdAt: -1 });

/* =========================
   EXPORT
========================= */
export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);