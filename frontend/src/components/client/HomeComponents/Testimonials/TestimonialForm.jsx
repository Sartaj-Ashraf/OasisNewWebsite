"use client";
import { Button } from "@/shared/ClickAble";
import { useState } from "react";

export default function TestimonialForm() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log({ ...form, rating });
  };

  const isValid = form.name.trim() && form.message.trim();

  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-4 flex-1">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-medium text-gray-900">
          Share your experience
        </h2>
      </div>

      {/* Avatar upload */}
      <div className="flex items-center gap-4 mb-4">
        <label className="w-16 h-16 rounded-full border border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-gray-400 transition-colors flex-shrink-0">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-[10px] text-gray-400">photo</span>
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Profile photo</span>
          <span className="text-xs text-gray-400 mt-0.5">Optional · PNG or JPG</span>
        </div>
      </div>

      {/* Name */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1">

        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          maxLength={60}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-300 focus:border-gray-400 focus:bg-white transition-colors"
          />
          </div>

          {/* Star rating */}
      <div className="mb-4 flex-1">
        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">
          Rating
        </label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val} type="button"
              onClick={() => setRating(val)}
              onMouseEnter={() => setHovered(val)}
              onMouseLeave={() => setHovered(0)}
              className={`text-2xl transition-colors ${val <= (hovered || rating) ? "text-amber-400" : "text-gray-200"}`}
            >★</button>
          ))}
        </div>
      </div>
      </div>

      <div className="h-px bg-gray-100 my-5" />

    

      {/* Message */}
      <div className="mb-5 relative w-full">
        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">
          Testimonial
        </label>
        <textarea
          name="message"
          rows={4}
          maxLength={300}
          placeholder="What did you love about it? Be specific…"
          value={form.message}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-300 focus:border-gray-400 focus:bg-white transition-colors resize-none"
        />
        <span className="absolute right-3 bottom-2.5 text-[11px] text-gray-300">
          {form.message.length} / 300
        </span>
      </div>

      {/* Submit */}
      {!submitted ? (
        <Button
          handleClick={handleSubmit}
          disabled={!isValid}
          children="Submit"
          className={"button w-full"}
        />
      ) : (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Thank you! Your testimonial was submitted.
        </div>
      )}
    </div>
  );
}
