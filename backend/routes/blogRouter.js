import express from "express";
import {
    getAllBlogs,
    getAllBlogsAdmin,
    getBlogBySlug,

    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    reorderContentSections,
    getBlogStats,
} from "../controllers/blogController.js";

import { authenticateUser, authorizePermissions } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js"; // multer-s3 config

const router = express.Router();


/* =========================
   PUBLIC ROUTES
========================= */
router.get("/", getAllBlogs);
router.get("/slug/:slug", getBlogBySlug);


router.get("/", getAllBlogsAdmin);
router.get("/stats", getBlogStats);


router.post(
    "/",
    upload.any(), // flexible
    createBlog
);

router.put(
    "/:id",
   upload.any(),
    updateBlog
);

router.patch("/:id/toggle-status", toggleBlogStatus);
router.patch("/:id/reorder-sections", reorderContentSections);
router.delete("/:id", deleteBlog);

export default router;