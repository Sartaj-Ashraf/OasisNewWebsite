"use client";

import { useState, useEffect, useRef } from "react";
import {
  Image as ImageIcon, List, Quote, Send,
  Plus, Trash2, ChevronUp, ChevronDown,
  CheckCircle, AlertCircle, GripVertical, FileText, X,
} from "lucide-react";
import Image from "next/image";
import { BLOCK_TYPES, HEADING_STYLE } from "@/utils/blog-form.utils";

/* ─────────────────────────────────────────────────────────
   🛠️ REUSABLE TEXTAREA COMPONENT
───────────────────────────────────────────────────────── */
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
      className={`w-full bg-transparent outline-none resize-none leading-relaxed text-text-primary placeholder-text-secondary/40 ${className}`}
      style={{ overflow: "hidden" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   🧱 INDIVIDUAL BLOCK COMPONENTS
───────────────────────────────────────────────────────── */
export function HeadingBlock({ block, onChange }) {
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

export function ParagraphBlock({ block, onChange }) {
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

export function QuoteBlock({ block, onChange }) {
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
        {block._preview || block.content ? (<>
          <div className="relative w-full h-105 bg-accent">
            {
              console.log(block.content?.url, "error")
            }
            {block.content?.url&&   <Image
              src={ block.content?.url}
              alt={block.meta?.alt || ""}
              className="w-full max-h-105 object-contain bg-accent"
              width={400}
              height={400}
            />}
            
            <Image
              src={block._preview}
              alt={block.meta?.alt || ""}
              className="w-full max-h-105 object-contain bg-accent"
              width={400}
              height={400}
            />
          </div>

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
              <ImageIcon size={20} className="text-secondary/60" />
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