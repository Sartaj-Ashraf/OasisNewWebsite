    "use client";
import { Badge } from "@/components/admin/careers/ui";

/* ── job type colour map ── */
const JOB_TYPE_COLOR = {
    "Full Time":        "green",
    "Part Time":        "blue",
    "Internship":       "purple",
    "Contract":         "amber",
    "Freelance":        "teal",
    "Temporary":        "slate",
    "Remote":           "indigo",
    "Hybrid":           "pink",
    "Volunteer":        "teal",
    "Apprenticeship":   "blue",
    "Seasonal":         "amber",
    "Commission Based": "purple",
    "On-Demand":        "red",
    "Gig Work":         "slate",
};

const Section = ({ title, children }) => (
    <div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2"
            style={{ fontFamily: "Syne, sans-serif" }}>{title}</div>
        {children}
    </div>
);

const BulletList = ({ items }) => {
    if (!items?.length) return <p className="text-sm text-slate-400 italic">None listed.</p>;
    return (
        <ul className="flex flex-col gap-1.5">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">▸</span>
                    {item}
                </li>
            ))}
        </ul>
    );
};

/* ══════════════════════════════════════════
   VIEW CAREER CONTENT
══════════════════════════════════════════ */
export default function ViewCareerContent({ job, onEdit, onDelete, onToggleStatus }) {
    const salary = job.salaryRange || (
        job.Salary?.min && job.Salary?.max
            ? `$${job.Salary.min.toLocaleString()} – $${job.Salary.max.toLocaleString()}`
            : job.Salary?.min ? `From $${job.Salary.min.toLocaleString()}`
            : job.Salary?.max ? `Up to $${job.Salary.max.toLocaleString()}`
            : "Not specified"
    );

    return (
        <div className="flex flex-col gap-6">

            {/* ── HERO CARD ── */}
            <div className="relative rounded-2xl overflow-hidden  p-6">
                {/* decorative blobs */}
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-amber-400/8 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-amber-400/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                <div className="relative flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-2xl shrink-0">
                        💼
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-2xl!  leading-tight wrap-break"
                            style={{ fontFamily: "Syne, sans-serif" }}>
                            {job.JobTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge color={JOB_TYPE_COLOR[job.JobType] || "slate"}>{job.JobType}</Badge>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                job.isActive
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                                    : "bg-rose-500/20 border-rose-500/30 text-rose-400"
                            }`}>
                                {job.isActive ? "✓ Active" : "✕ Inactive"}
                            </span>
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="text-[11px] text-slate-500 mb-0.5">Slug</div>
                        <code className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">{job.slug}</code>
                    </div>
                </div>

                {/* Quick stats row */}
                <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    {[
                        { icon: "📍", label: "Location",   value: job.Location },
                        { icon: "🎓", label: "Qualification", value: job.Qualification },
                        { icon: "💰", label: "Salary",     value: salary },
                        { icon: "👥", label: "Vacancies",  value: job.TotalVacancies },
                    ].map(({ icon, label, value }) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 backdrop-blur-sm">
                            <div className="text-lg mb-0.5">{icon}</div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{label}</div>
                            <div className="text-sm  font-semibold mt-0.5 leading-tight">{value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── WORK HOURS ── */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 text-base">🕘</div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Work Start</div>
                        <div className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                            {job.WorkHours?.start || "—"}
                        </div>
                    </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 text-base">🕔</div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Work End</div>
                        <div className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                            {job.WorkHours?.end || "—"}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── JOB DESCRIPTION ── */}
            <Section title="Job Description">
                <p className="text-sm! text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
                    {job.jobDescription || <em className="text-slate-400">No description.</em>}
                </p>
            </Section>

            {/* ── REQUIREMENTS ── */}
            {(job.requirementDescription || job.requirementList?.length > 0) && (
                <Section title="Requirements">
                    {job.requirementDescription && (
                        <p className="text-sm! text-slate-600 leading-relaxed mb-3">{job.requirementDescription}</p>
                    )}
                    <BulletList items={job.requirementList} />
                </Section>
            )}

            {/* ── RESPONSIBILITIES ── */}
            {(job.ResponsibilitiesDescription || job.ResponsibilitiesList?.length > 0) && (
                <Section title="Responsibilities">
                    {job.ResponsibilitiesDescription && (
                        <p className="text-sm text-slate-600 leading-relaxed mb-3">{job.ResponsibilitiesDescription}</p>
                    )}
                    <BulletList items={job.ResponsibilitiesList} />
                </Section>
            )}

            {/* ── META ── */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                {[
                    { label: "Created",  value: new Date(job.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) },
                    { label: "Updated",  value: new Date(job.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) },
                ].map(({ label, value }) => (
                    <div key={label}>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{label}</div>
                        <div className="text-sm text-slate-700 font-semibold">{value}</div>
                    </div>
                ))}
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div className="flex gap-2.5 border-t border-slate-100 pt-4">
                <button onClick={onEdit}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-500 text-white border-none cursor-pointer transition-all shadow-sm hover:-translate-y-0.5">
                    ✏️ Edit Job
                </button>
                <button onClick={onToggleStatus}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border cursor-pointer transition-all hover:-translate-y-0.5 ${
                        job.isActive
                            ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                            : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    }`}>
                    {job.isActive ? "⏸ Deactivate" : "▶ Activate"}
                </button>
                <button onClick={onDelete}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-all">
                    🗑
                </button>
            </div>
        </div>
    );
}