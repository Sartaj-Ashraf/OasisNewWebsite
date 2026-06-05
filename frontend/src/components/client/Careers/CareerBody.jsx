"use client";
import { useState, useEffect, useCallback } from "react";
import JobCard from "./JobCard";
import { getAllCareers, getCareerFilters } from "@/services/careers.service";
import { Button } from "@/shared/ClickAble";

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
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
        <div className="w-7 h-7 bg-slate-100 rounded-full" />
      </div>
      <div className="h-4 w-3/4 bg-slate-100 rounded-lg mb-2" />
      <div className="h-3 w-1/4 bg-slate-50 rounded-lg mb-4" />
      <div className="h-3 w-full bg-slate-50 rounded-lg mb-1.5" />
      <div className="h-3 w-5/6 bg-slate-50 rounded-lg mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-slate-50 rounded-lg" />
        <div className="h-6 w-20 bg-slate-50 rounded-lg" />
      </div>
      <div className="h-px bg-slate-50 mb-3" />
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-slate-100 rounded-lg" />
        <div className="h-7 w-24 bg-slate-50 rounded-xl" />
      </div>
    </div>
  );
}

export default function CareersBody() {
  const [jobs, setJobs]         = useState([]);
  const [filters, setFilters]   = useState({ jobTypes: [], locations: [], qualifications: [] });
  const [search, setSearch]     = useState("");
  const [jobType, setJobType]   = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Fetch filter options once
  useEffect(() => {
    getCareerFilters()
      .then((res) => {
        if (res.data?.success) setFilters(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to load filters:", err);
      });
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search)   params.search   = search;
      if (jobType)  params.JobType  = jobType;
      if (location) params.Location = location;

      const res = await getAllCareers(params);

      if (res.data?.success) {
        setJobs(res.data.data);
      } else {
        setError("Failed to load positions.");
      }
    } catch (err) {
      console.error("Careers fetch error:", err);
      setError(
        err?.response?.data?.message || "Failed to load positions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [search, jobType, location]);

  // Debounce search, instant for dropdowns
  useEffect(() => {
    const delay = search ? 400 : 0;
    const timer = setTimeout(fetchJobs, delay);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const hasFilters = search || jobType
   || location;


  const clearAll   = () => { setSearch(""); setJobType(""); setLocation(""); };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12" id="positions">

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3">

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

          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            {[
              { val: jobType,  set: setJobType,  opts: filters.jobTypes,  ph: "Job Type" },
              { val: location, set: setLocation, opts: filters.locations, ph: "Location"  },
            ].map(({ val, set, opts, ph }) => (
              <div key={ph} className="relative">
                <select
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-9 py-2.5 text-[13px] text-gray-600 focus:outline-none focus:border-[#c8963e] focus:ring-2 focus:ring-[#c8963e]/10 transition-all cursor-pointer min-w-[120px]"
                >
                  <option value="">{ph}</option>
                  {opts?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronDown />
                </div>
              </div>
            ))}

            {hasFilters && (
              <button
                onClick={clearAll}
                className="px-4 py-2.5 rounded-xl text-[12px] font-semibold text-gray-400 hover:text-[#c8963e] bg-gray-50 hover:bg-amber-50 border border-gray-100 hover:border-[#c8963e]/30 transition-all whitespace-nowrap"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p className="text-[12.5px] text-gray-400 mb-5">
          <span className="text-gray-800 font-semibold">{jobs.length}</span>{" "}
          position{jobs.length !== 1 ? "s" : ""} available
          {hasFilters && <span className="text-[#c8963e]"> · filtered</span>}
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 mb-6 flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[13px] text-red-500 font-medium">{error}</p>
          <button
            onClick={fetchJobs}
            className="ml-auto text-[12px] text-red-400 hover:text-red-600 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-24">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
          <p className="text-[14px] font-semibold text-gray-600 mb-1">No positions found</p>
          <p className="text-[12px] text-gray-400 mb-4">Try adjusting your filters or search terms.</p>
          {hasFilters && (
            <button onClick={clearAll} className="text-[12px] font-semibold text-[#c8963e] hover:underline">
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

      {/* CTA Banner */}
      {!loading && (
        <div className="mt-16 relative bg-secondary-dark rounded-2xl overflow-hidden p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#c8963e]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="relative">
            <h3 className="text-[18px] font-bold text-white mb-1.5">Don&apos;t see a fit?</h3>
            <p className="text-white/40 text-[13px] max-w-sm">
              We&apos;re always looking for talented people. Send your CV and we&apos;ll reach out when the right role opens.
            </p>
          </div>
          
          <Button
            onClick={() => window.location.href = "mailto:careers@oasisascend.in"}
            className="button mb-1 bg-linear-to-br from-primary via-primary to-primary-dark hover:primary-dark hover:via-primary hover:to-primary disabled:opacity-70"  
          >
            Send Open Application 
          </Button>
        </div>
      )}

    </section>
  );
}