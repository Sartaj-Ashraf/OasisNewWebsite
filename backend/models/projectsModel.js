import mongoose from "mongoose";

const imageField = {
  url: { type: String, required: true },
  key: { type: String, required: true },
};

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    link: {
      type: String,
      match: /^https?:\/\/.+/,
    },

    // Main cover shown in cards / listings
    thumbnail: {
      type: imageField,
      required: true,
    },

    // Wide banner used in hero / scroller sections
    scrollerImage: {
      type: imageField,
      required: false,
    },

    // Brand logo (square)
    logo: {
      type: imageField,
      required: false,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);