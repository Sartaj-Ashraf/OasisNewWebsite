"use client";
import { useState } from "react";
import { Field, TagsInput, inputCls, selectCls } from "@/components/admin/careers/ui";

/* ── constants ── */
const JOB_TYPES = [
    "Full Time", "Part Time", "Internship", "Contract", "Freelance",
    "Temporary", "Remote", "Hybrid", "Volunteer", "Apprenticeship",
    "Seasonal", "Commission Based", "On-Demand", "Gig Work",
];

const EMPTY = {
    JobTitle: "",
    JobType: "",
    Qualification: "",
    Location: "",
    TotalVacancies: 1,
    WorkHours: { start: "09:00", end: "17:00" },
    Salary: { min: "", max: "" },
    jobDescription: "",
    requirementDescription: "",
    ResponsibilitiesDescription: "",
    requirementList: [],
    ResponsibilitiesList: [],
    isActive: true,
};

/* ── section header ── */
const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-500 text-base flex-shrink-0">
            {icon}
        </div>
        <div>
            <div className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "Syne, sans-serif" }}>{title}</div>
            {subtitle && <div className="text-[11px] text-slate-400 mt-0.5">{subtitle}</div>}
        </div>
    </div>
);

/* ══════════════════════════════════════════
   CAREER FORM
══════════════════════════════════════════ */
export default function CareerForm({ initial, onSubmit, onCancel, loading }) {
    const [form, setForm] = useState(() => {
        if (!initial) return EMPTY;
        return {
            ...EMPTY,
            ...initial,
            WorkHours: initial.WorkHours || EMPTY.WorkHours,
            Salary: { min: initial.Salary?.min ?? "", max: initial.Salary?.max ?? "" },
            requirementList: initial.requirementList || [],
            ResponsibilitiesList: initial.ResponsibilitiesList || [],
        };
    });

    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
    const setNested = (parent, key, val) => setForm((f) => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

    const charCount = (str, max) => {
        const n = (str || "").length;
        return <span className={`text-[11px] text-right ${n > max * 0.9 ? "text-rose-400" : "text-slate-400"}`}>{n}/{max}</span>;
    };

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
            className="flex flex-col gap-7"
        >
            {/* ── BASIC INFO ── */}
            <div>
                <SectionHeader icon="💼" title="Basic Information" subtitle="Core job details visible to applicants" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <Field label="Job Title" required>
                            <input value={form.JobTitle} onChange={(e) => set("JobTitle", e.target.value)}
                                placeholder="e.g. Senior React Developer" required maxLength={100}
                                className={inputCls} />
                        </Field>
                    </div>
                    <Field label="Job Type" required>
                        <select value={form.JobType} onChange={(e) => set("JobType", e.target.value)} required className={selectCls}>
                            <option value="">Select type…</option>
                            {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                    </Field>
                    <Field label="Qualification" required>
                        <input value={form.Qualification} onChange={(e) => set("Qualification", e.target.value)}
                            placeholder="e.g. Bachelor's in CS" required className={inputCls} />
                    </Field>
                    <Field label="Location" required>
                        <input value={form.Location} onChange={(e) => set("Location", e.target.value)}
                            placeholder="e.g. New York, NY" required className={inputCls} />
                    </Field>
                    <Field label="Total Vacancies" required>
                        <input type="number" value={form.TotalVacancies} min={1}
                            onChange={(e) => set("TotalVacancies", Number(e.target.value))}
                            required className={inputCls} />
                    </Field>
                </div>
            </div>

            {/* ── SCHEDULE & SALARY ── */}
            <div>
                <SectionHeader icon="⏰" title="Schedule & Compensation" subtitle="Work hours and salary range" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Field label="Work Start" required>
                        <input type="time" value={form.WorkHours.start}
                            onChange={(e) => setNested("WorkHours", "start", e.target.value)}
                            required className={inputCls} />
                    </Field>
                    <Field label="Work End" required>
                        <input type="time" value={form.WorkHours.end}
                            onChange={(e) => setNested("WorkHours", "end", e.target.value)}
                            required className={inputCls} />
                    </Field>
                    <Field label="Salary Min ($)" hint="Leave blank if not disclosed">
                        <input type="number" value={form.Salary.min} min={0}
                            onChange={(e) => setNested("Salary", "min", e.target.value)}
                            placeholder="0" className={inputCls} />
                    </Field>
                    <Field label="Salary Max ($)">
                        <input type="number" value={form.Salary.max} min={0}
                            onChange={(e) => setNested("Salary", "max", e.target.value)}
                            placeholder="0" className={inputCls} />
                    </Field>
                </div>
            </div>

            {/* ── DESCRIPTIONS ── */}
            <div>
                <SectionHeader icon="📝" title="Descriptions" subtitle="Long-form text shown on the job detail page" />
                <div className="flex flex-col gap-4">
                    <Field label="Job Description" required>
                        <textarea value={form.jobDescription} onChange={(e) => set("jobDescription", e.target.value)}
                            rows={4} required maxLength={2000}
                            placeholder="Describe the role, team, and impact…"
                            className={`${inputCls} resize-y`} />
                        <div className="flex justify-end">{charCount(form.jobDescription, 2000)}</div>
                    </Field>
                    <Field label="Requirements Description" hint="Optional intro paragraph above the requirements list">
                        <textarea value={form.requirementDescription} onChange={(e) => set("requirementDescription", e.target.value)}
                            rows={3} maxLength={2000} placeholder="Brief requirements overview…"
                            className={`${inputCls} resize-y`} />
                        <div className="flex justify-end">{charCount(form.requirementDescription, 2000)}</div>
                    </Field>
                    <Field label="Responsibilities Description" hint="Optional intro paragraph above the responsibilities list">
                        <textarea value={form.ResponsibilitiesDescription} onChange={(e) => set("ResponsibilitiesDescription", e.target.value)}
                            rows={3} maxLength={2000} placeholder="Brief responsibilities overview…"
                            className={`${inputCls} resize-y`} />
                        <div className="flex justify-end">{charCount(form.ResponsibilitiesDescription, 2000)}</div>
                    </Field>
                </div>
            </div>

            {/* ── LISTS ── */}
            <div>
                <SectionHeader icon="📋" title="Bullet Lists" subtitle="Appear as bullet points on the job listing" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Requirements List">
                        <TagsInput
                            value={form.requirementList}
                            onChange={(v) => set("requirementList", v)}
                            placeholder="Add a requirement, press Enter…"
                        />
                    </Field>
                    <Field label="Responsibilities List">
                        <TagsInput
                            value={form.ResponsibilitiesList}
                            onChange={(v) => set("ResponsibilitiesList", v)}
                            placeholder="Add a responsibility, press Enter…"
                        />
                    </Field>
                </div>
            </div>

            {/* ── STATUS ── */}
            <div>
                <SectionHeader icon="⚙️" title="Publishing" subtitle="Control job visibility" />
                <button
                    type="button"
                    onClick={() => set("isActive", !form.isActive)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all w-full text-left ${
                        form.isActive
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-slate-50 border-slate-200 text-slate-500"
                    }`}
                >
                    <div className={`w-10 h-6 rounded-full relative transition-colors flex-shrink-0 ${form.isActive ? "bg-emerald-400" : "bg-slate-300"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.isActive ? "left-5" : "left-1"}`} />
                    </div>
                    <div>
                        <div className="font-bold text-sm">{form.isActive ? "Active — visible to applicants" : "Inactive — hidden from public"}</div>
                        <div className="text-[11px] opacity-70 mt-0.5">Toggle to change visibility immediately after save</div>
                    </div>
                </button>
            </div>

            {/* ── ACTIONS ── */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
                <button type="button" onClick={onCancel}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 border-none cursor-pointer transition-colors">
                    Cancel
                </button>
                <button type="submit" disabled={loading}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-500 text-white border-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                    {loading ? "Saving…" : "Save Job"}
                </button>
            </div>
        </form>
    );
}