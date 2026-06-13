import React from "react";

export const TestimonialCardSkeleton = () => {
  return (
    <div className="relative md:flex-1 rounded-3xl border border-gray-200 p-8 flex flex-col justify-between min-h-[400px] overflow-hidden bg-gray-100">
      {/* Quote Icon Placeholder */}
      <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-200 rounded-2xl animate-pulse mb-8" />

      {/* Testimonial Text Placeholder */}
      <div className="flex-1 space-y-4 w-full mt-4">
        <div className="h-6 md:h-8 w-full bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-6 md:h-8 w-11/12 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-6 md:h-8 w-4/5 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Bottom Row: User Info & Controls */}
      <div className="flex items-center justify-between mt-10">
        {/* User Info Placeholder */}
        <div className="flex items-center gap-4 px-2 py-2 w-1/2 h-16 bg-gray-200 rounded-full animate-pulse">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-200 shrink-0"></div>
          <div className="h-4 w-24 md:w-32 bg-gray-200 rounded-md"></div>
        </div>

        {/* Carousel Arrows Placeholder */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-200 animate-pulse"></div>
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialFormSkeleton = () => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 p-4 flex-1 bg-gray-100">
      {/* Header */}
      <div className="mb-4">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Avatar upload */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Name + Rating */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <div className="h-3 w-12 bg-gray-200 mb-2 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="h-3 w-12 bg-gray-200 mb-2 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Role */}
      <div className="mb-4">
        <div className="h-3 w-24 bg-gray-200 mb-2 animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="h-px bg-gray-200 my-5" />

      {/* Message */}
      <div className="mb-5">
        <div className="h-3 w-20 bg-gray-200 mb-2 animate-pulse"></div>
        <div className="h-28 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Submit Button */}
      <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
};

export const TestimonialSectionSkeleton = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4 pt-8 w-full">
      <TestimonialCardSkeleton />
      <TestimonialFormSkeleton />
    </section>
  );
};