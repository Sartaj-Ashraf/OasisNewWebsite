"use client";

export default function StatsBar({ total, active, inactive }) {
  const stats = [
    {
      label: "Total Projects",
      value: total,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Active",
      value: active,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Inactive",
      value: inactive,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="
            bg-white
            border border-gray-200
            rounded-2xl
            p-5
            shadow-xs
            hover:shadow-sm
            transition-all
          "
        >
          <div
            className={`inline-flex px-3 py-2 rounded-xl ${s.bg}`}
          >
            <p className={`text-2xl! font-bold ${s.color}`}>
              {s.value}
            </p>
          </div>

          <p className="text-gray-500 text-sm! mt-3">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}