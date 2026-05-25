export default function OurStory() {
const timeline = [
  {
    year: "2000",
    title: "Kashmir Valley Networks",
    desc:
      "The founder began his journey by launching Kashmir Valley Networks, one of the early neighborhood-level ISPs in Kashmir.",
    accent: "#06b6d4",
    num: "01",
  },
  {
    year: "2010",
    title: "Srinagar Net Tech Pvt. Ltd.",
    desc:
      "The internet venture expanded into Srinagar Net Tech Pvt. Ltd., later growing into Jaztel, a PAN-India Category A ISP.",
    accent: "#8b5cf6",
    num: "02",
  },
  {
    year: "2025",
    title: "Oasis Ascend Founded",
    desc:
      "Oasis Ascend was officially founded as a digital marketing and technology company focused on branding, SEO, and web solutions.",
    accent: "#ec4899",
    num: "03",
  },
  {
    year: "2025",
    title: "International Expansion",
    desc:
      "The company expanded operations internationally, including hiring and business development activities in Dubai and Jammu.",
    accent: "#f97316",
    num: "04",
  },
];
  return (
    <section className="">
      <div className="container mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-semibold mb-4">
            Our Story
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight">
            The Story of Oasis Ascend
          </h2>
          <div className="w-8 h-[1.5px] bg-gray-300 mx-auto my-6" />
          <p className="text-gray-400 text-[13.5px] max-w-xs mx-auto leading-relaxed">
            From a single idea to a fully established company — the journey so far.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative max-w-4xl mx-auto">

          {/* CENTER LINE */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[1px] bg-gray-200" />

          <div className="space-y-14">
            {timeline.map((item, index) => {
              const isRight = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center">

                  {/* LEFT SIDE */}
                  <div className="w-1/2 pr-12 flex justify-end">
                    {!isRight ? (
                      <TimelineCard item={item} align="right" />
                    ) : (
                      <div className="w-[240px]" />
                    )}
                  </div>

                  {/* DOT */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="w-2.5 h-2.5 rounded-full ring-[3px] ring-[#f9f9f7]"
                      style={{ backgroundColor: item.accent }}
                    />
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="w-1/2 pl-12 flex justify-start">
                    {isRight ? (
                      <TimelineCard item={item} align="left" />
                    ) : (
                      <div className="w-[240px]" />
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, align }) {
  return (
    <div
      className={`group relative bg-white rounded-xl p-5 max-w-[240px] w-full border border-gray-100 hover:border-gray-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {/* Colored border accent on hover */}
      <div
        className={`absolute top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        style={{ backgroundColor: item.accent }}
      />

      {/* Step + Year row */}
      <div
        className={`flex items-center gap-2 mb-3 ${
          align === "right" ? "justify-end" : "justify-start"
        }`}
      >
        <span
          className="text-[9px] font-bold tracking-[0.18em] uppercase"
          style={{ color: item.accent, opacity: 0.5 }}
        >
          {item.num}
        </span>
        <span className="w-3 h-[1px] bg-gray-200 inline-block" />
        <span
          className="text-[13px] font-bold tracking-tight"
          style={{ color: item.accent }}
        >
          {item.year}
        </span>
      </div>

      {/* Title */}
      <h6 className="font-semibold text-gray-800 leading-snug mb-1.5">
        {item.title}
      </h6>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {item.desc}
      </p>
    </div>
  );
}