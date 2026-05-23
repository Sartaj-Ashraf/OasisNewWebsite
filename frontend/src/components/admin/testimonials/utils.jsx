"use client";
import { useState } from "react";

/* =========================
   STAR RATING
========================= */
export const StarRating = ({ value, onChange, readonly = false }) => {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    className={`text-2xl leading-none border-none bg-transparent transition-transform duration-100 ${
                        !readonly ? "cursor-pointer hover:scale-125" : "cursor-default"
                    } ${star <= (hovered || value) ? "text-amber-400" : "text-slate-200"}`}
                    onClick={() => !readonly && onChange?.(star)}
                    onMouseEnter={() => !readonly && setHovered(star)}
                    onMouseLeave={() => !readonly && setHovered(0)}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

/* =========================
   MODAL
========================= */
export const Modal = ({ open, title, onClose, children, wide = false }) => {
    // Lock scroll
    if (typeof window !== "undefined") {
        document.body.style.overflow = open ? "hidden" : "";
    }
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`relative bg-white w-full ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"} max-h-[95dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sm:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-slate-200" />
                </div>
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className=" text-lg! font-extrabold text-slate-900 tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm transition-colors border-none cursor-pointer"
                    >✕</button>
                </div>
                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
};

/* =========================
   PAGINATION
========================= */
export const Pagination = ({ page, totalPages, onChange }) => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) pages.push(i);
        else if (pages[pages.length - 1] !== "…") pages.push("…");
    }
    return (
        <div className="flex items-center gap-1.5">
            <button onClick={() => onChange(page - 1)} disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 text-sm cursor-pointer bg-white hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">‹</button>
            {pages.map((p, i) =>
                p === "…" ? (
                    <span key={`el${i}`} className="w-9 text-center text-slate-400 text-sm">…</span>
                ) : (
                    <button key={p} onClick={() => onChange(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                            p === page ? "bg-amber-400 border-amber-400 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-600"
                        }`}>
                        {p}
                    </button>
                )
            )}
            <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 text-sm cursor-pointer bg-white hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">›</button>
        </div>
    );
};

/* =========================
   SKELETON ROW
========================= */
export const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-slate-50">
        <td className="px-5 py-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0" />
                <div className="h-4 w-24 bg-slate-100 rounded-lg" />
            </div>
        </td>
        {[80, 260, 100, 100, 110].map((w, i) => (
            <td key={i} className="px-5 py-4">
                <div className={`h-4 bg-slate-100 rounded-lg`} style={{ width: w }} />
            </td>
        ))}
    </tr>
);