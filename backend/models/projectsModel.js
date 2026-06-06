import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      url: String,
      key: String,
    },
    link: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required,
      default: false,
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
