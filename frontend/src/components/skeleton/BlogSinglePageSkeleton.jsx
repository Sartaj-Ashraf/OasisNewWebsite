"use client";

export default function BlogSinglePageSkeleton() {
  return (
    <main className="container animate-pulse">
      {/* Blog Header */}
      <div className="py-12 space-y-6">
        <div className="h-4 w-32 bg-gray-200 rounded" />

        <div className="h-12 w-3/4 bg-gray-200 rounded-lg" />

        <div className="flex gap-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        <div className="h-[350px] w-full bg-gray-200 rounded-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Main Content */}
        <div className="col-span-4">
          <div className="space-y-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-5 w-full bg-gray-200 rounded" />
                <div className="h-5 w-11/12 bg-gray-200 rounded" />
                <div className="h-5 w-10/12 bg-gray-200 rounded" />
              </div>
            ))}

            <div className="h-[300px] w-full bg-gray-200 rounded-2xl my-8" />

            {[...Array(8)].map((_, index) => (
              <div key={`bottom-${index}`} className="space-y-3">
                <div className="h-5 w-full bg-gray-200 rounded" />
                <div className="h-5 w-10/12 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-2">
          <div className="sticky top-5 py-8">
            <div className="h-8 w-40 bg-gray-200 rounded mb-6" />

            <div className="space-y-5">
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
        </div>
      </div>
    </main>
  );
}