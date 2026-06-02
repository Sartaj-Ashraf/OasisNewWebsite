"use client";
import { useRouter } from "next/navigation";

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10"/>
  </svg>
);
const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const PersonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);

// Keys match your Mongoose enum EXACTLY (spaces, not hyphens)
const TYPE_CONFIG = {
  "Full Time":        { color: "#10b981", bg: "rgba(16,185,129,0.10)"  },
  "Part Time":        { color: "#0ea5e9", bg: "rgba(14,165,233,0.10)"  },
  "Contract":         { color: "#c8963e", bg: "rgba(200,150,62,0.10)"  },
  "Internship":       { color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
  "Remote":           { color: "#ef4444", bg: "rgba(239,68,68,0.10)"   },
  "Freelance":        { color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  "Hybrid":           { color: "#06b6d4", bg: "rgba(6,182,212,0.10)"   },
  "Temporary":        { color: "#84cc16", bg: "rgba(132,204,22,0.10)"  },
  "Volunteer":        { color: "#ec4899", bg: "rgba(236,72,153,0.10)"  },
  "Apprenticeship":   { color: "#6366f1", bg: "rgba(99,102,241,0.10)"  },
  "Seasonal":         { color: "#14b8a6", bg: "rgba(20,184,166,0.10)"  },
  "Commission Based": { color: "#f97316", bg: "rgba(249,115,22,0.10)"  },
  "On-Demand":        { color: "#a855f7", bg: "rgba(168,85,247,0.10)"  },
  "Gig Work":         { color: "#64748b", bg: "rgba(100,116,139,0.10)" },
};

function formatSalary(salary) {
  if (!salary?.min && !salary?.max) return null;
  const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  if (salary.min && salary.max) return `${fmt(salary.min)} – ${fmt(salary.max)}`;
  if (salary.min) return `From ${fmt(salary.min)}`;
  return `Up to ${fmt(salary.max)}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function JobCard({ job }) {
  const router = useRouter();
  const cfg    = TYPE_CONFIG[job.JobType] || { color: "#6b7280", bg: "rgba(107,114,128,0.10)" };
  const salary = formatSalary(job.Salary);

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col">

      {/* Colored top strip */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${cfg.color}40, ${cfg.color})` }}
      />

      <div className="p-5 flex flex-col flex-1">

        {/* Badge + arrow */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-[10.5px] font-bold px-3 py-1 rounded-full"
            style={{ color: cfg.color, backgroundColor: cfg.bg }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
            {job.JobType}
          </span>
          <div className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 transition-all duration-200 group-hover:bg-[#c8963e] group-hover:border-[#c8963e] group-hover:text-white">
            <ArrowIcon />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[14.5px] font-extrabold text-[#1a2e44] group-hover:text-[#c8963e] transition-colors duration-200 leading-snug mb-1">
          {job.JobTitle}
        </h3>

        {job.TotalVacancies > 0 && (
          <p className="text-[11px] text-gray-400 mb-3">
            {job.TotalVacancies} opening{job.TotalVacancies > 1 ? "s" : ""}
          </p>
        )}

        {/* Description */}
        <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-1">
          {job.jobDescription}
        </p>

        {/* Meta tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.Location && (
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
              <PinIcon /> {job.Location}
            </span>
          )}
          {job.Qualification && (
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
              <PersonIcon /> {job.Qualification}
            </span>
          )}
        </div>

        <div className="h-px bg-gray-50 mb-3.5" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            {salary ? (
              <>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">Salary</p>
                <p className="text-[13px] font-extrabold text-[#1a2e44]">{salary}</p>
              </>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-300">
                <ClockIcon /> {formatDate(job.createdAt)}
              </span>
            )}
          </div>
          <button
            onClick={() => router.push(`/careers/${job.slug}`)}
            className="text-[11.5px] font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}
          >
            View Details →
          </button>
        </div>

      </div>
    </div>
  );
}