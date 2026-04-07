"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
    forgotPassword,
    resetPasswordWithOTP,
} from "@/services/auth.service";
import { useRouter } from "next/navigation";
export default function ResetPassword() {
    const [step, setStep] = useState(1);
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const otpRefs = useRef([]);

    const [form, setForm] = useState({
        email: "",
        otp: ["", "", "", "", "", ""],
        password: "",
        confirmPassword: "",
    });

    /* ---------------- TIMER ---------------- */

    useEffect(() => {
        if (step === 2 && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer, step]);

    /* ---------------- SEND OTP ---------------- */

    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (!form.email) {
            return toast.error("Please enter your email");
        }

        setLoading(true);

        try {
            await forgotPassword(form.email);

            toast.success(`OTP sent successfully on ${form.email}`);
            setStep(2);
            setTimer(60);

        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- OTP HANDLING ---------------- */

    const handleOtpChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const updatedOtp = [...form.otp];
        updatedOtp[index] = value;

        setForm({ ...form, otp: updatedOtp });

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !form.otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    /* ---------------- RESET PASSWORD ---------------- */

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const otpValue = form.otp.join("");

        if (otpValue.length !== 6) {
            return toast.error("Enter valid 6-digit OTP");
        }

        if (form.password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        if (form.password !== form.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);

        try {
            await resetPasswordWithOTP({
                email: form.email,
                otp: otpValue,
                newPassword: form.password,
            });

            toast.success("Password updated successfully ");

            setStep(1);
            setForm({
                email: "",
                otp: ["", "", "", "", "", ""],
                password: "",
                confirmPassword: "",
            });

            router.push("/login");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Reset failed"
            );
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-100">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Reset Password
                </h1>

                <p className="text-sm text-black text-center mb-8">
                    {step === 1
                        ? "Enter your email to receive an OTP"
                        : "Enter the OTP and set a new password"}
                </p>

                {/* STEP 1 */}
                {step === 1 && (
                    <form onSubmit={handleSendOTP} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-black"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-12 rounded-xl font-semibold text-white transition-all
              ${loading
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Sending..." : "Continue"}
                        </button>
                    </form>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">

                        <div className="flex justify-between gap-2">
                            {form.otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (otpRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) =>
                                        handleOtpChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) =>
                                        handleBackspace(e, index)
                                    }
                                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-black"
                                />
                            ))}
                        </div>

                        <input
                            type="password"
                            placeholder="New Password"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none text-black"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none text-black"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-12 rounded-xl font-semibold text-white transition-all
              ${loading
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                        >
                            {loading ? "Processing..." : "Reset Password"}
                        </button>

                        <div className="text-center text-sm text-gray-500">
                            {timer > 0 ? (
                                `Resend OTP in ${timer}s`
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                ← Change Email
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
