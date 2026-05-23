"use client";
import { useEffect, useState } from "react";

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
export const Modal = ({ open, title, onClose, children, size = "md" }) => {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    const widths = { sm: "sm:max-w-md", md: "sm:max-w-lg", lg: "sm:max-w-2xl", xl: "sm:max-w-4xl" };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`relative bg-white w-full ${widths[size]} max-h-[95dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sm:hidden flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-slate-200" />
                </div>
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg! font-extrabold text-slate-900 tracking-tight" >
                        {title}
                    </h2>
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

/* ══════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════ */
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
                p === "…"
                    ? <span key={`el${i}`} className="w-9 text-center text-slate-400 text-sm">…</span>
                    : <button key={p} onClick={() => onChange(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl border text-sm font-bold cursor-pointer transition-all ${p === page ? "bg-amber-400 border-amber-400 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-600"}`}>
                        {p}
                      </button>
            )}
            <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 text-sm cursor-pointer bg-white hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">›</button>
        </div>
    );
};

/* ══════════════════════════════════════════
   SKELETON ROW  (7 cols)
══════════════════════════════════════════ */
export const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-slate-50">
        <td className="px-5 py-4">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex-shrink-0" />
                <div className="flex flex-col gap-1.5">
                    <div className="h-3.5 w-32 bg-slate-100 rounded-lg" />
                    <div className="h-3 w-20 bg-slate-100 rounded-lg" />
                </div>
            </div>
        </td>
        {[64, 80, 90, 72, 80, 96].map((w, i) => (
            <td key={i} className="px-5 py-4">
                <div className="h-3.5 bg-slate-100 rounded-lg" style={{ width: w }} />
            </td>
        ))}
    </tr>
);

/* ══════════════════════════════════════════
   BADGE
══════════════════════════════════════════ */
export const Badge = ({ children, color = "slate" }) => {
    const colors = {
        green:  "bg-emerald-50 border-emerald-200 text-emerald-700",
        red:    "bg-rose-50 border-rose-200 text-rose-600",
        amber:  "bg-amber-50 border-amber-200 text-amber-700",
        blue:   "bg-sky-50 border-sky-200 text-sky-700",
        purple: "bg-violet-50 border-violet-200 text-violet-700",
        slate:  "bg-slate-50 border-slate-200 text-slate-600",
        indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
        pink:   "bg-pink-50 border-pink-200 text-pink-700",
        teal:   "bg-teal-50 border-teal-200 text-teal-700",
    };
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${colors[color] || colors.slate}`}>
            {children}
        </span>
    );
};

/* ══════════════════════════════════════════
   FIELD  (label + children wrapper)
══════════════════════════════════════════ */
export const Field = ({ label, required, children, hint }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            {label}{required && <span className="text-rose-400">*</span>}
        </label>
        {children}
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
    </div>
);

/* ══════════════════════════════════════════
   INPUT / TEXTAREA / SELECT base styles
══════════════════════════════════════════ */
export const inputCls = "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 w-full";
export const selectCls = `${inputCls} cursor-pointer`;

/* ══════════════════════════════════════════
   TAGS INPUT  (for requirementList / ResponsibilitiesList)
══════════════════════════════════════════ */
export const TagsInput = ({ value = [], onChange, placeholder }) => {
    const [draft, setDraft] = useState("");

    const add = () => {
        const t = draft.trim();
        if (t && !value.includes(t)) onChange([...value, t]);
        setDraft("");
    };

    const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
                    placeholder={placeholder || "Type and press Enter…"}
                    className={inputCls}
                />
                <button type="button" onClick={add}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold border-none cursor-pointer transition-colors flex-shrink-0">
                    +
                </button>
            </div>
            {value.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[40px]">
                    {value.map((tag, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                            {tag}
                            <button type="button" onClick={() => remove(i)}
                                className="text-slate-400 hover:text-rose-500 bg-transparent border-none cursor-pointer leading-none text-xs p-0">✕</button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};