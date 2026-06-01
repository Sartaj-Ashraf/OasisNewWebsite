"use client";

import { useState, useEffect } from "react";
import { updateApplicationStatus } from "@/services/jobApplication.service";
import { Badge, Spinner, STATUS_OPTIONS } from "./ApplicationsUi.jsx";
import { toast } from "sonner";
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";


// ─── Application Detail ───────────────────────────────────────────────────────

export function ApplicationDetail({ app, onStatusChange, onClose }) {
  const [status, setStatus] = useState(app.status);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const saveStatus = async () => {
    setSaving(true);
    setMsg("");
    try {
      await updateApplicationStatus(app._id, status);
      toast.success("Status updated");
      onStatusChange(app._id, status);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const field = (label, value) =>
    value ? (
      <div key={label}>
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm text-gray-900">{value}</p>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-lg">
          {app.fullName?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-base">{app.fullName}</p>
          <p className="text-sm text-gray-500">{app.email}</p>
        </div>
        <div className="ml-auto">
          <Badge status={app.status} />
        </div>
      </div>

      {/* Position */}
      {app.career && (
        <div className="bg-indigo-50 rounded-xl px-4 py-3 space-y-0.5">
          <p className="text-xs text-indigo-500 uppercase tracking-wide font-medium">Position applied for</p>
          <p className="text-sm font-medium text-indigo-900">{app.career.JobTitle}</p>
          <p className="text-xs text-indigo-600">
            {app.career.JobType} · {app.career.Location}
          </p>
        </div>
      )}

      {/* Info fields */}
      <div className="grid grid-cols-2 gap-4">
        {field("Phone", app.phone)}
        {field("Experience", app.experience != null ? `${app.experience} years` : null)}
        {field(
          "Applied on",
          app.createdAt
            ? new Date(app.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })
            : null
        )}
      </div>

      {/* Cover note */}
      {app.notes && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Cover note</p>
          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg px-4 py-3">
            {app.notes}
          </p>
        </div>
      )}

      {/* Resume link */}
      {app.resume?.url && (
        <a
          href={app.resume.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          View resume
        </a>
      )}

      {/* Status update */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Update status</p>
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={saveStatus}
            disabled={saving || status === app.status}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
          >
            {saving && <Spinner />}
            Save
          </button>
          {msg && <span className="text-xs text-gray-500">{msg}</span>}
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}