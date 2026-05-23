"use client";

/* ══════════════════════════════════════════
   STATS GRID
══════════════════════════════════════════ */
export const StatsGrid = ({ stats }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
            { label: "Total Jobs",   value: stats.totalJobs,     color: "text-slate-800",   icon: "🗂" },
            { label: "Active",       value: stats.activeJobs,    color: "text-emerald-600", icon: "✓" },
            { label: "Inactive",     value: stats.inactiveJobs,  color: "text-rose-500",    icon: "✕" },
            { label: "Vacancies",    value: stats.totalVacancies, color: "text-amber-600",  icon: "👥" },
            { label: "New (30d)",    value: stats.recentJobs,    color: "text-sky-600",     icon: "🆕" },
            { label: "Job Types",    value: stats.jobsByType?.length || 0, color: "text-violet-600", icon: "🏷" },
        ].map((s) => (
            <div key={s.label}
                className="bg-white border border-slate-100 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden group cursor-default">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-300 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</div>
                    <span className="text-sm opacity-40 group-hover:opacity-70 transition-opacity">{s.icon}</span>
                </div>
                <div className={`text-3xl font-extrabold leading-none ${s.color}`}
                    style={{ fontFamily: "Syne, sans-serif" }}>{s.value}</div>
            </div>
        ))}
    </div>
);

/* ══════════════════════════════════════════
   FILTERS BAR
══════════════════════════════════════════ */
const JOB_TYPES = [
    "Full Time", "Part Time", "Internship", "Contract", "Freelance",
    "Temporary", "Remote", "Hybrid", "Volunteer", "Apprenticeship",
    "Seasonal", "Commission Based", "On-Demand", "Gig Work",
];

export const FiltersBar = ({
    searchInput, setSearchInput,
    statusFilter, setStatusFilter,
    jobTypeFilter, setJobTypeFilter,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
}) => {
    const hasActive = searchInput || statusFilter !== "all" || jobTypeFilter !== "all" || sortBy !== "createdAt";

    const reset = () => {
        setSearchInput("");
        setStatusFilter("all");
        setJobTypeFilter("all");
        setSortBy("createdAt");
        setSortOrder("desc");
    };

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-5">
            <div className="flex flex-col xl:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
                    <input
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10 rounded-xl pl-9 pr-9 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400"
                        placeholder="Search title, description, location, qualification…"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchInput && (
                        <button onClick={() => setSearchInput("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer text-sm">✕</button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2.5 items-center">
                    {/* Status tabs */}
                    <div className="flex gap-0.5 bg-slate-50 border border-slate-200 rounded-xl p-1">
                        {[
                            { val: "all",   label: "All" },
                            { val: "true",  label: "✓ Active" },
                            { val: "false", label: "✕ Inactive" },
                        ].map(({ val, label }) => (
                            <button key={val} onClick={() => setStatusFilter(val)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border-none cursor-pointer transition-all ${
                                    statusFilter === val ? "bg-white text-amber-600 shadow-sm" : "bg-transparent text-slate-500 hover:text-slate-700"
                                }`}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Job type */}
                    <select value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl px-3 py-2.5 outline-none focus:border-amber-400 cursor-pointer transition-colors">
                        <option value="all">All types</option>
                        {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>

                    {/* Sort */}
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl px-3 py-2.5 outline-none focus:border-amber-400 cursor-pointer transition-colors">
                        <option value="createdAt">Sort: Newest</option>
                        <option value="JobTitle">Sort: Title</option>
                        <option value="TotalVacancies">Sort: Vacancies</option>
                        <option value="Location">Sort: Location</option>
                    </select>

                    <button onClick={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
                        title="Toggle sort order"
                        className="w-9 h-9 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-600 cursor-pointer hover:border-amber-400 hover:text-amber-600 transition-colors text-sm">
                        {sortOrder === "desc" ? "↓" : "↑"}
                    </button>

                    {/* Reset */}
                    {hasActive && (
                        <button onClick={reset}
                            className="px-3 py-2 text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 rounded-xl cursor-pointer hover:bg-rose-100 transition-colors">
                            ✕ Reset
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};