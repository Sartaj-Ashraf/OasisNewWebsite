export default function OurStory() {
  const timeline = [
    {
      year: "2019",
      title: "Project Idea",
      desc: "Maecenas elementum sapien in metus placerat finibus.",
      side: "right",
      accent: "#22c55e",
      num: "01",
    },
    {
      year: "2021",
      title: "Business Conception",
      desc: "Maecenas elementum sapien in metus placerat finibus.",
      side: "left",
      accent: "#f97316",
      num: "02",
    },
    {
      year: "2022",
      title: "Infrastructure Design",
      desc: "Maecenas elementum sapien in metus placerat finibus.",
      side: "left",
      accent: "#ec4899",
      num: "03",
    },
    {
      year: "2023",
      title: "Company Established",
      desc: "Maecenas elementum sapien in metus placerat finibus.",
      side: "right",
      accent: "#06b6d4",
      num: "04",
    },
    {
      year: "2024",
      title: "Legal Review",
      desc: "Maecenas elementum sapien in metus placerat finibus.",
      side: "right",
      accent: "#6366f1",
      num: "05",
    },
  ];

  return (
    <section className=" ">
      <div className="container mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-semibold mb-4">
            Our Story
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight">
            The Story of Ewebot
          </h2>
          <div className="w-8 h-[1.5px] bg-gray-300 mx-auto my-6" />
          <p className="text-gray-400 text-[13.5px] max-w-xs mx-auto leading-relaxed">
            Ne summo dictas pertinacia nam. Illum cetero vocent ei vim,
            case regione signiferumque vim te.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative max-w-4xl mx-auto">

          {/* CENTER LINE */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[1px] bg-gray-200" />

          <div className="space-y-14">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-center">

                {/* LEFT */}
                <div className="w-1/2 pr-12 flex justify-end">
                  {item.side === "left" ? (
                    <TimelineCard item={item} align="right" />
                  ) : (
                    <GhostYear item={item} align="right" />
                  )}
                </div>

                {/* DOT */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-2.5 h-2.5 rounded-full ring-[3px] ring-[#f9f9f7]"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>

                {/* RIGHT */}
                <div className="w-1/2 pl-12 flex justify-start">
                  {item.side === "right" ? (
                    <TimelineCard item={item} align="left" />
                  ) : (
                    <GhostYear item={item} align="left" />
                  )}
                </div>

              </div>
            ))}
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
      {/* Colored left/right border accent */}
      <div
        className={`absolute top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        style={{ backgroundColor: item.accent }}
      />

      {/* Step + Year row */}
      <div className={`flex items-center gap-2 mb-3 ${align === "right" ? "justify-end" : "justify-start"}`}>
        <span
          className="text-[9px] font-bold tracking-[0.18em] uppercase"
          style={{ color: item.accent, opacity: 0.5 }}
        >
          {item.num}
        </span>
        <span className="w-3 bg-gray-200" />
        <span
          className="text-[13px] font-bold tracking-tight"
          style={{ color: item.accent }}
        >
          {item.year}
        </span>
      </div>

      {/* Title */}
      <h6 className="font-semibold text-gray-800  leading-snug mb-1.5">
        {item.title}
      </h6>

      {/* Desc */}
      <p className= "text-gray-400">
        {item.desc}
      </p>
    </div>
  );
}

function GhostYear({ item, align }) {
  return (
    <div className={`${align === "right" ? "text-right" : "text-left"} px-1`}>
      <span
        className="text-[11px] font-semibold tracking-[0.12em]"
        style={{ color: item.accent, opacity: 0.25 }}
      >
        {item.year}
      </span>
    </div>
  );
}