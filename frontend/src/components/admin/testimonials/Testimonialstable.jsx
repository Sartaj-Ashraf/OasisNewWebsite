"use client";
import { SkeletonRow, Pagination } from "@/components/admin/testimonials/utils";

/* =========================
   VIEW TESTIMONIAL MODAL BODY
========================= */
export const ViewTestimonialContent = ({ t, onEdit, onDelete, onToggleApproval, onToggleFeatured }) => {
    const initials = t.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div className="flex flex-col gap-6">
            {/* Hero card - Swapped slate-900 mesh to secondary-dark */}
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-secondary-dark via-slate-800 to-secondary-dark p-6 text-text-light">
                {/* Decorative blobs - Dynamic alpha overlays over mapped global primary */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full border-2 border-primary/50 bg-primary/20 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                        {t.image?.url
                            ? <img src={t.image.url} alt={t.name} className="w-full h-full object-cover" />
                            : <span className="text-primary font-bold text-xl">{initials}</span>
                        }
                    </div>
                    <div>
                        <div className="font-extrabold text-lg text-text-light leading-tight" >{t.name}</div>
                        {t.company && (
                            <div className="text-sm text-text-secondary mt-0.5 flex items-center gap-1.5">
                                <span className="text-primary">🏢</span>{t.company}
                            </div>
                        )}
                        {/* Stars */}
                        <div className="flex items-center gap-1 mt-1.5">
                            <div className="flex gap-0.5">
                                {[1,2,3,4,5].map((s) => (
                                    <span key={s} className={`text-sm ${s <= t.rating ? "text-primary" : "text-secondary-light/40"}`}>★</span>
                                ))}
                            </div>
                            <span className="text-xs text-text-secondary ml-1">{t.rating}/5</span>
                        </div>
                    </div>
                    {/* Badges top-right */}
                    <div className="ml-auto flex flex-col gap-1.5 items-end">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            t.isApproved
                                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                                : "bg-rose-500/20 border-rose-500/30 text-rose-400"
                        }`}>
                            {t.isApproved ? "✓ Approved" : "⏳ Pending"}
                        </span>
                        {t.isFeatured && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/20 border border-primary/30 text-primary">
                                ★ Featured
                            </span>
                        )}
                    </div>
                </div>

                {/* Quote */}
                <div className="relative">
                    <p className="text-sm! text-text-light/80 leading-relaxed pl-5 pr-2 italic">{t.testimonial}</p>
                </div>
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "Order", value: t.order ?? 0, icon: "🔢" },
                    { label: "Characters", value: t.testimonial?.length ?? 0, icon: "📝" },
                    { label: "Rating", value: `${t.rating} / 5`, icon: "⭐" },
                ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-accent border border-accent-dark rounded-xl p-3 text-center">
                        <div className="text-lg mb-1">{icon}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-0.5">{label}</div>
                        <div className="text-sm font-extrabold text-text-primary">{value}</div>
                    </div>
                ))}
            </div>

            {/* Quick toggles */}
            <div className="flex gap-3">
                <button
                    onClick={() => onToggleApproval(t._id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border cursor-pointer transition-all hover:scale-[1.02] active:scale-95 ${
                        t.isApproved
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                            : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                    }`}>
                    {t.isApproved ? "✓ Revoke Approval" : "✓ Approve"}
                </button>
                <button
                    onClick={() => onToggleFeatured(t._id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border cursor-pointer transition-all hover:scale-[1.02] active:scale-95 ${
                        t.isFeatured
                            ? "bg-primary/10 border-primary/30 text-primary-dark hover:bg-primary/20"
                            : "bg-accent border-accent-dark text-text-secondary hover:bg-accent-dark"
                    }`}>
                    {t.isFeatured ? "★ Unfeature" : "☆ Set Featured"}
                </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1 border-t border-accent-dark">
                <button onClick={onEdit}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary hover:bg-primary-dark text-text-light border-none cursor-pointer transition-colors shadow-sm">
                    ✏️ Edit Testimonial
                </button>
                <button onClick={onDelete}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-colors">
                    🗑 Delete
                </button>
            </div>
        </div>
    );
};

/* =========================
   TABLE
========================= */
const LIMIT = 10;

export const TestimonialsTable = ({
    rows, loading, page, totalPages, total,
    onView, onEdit, onDelete, onToggleApproval, onToggleFeatured, onPageChange,
}) => (
    <div className="bg-accent-light border border-accent-dark rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-225">
                <thead>
                    <tr className="border-b border-accent-dark bg-linear-to-r from-accent to-accent/40">
                        {["User", "Rating", "Moderation", "Placement", "Actions"].map((h, i) => (
                            <th key={h} className={`px-5 py-4 text-[10px] font-extrabold uppercase tracking-widest text-text-secondary ${i === 4 ? "text-right" : ""}`}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-accent">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                        : rows.length === 0
                        ? (
                            <tr>
                                <td colSpan={6} className="py-24 text-center text-text-secondary">
                                    <div className="text-5xl mb-4">📭</div>
                                    <div className="text-base font-bold text-text-primary mb-1.5" >No records found</div>
                                    <div className="text-sm">Adjust your filters or add a new testimonial.</div>
                                </td>
                            </tr>
                        )
                        : rows.map((t, idx) => (
                            <tr key={t._id}
                                className="group hover:bg-primary/5 transition-colors cursor-pointer"
                                style={{ animation: `rowFade .18s ease ${idx * 25}ms both` }}
                                onClick={() => onView(t)}
                            >
                                {/* Person */}
                                <td className="px-5 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-accent-light bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 text-primary-dark font-extrabold text-base shadow-sm ring-1 ring-primary/20">
                                            {t.image?.url
                                                ? <img src={t.image.url} alt={t.name} className="w-full h-full object-cover" />
                                                : t.name.charAt(0).toUpperCase()
                                            }
                                        </div>
                                        <div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onView(t); }}
                                                className="font-bold text-text-primary text-sm leading-tight group-hover:text-primary-dark transition-colors bg-transparent border-none cursor-pointer p-0 text-left hover:underline"
                                            >
                                                {t.name}
                                            </button>
                                            {t.company && <div className="text-xs text-text-secondary mt-0.5">{t.company}</div>}
                                        </div>
                                    </div>
                                </td>

                                {/* Rating */}
                                <td className="px-5 py-4 align-middle">
                                    <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1">
                                        <span className="text-primary text-xs tracking-wide leading-none">
                                            {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                                        </span>
                                        <span className="text-[10px] text-primary-dark font-bold">{t.rating}</span>
                                    </div>
                                </td>

                                {/* Approval toggle */}
                                <td className="px-5 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => onToggleApproval(t._id)} title="Toggle approval"
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                                            t.isApproved
                                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                                : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                                        }`}>
                                        {t.isApproved ? "✓ Approved" : "⏳ Pending"}
                                    </button>
                                </td>

                                {/* Featured toggle */}
                                <td className="px-5 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => onToggleFeatured(t._id)} title="Toggle featured"
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                                            t.isFeatured
                                                ? "bg-primary/10 border-primary/20 text-primary-dark hover:bg-primary/20"
                                                : "bg-accent border-accent-dark text-text-secondary hover:bg-accent-dark"
                                        }`}>
                                        {t.isFeatured ? "★ Featured" : "☆ Standard"}
                                    </button>
                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="inline-flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {/* <button onClick={() => onView(t)}
                                            className="px-3 py-1.5 text-xs font-bold bg-accent-light border border-accent-dark text-text-secondary rounded-lg cursor-pointer hover:border-text-secondary hover:text-text-primary hover:bg-accent transition-all"
                                            title="View details">
                                            View
                                        </button> */}
                                        <button onClick={() => onEdit(t)}
                                            className="px-3 py-1.5 text-xs font-bold bg-amber-500 border border-amber-500 text-white rounded-lg cursor-pointer hover:border-amber-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all">
                                            Edit
                                        </button>
                                        <button onClick={() => onDelete(t)}
                                            className="px-3 py-1.5 text-xs font-bold bg-red-500 border border-red-500 text-white rounded-lg cursor-pointer hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50/60 transition-all">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        {/* PAGINATION FOOTER */}
        {!loading && rows.length > 0 && (
            <div className="border-t border-accent-dark px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-accent/40">
                <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
            </div>
        )}
    </div>
);