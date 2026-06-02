const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SECTION_META = {
  "Job Description": {
    emoji: "📋",
    subtitle: "What this role is about",
  },
  "Requirements": {
    emoji: "✅",
    subtitle: "What we're looking for",
  },
  "Responsibilities": {
    emoji: "🎯",
    subtitle: "What you'll be doing",
  },
};

function CheckList({ items, color }) {
  return (
    <div className="grid gap-2.5 mt-5">
      {items.map((item, i) => (
        <div
          key={i}
          className="group flex items-start gap-3.5 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-5 py-4 transition-all duration-200"
        >
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <CheckIcon />
          </div>
          <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function JobSection({ title, description, list, color, isLast = false }) {
  const meta = SECTION_META[title] || { emoji: "•", subtitle: "Details" };

  return (
    <div className={`px-6 py-4 ${!isLast ? "border-b border-slate-100" : ""}`}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-[18px] flex-shrink-0"
          style={{ backgroundColor: `${color}12` }}
        >
          {meta.emoji}
        </div>
        <div>
          <h3 className="text-[17px] font-medium text-slate-900 leading-tight">{title}</h3>
          <p className="text-[11.5px] text-slate-400 font-medium mt-0.5">{meta.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-[13.5px] text-slate-500 leading-relaxed max-w-3xl">
          {description}
        </p>
      )}

      {/* Checklist */}
      {list?.length > 0 && <CheckList items={list} color={color} />}
    </div>
  );
}