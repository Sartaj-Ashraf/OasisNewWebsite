"use client";
import { useRouter } from "next/navigation";

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);
const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const PersonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const TYPE_CONFIG = {
  "Full-Time":  { color: "#10b981", bg: "#f0fdf4" },
  "Part-Time":  { color: "#0ea5e9", bg: "#f0f9ff" },
  "Contract":   { color: "#c8963e", bg: "#fffbeb" },
  "Internship": { color: "#8b5cf6", bg: "#f5f3ff" },
  "Remote":     { color: "#ef4444", bg: "#fff1f2" },
};

export default function JobCard({ job }) {
  const router = useRouter();
  const cfg = TYPE_CONFIG[job.type] || { color: "#6b7280", bg: "#f9fafb" };

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
            {job.type}
          </span>
          <div
            className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-white transition-all duration-200"
            style={{ "--hover-bg": cfg.color }}
          >
            <ArrowIcon />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-extrabold text-[#1a2e44] leading-snug mb-1">
          {job.title}
        </h3>
        {job.vacancies > 0 && (
          <p className="text-[11px] text-gray-400 mb-3">
            {job.vacancies} opening{job.vacancies > 1 ? "s" : ""}
          </p>
        )}

        {/* Description */}
        <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-1">
          {job.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.location && (
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
              <PinIcon /> {job.location}
            </span>
          )}
          {job.qualification && (
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
              <PersonIcon /> {job.qualification}
            </span>
          )}
        </div>

        <div className="h-px bg-gray-50 mb-3.5" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            {job.salary ? (
              <>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">Salary</p>
                <p className="text-[13px] font-extrabold text-[#1a2e44]">{job.salary}</p>
              </>
            ) : (
              <p className="text-[12px] text-gray-300">Negotiable</p>
            )}
          </div>
          <button
            onClick={() => router.push(`/careers/${job.slug}`)}
            className="text-[11.5px] font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: cfg.color + "18", color: cfg.color }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}