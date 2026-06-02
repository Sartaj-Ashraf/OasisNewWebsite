// components/careers/ApplyModal.jsx
"use client";
import { useState, useRef } from "react";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const UploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export default function ApplyModal({ job, onClose }) {
  const fileRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", linkedin: "", message: "" });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!file) e.file = "Please attach your CV or resume";
    return e;
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulate API
    setLoading(false);
    setSubmitted(true);
  };

  const Field = ({ label, name, type = "text", placeholder, required }) => (
    <div>
      <label className="block text-[11.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-[#c8963e]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: "" }); }}
        className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all ${
          errors[name]
            ? "border-red-300 focus:ring-red-100"
            : "border-gray-200 focus:border-[#c8963e] focus:ring-[#c8963e]/10"
        }`}
      />
      {errors[name] && <p className="text-[11px] text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-[#1a2e44] px-4 py-5 flex items-start justify-between flex-shrink-0">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#c8963e] font-medium mb-1">Apply Now</p>
            <h2 className="text-white font-bold text-[17px] leading-snug">{job.title}</h2>
            <p className="text-white/40 text-[12px] mt-0.5">{job.type} · {job.location}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors mt-0.5">
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-7 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="text-[#c8963e] mb-4"><CheckIcon /></div>
              <h3 className="text-[17px] font-bold text-gray-800 mb-2">Application Submitted!</h3>
              <p className="text-[13px] text-gray-400 max-w-xs">
                Thanks for applying for <span className="font-semibold text-gray-600">{job.title}</span>.
                We&apos;ll review your application and get back to you shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#1a2e44] text-white text-[13px] font-semibold rounded-xl hover:bg-[#243d57] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Field label="Full Name" name="name" placeholder="John Doe" required />
                </div>
                <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
                <Field label="Phone" name="phone" type="tel" placeholder="+1 234 567 890" />
              </div>
              <Field label="LinkedIn Profile" name="linkedin" placeholder="linkedin.com/in/yourname" />

              {/* CV Upload */}
              <div>
                <label className="block text-[11.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  CV / Resume <span className="text-[#c8963e]">*</span>
                </label>
                <div
                  onClick={() => fileRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`border-2 border-dashed rounded-2xl px-4 py-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    file
                      ? "border-[#c8963e]/50 bg-amber-50/50"
                      : errors.file
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-200 hover:border-[#c8963e]/40 hover:bg-amber-50/20"
                  }`}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                  />
                  {file ? (
                    <div className="text-center">
                      <p className="text-[13px] font-semibold text-[#c8963e]">{file.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-gray-300 mb-2"><UploadIcon /></div>
                      <p className="text-[12.5px] font-semibold text-gray-500">
                        Drop your file here or <span className="text-[#c8963e]">browse</span>
                      </p>
                      <p className="text-[11px] text-gray-300 mt-0.5">PDF, DOC, DOCX · Max 5MB</p>
                    </div>
                  )}
                </div>
                {errors.file && <p className="text-[11px] text-red-400 mt-1">{errors.file}</p>}
              </div>

              {/* Cover note */}
              <div>
                <label className="block text-[11.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Cover Note <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us why you're a great fit…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#c8963e] focus:ring-2 focus:ring-[#c8963e]/10 transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {!submitted && (
          <div className="px-7 py-4 border-t border-gray-100 flex-shrink-0">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#c8963e] hover:bg-[#b8842e] disabled:opacity-70 text-white text-[13.5px] font-bold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Submitting…
                </>
              ) : "Submit Application"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}