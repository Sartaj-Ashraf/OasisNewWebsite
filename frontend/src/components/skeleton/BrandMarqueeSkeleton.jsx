export const BrandMarqueeSkeleton = () => {
  // Array to generate enough skeleton items to fill the screen horizontally
  const skeletonItems = Array.from({ length: 8 });

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto">
        {/* Title Skeleton - Lighter background */}
        <div className="flex justify-center mb-14">
          <div className="h-10 md:h-14 w-3/4 max-w-lg bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* 3 Rows Skeleton */}
        <div className="space-y-10">
          {[1, 2, 3].map((row) => (
            <div key={row} className="overflow-hidden flex gap-12 w-max">
              {skeletonItems.map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-w-[180px] md:min-w-[240px]"
                >
                  {/* Brand Image Placeholder - Lighter background */}
                  <div className="h-12 md:h-16 w-32 md:w-40 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};