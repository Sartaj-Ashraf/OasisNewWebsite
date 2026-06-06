"use client";

import { useRef, useState, useEffect } from "react";
import { createProject, updateProject, getProjectCategories } from "@/services/Projects.service";
import { toast } from "sonner";

const EMPTY_FORM = {
  title: "",
  link: "",
  description: "",
  category: "",
  isActive: true,
};

/* ─── Reusable single-image picker (thumbnail / scroller) ─── */
function ImagePicker({ label, required, hint, preview, onFile }) {
  const ref = useRef();

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">
        {label}{" "}
        {required && <span className="text-red-400">*</span>}
        {hint && <span className="ml-1 text-gray-400 font-normal">{hint}</span>}
      </label>

      <div
        onClick={() => ref.current.click()}
        className="relative cursor-pointer group rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-amber-300 transition-all overflow-hidden"
        style={{ minHeight: "120px" }}
      >
        {preview ? (
          <>
            <img src={preview} alt={label} className="w-full h-50 object-cover" />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <span className="text-white text-xs font-medium bg-black/40 px-3 py-1 rounded-full">
                Change
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400 gap-2">
            <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Click to upload</span>
          </div>
        )}
      </div>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onFile(file);
        }}
        className="hidden"
      />
    </div>
  );
}

/* ─── Logo picker (small square) ─── */
function LogoPicker({ preview, onFile }) {
  const ref = useRef();

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">
        Logo{" "}
        <span className="text-gray-400 font-normal">(square recommended)</span>
      </label>

      <div
        onClick={() => ref.current.click()}
        className="relative cursor-pointer group w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-amber-300 transition-all overflow-hidden"
      >
        {preview ? (
          <>
            <img src={preview} alt="logo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <span className="text-white text-[10px] font-medium">Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-1">
            <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[10px] text-center leading-tight px-1">Upload logo</span>
          </div>
        )}
      </div>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onFile(file);
        }}
        className="hidden"
      />
    </div>
  );
}

/* ─── Main Modal ─── */
export default function ProjectModal({ mode, project, onClose, onSaved }) {
  const [form, setForm] = useState(project ? { ...project } : { ...EMPTY_FORM });

  // Three separate image states
  const [thumbnailFile,  setThumbnailFile]  = useState(null);
  const [scrollerFile,   setScrollerFile]   = useState(null);
  const [logoFile,       setLogoFile]       = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState(project?.thumbnail?.url    || null);
  const [scrollerPreview,  setScrollerPreview]  = useState(project?.scrollerImage?.url || null);
  const [logoPreview,      setLogoPreview]      = useState(project?.logo?.url          || null);

  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title",       form.title.trim());
      fd.append("link",        form.link.trim());
      fd.append("description", form.description.trim());
      fd.append("category",    form.category.trim());
      fd.append("isActive",    form.isActive ? "true" : "false");

      // Each image under its own field name — update your multer to match
      if (thumbnailFile)  fd.append("thumbnail",     thumbnailFile);
      if (scrollerFile)   fd.append("scrollerImage",  scrollerFile);
      if (logoFile)       fd.append("logo",            logoFile);

      if (mode === "edit") {
        await updateProject(project._id, fd);
      } else {
        await createProject(fd);
      }

      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProjectCategories();
        setCategories(response.data.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl border border-gray-100 shadow-lg shadow-amber-100/20 max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-gray-900 font-semibold text-lg!">
              {mode === "edit" ? "Edit Project" : "New Project"}
            </h2>
            <p className="text-gray-500 text-xs! mt-1">
              {mode === "edit" ? "Update project details" : "Fill in project information"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3">
              {error}
            </div>
          )}

          {/* ── Images Section ── */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Images
            </p>

            {/* Thumbnail + Scroller side-by-side */}
            <div className="grid grid-cols-2 gap-4">
              <ImagePicker
                label="Thumbnail"
                required
                hint="(main cover)"
                preview={thumbnailPreview}
                onFile={(file) => {
                  setThumbnailFile(file);
                  setThumbnailPreview(URL.createObjectURL(file));
                }}
              />
              <ImagePicker
                label="Scroller Image"
                hint="(wide banner)"
                preview={scrollerPreview}
                onFile={(file) => {
                  setScrollerFile(file);
                  setScrollerPreview(URL.createObjectURL(file));
                }}
              />
            </div>

            {/* Logo — smaller, standalone */}
            <LogoPicker
              preview={logoPreview}
              onFile={(file) => {
                setLogoFile(file);
                setLogoPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <hr className="border-gray-100" />

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="My Awesome Project"
              maxLength={50}
              minLength={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
            <span className="text-xs text-gray-400">{form.title.length}/50 characters</span>
          </div>

          {/* Link */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Link *</label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              required
              maxLength={200}
              minLength={10}
              placeholder="https://example.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
            <span className="text-xs text-gray-400">{form.link.length}/200 characters</span>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Category *</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              list="categories"
              required
              maxLength={50}
              minLength={3}
              placeholder="Select or type a category"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
            <datalist id="categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              maxLength={500}
              minLength={20}
              rows={4}
              placeholder="Describe your project..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
            <span className="text-xs text-gray-400">{form.description.length}/500 characters</span>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Active</p>
              <p className="text-xs text-gray-500">Visible on the public site</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
              className={`relative w-11 h-6 rounded-full transition-all ${form.isActive ? "bg-amber-500" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.isActive ? "translate-x-5" : ""}`} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-medium transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {loading ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}