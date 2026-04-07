import express from "express";
import { registerUser, loginUser, logoutUser, getProfile, updateProfile, forgotPassword, resetPasswordWithOTP, isAuth } from "./auth.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();
import rateLimit from "express-rate-limit";

/* ================= REGISTER LIMIT ================= */
 const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 20, // allow more for legit users
    message: {
        success: false,
        message: "Too many accounts created, try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/* ================= LOGIN LIMIT ================= */
 const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // stricter than register
    message: {
        success: false,
        message: "Too many login attempts, try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/* ================= OTP LIMIT ================= */
 const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: "Too many OTP requests, try again later",
    },
});
router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", protect, logoutUser);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password-otp", otpLimiter, resetPasswordWithOTP);
router.get("/is-auth", protect, isAuth);
router.put("/profile", protect, upload.single("image"), updateProfile
);
export default router;
