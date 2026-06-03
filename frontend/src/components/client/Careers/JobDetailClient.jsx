"use client";
import Link from "next/link";
import JobDetailHeader, { TYPE_CONFIG } from "./detail/JobDetailHeader";
import JobSection from "./detail/JobSection";
import ApplySidebar from "./detail/ApplySideBar";

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
  </svg>
);

export default function JobDetailClient({ job }) {
  const cfg = TYPE_CONFIG[job.JobType] || { color: "#c8963e", bg: "rgba(200,150,62,0.10)" };

  return (
    <div className="min-h-screen bg-[#f5f6f8]">

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* Left */}
          <div className="w-full space-y-5 min-w-0">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10">
              <JobDetailHeader job={job} />
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              <JobSection
                title="Job Description"
                description={job.jobDescription}
                color={cfg.color}
              />
              <JobSection
                title="Requirements"
                description={job.requirementDescription}
                list={job.requirementList}
                color={cfg.color}
              />
              <JobSection
                title="Responsibilities"
                description={job.responsibilityDescription}
                list={job.ResponsibilitiesList}
                color={cfg.color}
                isLast
              />
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:sticky lg:top-20 lg:max-w-[380px] flex-shrink-0">
            <ApplySidebar job={job} />
          </div>

        </div>
      </div>
    </div>
  );
}