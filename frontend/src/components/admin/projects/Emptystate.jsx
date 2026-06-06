"use client";

export default function EmptyState({ search, onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <svg
          className="w-7 h-7 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>

      <p className="text-white font-semibold text-lg">No projects found</p>
      <p className="text-gray-500 text-sm mt-1 mb-5">
        {search
          ? "Try a different search term"
          : "Create your first project to get started"}
      </p>

      {!search && (
        <button
          onClick={onCreate}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-all"
        >
          Create Project
        </button>
      )}
    </div>
  );
}