"use client";

export const BlogsPageSkeleton = () => {
  return (
    <div className="bg-accent-dark font-sans py-8 animate-pulse">
      <div className="container flex lg:flex-row flex-col gap-12">
        {/* Main Content */}
        <div className="w-full lg:w-[95%] flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 gap-4 pb-4">
            <div className="h-8 w-40 bg-gray-200 rounded-md" />

            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="w-full sm:w-64 h-10 bg-gray-200 rounded-full" />

              {/* Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-white">
                <div className="h-9 w-9 bg-gray-200 rounded-md" />
                <div className="h-9 w-9 bg-gray-200 rounded-md ml-1" />
              </div>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="flex flex-col gap-12">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8"
              >
                {/* Image */}
                <div className="w-full md:w-[320px] h-[220px] bg-gray-200 rounded-2xl flex-shrink-0" />

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="h-4 w-28 bg-gray-200 rounded" />

                  <div className="h-8 w-4/5 bg-gray-200 rounded" />

                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-11/12 bg-gray-200 rounded" />
                    <div className="h-4 w-8/12 bg-gray-200 rounded" />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <div className="h-10 w-24 bg-gray-200 rounded-md" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-24 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[35%] flex flex-col gap-12">
          <div className="sticky top-5">
            <div className="flex flex-col gap-6">
              <div className="h-7 w-40 bg-gray-200 rounded" />

              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0" />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-4/5 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};