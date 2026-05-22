"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Send, EyeOff, RotateCcw,
  Eye, PenLine, Clock, Hash, BookOpen, FileText,
  Image as ImageIcon, Trash2,
} from "lucide-react";
import Image from "next/image";
import { createBlog, updateBlog } from "@/services/blogs.service";
import { makeSlug, uid, countWords, BLOCK_TYPES } from "@/utils/blog-form.utils";
import { BlockWrapper, BlockPalette, Toast, StatChip } from "@/components/admin/blogs/blog-form.components";

export default function BlogForm({ initialData = null, onSuccess, onCancel }) {
  const isEdit = Boolean(initialData);
  /* ── state ── */
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [isPublished, setPublished] = useState(initialData?.isPublished || false);
  const [blocks, setBlocks] = useState(
    initialData?.content?.map(b => ({
      ...b,
      _file: null,
      _preview:
        b.type === "image" && b.content
          ? b.content
          : null,
    })) || []
  );
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
const [coverImage, setCoverImage] = useState(
  initialData?.coverImage
    ? {
        _file: null,
        _preview: null,
        url: initialData.coverImage.url,
        key: initialData.coverImage.key,
      }
    : null
);

  const titleRef = useRef(null);
  const coverImageRef = useRef(null);

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

      if (coverImage?._file) {
        fd.append("coverImage", coverImage._file);
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
        <header className="sticky top-0 z-40 bg-accent-light/80 backdrop-blur-md border-b border-accent-dark px-6 h-14.5 flex items-center justify-between shrink-0 shadow-sm shadow-accent-dark/20">
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
        <div className="overflow-hidden">

          {/* ── SIDEBAR ── */}


          {/* ── WRITING CANVAS ── */}
          <main className="flex-1 overflow-y-auto bg-accent-light">
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">

              {/* Cover Image Upload */}
              <div className="mb-8">
                <input
                  ref={coverImageRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (!file || !file.type.startsWith("image/")) return;
                    setCoverImage({ _file: file, _preview: URL.createObjectURL(file), url: null });
                  }}
                />
             {coverImage?._preview || coverImage?.url ? (
  <div className="relative rounded-2xl overflow-hidden border border-border-custom group">

    <div className="relative w-full h-56 bg-accent">

      <Image
        src={coverImage._preview || coverImage.url}
        alt="Cover image"
        fill
        className="object-cover"
      />

    </div>

    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />

    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">

      <button
        onClick={() => coverImageRef.current?.click()}
        className="bg-accent-light/95 text-text-secondary hover:bg-accent-dark px-3 py-1.5 rounded-lg shadow-sm border border-border-custom text-xs font-semibold transition-all cursor-pointer"
      >
        Replace
      </button>

      <button
        onClick={() => {
          if (coverImage?._preview) {
            URL.revokeObjectURL(coverImage._preview);
          }

          setCoverImage(null);
        }}
        className="bg-accent-light/95 text-red-500 hover:bg-red-50 p-1.5 rounded-lg shadow-sm border border-red-100 transition-all cursor-pointer"
      >
        <Trash2 size={13} />
      </button>

    </div>

    <div className="absolute bottom-3 left-3 bg-accent-light/90 text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 px-2.5 py-1 rounded-full border border-border-custom">
      Cover Image
    </div>

  </div>
) : (
  // upload button
  <button
    onClick={() => coverImageRef.current?.click()}
    className="w-full h-32 rounded-2xl border-2 border-dashed border-border-custom hover:border-primary/60 bg-accent/40 hover:bg-primary/5 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
  >
    <div className="w-9 h-9 rounded-xl bg-accent-dark group-hover:bg-primary/10 flex items-center justify-center transition-all">
      <ImageIcon size={18} className="text-text-secondary/50 group-hover:text-primary/70 transition-colors" />
    </div>
    <div className="text-center">
      <p className="text-xs font-semibold text-text-primary/70">Add cover image</p>
      <p className="text-[10px] text-text-secondary/40">PNG, JPG, WEBP — recommended 1200×630</p>
    </div>
  </button>
)}
              </div>

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
                  />  <div className="space-y-1.5">
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
                </div>
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
              {/* Mid-Canvas Block Insertion Row */}
              <div className="mt-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-accent-dark" />
                  <BlockPalette onAdd={addBlock} />
                  <div className="h-px flex-1 bg-accent-dark" />
                </div>

                {/* Outline */}
                {blocks.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-border-custom bg-accent-light p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">
                        Document Outline
                      </p>

                      <span className="text-[10px] text-text-secondary/40 font-medium">
                        {blocks.length} blocks
                      </span>
                    </div>

                    <div className="space-y-1 max-h-64 overflow-y-auto pr-1 custom-scroll">
                      {blocks.map((b, i) => {
                        const cfg = BLOCK_TYPES.find(t => t.type === b.type);
                        const Icon = cfg?.Icon || FileText;

                        const preview =
                          b.type === "image"
                            ? "(image)"
                            : b.type === "list"
                              ? `${(b.content || []).length} items`
                              : String(b.content || "").slice(0, 50) || "(empty)";

                        return (
                          <div
                            key={b.id}
                            className="flex items-center gap-3 rounded-xl px-3 py-2 border border-transparent hover:border-border-custom hover:bg-accent transition-all"
                          >
                            <span className="w-5 text-center text-[10px] font-mono font-bold text-text-secondary/30">
                              {i + 1}
                            </span>

                            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center border border-accent-dark">
                              <Icon size={12} className="text-text-secondary/50" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-semibold text-text-primary truncate">
                                {cfg?.label}
                              </p>

                              <p className="text-[10px] text-text-secondary/50 truncate">
                                {preview}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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