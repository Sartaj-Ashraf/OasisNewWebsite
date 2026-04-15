"use client";

// ✅ API STYLE DATA
const statsData = [
  {
    id: 1,
    value: "+130%",
    label: "Conversion Rate Increased",
    color: "text-teal-400",
  },
  {
    id: 2,
    value: "+150K",
    label: "Monthly Active Users",
    color: "text-purple-400",
  },
  {
    id: 3,
    value: "+15K",
    label: "Active Followers",
    color: "text-orange-400",
  },
];

export default function StatsSection() {
  return (
    <section className="">
      <div className="container max-w-7xl mx-auto rounded-3xl p-10 md:p-16 relative overflow-hidden text-white">

        {/* BACKGROUND GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b2b] via-[#1a0b3b] to-[#050510]" />

        {/* GLOW EFFECT */}
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-blue-500 opacity-30 blur-3xl rounded-full" />
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-purple-500 opacity-20 blur-3xl rounded-full" />

        {/* CONTENT */}
        <div className="relative grid md:grid-cols-3 gap-10">

          {statsData.map((item) => (
            <div key={item.id}>

              <div className="flex items-center gap-4 mb-4">
                <span className={`text-4xl ${item.color}`}>↗</span>
                <h2 className="font-medium">{item.value}</h2>
              </div>

              <p className="!text-lg text-gray-300">
                {item.label}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}