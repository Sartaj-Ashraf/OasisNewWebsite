"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/auth.service";

export default function Login() {
    
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "umaid.uk39@gmail.com",
        password: "umaidkha",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await loginUser(form);

            toast.success("Login successfully");

            router.push("/admin");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Something went wrong. Try again.";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur opacity-40"></div>

                    <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-blue-100">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0.85 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4"
                            >
                                <Lock className="w-8 h-8 text-blue-700" />
                            </motion.div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleSubmit}>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Email Address
                                </label>

                                <div className="relative mt-2">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="name@company.com"
                                        className="w-full pl-10 pr-4 h-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>

                                    <Link
                                        href="/forget-password"
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative mt-2">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 h-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-sm text-red-600 text-center">
                                    {error}
                                </p>
                            )}

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>

                        </form>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
