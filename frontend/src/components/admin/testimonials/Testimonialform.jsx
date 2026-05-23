"use client";
import { useState, useRef } from "react";
import { StarRating } from "@/components/admin/testimonials/utils";

const EMPTY_FORM = {
    name: "",
    company: "",
    rating: 5,
    testimonial: "",
    isApproved: "false",
    isFeatured: "false",
    order: 0,
};

/* =========================
   TESTIMONIAL FORM
========================= */
export const TestimonialForm = ({ initial, onSubmit, onCancel, loading }) => {
    const [form, setForm] = useState(initial || EMPTY_FORM);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(initial?.image?.url || "");
    const fileRef = useRef();

    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form, imageFile); }} className="flex flex-col gap-5">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2">
                <div
                    className="w-20 h-20 rounded-full border-2 border-dashed border-slate-200 hover:border-amber-400 bg-slate-50 cursor-pointer flex items-center justify-center overflow-hidden transition-all bg-cover bg-center shadow-inner"
                    style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
                    onClick={() => fileRef.current.click()}
                >
                    {!preview && (
                        <div className="text-center text-slate-400 text-xs leading-tight pointer-events-none">
                            <div className="text-2xl mb-0.5">📷</div>
                            <div>Photo</div>
                        </div>
                    )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                {preview && (
                    <button type="button" onClick={() => { setPreview(""); setImageFile(null); }}
                        className="text-xs text-rose-500 bg-transparent border-none cursor-pointer hover:text-rose-700 font-semibold">
                        ✕ Remove photo
                    </button>
                )}
            </div>

            {/* Name + Company */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Name *</label>
                    <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Doe" required
                        className="bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Company</label>
                    <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Corp"
                        className="bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400" />
                </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rating *</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5">
                    <StarRating value={form.rating} onChange={(v) => set("rating", v)} />
                </div>
            </div>

            {/* Testimonial */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Testimonial *</label>
                <textarea value={form.testimonial} onChange={(e) => set("testimonial", e.target.value)}
                    placeholder="Write the testimonial here..." rows={4} required
                    className="bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all resize-y placeholder:text-slate-400" />
                <span className={`text-[11px] text-right font-medium ${form.testimonial.length > 1800 ? "text-rose-400" : "text-slate-400"}`}>
                    {form.testimonial.length}/2000
                </span>
            </div>

            {/* Order + Approved + Featured */}
            <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Order</label>
                    <input type="number" value={form.order} min={0} onChange={(e) => set("order", e.target.value)}
                        className="bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Approved</label>
                    <button type="button" onClick={() => set("isApproved", form.isApproved === "true" ? "false" : "true")}
                        className={`rounded-xl py-2.5 text-xs font-bold border cursor-pointer transition-all ${
                            form.isApproved === "true"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-500"
                        }`}>
                        {form.isApproved === "true" ? "✓ Yes" : "✗ No"}
                    </button>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Featured</label>
                    <button type="button" onClick={() => set("isFeatured", form.isFeatured === "true" ? "false" : "true")}
                        className={`rounded-xl py-2.5 text-xs font-bold border cursor-pointer transition-all ${
                            form.isFeatured === "true"
                                ? "bg-amber-50 border-amber-200 text-amber-700 shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-500"
                        }`}>
                        {form.isFeatured === "true" ? "★ Yes" : "☆ No"}
                    </button>
                </div>
            </div>

            <div className="flex gap-3 justify-end pt-1">
                <button type="button" onClick={onCancel}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 border-none cursor-pointer transition-colors">
                    Cancel
                </button>
                <button type="submit" disabled={loading}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-500 text-white border-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                    {loading ? "Saving…" : "Save Testimonial"}
                </button>
            </div>
        </form>
    );
};