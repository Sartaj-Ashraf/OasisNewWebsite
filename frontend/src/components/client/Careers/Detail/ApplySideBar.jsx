import ApplyForm from "./ApplyForm";
import { TYPE_CONFIG } from "./JobDetailHeader";

export default function ApplySidebar({ job }) {
  const cfg = TYPE_CONFIG[job.type] || { color: "#c8963e", bg: "rgba(200,150,62,0.10)" };

  return (
    <div className="w-full">
      <div className="relative rounded-3xl border border-slate-100 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* Colored top line */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${cfg.color}60, ${cfg.color}, ${cfg.color}60)` }}
        />

        {/* Ambient glow */}
        <div
          className="absolute -top-20 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${cfg.color}08` }}
        />

        {/* Header */}
        <div className="relative px-6 pt-6 pb-5 border-b border-slate-50">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-base"
              style={{ backgroundColor: `${cfg.color}12`, color: cfg.color }}
            >
              ✦
            </div>
            <div>
              <h4 className="text-[17px] font-extrabold text-slate-900 leading-tight">Apply for this Role</h4>
              <p className="text-[12px] text-slate-400 mt-0.5">Fill out the form below to get started</p>
            </div>
          </div>

          {/* Job pill */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
            <div
              className="w-2 h-8 rounded-full flex-shrink-0"
              style={{ backgroundColor: cfg.color }}
            />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Position</p>
              <p className="text-[13px] font-bold text-slate-800 truncate">{job.title}</p>
            </div>
            <span
              className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
              style={{ color: cfg.color, backgroundColor: `${cfg.color}12` }}
            >
              {job.type}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="relative px-6 py-6">
          <ApplyForm job={job} accentColor={cfg.color} />
        </div>

      </div>
    </div>
  );
}