"use client";
import { useState, useRef } from "react";
import { applyForJob } from "@/services/jobApplication.service";

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

export default function ApplyForm({ job, accentColor = "#c8963e" }) {
  const fileRef                     = useRef(null);
  const [form, setForm]             = useState({ name: "", email: "", phone: "", message: "" });
  const [file, setFile]             = useState(null);
  const [errors, setErrors]         = useState({});
  const [loading, setLoading]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [apiError, setApiError]     = useState(null);

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!file) e.file = "Please attach your resume or CV";
    return e;
  };

  const handleSubmit = async () => {
      console.log("SUBMIT CLICKED");


     const e = validate();

     console.log("CALLING API");

    if (Object.keys(e).length) {
    setErrors(e);
    return;
  }
    setLoading(true);
    setApiError(null);

    try {
      const formData = new FormData();


      formData.append("fullName", form.name);
      formData.append("email", form.email);
      formData.append("phone",
      form.phone.replace(/\D/g, "").slice(-10)
      );
      formData.append("notes", form.message);
      formData.append("career", job._id);
      formData.append("experience", "");
      formData.append("resume",  file);
      formData.append("jobTitle", job.JobTitle);

      await applyForJob(formData);
      setSubmitted(true);
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputBase  = "w-full rounded-xl border px-4 py-3 text-[13.5px] text-slate-800 bg-white placeholder:text-slate-300 transition-all duration-200 focus:outline-none focus:ring-2";
  const inputClass = (field) =>
    `${inputBase} ${
      errors[field]
        ? "border-red-300 focus:ring-red-100 bg-red-50/30"
        : "border-slate-200 hover:border-slate-300 focus:border-[#c8963e] focus:ring-[#c8963e]/10"
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: `${accentColor}15` }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <h3 className="text-[17px] font-bold text-slate-900 mb-1.5">Application Sent!</h3>
        <p className="text-[13px] text-slate-400 leading-relaxed max-w-[230px]">
          We&apos;ll review your application for{" "}
          <span className="font-semibold" style={{ color: accentColor }}>{job.JobTitle}</span>{" "}
          and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* API error */}
      {apiError && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[12.5px] text-red-500 font-medium">{apiError}</p>
        </div>
      )}

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
            Full Name <span style={{ color: accentColor }}>*</span>
          </label>
          <input type="text" placeholder="John Doe" value={form.name}
            onChange={(e) => set("name", e.target.value)} className={inputClass("name")} />
          {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
            Phone <span style={{ color: accentColor }}>*</span>
          </label>
          <input type="tel" placeholder="+1 234 567 890" value={form.phone}
            onChange={(e) => set("phone", e.target.value)} className={inputClass("phone")} />
          {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Email Address <span style={{ color: accentColor }}>*</span>
        </label>
        <input type="email" placeholder="you@example.com" value={form.email}
          onChange={(e) => set("email", e.target.value)} className={inputClass("email")} />
        {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Cover Message
          <span className="normal-case tracking-normal font-normal text-slate-300 ml-1">(optional)</span>
        </label>
        <textarea rows={3} placeholder="Tell us why you're a great fit…"
          value={form.message} onChange={(e) => set("message", e.target.value)}
          className={`${inputBase} border-slate-200 hover:border-slate-300 focus:border-[#c8963e] focus:ring-[#c8963e]/10 resize-none`}
        />
      </div>

      {/* File upload */}
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Resume / CV <span style={{ color: accentColor }}>*</span>
        </label>
        <div
          onClick={() => fileRef.current.click()}
          className={`group relative flex items-center gap-4 rounded-xl border-2 border-dashed p-4 cursor-pointer transition-all duration-200 ${
            file
              ? "border-[#c8963e]/40 bg-[#c8963e]/[0.03]"
              : errors.file
              ? "border-red-300 bg-red-50/30"
              : "border-slate-200 hover:border-[#c8963e]/40 hover:bg-slate-50"
          }`}
        >

          <input ref={fileRef} type="file"
            className="hidden" accept=".pdf,.doc,.docx"
            onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            console.log("Selected file:", selectedFile);
            setFile(selectedFile);
            setErrors((p) => ({
              ...p,
              file: "",
            }));
          }}

          />  
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ backgroundColor: file ? `${accentColor}15` : "#f1f5f9", color: file ? accentColor : "#94a3b8" }}>
            <UploadIcon />
          </div>
          <div className="min-w-0">
            <p className={`text-[13px] font-semibold truncate ${file ? "text-slate-700" : "text-slate-400"}`}>
              {file ? file.name : "Click to upload or drag & drop"}
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF, DOC, DOCX · Max 5MB"}
            </p>
          </div>
          {file && (
            <button onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="ml-auto text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        {errors.file && <p className="text-[11px] text-red-400 mt-1">{errors.file}</p>}
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={loading}
        className="w-full py-3.5 rounded-xl text-[13.5px] font-bold text-white transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Submitting…
          </>
        ) : (
          <>
            Submit Application
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </>
        )}
      </button>

    </div>
  );
}