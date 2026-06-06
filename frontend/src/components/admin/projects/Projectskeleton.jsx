"use client";

export default function ProjectSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="h-44 bg-white/5" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-white/5 rounded-lg w-3/4" />
            <div className="h-3 bg-white/5 rounded-lg w-full" />
            <div className="h-3 bg-white/5 rounded-lg w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}