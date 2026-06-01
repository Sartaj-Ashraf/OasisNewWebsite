import { body } from "express-validator";

export const jobApplicationValidator = [
    body("career")
        .notEmpty()
        .withMessage("Career is required")
        .isMongoId()
        .withMessage("Invalid career id"),

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Full name must be between 2 and 100 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("en-IN")
        .withMessage("Invalid phone number"),

    body("experience")
        .notEmpty()
        .withMessage("Experience is required")
        .isLength({ max: 100 })
        .withMessage("Experience is too long"),

    body("notes")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Notes cannot exceed 1000 characters")
];