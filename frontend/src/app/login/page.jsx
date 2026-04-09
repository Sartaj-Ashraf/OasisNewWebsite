"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Zap, ChevronRight, ShieldCheck, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/auth.service";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "umaid.uk39@gmail.com", password: "@Umaid123" });
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
            toast.success("welcome ustad!");
            setTimeout(() => {
                router.push("/admin");
            }, 1000);
        } catch (err) {
            const message = err.response?.data?.message || "AUTHENTICATION FAILED";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex bg-[#030303] text-primary selection:bg-white selection:text-black lp-font-body">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');
                .lp-font-bebas { font-family: 'Bebas Neue', sans-serif; }
                .lp-font-body { font-family: 'Inter', sans-serif; }
            `}</style>

            {/* ── LEFT SECTION ── */}
            <section className="hidden lg:flex w-[45%] bg-secondary-light/70 p-12 flex-col justify-between relative border-r border-white/5">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

                <div className="relative z-10 flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <Zap className="text-black w-5 h-5 fill-current" />
                    </div>
                    <span className="lp-font-bebas text-xl tracking-[0.2em]">Oasis Ascend</span>
                </div>

                <div className="relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="lp-font-bebas text-[6rem] leading-[0.85] tracking-tighter uppercase mb-6">
                            Secure<br />The<br /><span className="text-white/40">Future.</span>
                        </h2>
                        <span className="text-sm text-white/40 max-w-xs leading-relaxed font-light">
                            Enterprise-grade infrastructure for decentralized sovereignty and high-frequency data relays.
                        </span>
                    </motion.div>
                </div>

                <div className="relative z-10 flex gap-8 border-t border-white/5 pt-8">
                    {[
                        { l: "Projects Delivered", v: "120+" },
                        { l: "Client Satisfaction", v: "98%" },
                        { l: "Avg Delivery Time", v: "7–14 Days" },
                    ].map((s) => (
                        <div key={s.l}>
                            <h5 className="text-lg font-medium">{s.v}</h5>
                            <span className="text-[10px] uppercase tracking-widest text-white/30">
                                {s.l}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── RIGHT SECTION: FORM ── */}
            <section className="flex-1 relative flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#111_0%,transparent_100%)] opacity-50" />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[380px] relative z-10"
                >
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                        <header className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <Fingerprint size={16} className="text-white/60" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Secure Access</span>
                            </div>
                            <h3 className="text-2xl font-semibold tracking-tight">Login to <span className="text-secondary">Terminal</span></h3>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-primary/40 font-bold ml-1">Identity</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="umaid@oasisascend.com"
                                        className="w-full h-11 bg-white/3 border border-white/10 rounded-lg pl-10 pr-4 text-sm focus:outline-none focus:border-white/30 focus:bg-white/6 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Passphrase</label>
                                    <Link href="/forget-password" size={12} className="text-[10px] text-white/20 hover:text-primary transition-colors">Forgot?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full h-11 text-white bg-white/3 border border-secondary/10 rounded-lg pl-10 pr-12 text-sm focus:outline-none focus:border-white/30 focus:bg-white/6 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400 bg-red-400/5 border border-red-400/20 p-2.5 rounded flex items-center gap-2">
                                        <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 bg-primary text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>Authorize Entry <ChevronRight size={14} /></>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 flex justify-center items-center gap-6 opacity-20">
                        <ShieldCheck size={16} />
                        <span className="text-[9px] uppercase tracking-[0.4em] font-medium">Encrypted Session</span>
                        <ShieldCheck size={16} />
                    </div>
                </motion.div>
            </section>
        </main>
    );
}