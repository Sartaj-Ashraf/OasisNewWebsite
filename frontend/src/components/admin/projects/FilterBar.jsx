"use client";

const FILTERS = ["all", "active", "inactive"];

export default function FilterBar({
  search,
  onSearch,
  activeFilter,
  onFilter,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="
            w-full
            bg-white
            border border-gray-200
            rounded-2xl
            pl-10 pr-4 py-3
            text-sm text-gray-900
            placeholder-gray-400
            shadow-sm
            focus:outline-none
            focus:border-amber-500
            focus:ring-4
            focus:ring-amber-100
            transition-all
          "
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilter(f)}
            className={`px-5 py-3 rounded-2xl text-sm font-medium border transition-all capitalize
              ${
                activeFilter === f
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-200"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700"
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}