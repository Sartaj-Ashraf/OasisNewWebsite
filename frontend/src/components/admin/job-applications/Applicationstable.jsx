"use client";

import { Badge, Spinner, STATUS_OPTIONS } from "./ApplicationsUi";

const inputCls =
  "border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white";

// ─── Filters Bar ─────────────────────────────────────────────────────────────

export function ApplicationsFilters({ search, setSearch, statusFilter, setStatusFilter, minExp, setMinExp, setPage }) {
  const hasFilters = search || statusFilter || minExp;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Name or email…"
            className={`${inputCls} pl-9 w-full`}
          />
        </div>
      </div>

      {/* Status */}
      <div className="min-w-[160px]">
        <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className={inputCls}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Min Experience */}
      <div className="min-w-[130px]">
        <label className="block text-xs font-medium text-gray-500 mb-1">Min. experience (yrs)</label>
        <input
          type="number"
          min="0"
          value={minExp}
          onChange={(e) => { setMinExp(e.target.value); setPage(1); }}
          placeholder="e.g. 2"
          className={`${inputCls} w-full`}
        />
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={() => { setSearch(""); setStatusFilter(""); setMinExp(""); setPage(1); }}
          className="text-sm text-gray-400 hover:text-gray-700 transition pb-0.5"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

// ─── Applications Table ───────────────────────────────────────────────────────

export function ApplicationsTable({ applications, loading, onView, onDelete }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 text-center py-16 text-gray-400">
        <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-sm">No applications found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {["Applicant", "Position", "Experience", "Status", "Applied on", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50/60 transition-colors">

                {/* Applicant */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-xs shrink-0">
                      {app.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{app.fullName}</p>
                      <p className="text-gray-400 text-xs">{app.email}</p>
                    </div>
                  </div>
                </td>

                {/* Position */}
                <td className="px-5 py-3.5">
                  {app.career ? (
                    <div>
                      <p className="text-gray-800 font-medium">{app.career.JobTitle}</p>
                      <p className="text-gray-400 text-xs">
                        {app.career.JobType} · {app.career.Location}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>

                {/* Experience */}
                <td className="px-5 py-3.5 text-gray-700">
                  {app.experience != null
                    ? `${app.experience} yr${app.experience !== 1 ? "s" : ""}`
                    : <span className="text-gray-300">—</span>
                  }
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <Badge status={app.status} />
                </td>

                {/* Date */}
                <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                  {app.createdAt
                    ? new Date(app.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })
                    : "—"}
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    {/* View detail */}
                    <button
                      onClick={() => onView(app)}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="View details"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    {/* Resume link */}
                    {app.resume?.url && (
                      <a
                        href={app.resume.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="View resume"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </a>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(app)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function ApplicationsPagination({ page, pages, setPage }) {
  if (pages <= 1) return null;

  return (
    <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-white rounded-b-2xl">
      <span>Page {page} of {pages}</span>
      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition text-gray-700"
        >
          ← Prev
        </button>
        <button
          disabled={page === pages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition text-gray-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}