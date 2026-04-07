import User from "./user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateToken from "../../utils/generateToken.js";
import { sendEmail } from "../../utils/sendEmail.js";

import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";
import validator from "validator";

/* ======================================================
   HELPER: SEND TOKEN RESPONSE
====================================================== */

const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);

    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
};

/* ======================================================
   REGISTER
====================================================== */
export const registerUser = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;

        // ✅ Basic presence check
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // ✅ Normalize & sanitize
        name = validator.trim(name);
        email = validator.normalizeEmail(email);

        // ✅ Name validation
        if (validator.isEmpty(name) || !validator.isLength(name, { min: 3, max: 50 })) {
            return res.status(400).json({
                success: false,
                message: "Name must be 3–50 characters",
            });
        }

        // ✅ Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // ✅ Strong password validation
        if (
            !validator.isStrongPassword(password, {
                minLength: 8,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be 8+ chars with uppercase, number, and symbol",
            });
        }
        // const existingUser = await User.findOne({ email });
        const existingUser = await User.find({ email })
        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const usercount = await User.countDocuments();
        if (usercount > 1) {
            return res.status(400).json({
                success: false,
                message: "Maximum number of admins reached",
            });
        }
        // ✅ Create user directly
        const user = await User.create({
            name,
            email,
            password,
        });

        sendTokenResponse(user, 201, res);

    } catch (error) {
        // ✅ Handle duplicate email safely (DB-level protection)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        next(error);
    }
};

/* ======================================================
   LOGIN
====================================================== */

export const loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        email = email.toLowerCase().trim();
        password = password.trim();

        const user = await User.findOne({ email })
            .select("+password");

        // Generic error message (security best practice)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Optional: Check if user is active
        if (user.isActive === false) {
            return res.status(403).json({
                success: false,
                message: "Account is disabled"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
};


/* ======================================================
   LOGOUT
====================================================== */

export const logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};


/* ======================================================
   GET PROFILE
====================================================== */

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

/* ======================================================
   UPDATE PROFILE
====================================================== */


export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { name, email, password } = req.body;

        // ================= BASIC INFO =================
        if (name) {
            name = validator.trim(name);
            if (!validator.isLength(name, { min: 3, max: 50 })) {
                return res.status(400).json({ message: "Invalid name" });
            }
            user.name = name;
        }

        // ✅ email validation
        if (email) {
            email = validator.normalizeEmail(email);
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Invalid email" });
            }
            user.email = email;
        }

        // ✅ password validation
        if (password) {
            if (!validator.isStrongPassword(password)) {
                return res.status(400).json({ message: "Weak password" });
            }
            user.password = password;
        }


        // ================= IMAGE UPLOAD =================
        if (req.file) {

            // 🔥 Delete old image (handle both old string and new object format)
            if (user.image) {

                // Old format (string)
                if (typeof user.image === "string") {
                    const publicId = user.image.split("/").pop().split(".")[0];

                    await cloudinary.uploader.destroy(
                        `gofixy/profile_images/${publicId}`
                    );
                }

                // New format (object)
                if (user.image?.public_id) {
                    await cloudinary.uploader.destroy(user.image.public_id);
                }
            }

            // Upload new image
            const uploadFromBuffer = () =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "gofixy/profile_images",
                        },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );

                    streamifier
                        .createReadStream(req.file.buffer)
                        .pipe(stream);
                });

            const result = await uploadFromBuffer();

            // ✅ Save in new format
            user.image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }

        await user.save();

        // Remove password from response
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({
            message: "Profile update failed",
        });
    }
};
/* ======================================================
   FORGOT PASSWORD (SEND OTP)
====================================================== */

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({
                success: true,
                message: "If email exists, OTP sent",
            });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        user.resetPasswordOTP = hashedOTP;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        await sendEmail({
            to: user.email,
            type: "otpReset",
            data: { otp }
        });

        res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });
    } catch (error) {
        next(error);
    }
};

/* ======================================================
   RESET PASSWORD WITH OTP
====================================================== */

export const resetPasswordWithOTP = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid request",
            });
        }


        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        if (
            user.resetPasswordOTP !== hashedOTP ||
            user.resetPasswordExpire < Date.now()
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        user.password = newPassword;
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        next(error);
    }
};

export const isAuth = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "User is authenticated"
        });
    } catch (error) {
        next(error);
    }
}