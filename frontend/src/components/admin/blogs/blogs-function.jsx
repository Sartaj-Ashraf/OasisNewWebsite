import {
  Plus, Trash2, ChevronUp, ChevronDown,
  CheckCircle, AlertCircle, GripVertical, FileText, X
} from "lucide-react";
const HEADING_STYLE = {
  h1: "text-2xl! font-extrabold tracking-tight text-stone-900",
  h2: "text-3xl! font-bold tracking-tight text-stone-900",
  h3: "text-2xl! font-bold text-stone-900",
  h4: "text-xl! font-semibold text-stone-800",
  h5: "text-lg! font-semibold text-stone-800",
  h6: "text-sm! font-bold uppercase tracking-widest text-stone-600",
};
export function makeSlug(text) {
  return text
    .toString().toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function countWords(blocks) {
  return blocks.reduce((acc, b) => {
    if (b.type === "image") return acc;
    const text = Array.isArray(b.content) ? b.content.join(" ") : String(b.content || "");
    return acc + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}
export function AutoTextarea({ value, onChange, placeholder, className, minRows = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      placeholder={placeholder}
      rows={minRows}
      onChange={e => onChange(e.target.value)}
      className={`w-full bg-transparent outline-none resize-none leading-relaxed ${className}`}
      style={{ overflow: "hidden" }}
    />
  );
}

export function HeadingBlock({ block, onChange }) {
  const cfg = BLOCK_TYPES.find(b => b.type === block.type);
  return (
    <AutoTextarea
      value={block.content}
      onChange={v => onChange({ content: v })}
      placeholder={cfg?.placeholder}
      className={`${HEADING_STYLE[block.type]} placeholder-stone-300 font-serif`}
    />
  );
}

export function ParagraphBlock({ block, onChange }) {
  return (
    <AutoTextarea
      value={block.content}
      onChange={v => onChange({ content: v })}
      placeholder="Start writing your paragraph…"
      minRows={3}
      className="text-base text-stone-700 placeholder-stone-300 leading-[1.8]"
    />
  );
}

export function QuoteBlock({ block, onChange }) {
  return (
    <div className="relative pl-5">
      <div className="absolute left-0 top-0 bottom-0 w-0.75 rounded-full bg-rose-400" />
      <AutoTextarea
        value={block.content}
        onChange={v => onChange({ content: v })}
        placeholder="Add a meaningful quote…"
        minRows={2}
        className="text-lg italic text-stone-600 placeholder-stone-300 font-serif"
      />
    </div>
  );
}

export function ListBlock({ block, onChange }) {
  const items = Array.isArray(block.content) ? block.content : [""];
  const inputRefs = useRef([]);

  const update = (idx, val) => {
    const next = [...items]; next[idx] = val; onChange({ content: next });
  };
  const addItem = (afterIdx) => {
    const next = [...items.slice(0, afterIdx + 1), "", ...items.slice(afterIdx + 1)];
    onChange({ content: next });
    setTimeout(() => inputRefs.current[afterIdx + 1]?.focus(), 30);
  };
  const removeItem = (idx) => {
    if (items.length === 1) return;
    const next = items.filter((_, i) => i !== idx);
    onChange({ content: next });
    setTimeout(() => inputRefs.current[Math.max(0, idx - 1)]?.focus(), 30);
  };
  const handleKey = (e, idx) => {
    if (e.key === "Enter") { e.preventDefault(); addItem(idx); }
    if (e.key === "Backspace" && items[idx] === "" && items.length > 1) {
      e.preventDefault(); removeItem(idx);
    }
  };

  return (
    <div className="space-y-1.5">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2.5 group">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
          <input
            ref={el => (inputRefs.current[idx] = el)}
            value={item}
            placeholder={`Item ${idx + 1}…`}
            onChange={e => update(idx, e.target.value)}
            onKeyDown={e => handleKey(e, idx)}
            className="flex-1 bg-transparent outline-none text-base text-stone-700 placeholder-stone-300"
          />
          {items.length > 1 && (
            <button
              onClick={() => removeItem(idx)}
              className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all"
            >
              <X size={13} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addItem(items.length - 1)}
        className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-rose-500 mt-2 transition-colors"
      >
        <Plus size={12} /> Add item
      </button>
    </div>
  );
}

export function ImageBlock({ block, onChange }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = file => {
    if (!file || !file.type.startsWith("image/")) return;
    onChange({ _file: file, _preview: URL.createObjectURL(file), content: `FILE_${block.id}` });
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => !block._preview && inputRef.current?.click()}
        className={`relative rounded-xl overflow-hidden border-2 transition-all ${dragging
            ? "border-rose-400 bg-rose-50"
            : block._preview
              ? "border-stone-200"
              : "border-dashed border-stone-200 hover:border-rose-300 cursor-pointer bg-stone-50"
          }`}
        style={{ minHeight: block._preview ? "auto" : 180 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFile(e.target.files[0])}
        />
        {block._preview ? (
          <>
            <img src={block._preview} alt={block.meta?.alt || ""} className="w-full max-h-[420px] object-contain bg-stone-50" />
            <button
              onClick={e => { e.stopPropagation(); onChange({ _file: null, _preview: null, content: "" }); }}
              className="absolute top-3 right-3 bg-white/90 text-red-400 hover:bg-red-50 p-1.5 rounded-lg shadow-sm border border-red-100 transition-all"
            >
              <Trash2 size={13} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
              className="absolute top-3 right-12 bg-white/90 text-stone-500 hover:bg-stone-50 p-1.5 rounded-lg shadow-sm border border-stone-200 transition-all text-xs font-medium px-3"
            >
              Replace
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-400">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
              <Image size={20} className="text-stone-400" />
            </div>
            <p className="text-sm font-medium">Drop image or click to upload</p>
            <p className="text-xs text-stone-300">PNG, JPG, WEBP accepted</p>
          </div>
        )}
      </div>
      {/* Meta fields */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <input
            value={block.meta?.alt || ""}
            placeholder="Alt text…"
            onChange={e => onChange({ meta: { ...block.meta, alt: e.target.value } })}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-600 placeholder-stone-300 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all bg-white"
          />
        </div>
        <div className="relative">
          <input
            value={block.meta?.caption || ""}
            placeholder="Caption…"
            onChange={e => onChange({ meta: { ...block.meta, caption: e.target.value } })}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-600 placeholder-stone-300 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all bg-white"
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   BLOCK WRAPPER
───────────────────────────────────────────────────────── */
export function BlockWrapper({ block, index, total, onUpdate, onRemove, onMove }) {
  const cfg = BLOCK_TYPES.find(b => b.type === block.type);
  const Icon = cfg?.Icon || FileText;

  const renderContent = () => {
    if (block.type.startsWith("h")) return <HeadingBlock block={block} onChange={onUpdate} />;
    if (block.type === "p") return <ParagraphBlock block={block} onChange={onUpdate} />;
    if (block.type === "quote") return <QuoteBlock block={block} onChange={onUpdate} />;
    if (block.type === "list") return <ListBlock block={block} onChange={onUpdate} />;
    if (block.type === "image") return <ImageBlock block={block} onChange={onUpdate} />;
    return null;
  };

  return (
    <div className="group relative flex gap-3 py-0.5">
      {/* Side controls */}
      <div className="flex flex-col items-center gap-0.5 pt-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-5">
        <button
          disabled={index === 0}
          onClick={() => onMove(-1)}
          className="p-0.5 rounded text-stone-300 hover:text-stone-600 disabled:opacity-0 transition-colors"
        >
          <ChevronUp size={13} />
        </button>
        <GripVertical size={13} className="text-stone-300 cursor-grab my-0.5" />
        <button
          disabled={index === total - 1}
          onClick={() => onMove(1)}
          className="p-0.5 rounded text-stone-300 hover:text-stone-600 disabled:opacity-0 transition-colors"
        >
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Block card */}
      <div className="flex-1 min-w-0 bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 hover:shadow-sm transition-all">
        {/* Block header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            <Icon size={10} strokeWidth={2.5} />
            {cfg?.label}
          </div>
          <div className="flex-1 h-px bg-stone-100" />
          <button
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <Trash2 size={11} /> Remove
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   BLOCK PALETTE
───────────────────────────────────────────────────────── */
export function BlockPalette({ onAdd }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const groups = [
    { key: "heading", label: "Headings" },
    { key: "content", label: "Content" },
    { key: "media", label: "Media" },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${open
            ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100"
            : "bg-white border-stone-200 text-stone-600 hover:border-rose-300 hover:text-rose-500 shadow-sm"
          }`}
      >
        <Plus size={15} className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`} />
        Add Block
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-stone-150 rounded-2xl shadow-xl shadow-stone-100 z-50 p-3 w-80">
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-stone-150 rotate-45" />
          {groups.map(({ key, label }) => (
            <div key={key} className="mb-3 last:mb-0">
              <p className="text-[10px]! font-bold text-stone-400 uppercase tracking-widest px-1 mb-1.5">{label}</p>
              <div className="grid grid-cols-3 gap-1">
                {BLOCK_TYPES.filter(b => b.group === key).map(bt => (
                  <button
                    key={bt.type}
                    onClick={() => { onAdd(bt.type); setOpen(false); }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-stone-500 hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                  >
                    <bt.Icon size={16} strokeWidth={1.8} />
                    <span className="text-[10px] font-semibold leading-tight text-center">{bt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────── */
export function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl z-50 text-sm font-semibold border animate-in slide-in-from-bottom-4 duration-300 ${type === "success"
          ? "bg-white border-emerald-200 text-emerald-700 shadow-emerald-50"
          : "bg-white border-red-200 text-red-600 shadow-red-50"
        }`}
    >
      {type === "success"
        ? <CheckCircle size={16} className="text-emerald-500" />
        : <AlertCircle size={16} className="text-red-500" />
      }
      {message}
      <button onClick={onDismiss} className="ml-1 opacity-40 hover:opacity-70 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   STAT CHIP
───────────────────────────────────────────────────────── */
export function StatChip({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-stone-500">
      <Icon size={12} strokeWidth={2} className="text-stone-400" />
      <span className="font-semibold text-stone-700">{value}</span>
      <span>{label}</span>
    </div>
  );
}

