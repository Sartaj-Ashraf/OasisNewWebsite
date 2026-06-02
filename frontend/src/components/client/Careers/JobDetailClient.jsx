"use client";
import JobDetailHeader, { TYPE_CONFIG } from "./Detail/JobDetailHeader";
import JobSection from "./Detail/JobSection";
import ApplySidebar from "./Detail/ApplySideBar";


export default function JobDetailClient({ job }) {
  const cfg = TYPE_CONFIG[job.type] || { color: "#c8963e", bg: "rgba(200,150,62,0.10)" };

  return (
    <div className="min-h-screen ">
      {/* Page body */}
      <div className="container mx-auto py-6 sm:py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* ── LEFT ── */}
          <div className="w-full space-y-5 min-w-0">

            {/* Header card */}
            <div className="bg-gray-50 rounded-3xl border border-slate-100 shadow-[0_2px_24px_rgba(0,0,0,0.04)] ">
              <JobDetailHeader job={job} />
            </div>

            {/* Content card */}
            <div className="space-y-6 bg-gray-50 rounded-3xl border border-slate-100 shadow-[0_2px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              <JobSection
                title="Job Description"
                description={job.description}
                color={cfg.color}
              />
              <JobSection
                title="Requirements"
                description={job.requirements}
                list={job.requirementList}
                color={cfg.color}
              />
              <JobSection
                title="Responsibilities"
                description={job.responsibilities}
                list={job.responsibilityList}
                color={cfg.color}
                isLast
              />
            </div>

          </div>

          {/* ── RIGHT (sidebar) ── */}
          {/* On mobile: renders below content naturally */}
          {/* On desktop: sticky sidebar */}
          <div className="w-full lg:sticky lg:top-10 lg:max-w-[380px] lg:w-[380px] flex-shrink-0">
            <ApplySidebar job={job} />
          </div>

        </div>
      </div>

    </div>
  );
}