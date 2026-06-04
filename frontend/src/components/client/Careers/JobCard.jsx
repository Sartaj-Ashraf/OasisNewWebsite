"use client";
import { useRouter } from "next/navigation";

// ─── Constants ───────────────────────────────────────────────
const C = {
  primary:       "#eab308",
  primaryDark:   "#d6a107",
  secondaryDark: "#0f2e3a",
  secondary:     "#4f7f74",
  accent:        "#f5f5f5",
  accentDark:    "#F0F2F4",
  textSecondary: "#6b7280",
  border:        "#d1d5db",
};

const TYPE_BADGE = {
  "Full Time":        { bg: "#fefce8", text: "#854d0e", border: "#fef08a" },
  "Part Time":        { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe" },
  "Contract":         { bg: "#f0fdf9", text: "#134e4a", border: "#99f6e4" },
  "Internship":       { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe" },
  "Remote":           { bg: "#fff1f2", text: "#9f1239", border: "#fecdd3" },
  "Freelance":        { bg: "#fff7ed", text: "#9a3412", border: "#fed7aa" },
  "Hybrid":           { bg: "#ecfeff", text: "#164e63", border: "#a5f3fc" },
  "Temporary":        { bg: "#f7fee7", text: "#365314", border: "#d9f99d" },
  "Volunteer":        { bg: "#fdf2f8", text: "#831843", border: "#fbcfe8" },
  "Apprenticeship":   { bg: "#eef2ff", text: "#312e81", border: "#c7d2fe" },
  "Seasonal":         { bg: "#f0fdfa", text: "#134e4a", border: "#99f6e4" },
  "Commission Based": { bg: "#fffbeb", text: "#78350f", border: "#fde68a" },
  "On-Demand":        { bg: "#faf5ff", text: "#581c87", border: "#e9d5ff" },
  "Gig Work":         { bg: "#f8fafc", text: "#1e293b", border: "#cbd5e1" },
};

// ─── Helpers ─────────────────────────────────────────────────
function formatSalary(salary) {
  if (!salary?.min && !salary?.max) return null;
  const fmt = (n) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  };
  if (salary.min && salary.max) return `${fmt(salary.min)} – ${fmt(salary.max)}`;
  if (salary.min) return `From ${fmt(salary.min)}`;
  return `Up to ${fmt(salary.max)}`;
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// ─── Sub-components ──────────────────────────────────────────
const PinIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const GradIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

function Tag({ icon, label }) {
  return (
    <span
      className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-2.5 py-1 rounded-lg"
      style={{ color: C.secondary, background: C.accent, border: `1px solid ${C.border}` }}
    >
      {icon} {label}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function JobCard({ job }) {
  const router = useRouter();
  const badge  = TYPE_BADGE[job.JobType] ?? { bg: "#f8fafc", text: "#1e293b", border: "#cbd5e1" };
  const salary = formatSalary(job.Salary);

  return (
    <div
      onClick={() => router.push(`/careers/${job.slug}`)}
      className="group bg-white flex flex-col overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        borderRadius: "16px",
        border: `1px solid ${C.border}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.primary;
        e.currentTarget.style.boxShadow   = `0 8px 32px rgba(234,179,8,0.13)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.boxShadow   = "none";
      }}
    >

      {/* ── Stripe ─────────────────────────── */}
      <div
        className="h-[3px] w-full transition-colors duration-200"
        style={{ background: C.secondaryDark }}
        ref={(el) => {
          if (!el) return;
          const card = el.parentElement;
          card.addEventListener("mouseenter", () => { el.style.background = C.primary; });
          card.addEventListener("mouseleave", () => { el.style.background = C.secondaryDark; });
        }}
      />

      {/* ── Body ───────────────────────────── */}
      <div className="px-[18px] pt-[18px] pb-0 flex flex-col flex-1">

        {/* Top row */}
        <div className="flex items-center justify-between mb-3.5">
          <span
            className="text-[10px] font-bold uppercase tracking-[.06em] px-2.5 py-[4px] rounded-full"
            style={{
              background:   badge.bg,
              color:        badge.text,
              border:       `1px solid ${badge.border}`,
            }}
          >
            {job.JobType}
          </span>

          {job.TotalVacancies > 0 && (
            <div className="flex items-center gap-[5px]">
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: C.primary }}
              />
              <span
                className="text-[11px] font-semibold"
                style={{ color: C.secondary }}
              >
                {job.TotalVacancies} opening{job.TotalVacancies > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-[15px] font-extrabold leading-snug mb-2 transition-colors duration-200 group-hover:text-[#eab308]"
          style={{ color: C.secondaryDark }}
        >
          {job.JobTitle}
        </h3>

        {/* Posted */}
        <p
          className="text-[10.5px] font-medium mb-3"
          style={{ color: C.textSecondary }}
        >
          Posted {timeAgo(job.createdAt)}
        </p>

        {/* Description */}
        <p
          className="text-[12.5px] leading-relaxed line-clamp-2 mb-4 flex-1"
          style={{ color: C.textSecondary }}
        >
          {job.jobDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.Location && <Tag icon={<PinIcon />} label={job.Location} />}
          {job.Qualification && <Tag icon={<GradIcon />} label={job.Qualification} />}
        </div>

      </div>

      {/* ── Divider ────────────────────────── */}
      <div
        className="mx-[18px]"
        style={{ height: "1px", background: C.accentDark }}
      />

      {/* ── Footer ─────────────────────────── */}
      <div className="px-[18px] py-[14px] flex items-center justify-between gap-3">

        {/* Salary */}
        <div>
          {salary ? (
            <>
              <p
                className="text-[9px] font-bold uppercase tracking-[.14em] mb-[3px]"
                style={{ color: C.textSecondary }}
              >
                Salary
              </p>
              <p
                className="text-[14px] font-extrabold leading-none"
                style={{ color: C.secondaryDark }}
              >
                {salary}
              </p>
            </>
          ) : (
            <p className="text-[11px] italic" style={{ color: C.textSecondary }}>
              Negotiable
            </p>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/careers/${job.slug}`); }}
          className="flex-shrink-0 text-[11.5px] font-extrabold px-4 py-2 rounded-[10px] transition-all duration-200"
          style={{ background: C.secondaryDark, color: C.primary, border: "none" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.primary;
            e.currentTarget.style.color      = C.secondaryDark;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.secondaryDark;
            e.currentTarget.style.color      = C.primary;
          }}
        >
          View Details →
        </button>

      </div>
    </div>
  );
}