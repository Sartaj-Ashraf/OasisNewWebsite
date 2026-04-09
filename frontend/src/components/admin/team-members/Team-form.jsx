"use client";

import { useState, useEffect } from "react";
import {
  Camera,
  User,
  Briefcase,
  Globe,
  Link as LinkIcon,
  Eye,
  Plus,
  Loader2,
  Save,
  Image as ImageIcon,
  ChevronLeft,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormField = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/70 ml-1 flex items-center gap-2">
      {Icon && <Icon size={12} />} {label}
    </label>
    {children}
  </div>
);

export const TeamForm = ({ onSubmit }) => {
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    linkedin: "",
    instagram: "",
    website: "",
    order: 1,
    isActive: true,
    visibility: "all",
  });

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) return toast.error("Only images allowed");
    if (selected.size > 2 * 1024 * 1024) return toast.error("Max file size is 2MB");

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.designation.trim()) {
      return toast.error("Name and designation required");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        const apiKey = key === "visibility" ? "showOnWebsiteOnly" : key;
        formData.append(apiKey, value);
      });
      if (file) formData.append("profileImage", file);

      await onSubmit(formData);
      toast.success("New Identity Created");

      // Navigate after success
      setTimeout(() => {
        router.push("/admin/our-team");
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "System Failure");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full h-11 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm text-secondary placeholder:text-white/10 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all";

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-12 text-primary font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/40 hover:text-white text-xs mb-2 transition-colors uppercase tracking-widest font-bold"
            >
              <ChevronLeft size={14} /> Return to Team
            </button>
            <h4 className="text-3xl font-bold tracking-tight">Onboard Member</h4>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${form.isActive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
              {form.isActive ? 'Status: Active' : 'Status: Inactive'}
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Media */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
              <div className="relative group w-32 h-32 mb-6">
                <div className="w-full h-full rounded-2xl border border-white/10 overflow-hidden bg-white/50 flex items-center justify-center transition-all group-hover:border-blue-500/50">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-primary/50" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 cursor-pointer rounded-2xl transition-opacity backdrop-blur-sm">
                  <Camera size={24} className="text-white" />
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
              </div>
              <h5 className="text-sm font-semibold mb-1 text-white">Member Image</h5>
              <span className="text-[10px] text-white/30 leading-relaxed uppercase tracking-tighter">Square JPG/PNG<br />Max 2.0 MB</span>
            </div>

            {/* Toggle Switch Consistency */}
            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                Active Member
              </span>

              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                className={`w-11 h-6 flex items-center rounded-full transition-all duration-300 px-1 ${form.isActive ? "bg-blue-600" : "bg-white/10"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${form.isActive ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Data */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8">
              {/* General Info */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Display Name" icon={User}>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={inputStyles} required />
                </FormField>
                <FormField label="Professional Title" icon={Briefcase}>
                  <input name="designation" value={form.designation} onChange={handleChange} placeholder="e.g. Lead Engineer" className={inputStyles} required />
                </FormField>
              </section>

              {/* Social Links */}
              <section className="space-y-6">
                <div className="h-px bg-white/5 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="LinkedIn Profile" icon={LinkIcon}>
                    <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="URL" className={inputStyles} />
                  </FormField>
                  <FormField label="Instagram Handle" icon={LinkIcon}>
                    <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="@handle" className={inputStyles} />
                  </FormField>
                  <FormField label="Personal Website" icon={Globe}>
                    <input name="website" value={form.website} onChange={handleChange} placeholder="https://..." className={inputStyles} />
                  </FormField>
                  <FormField label="Contextual Visibility" icon={Eye}>
                    <select name="visibility" value={form.visibility} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer bg-[#0c0c0c]`}>
                      <option value="all">Global (All Platforms)</option>
                      <option value="website">Internal Website Only</option>
                      <option value="portfolio">Public Portfolio Only</option>
                    </select>
                  </FormField>
                </div>
              </section>

              {/* Display Logic */}
              {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FormField label="Sequence Priority">
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    className={inputStyles}
                    min="1"
                  />
                </FormField>
              </section> */}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-xs font-bold uppercase tracking-widest border border-white/5"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus size={16} />
                    Commit Identity
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};