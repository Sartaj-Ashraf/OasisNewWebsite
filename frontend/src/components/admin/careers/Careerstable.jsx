"use client";
import { SkeletonRow, Pagination, Badge } from "@/components/admin/careers/ui";

const LIMIT = 10;

const JOB_TYPE_COLOR = {
    "Full Time": "green", "Part Time": "blue", "Internship": "purple",
    "Contract": "amber", "Freelance": "teal", "Temporary": "slate",
    "Remote": "indigo", "Hybrid": "pink", "Volunteer": "teal",
    "Apprenticeship": "blue", "Seasonal": "amber",
    "Commission Based": "purple", "On-Demand": "red", "Gig Work": "slate",
};

function SalaryCell({ salary }) {
    if (!salary || (!salary.min && !salary.max)) {
        return (
            <span className="text-slate-400 text-xs italic">
                —
            </span>
        );
    }

    let text = "Not specified";

    if (salary.min && salary.max) {
        text = `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    } else if (salary.min) {
        text = `From $${salary.min.toLocaleString()}`;
    } else if (salary.max) {
        text = `Up to $${salary.max.toLocaleString()}`;
    }

    return (
        <span className="text-xs font-semibold text-emerald-600">
            {text}
        </span>
    );
}

/* ══════════════════════════════════════════
   CAREERS TABLE
══════════════════════════════════════════ */
export default function CareersTable({
    rows, loading, page, totalPages, total,
    onView, onEdit, onDelete, onToggleStatus, onPageChange,
}) {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left min-w-[1040px]">
                    <thead>
                        <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                            {["Job", "Type", "Location", "Vacancies", "Salary", "Status", "Actions"].map((h, i) => (
                                <th key={h}
                                    className={`px-5 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ${i === 6 ? "text-right" : ""}`}
                                    style={{ fontFamily: "Syne, sans-serif" }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading
                            ? Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
                            : rows.length === 0
                            ? (
                                <tr>
                                    <td colSpan={7} className="py-24 text-center text-slate-400">
                                        <div className="text-5xl mb-4">📭</div>
                                        <div className="text-base font-bold text-slate-600 mb-1.5"
                                            style={{ fontFamily: "Syne, sans-serif" }}>No jobs found</div>
                                        <div className="text-sm">Adjust filters or post a new job.</div>
                                    </td>
                                </tr>
                            )
                            : rows.map((job, idx) => (
                                <tr key={job._id}
                                    className="group hover:bg-amber-50/30 transition-colors cursor-pointer"
                                    style={{ animation: `rowFade .18s ease ${idx * 20}ms both` }}
                                    onClick={() => onView(job)}
                                >
                                    {/* Job title + slug */}
                                    <td className="px-5 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-base flex-shrink-0 shadow-sm">
                                                💼
                                            </div>
                                            <div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onView(job); }}
                                                    className="font-bold text-slate-800 text-sm leading-tight group-hover:text-amber-600 transition-colors bg-transparent border-none cursor-pointer p-0 text-left hover:underline">
                                                    {job.JobTitle}
                                                </button>
                                                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{job.slug}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-5 py-4 align-middle">
                                        <Badge color={JOB_TYPE_COLOR[job.JobType] || "slate"}>{job.JobType}</Badge>
                                    </td>

                                    {/* Location */}
                                    <td className="px-5 py-4 align-middle">
                                        <span className="text-sm text-slate-600 flex items-center gap-1">
                                            <span className="text-slate-400 text-xs">📍</span>{job.Location}
                                        </span>
                                    </td>

                                    {/* Vacancies */}
                                    <td className="px-5 py-4 align-middle">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-extrabold text-sm"
                                            style={{ fontFamily: "Syne, sans-serif" }}>
                                            {job.TotalVacancies}
                                        </span>
                                    </td>

                                    {/* Salary */}
                                    <td className="px-5 py-4 align-middle">
                                        {console.log(job.Salary)}
                                        <SalaryCell salary={job.Salary} />
                                    </td>

                                    {/* Status toggle */}
                                    <td className="px-5 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => onToggleStatus(job._id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                                                job.isActive
                                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                                    : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
                                            }`}>
                                            {job.isActive ? "✓ Active" : "✕ Inactive"}
                                        </button>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-4 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="inline-flex gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => onView(job)}
                                                className="px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 text-slate-600 rounded-lg cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all"
                                                title="View">👁</button>
                                            <button onClick={() => onEdit(job)}
                                                className="px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 text-slate-600 rounded-lg cursor-pointer hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/60 transition-all"
                                                title="Edit">✏️</button>
                                            <button onClick={() => onDelete(job)}
                                                className="px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-200 text-slate-600 rounded-lg cursor-pointer hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50/60 transition-all"
                                                title="Delete">🗑</button>
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
                <div className="border-t border-slate-100 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/40">
                    <span className="text-xs text-slate-400 font-medium">
                        Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of{" "}
                        <strong className="text-slate-600">{total}</strong> jobs
                    </span>
                    <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
                </div>
            )}
        </div>
    );
}