import mongoose from "mongoose";
import { Project } from "../models/projectsModel.js";
import { uploadToS3, deleteFromS3 } from "../utils/s3Upload.js";

/**
 * Get All Active Projects
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Project
 */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Create Project
 */
export const createProject = async (req, res) => {
  try {
    const { title, link, description, category, isActive } = req.body;

    if (
      !title?.trim() ||
      !link?.trim() ||
      !description?.trim() ||
      !category?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Optional URL validation
    try {
      new URL(link);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid project URL",
      });
    }

    let image = {};

    if (req.file) {
      image = await uploadToS3(req.file, "projectImage");
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      link: link.trim(),
      isActive:
        isActive === true ||
        isActive === "true" ||
        isActive === 1 ||
        isActive === "1",
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Project
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, description, category, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    if (
      !title?.trim() ||
      !link?.trim() ||
      !description?.trim() ||
      !category?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    try {
      new URL(link);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid project URL",
      });
    }

    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    let image = existingProject.image;

    if (req.file) {
      // Delete old image from S3
      if (existingProject.image?.key) {
        await deleteFromS3(existingProject.image.key);
      }

      image = await uploadToS3(req.file, "projectImage");
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        link: link.trim(),
        isActive:
          isActive === true ||
          isActive === "true" ||
          isActive === 1 ||
          isActive === "1",
        image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Project
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete image from S3
    if (project.image?.key) {
      await deleteFromS3(project.image.key);
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};