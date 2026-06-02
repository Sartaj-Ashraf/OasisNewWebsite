"use client";
import { useState } from "react";
import JobCard from "./JobCard";
import { DUMMY_JOBS } from "./dummydata";

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10"/>
  </svg>
);

const JOB_TYPES = [...new Set(DUMMY_JOBS.map((j) => j.type))];
const LOCATIONS = [...new Set(DUMMY_JOBS.map((j) => j.location))];

export default function CareersBody() {
  const [search, setSearch]   = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");

  const filtered = DUMMY_JOBS.filter((job) => {
    const q = search.toLowerCase();
    return (
      (!q || job.title.toLowerCase().includes(q) || job.description.toLowerCase().includes(q)) &&
      (!jobType  || job.type     === jobType) &&
      (!location || job.location === location)
    );
  });

  const hasFilters = search || jobType || location;
  const clearAll = () => { setSearch(""); setJobType(""); setLocation(""); };

  return (
    <section>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search roles, skills, keywords…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#c8963e] focus:ring-2 focus:ring-[#c8963e]/10 transition-all"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            {[
              { val: jobType,  set: setJobType,   opts: JOB_TYPES, ph: "Job Type" },
              { val: location, set: setLocation,  opts: LOCATIONS, ph: "Location" },
            ].map(({ val, set, opts, ph }) => (
              <div key={ph} className="relative">
                <select
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-9 py-2.5 text-[13px] text-gray-600 focus:outline-none focus:border-[#c8963e] focus:ring-2 focus:ring-[#c8963e]/10 transition-all cursor-pointer"
                >
                  <option value="">{ph}</option>
                  {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronDown />
                </div>
              </div>
            ))}

            {hasFilters && (
              <button
                onClick={clearAll}
                className="px-4 py-2.5 rounded-xl text-[12px] font-semibold text-gray-400 hover:text-[#c8963e] bg-gray-50 hover:bg-amber-50 border border-gray-100 hover:border-[#c8963e]/30 transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-[12.5px] text-gray-400 mb-5">
        <span className="text-gray-800 font-semibold">{filtered.length}</span>{" "}
        position{filtered.length !== 1 ? "s" : ""} available
        {hasFilters && <span className="text-[#c8963e]"> · filtered</span>}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[14px] font-semibold text-gray-600 mb-1">No positions found</p>
          <p className="text-[12px] text-gray-400 mb-4">Try adjusting your filters.</p>
          <button onClick={clearAll} className="text-[12px] font-semibold text-[#c8963e] hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* CTA Banner */}
      <div className="mt-16 relative bg-[#1a2e44] rounded-2xl overflow-hidden p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#c8963e]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative">
          <h3 className="text-[18px] font-bold text-white mb-1.5">Don&apos;t see a fit?</h3>
          <p className="text-white/40 text-[13px] max-w-sm">
            We&apos;re always looking for talented people. Send your CV and we&apos;ll reach out when the right role opens.
          </p>
        </div>
        
         <a  href="mailto:careers@oasisascend.in"
          className="relative flex-shrink-0 inline-flex items-center gap-2 bg-[#c8963e] hover:bg-[#b8842e] text-white text-[13px] font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Send Open Application <ArrowIcon />
        </a>
      </div>

    </section>
  );
}