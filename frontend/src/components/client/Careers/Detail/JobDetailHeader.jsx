const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const DollarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);
const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const GradIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export const TYPE_CONFIG = {
  "Full-Time":  { color: "#10b981", bg: "rgba(16,185,129,0.10)",  label: "Full-Time"  },
  "Part-Time":  { color: "#0ea5e9", bg: "rgba(14,165,233,0.10)",  label: "Part-Time"  },
  "Contract":   { color: "#c8963e", bg: "rgba(200,150,62,0.10)",  label: "Contract"   },
  "Internship": { color: "#8b5cf6", bg: "rgba(139,92,246,0.10)",  label: "Internship" },
  "Remote":     { color: "#ef4444", bg: "rgba(239,68,68,0.10)",   label: "Remote"     },
};

function formatSalary(salary) {
  if (!salary?.min && !salary?.max) return "N/A";
  const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
  if (salary.min && salary.max) return `${fmt(salary.min)} – ${fmt(salary.max)}`;
  if (salary.min) return `From ${fmt(salary.min)}`;
  return `Up to ${fmt(salary.max)}`;
}

function formatWorkHours(wh) {
  if (!wh?.start || !wh?.end) return "N/A";
  return `${wh.start} – ${wh.end}`;
}

export default function JobDetailHeader({ job }) {
  const cfg    = TYPE_CONFIG[job.JobType] || { color: "#6b7280", bg: "rgba(107,114,128,0.10)", label: job.JobType };
  const salary = formatSalary(job.Salary);
  const hours  = formatWorkHours(job.WorkHours);

  return (
    <div>
      {/* Type badge */}
      <div className="mb-5">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide uppercase"
          style={{ color: cfg.color, backgroundColor: cfg.bg }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
          {cfg.label}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-[32px] md:text-[42px] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-5">
        {job.JobTitle}
      </h2>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { icon: <GradIcon />, label: job.Qualification },
          { icon: <PinIcon />,  label: job.Location      },
        ].filter(b => b.label).map(({ icon, label }) => (
          <span key={label}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
            {icon} {label}
          </span>
        ))}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: <UsersIcon />,  label: "Vacancies",  value: `${job.TotalVacancies ?? 0} open`, accent: false },
          { icon: <DollarIcon />, label: "Salary",     value: salary,                             accent: true  },
          { icon: <ClockIcon />,  label: "Work Hours", value: hours,                              accent: true  },
        ].map(({ icon, label, value, accent }) => (
          <div key={label} className="flex flex-col gap-2 rounded-2xl p-4 border border-slate-100 bg-slate-50/60">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: cfg.bg, color: cfg.color }}>
              {icon}
            </div>
            <div>
              <p className="text-[10.5px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">{label}</p>
              <p className="text-[13px] font-extrabold" style={{ color: accent ? cfg.color : "#0f172a" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}``