"use client";

const TILE_PATTERN = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
];

function getSpan(index) {
  return TILE_PATTERN[index % TILE_PATTERN.length];
}

function colSpanClass(n) {
  return n === 2 ? "md:col-span-2" : "md:col-span-1";
}

function rowSpanClass(n) {
  return n === 2 ? "md:row-span-2" : "md:row-span-1";
}

function minHeightClass(col, row) {
  if (col === 2 && row === 2) return "min-h-[320px]";
  if (row === 2) return "min-h-[240px]";
  return "min-h-[180px]";
}

function SkeletonCard({ spanInfo }) {
  const { colSpan, rowSpan } = spanInfo;

  const isHero = colSpan === 2 && rowSpan === 2;
  const isTall = rowSpan === 2 && colSpan === 1;

  const imgHeight = isHero
    ? "h-[300px]"
    : isTall
    ? "h-[300px]"
    : "h-[200px]";

  return (
    <div
      className="
        flex flex-col h-full overflow-hidden
        rounded-[32px]
        bg-[#ededef]
        animate-pulse
        shadow-[0_4px_32px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]
      "
    >
      {/* Image Skeleton */}
      <div className={`w-full bg-neutral-300 ${imgHeight}`} />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
        <div>
          <div
            className={`bg-neutral-300 rounded-full mb-2 ${
              isHero
                ? "h-7 w-3/4"
                : isTall
                ? "h-6 w-2/3"
                : "h-5 w-1/2"
            }`}
          />

          <div className="h-4 w-24 bg-neutral-200 rounded-full" />
        </div>

        <div className="flex gap-4">
          <div className="h-4 w-20 bg-neutral-200 rounded-full" />
          <div className="h-4 w-16 bg-neutral-200 rounded-full" />
        </div>

        <div className="h-12 w-full bg-white/80 rounded-full mt-auto" />
      </div>
    </div>
  );
}

export default function WebsiteShowCaseSkeleton() {
  const skeletonItems = Array.from({ length: 9 });

  return (
    <section className="py-12">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="h-8 w-28 rounded-full bg-neutral-200 animate-pulse mb-4" />

          <div className="h-14 w-72 bg-neutral-200 rounded-lg animate-pulse mb-3" />

          <div className="h-14 w-52 bg-neutral-200 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-72 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-60 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-neutral-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{
          gridAutoFlow: "dense",
          gridAutoRows: "minmax(160px, auto)",
        }}
      >
        {skeletonItems.map((_, index) => {
          const span = getSpan(index);

          return (
            <div
              key={index}
              className={`
                ${colSpanClass(span.colSpan)}
                ${rowSpanClass(span.rowSpan)}
                ${minHeightClass(span.colSpan, span.rowSpan)}
              `}
            >
              <SkeletonCard spanInfo={span} />
            </div>
          );
        })}
      </div>
    </section>
  );
}