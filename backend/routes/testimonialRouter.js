import express from "express";
import {
    getAllTestimonials,
    getFeaturedTestimonials,
    getAllTestimonialsAdmin,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleApproval,
    toggleFeatured,
    getTestimonialStats,
} from "../controllers/testimonialController.js";
import { authenticateUser, authorizePermissions } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";
import {
    validateCreateTestimonial,
    validateUpdateTestimonial,
} from "../validations/testimonials.validation.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */
router.get("/", getAllTestimonials);
router.get("/featured", getFeaturedTestimonials);
router.get("/stats", getTestimonialStats);
router.get("/admin", getAllTestimonialsAdmin);
router.get("/:id", getTestimonialById);

/* =========================
   ADMIN ROUTES
========================= */
router.post(
    "/",
    upload.any(),
    validateCreateTestimonial,
    createTestimonial
);

router.put(
    "/:id",
    upload.any(),
    validateUpdateTestimonial,
    updateTestimonial
);

router.patch("/:id/toggle-approval", toggleApproval);
router.patch("/:id/toggle-featured", toggleFeatured);

router.delete("/:id", deleteTestimonial);

export default router;