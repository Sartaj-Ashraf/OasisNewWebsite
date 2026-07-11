import React from "react";

export const BlogCardSkeleton = () => {
  return (
    <div className="relative bg-gray-300 w-full h-fit md:h-[290px] flex flex-col gap-8 rounded-3xl pl-8 pr-2 py-8">
    
      {/* Title Placeholder (Simulating line-clamp-4) */}
      <div className="space-y-3 py-1 pr-6">
        <div className="h-5 w-full bg-gray-400 rounded-md animate-pulse" />
        <div className="h-5 w-full bg-gray-400 rounded-md animate-pulse" />
        <div className="h-5 w-3/4 bg-gray-400 rounded-md animate-pulse" />
      </div>

      {/* Bottom Bar / Date Placeholder */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
        <div className="h-3 w-24 bg-gray-400 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export const BlogSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 h-full lg:max-h-[500px] bg-gray-200 rounded-3xl">
      {/* H2 Title Placeholder - assuming text on light gray is black */}
      <div className="h-8 w-48 bg-gray-100 rounded-md animate-pulse mb-2" />

      {/* Grid rendering exactly 3 skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <BlogCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};