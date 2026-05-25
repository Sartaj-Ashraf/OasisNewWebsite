"use client";

import { useState } from "react";

export default function ClientForm({
  initialData = {},
  onSubmit,
  loading,
  buttonText = "Save Client",
}) {
  const isEdit = !!initialData?._id;

  const [form, setForm] = useState({
    name: initialData.name || "",
    website: initialData.website || "",
    order: initialData.order || "",
    isActive:
      initialData.isActive !== undefined
        ? initialData.isActive
        : true,
  });

  const [image, setImage] = useState(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("website", form.website);
    formData.append("isActive", form.isActive);

    // only send order if edit
    if (isEdit && form.order) {
      formData.append("order", Number(form.order));
    }

    if (image) {
      formData.append("coverImage", image);
    }

    await onSubmit(formData);
  };

  return (
 <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm font-sans text-slate-800 max-w-3xl"
>
  {/* NAME */}
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
      Client Name
    </label>
    <input
      type="text"
      required
      placeholder="Apple Inc"
      value={form.name}
      onChange={(e) => handleChange("name", e.target.value)}
      className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 shadow-sm text-slate-800"
    />
  </div>

  {/* WEBSITE */}
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
      Website
    </label>
    <input
      type="url"
      placeholder="https://example.com"
      value={form.website}
      onChange={(e) => handleChange("website", e.target.value)}
      className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 shadow-sm text-slate-800"
    />
  </div>

  {/* ORDER ONLY IN EDIT */}
  {isEdit && (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Display Order
      </label>
      <input
        type="number"
        min="1"
        placeholder="1"
        value={form.order}
        onChange={(e) => handleChange("order", e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 shadow-sm text-slate-800"
      />
    </div>
  )}

  {/* IMAGE */}
  <div className="space-y-3">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
      Cover Image
    </label>
    
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="relative flex-1 w-full">
        <input
          type="file"
          accept="image/*"
          required={!isEdit}
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:transition-all file:cursor-pointer cursor-pointer border border-slate-200 rounded-2xl p-2 bg-slate-50/50"
        />
      </div>

      {/* Existing Image Preview */}
      {!image && initialData?.coverImage?.url && (
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 shrink-0">
          <img
            src={initialData.coverImage.url}
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* New Selected Image Preview */}
      {image && (
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 shrink-0">
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  </div>

  {/* ACTIVE STATUS TOGGLE-CHECKBOX */}
  <div className="pt-2">
    <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 cursor-pointer group select-none">
      <input
        type="checkbox"
        checked={form.isActive}
        onChange={(e) => handleChange("isActive", e.target.checked)}
        className="h-4 w-4 rounded-md border-slate-300 text-amber-500 focus:ring-amber-500/20 focus:ring-offset-0 accent-amber-500 cursor-pointer"
      />
      <span className="group-hover:text-slate-900 transition-colors">Active Client</span>
    </label>
  </div>

  {/* BUTTON */}
  <div className="pt-4">
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-[0.98]"
    >
      {loading ? "Saving Records..." : buttonText}
    </button>
  </div>
</form>
  );
}