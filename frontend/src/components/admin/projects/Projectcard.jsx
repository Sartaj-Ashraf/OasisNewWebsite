"use client";

import { Edit, Trash2 } from "lucide-react";

export default function ProjectCard({ project, onEdit, onDelete }) {
  console.log(project)
  return (
    <div
      className="
        group
        bg-white/80
        backdrop-blur-xl
        border border-amber-100
        rounded-3xl
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-md hover:shadow-amber-100/50
      "
    >
      {/* Thumbnail Image */}
      <div className="relative h-60 bg-gray-100 overflow-hidden">
        {project.thumbnail?.url ? (
          <img
            src={project.thumbnail.url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={400}
            height={200}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              project.isActive
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-gray-100 border border-gray-200 text-gray-600"
            }`}
          >
            {project.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Logo overlay (bottom-left) */}
        {project.logo?.url && (
          <div className="absolute bottom-3 left-3">
            <img
              src={project.logo.url}
              alt={`${project.title} logo`}
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-gray-900 font-semibold text-2xl! leading-tight line-clamp-1">
            {project.title}
          </h3>
          <span className="shrink-0 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          {/* Project Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-600 transition-colors truncate max-w-[55%]"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="truncate">{project.link}</span>
          </a>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onEdit(project)}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all"
              aria-label="Edit project"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project)}
              className="w-10 h-10 rounded-xl border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-300 transition-all"
              aria-label="Delete project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}