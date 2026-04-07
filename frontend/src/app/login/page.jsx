"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/auth.service";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await loginUser(form);
            toast.success("Welcome back!");
            router.push("/admin");
        } catch (err) {
            const message =
                err.response?.data?.message || "Something went wrong. Try again.";
            setError(message);
            toast.error(message || "Something went wrong", {
                className:
                    "bg-gradient-to-br from-gray-950 via-red-950 to-red-900 border border-red-500/30 shadow-lg shadow-red-500/10 text-white",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

                .lp-shell {
                    min-height: 100vh;
                    display: flex;
                }

                .lp-left {
                    width: 40%;
                    background: #fafaf8;
                    border-right: 1px solid #e8e5df;
                    padding: 3rem 2.8rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    overflow: hidden;
                }
                .lp-left-grid {
                    position: absolute; inset: 0; pointer-events: none;
                    background-image:
                        linear-gradient(rgba(180,160,80,0.09) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(180,160,80,0.09) 1px, transparent 1px);
                    background-size: 32px 32px;
                }
                .lp-left-glow {
                    position: absolute; width: 320px; height: 320px;
                    background: radial-gradient(circle, rgba(234,179,8,0.13) 0%, transparent 70%);
                    border-radius: 50%; bottom: -80px; right: -80px; pointer-events: none;
                }
                .lp-logo {
                    display: flex; align-items: center; gap: 10px;
                    position: relative; z-index: 1;
                }
                .lp-logo-mark {
                    width: 36px; height: 36px; border-radius: 9px;
                    background: #0f0f0f;
                    display: flex; align-items: center; justify-content: center;
                }
                .lp-logo-name {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.15rem; letter-spacing: 0.1em; color: #0f0f0f;
                }
                .lp-tagline-block { position: relative; z-index: 1; }
                .lp-tagline-eyebrow {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.62rem; font-weight: 600;
                    letter-spacing: 0.16em; text-transform: uppercase;
                    color: #a89060; margin-bottom: 14px;
                    display: flex; align-items: center; gap: 8px;
                }
                .lp-tagline-eyebrow::before {
                    content: ''; display: block; width: 20px;
                    height: 1px; background: #c8a84b;
                }
                .lp-tagline-h {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 3.2rem; line-height: 1.02;
                    color: #0f0f0f; letter-spacing: 0.03em; margin: 0;
                }
                .lp-tagline-h span { color: #b8960a; }
                .lp-tagline-p {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.82rem; color: #7a7060;
                    line-height: 1.65; margin-top: 14px; max-width: 240px;
                }
                .lp-stats { display: flex; gap: 2rem; position: relative; z-index: 1; }
                .lp-stat-val {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.8rem; color: #0f0f0f;
                    letter-spacing: 0.04em; line-height: 1;
                }
                .lp-stat-val span { color: #c8a84b; }
                .lp-stat-label {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.66rem; color: #9a8a70;
                    margin-top: 3px; letter-spacing: 0.04em;
                }

                .lp-right {
                    flex: 1;
                    background: #0c0c0c;
                    display: flex; flex-direction: column; justify-content: center;
                    padding: 3rem 3.5rem;
                    position: relative; overflow: hidden;
                }
                .lp-right-grid {
                    position: absolute; inset: 0; pointer-events: none;
                    background-image:
                        linear-gradient(rgba(234,179,8,0.045) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(234,179,8,0.045) 1px, transparent 1px);
                    background-size: 36px 36px;
                }
                .lp-right-glow {
                    position: absolute; width: 360px; height: 360px;
                    background: radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 70%);
                    border-radius: 50%; top: -100px; right: -100px; pointer-events: none;
                }

                .lp-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: rgba(234,179,8,0.08);
                    border: 1px solid rgba(234,179,8,0.18);
                    color: #c8a840;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.6rem; font-weight: 600;
                    letter-spacing: 0.14em; text-transform: uppercase;
                    padding: 4px 11px; border-radius: 20px;
                    margin-bottom: 1.8rem;
                }
                .lp-h1 {
                    font-family: 'Bebas Neue', sans-serif;
                    letter-spacing: 0.03em; line-height: 1; margin-bottom: 8px;
                }
                .lp-h1 .l1 { font-size: 2.7rem; color: #f0ece2; display: block; }
                .lp-h1 .l2 { font-size: 2.4rem; color: #eab308; display: block; }
                .lp-h-sub {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.8rem; color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 2rem; line-height: 1.55;
                }
                .lp-field-label {
                    display: block;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.6rem; font-weight: 600;
                    text-transform: uppercase; letter-spacing: 0.14em;
                   color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 8px;
                }
                .lp-field { position: relative; }
                .lp-inp {
                    width: 100%; height: 46px; border-radius: 10px;
                    background: #181510; border: 1px solid #252118;
                    color: #e8e2d8;
                    font-family: 'DM Sans', sans-serif; font-size: 0.84rem;
                    padding: 0 42px 0 38px; outline: none;
                    transition: border-color 0.2s, background 0.2s;
                }
                .lp-inp::placeholder { color: rgba(255, 255, 255, 0.5); }
                .lp-inp:focus {
                    border-color: rgba(234,179,8,0.4);
                    background: #1c1810;
                    box-shadow: 0 0 0 3px rgba(234,179,8,0.07);
                }
                .lp-forgot {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.72rem; color: rgba(255, 255, 255, 0.5);
                    text-decoration: none; transition: color 0.2s;
                }
                .lp-forgot:hover { color: #eab308; }
                .submit-btn {
                    width: 100%; height: 46px; border-radius: 10px; border: none;
                    cursor: pointer;
                    background: linear-gradient(110deg, #eab308 0%, #f5cc30 45%, #c8960a 100%);
                    background-size: 200%;
                    color: #0a0a08;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 700; letter-spacing: 0.08em;
                    font-size: 0.8rem; text-transform: uppercase;
                    transition: transform 0.15s, box-shadow 0.2s, background-position 0.4s;
                    user-select: none;
                }
                .submit-btn:hover:not(:disabled) {
                    background-position: right center;
                    box-shadow: 0 0 28px rgba(234,179,8,0.38), 0 0 52px rgba(234,179,8,0.1);
                    transform: translateY(-1px);
                }
                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .lp-footer {
                    display: flex; align-items: center; gap: 7px;
                    margin-top: 1.8rem; padding-top: 1.4rem;
                    border-top: 1px solid #1e1c18;
                    
                }
                .lp-footer-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: #eab308; opacity: 0.55; flex-shrink: 0;
                }
                .lp-footer-text {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.68rem; color: #2e2a24;
                }
                .lp-footer-brand {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 0.75rem; letter-spacing: 0.1em; color: #7a6820;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 768px) {
                    .lp-left { display: none; }
                    .lp-right { padding: 2.5rem 1.8rem; }
                }
            `}</style>

            <div className="lp-shell select-none">

                {/* ── LEFT PANEL (light) ── */}
                <div className="lp-left">
                    <div className="lp-left-grid" />
                    <div className="lp-left-glow" />

                    <div className="lp-logo">
                        <div className="lp-logo-mark">
                            <Zap style={{ width: 14, height: 14, stroke: "#eab308", strokeWidth: 2.2, fill: "none" }} />
                        </div>
                        <span className="lp-logo-name">Oasis Ascend</span>
                    </div>

                    <div className="lp-tagline-block">
                        <div className="lp-tagline-eyebrow">Web Dev & Marketing</div>
                        <h2 className="lp-tagline-h">
                            Build.<br />Grow.<br /><span>Scale.</span>
                        </h2>
                        <p className="lp-tagline-p">
                            Transforming brands through precision engineering and data-driven marketing strategies.
                        </p>
                    </div>

                    <div className="lp-stats">
                        {[
                            { val: "120", suf: "+", label: "Projects Delivered" },
                            { val: "98", suf: "%", label: "Client Retention" },
                            { val: "6", suf: "x", label: "Avg ROI Growth" },
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="lp-stat-val">{s.val}<span>{s.suf}</span></div>
                                <div className="lp-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT PANEL (dark) ── */}
                <div className="lp-right">
                    <div className="lp-right-grid" />
                    <div className="lp-right-glow" />

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "relative", zIndex: 2, maxWidth: 420 }}
                    >
                        <div>
                            <span className="lp-badge">
                                <Lock style={{ width: 9, height: 9, stroke: "currentColor", strokeWidth: 2.2, fill: "none", display: "inline" }} />
                                Admin Portal
                            </span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            className="lp-h1"
                        >
                            <span className="l1">Welcome</span>
                            <span className="l2">Back.</span>
                        </motion.h1>
                        <p className="lp-h-sub text-white">Sign in to manage your projects & campaigns.</p>

                        <form
                            onSubmit={handleSubmit}
                            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                        >
                            {/* Email */}
                            <div>
                                <label className="lp-field-label">Email Address</label>
                                <div className="lp-field">
                                    <Mail style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, stroke: "#3a3530", strokeWidth: 1.8, fill: "none", pointerEvents: "none" }} />
                                    <input
                                        className="lp-inp"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="name@oasisascend.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                                    <label className="lp-field-label" style={{ marginBottom: 0 }}>Password</label>
                                    <Link href="/forget-password" className="lp-forgot">Forgot password?</Link>
                                </div>
                                <div className="lp-field">
                                    <Lock style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, stroke: "#3a3530", strokeWidth: 1.8, fill: "none", pointerEvents: "none" }} />
                                    <input
                                        className="lp-inp"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#3a3530", display: "flex" }}
                                    >
                                        {showPassword
                                            ? <EyeOff style={{ width: 14, height: 14 }} />
                                            : <Eye style={{ width: 14, height: 14 }} />}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.76rem", color: "#f87171", textAlign: "center",
                                        background: "rgba(248,113,113,0.07)",
                                        border: "1px solid rgba(248,113,113,0.14)",
                                        borderRadius: 8, padding: "10px 12px",
                                    }}
                                >
                                    {error}
                                </motion.p>
                            )}

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileTap={{ scale: 0.985 }}
                                className="submit-btn"
                            >
                                {loading ? (
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                        <svg style={{ animation: "spin 1s linear infinite", width: 14, height: 14 }} viewBox="0 0 24 24" fill="none">
                                            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                                        </svg>
                                        Signing In…
                                    </span>
                                ) : "Sign In →"}
                            </motion.button>
                        </form>


                    </motion.div>
                </div>
            </div>
        </>
    );
}