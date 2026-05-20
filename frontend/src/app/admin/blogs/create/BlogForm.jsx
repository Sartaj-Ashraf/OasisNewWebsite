"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  AlignLeft, Image, List, Quote, Send, EyeOff,
  Plus, Trash2, ChevronUp, ChevronDown, RotateCcw,
  CheckCircle, AlertCircle, GripVertical, FileText,
  Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  Eye, PenLine, Clock, Hash, BookOpen, X
} from "lucide-react";
import { createBlog, updateBlog } from "@/services/blogs.service";

/* ─────────────────────────────────────────────────────────
   UTILS
───────────────────────────────────────────────────────── */
function makeSlug(text) {
  return text
    .toString().toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function countWords(blocks) {
  return blocks.reduce((acc, b) => {
    if (b.type === "image") return acc;
    const text = Array.isArray(b.content) ? b.content.join(" ") : String(b.content || "");
    return acc + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

/* ─────────────────────────────────────────────────────────
   BLOCK CONFIG  — matches Mongoose enum exactly
───────────────────────────────────────────────────────── */
const BLOCK_TYPES = [
  { type: "h1", label: "Heading 1", group: "heading", Icon: Heading1, placeholder: "Heading 1…" },
  { type: "h2", label: "Heading 2", group: "heading", Icon: Heading2, placeholder: "Heading 2…" },
  { type: "h3", label: "Heading 3", group: "heading", Icon: Heading3, placeholder: "Heading 3…" },
  { type: "h4", label: "Heading 4", group: "heading", Icon: Heading4, placeholder: "Heading 4…" },
  { type: "h5", label: "Heading 5", group: "heading", Icon: Heading5, placeholder: "Heading 5…" },
  { type: "h6", label: "Heading 6", group: "heading", Icon: Heading6, placeholder: "Heading 6…" },
  { type: "p", label: "Paragraph", group: "content", Icon: AlignLeft, placeholder: "Write something…" },
  { type: "quote", label: "Blockquote", group: "content", Icon: Quote, placeholder: "Add a quote…" },
  { type: "list", label: "List", group: "content", Icon: List, placeholder: "" },
  { type: "image", label: "Image", group: "media", Icon: Image, placeholder: "" },
];

const HEADING_STYLE = {
  h1: "text-4xl! md:text-5xl! font-extrabold tracking-tight text-text-primary",
  h2: "text-3xl! font-bold tracking-tight text-text-primary border-b border-border-custom pb-2",
  h3: "text-2xl! font-bold text-text-primary",
  h4: "text-xl! font-semibold text-text-primary",
  h5: "text-lg! font-semibold text-text-secondary",
  h6: "text-xs! font-bold uppercase tracking-widest text-text-secondary/80",
};

/* ─────────────────────────────────────────────────────────
   🛠️ REUSABLE TEXTAREA COMPONENT
───────────────────────────────────────────────────────── */
function AutoTextarea({ value, onChange, placeholder, className, minRows = 1 }) {
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
      className={`w-full bg-transparent outline-none resize-none leading-relaxed text-text-primary placeholder-text-secondary/40 ${className}`}
      style={{ overflow: "hidden" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   🧱 INDIVIDUAL BLOCK COMPONENTS
───────────────────────────────────────────────────────── */
function HeadingBlock({ block, onChange }) {
  const cfg = BLOCK_TYPES.find(b => b.type === block.type);
  return (
    <AutoTextarea
      value={block.content}
      onChange={v => onChange({ content: v })}
      placeholder={cfg?.placeholder}
      className={`${HEADING_STYLE[block.type]}`}
    />
  );
}

function ParagraphBlock({ block, onChange }) {
  return (
    <AutoTextarea
      value={block.content}
      onChange={v => onChange({ content: v })}
      placeholder="Start writing your paragraph…"
      minRows={3}
      className="text-base text-text-secondary leading-[1.8]"
    />
  );
}

function QuoteBlock({ block, onChange }) {
  return (
    <div className="relative pl-5">
      {/* Accent strip updated to use your brand's Primary (Yellow/Gold) accent token */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-primary" />
      <AutoTextarea
        value={block.content}
        onChange={v => onChange({ content: v })}
        placeholder="Add a meaningful quote…"
        minRows={2}
        className="text-lg italic text-text-secondary font-serif"
      />
    </div>
  );
}

function ListBlock({ block, onChange }) {
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
          {/* Bullet points updated to use your theme's primary accent variable */}
          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          <input
            ref={el => (inputRefs.current[idx] = el)}
            value={item}
            placeholder={`Item ${idx + 1}…`}
            onChange={e => update(idx, e.target.value)}
            onKeyDown={e => handleKey(e, idx)}
            className="flex-1 bg-transparent outline-none text-base text-text-secondary placeholder-text-secondary/40"
          />
          {items.length > 1 && (
            <button
              onClick={() => removeItem(idx)}
              className="opacity-0 group-hover:opacity-100 text-text-secondary/40 hover:text-red-500 transition-all cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => addItem(items.length - 1)}
        className="flex items-center gap-1.5 text-xs text-text-secondary/60 hover:text-primary-dark mt-2 transition-colors cursor-pointer font-medium"
      >
        <Plus size={12} /> Add item
      </button>
    </div>
  );
}

function ImageBlock({ block, onChange }) {
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
            ? "border-primary bg-primary/5"
            : block._preview
              ? "border-border-custom"
              : "border-dashed border-border-custom hover:border-primary/60 cursor-pointer bg-accent"
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
            <img src={block._preview} alt={block.meta?.alt || ""} className="w-full max-h-[420px] object-contain bg-accent" />
            <button
              onClick={e => { e.stopPropagation(); onChange({ _file: null, _preview: null, content: "" }); }}
              className="absolute top-3 right-3 bg-accent-light/95 text-red-500 hover:bg-red-50 p-1.5 rounded-lg shadow-sm border border-red-100 transition-all cursor-pointer"
            >
              <Trash2 size={13} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
              className="absolute top-3 right-12 bg-accent-light/95 text-text-secondary hover:bg-accent-dark p-1.5 rounded-lg shadow-sm border border-border-custom transition-all text-xs font-medium px-3 cursor-pointer"
            >
              Replace
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-secondary/50">
            <div className="w-10 h-10 rounded-xl bg-accent-dark flex items-center justify-center">
              <Image size={20} className="text-text-secondary/60" />
            </div>
            <p className="text-sm font-medium text-text-primary/80">Drop image or click to upload</p>
            <p className="text-xs text-text-secondary/40">PNG, JPG, WEBP accepted</p>
          </div>
        )}
      </div>

      {/* Meta Input Fields styling mapped to white theme layout tokens */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <input
            value={block.meta?.alt || ""}
            placeholder="Alt text…"
            onChange={e => onChange({ meta: { ...block.meta, alt: e.target.value } })}
            className="w-full border border-border-custom rounded-lg px-3 py-2 text-xs text-text-secondary bg-accent-light placeholder-text-secondary/40 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/5 transition-all"
          />
        </div>
        <div className="relative">
          <input
            value={block.meta?.caption || ""}
            placeholder="Caption…"
            onChange={e => onChange({ meta: { ...block.meta, caption: e.target.value } })}
            className="w-full border border-border-custom rounded-lg px-3 py-2 text-xs text-text-secondary bg-accent-light placeholder-text-secondary/40 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/5 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   📦 CONTAINER & SORTABLE BLOCK WRAPPER
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
      {/* Reorder Side controls */}
      <div className="flex flex-col items-center gap-0.5 pt-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-5">
        <button
          disabled={index === 0}
          onClick={() => onMove(-1)}
          className="p-0.5 rounded text-text-secondary/30 hover:text-text-primary disabled:opacity-0 transition-colors cursor-pointer"
        >
          <ChevronUp size={13} />
        </button>
        <GripVertical size={13} className="text-text-secondary/30 cursor-grab my-0.5 hover:text-text-primary" />
        <button
          disabled={index === total - 1}
          onClick={() => onMove(1)}
          className="p-0.5 rounded text-text-secondary/30 hover:text-text-primary disabled:opacity-0 transition-colors cursor-pointer"
        >
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Main Content card styling for dynamic White Canvas UI style blocks */}
      <div className="flex-1 min-w-0 bg-accent-light border border-accent-dark rounded-2xl p-5 hover:border-border-custom hover:shadow-sm transition-all">
        {/* Block Header Information strip */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary/50 uppercase tracking-widest">
            <Icon size={10} strokeWidth={2.5} />
            {cfg?.label}
          </div>
          <div className="flex-1 h-px bg-accent-dark" />
          <button
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold text-text-secondary/50 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
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
   🧩 INTERACTIVE ACCORDION BLOCK PALETTE
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
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${open
            ? "bg-primary border-primary text-text-light shadow-md shadow-primary/20"
            : "bg-accent-light border-border-custom text-text-secondary hover:border-primary/60 hover:text-primary-dark shadow-sm"
          }`}
      >
        <Plus size={15} className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`} />
        Add Block
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-accent-light border border-border-custom rounded-2xl shadow-xl z-50 p-3 w-80 animate-in fade-in zoom-in-95 duration-150">
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-accent-light border-r border-b border-border-custom rotate-45" />
          {groups.map(({ key, label }) => (
            <div key={key} className="mb-3 last:mb-0">
              <p className="text-[10px]! font-bold text-text-secondary/40 uppercase tracking-widest px-1 mb-1.5">{label}</p>
              <div className="grid grid-cols-3 gap-1">
                {BLOCK_TYPES.filter(b => b.group === key).map(bt => (
                  <button
                    key={bt.type}
                    onClick={() => { onAdd(bt.type); setOpen(false); }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-text-secondary hover:bg-primary/5 hover:text-primary-dark transition-all border border-transparent hover:border-primary/10 cursor-pointer"
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
   🔔 GLOBAL MESSAGING TOAST
───────────────────────────────────────────────────────── */
export function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl z-50 text-sm font-semibold border animate-in slide-in-from-bottom-4 duration-300 ${type === "success"
          ? "bg-accent-light border-emerald-200 text-emerald-700 shadow-emerald-100/50"
          : "bg-accent-light border-red-200 text-red-600 shadow-red-100/50"
        }`}
    >
      {type === "success"
        ? <CheckCircle size={16} className="text-emerald-500" />
        : <AlertCircle size={16} className="text-red-500" />
      }
      {message}
      <button onClick={onDismiss} className="ml-1 opacity-40 hover:opacity-70 transition-opacity cursor-pointer">
        <X size={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   📊 REPORTING METRIC CHIPS
───────────────────────────────────────────────────────── */
export function StatChip({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
      <Icon size={12} strokeWidth={2} className="text-text-secondary/50" />
      <span className="font-semibold text-text-primary">{value}</span>
      <span>{label}</span>
    </div>
  );
}
/* ─────────────────────────────────────────────────────────
   MAIN FORM
   Props:
     initialData  — blog object (edit mode) or null (create)
     onSuccess    — callback after success (e.g. router.push)
     onCancel     — callback for cancel button
───────────────────────────────────────────────────────── */
export default function BlogForm({ initialData = null, onSuccess, onCancel }) {
  const isEdit = Boolean(initialData);

  /* ── state ── */
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [isPublished, setPublished] = useState(initialData?.isPublished || false);
  const [blocks, setBlocks] = useState(
    initialData?.content?.map(b => ({ ...b, _file: null, _preview: null })) || []
  );
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const titleRef = useRef(null);

  /* ── auto-resize title ── */
  useEffect(() => {
    if (!titleRef.current) return;
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  }, [title]);

  /* ── auto-slug ── */
  useEffect(() => {
    if (!slugLocked) setSlug(makeSlug(title));
  }, [title, slugLocked]);

  /* ── block ops ── */
  const addBlock = useCallback(type => {
    setBlocks(prev => [
      ...prev,
      { id: uid(), type, content: type === "list" ? [""] : "", meta: { alt: "", caption: "" }, _file: null, _preview: null }
    ]);
  }, []);

  const updateBlock = useCallback((id, patch) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b));
  }, []);

  const removeBlock = useCallback(id => {
    setBlocks(prev => {
      const b = prev.find(b => b.id === id);
      if (b?._preview) URL.revokeObjectURL(b._preview);
      return prev.filter(b => b.id !== id);
    });
  }, []);

  const moveBlock = useCallback((id, dir) => {
    setBlocks(prev => {
      const arr = [...prev];
      const idx = arr.findIndex(b => b.id === id);
      const next = idx + dir;
      if (next < 0 || next >= arr.length) return arr;
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  }, []);

  /* ── validation ── */
  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!slug.trim()) return "Slug is required";
    if (title.trim().length > 200) return "Title must be ≤ 200 characters";
    if (excerpt.length > 400) return "Excerpt must be ≤ 400 characters";
    if (blocks.length === 0) return "Add at least one content block";

    const empty = blocks.filter(b => {
      if (b.type === "image") return !b._preview && !b.content;
      if (b.type === "list") return !Array.isArray(b.content) || b.content.every(i => !i.trim());
      return !String(b.content || "").trim();
    });
    if (empty.length) return `${empty.length} block(s) are empty — fill or remove them`;
    return null;
  };

  /* ── submit — wired to your service ── */
  const handleSubmit = async () => {
    const err = validate();
    if (err) { setToast({ message: err, type: "error" }); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("slug", slug.trim());
      fd.append("excerpt", excerpt.trim());
      fd.append("isPublished", String(isPublished));

      if (isPublished && !initialData?.publishedAt) {
        fd.append("publishedAt", new Date().toISOString());
      }

      const serialized = blocks.map(b => {
        if (b.type === "image" && b._file) {
          fd.append(`image_block_${b.id}`, b._file);   // ← matches backend keyName
          return { id: b.id, type: b.type, content: `FILE_${b.id}`, meta: b.meta };
        }
        return { id: b.id, type: b.type, content: b.content, meta: b.meta };
      });
      fd.append("content", JSON.stringify(serialized));

      if (isEdit) {
        await updateBlog(initialData._id, fd);
      } else {
        await createBlog(fd);
      }

      setToast({ message: isEdit ? "Post updated successfully!" : "Post published!", type: "success" });
      setTimeout(() => onSuccess?.(), 1400);
    } catch (e) {
      setToast({ message: e?.response?.data?.message || e?.message || "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ── stats ── */
  const wordCount = countWords(blocks);
  const readTime = Math.max(1, Math.round(wordCount / 200));

  /* ─────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .bf-serif  { font-family: 'Fraunces', Georgia, serif; }
        .bf-sans   { font-family: 'Instrument Sans', system-ui, sans-serif; }

        .bf-root * { font-family: 'Instrument Sans', system-ui, sans-serif; }

        @keyframes bf-slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .bf-slide-up { animation: bf-slide-up 0.25s ease; }

        .bf-root ::-webkit-scrollbar       { width: 4px; }
        .bf-root ::-webkit-scrollbar-track { background: transparent; }
        .bf-root ::-webkit-scrollbar-thumb { background: #e7e5e4; border-radius: 4px; }
      `}</style>

      <div className="bf-root bf-sans min-h-screen bg-[#FAFAF8] text-stone-800 flex flex-col">

        {/* ════ TOP HEADER ════ */}
        <header className="sticky top-0 z-40 bg-accent-light/80 backdrop-blur-md border-b border-accent-dark px-6 h-[58px] flex items-center justify-between flex-shrink-0 shadow-sm shadow-accent-dark/20">
          <div className="flex items-center gap-3">
            {/* Logo block updated to match your brand's primary theme token */}
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <PenLine size={14} className="text-text-light" strokeWidth={2.5} />
            </div>

            <span className="font-sans font-semibold text-text-primary">
              {isEdit ? "Edit Post" : "New Post"}
            </span>

            {/* Dynamic Status Badges mapped to light theme styling variables */}
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${isPublished
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-accent-dark text-text-secondary border-border-custom"
              }`}>
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Live stats section */}
            <div className="hidden md:flex items-center gap-4">
              <StatChip icon={BookOpen} value={wordCount} label="words" />
              <span className="text-border-custom font-bold">·</span>
              <StatChip icon={Clock} value={`${readTime}m`} label="read" />
              <span className="text-border-custom font-bold">·</span>
              <StatChip icon={Hash} value={blocks.length} label="blocks" />
            </div>

            <div className="flex items-center gap-2">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-accent-dark transition-all cursor-pointer"
                >
                  Cancel
                </button>
              )}

              {/* Primary Call to Action Button mapped to your brand's deep theme variables */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary-dark hover:bg-secondary text-text-light text-sm font-semibold transition-all disabled:opacity-60 shadow-sm shadow-secondary-dark/10 cursor-pointer"
              >
                {loading
                  ? <RotateCcw size={13} className="animate-spin" />
                  : <Send size={13} />
                }
                {loading ? "Saving…" : isEdit ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </header>

        {/* ════ BODY ════ */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── SIDEBAR ── */}
          <aside className="w-50 shrink-0 border-r border-accent-dark overflow-y-auto bg-accent-light p-5 space-y-5">

            {/* Slug Input Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">Slug</label>
                <button
                  onClick={() => setSlugLocked(l => !l)}
                  className="text-[10px] font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer"
                >
                  {slugLocked ? "🔒 Locked" : "🔓 Auto"}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40 text-xs font-medium">/</span>
                <input
                  value={slug}
                  onChange={e => { setSlug(makeSlug(e.target.value)); setSlugLocked(true); }}
                  placeholder="auto-generated-slug"
                  className="w-full bg-accent border border-border-custom rounded-xl pl-6 pr-3 py-2 text-xs text-text-secondary font-mono placeholder-text-secondary/30 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/5 transition-all"
                />
              </div>
            </div>

            {/* Excerpt Meta Description Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50 flex items-center justify-between">
                Excerpt
                <span className={`font-normal normal-case tracking-normal ${excerpt.length > 360 ? "text-primary-dark font-medium" : "text-text-secondary/40"}`}>
                  {excerpt.length}/400
                </span>
              </label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Brief summary shown in search results and previews…"
                maxLength={400}
                rows={4}
                className="w-full bg-accent border border-border-custom rounded-xl px-3 py-2.5 text-xs text-text-secondary placeholder-text-secondary/30 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/5 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Document Stats Information Grid */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">Document</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Words", value: wordCount },
                  { label: "Blocks", value: blocks.length },
                  { label: "Read", value: `${readTime} min` },
                  { label: "Chars", value: title.length + excerpt.length },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-accent border border-accent-dark rounded-xl p-3 shadow-xs">
                    <div className="font-sans text-base font-bold text-text-primary">{value}</div>
                    <div className="text-[10px] text-text-secondary/60 font-semibold tracking-wide uppercase mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Content Outline Map */}
            {blocks.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">Outline</p>
                <div className="space-y-0.5 max-h-44 overflow-y-auto pr-1 custom-scroll">
                  {blocks.map((b, i) => {
                    const cfg = BLOCK_TYPES.find(t => t.type === b.type);
                    const Icon = cfg?.Icon || FileText;
                    const preview =
                      b.type === "image" ? "(image)"
                        : b.type === "list" ? `${(b.content || []).length} items`
                          : String(b.content || "").slice(0, 36) || "(empty)";
                    return (
                      <div key={b.id} className="flex items-center gap-2 text-[11px] text-text-secondary/60 hover:text-text-primary py-1 cursor-default transition-colors border-b border-accent-dark/40 last:border-0">
                        <span className="text-text-secondary/30 w-3.5 text-right flex-shrink-0 font-mono font-bold">{i + 1}</span>
                        <Icon size={10} className="flex-shrink-0 text-text-secondary/40" />
                        <span className="truncate font-medium">{preview}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* ── WRITING CANVAS ── */}
          <main className="flex-1 overflow-y-auto bg-accent-light">
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">

              {/* Post Title Container */}
              <div className="mb-10">
                <textarea
                  ref={titleRef}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Post title…"
                  maxLength={200}
                  rows={1}
                  className="font-sans w-full bg-transparent outline-none resize-none text-4xl font-extrabold text-text-primary placeholder-text-secondary/30 leading-[1.2] tracking-tight p-2 focus:ring-2 focus:ring-primary/5 rounded-xl transition-all"
                  style={{ overflow: "hidden" }}
                />

                {/* Live Inline Slug Display */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-px flex-1 bg-accent-dark" />
                  <code className="text-[11px] text-text-secondary/60 bg-accent px-3 py-1 rounded-full tracking-wide font-mono border border-border-custom">
                    /{slug || "your-post-slug"}
                  </code>
                  <div className="h-px flex-1 bg-accent-dark" />
                </div>
              </div>

              {/* Dynamic Content Block List Canvas */}
              <div className="space-y-3">
                {blocks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border-custom bg-accent/40 rounded-2xl p-6">
                    <div className="w-14 h-14 rounded-2xl border border-dashed border-border-custom bg-accent-light flex items-center justify-center mb-4 shadow-xs">
                      <FileText size={22} className="text-text-secondary/40" />
                    </div>
                    <p className="text-sm font-semibold text-text-primary mb-1">No blocks yet</p>
                    <p className="text-xs text-text-secondary/60">Click &quot;Add Block&quot; below to start writing your masterpiece</p>
                  </div>
                )}

                {blocks.map((block, index) => (
                  <BlockWrapper
                    key={block.id}
                    block={block}
                    index={index}
                    total={blocks.length}
                    onUpdate={patch => updateBlock(block.id, patch)}
                    onRemove={() => removeBlock(block.id)}
                    onMove={dir => moveBlock(block.id, dir)}
                  />
                ))}
              </div>

              {/* Mid-Canvas Block Insertion Row */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-accent-dark" />
                <BlockPalette onAdd={addBlock} />
                <div className="h-px flex-1 bg-accent-dark" />
              </div>

              {/* Secondary Bottom Management Control Strip */}
              <div className="mt-14 mb-6 rounded-2xl border border-border-custom bg-accent-light shadow-xs p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-text-primary text-sm mb-0.5">
                    {isEdit ? "Save your changes" : "Ready to publish?"}
                  </p>
                  <p className="text-xs font-medium text-text-secondary/60">
                    {blocks.length} block{blocks.length !== 1 ? "s" : ""} · {wordCount} words · ~{readTime} min read
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Visibility/Status Toggle Trigger */}
                  <button
                    onClick={() => setPublished(p => !p)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${isPublished
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
                        : "border-border-custom bg-accent text-text-secondary hover:border-primary/40"
                      }`}
                  >
                    {isPublished ? <Eye size={13} /> : <EyeOff size={13} />}
                    {isPublished ? "Published" : "Draft"}
                  </button>

                  {/* Master Execution Action Trigger */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary-dark hover:bg-secondary text-text-light text-xs font-bold tracking-wide uppercase transition-all disabled:opacity-50 shadow-sm shadow-secondary-dark/10 cursor-pointer"
                  >
                    {loading ? <RotateCcw size={13} className="animate-spin" /> : <Send size={13} />}
                    {isEdit ? "Update Post" : "Publish Post"}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}