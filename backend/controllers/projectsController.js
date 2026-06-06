import mongoose from "mongoose";
import { Project } from "../models/projectsModel.js";
import { uploadToS3, deleteFromS3 } from "../utils/s3Upload.js";

/**
 * Get All Active Projects
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ createdAt: -1 }).select("-__v -updatedAt ");
    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).select("-__v -updatedAt ");
    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
/**
 * Get Single Project
 */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid project ID" });

    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create Project
 * Expects multer fields: thumbnail (required), scrollerImage (optional), logo (optional)
 */
export const createProject = async (req, res) => {
  try {
    const { title, link, description, category, isActive } = req.body;

    if (!title?.trim() || !link?.trim() || !description?.trim() || !category?.trim()) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // thumbnail is required
    if (!req.files?.thumbnail?.[0]) {
      return res.status(400).json({ success: false, message: "Thumbnail image is required" });
    }

    // Upload thumbnail (required)
    const thumbnail = await uploadToS3(req.files.thumbnail[0], "projectImage");

    // Upload scrollerImage (optional)
    const scrollerImage = req.files?.scrollerImage?.[0]
      ? await uploadToS3(req.files.scrollerImage[0], "projectImage")
      : undefined;

    // Upload logo (optional)
    const logo = req.files?.logo?.[0]
      ? await uploadToS3(req.files.logo[0], "projectImage")
      : undefined;

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      link: link.trim(),
      isActive: isActive === true || isActive === "true" || isActive === 1 || isActive === "1",
      thumbnail,
      ...(scrollerImage && { scrollerImage }),
      ...(logo && { logo }),
    });

    return res.status(201).json({ success: true, message: "Project created successfully", data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update Project
 * Expects multer fields: thumbnail (optional), scrollerImage (optional), logo (optional)
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, description, category, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid project ID" });

    if (!title?.trim() || !link?.trim() || !description?.trim() || !category?.trim())
      return res.status(400).json({ success: false, message: "All fields are required" });

    const existingProject = await Project.findById(id);
    if (!existingProject)
      return res.status(404).json({ success: false, message: "Project not found" });

    // ── Thumbnail ──
    let thumbnail = existingProject.thumbnail;
    if (req.files?.thumbnail?.[0]) {
      if (existingProject.thumbnail?.key) await deleteFromS3(existingProject.thumbnail.key);
      thumbnail = await uploadToS3(req.files.thumbnail[0], "projectImage");
    }

    // ── Scroller Image ──
    let scrollerImage = existingProject.scrollerImage;
    if (req.files?.scrollerImage?.[0]) {
      if (existingProject.scrollerImage?.key) await deleteFromS3(existingProject.scrollerImage.key);
      scrollerImage = await uploadToS3(req.files.scrollerImage[0], "projectImage");
    }

    // ── Logo ──
    let logo = existingProject.logo;
    if (req.files?.logo?.[0]) {
      if (existingProject.logo?.key) await deleteFromS3(existingProject.logo.key);
      logo = await uploadToS3(req.files.logo[0], "projectImage");
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        link: link.trim(),
        isActive: isActive === true || isActive === "true" || isActive === 1 || isActive === "1",
        thumbnail,
        scrollerImage,
        logo,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete Project
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid project ID" });

    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    // Delete all images from S3
    if (project.thumbnail?.key)    await deleteFromS3(project.thumbnail.key);
    if (project.scrollerImage?.key) await deleteFromS3(project.scrollerImage.key);
    if (project.logo?.key)          await deleteFromS3(project.logo.key);

    await Project.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get All Categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Project.distinct("category");
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};