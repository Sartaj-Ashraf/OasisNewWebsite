"use client";

import { useState } from "react";
import { Heart, Tag, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ProjectModal } from "../caseStudyCard/ProjectModel";

// ─── Span helpers ─────────────────────────────────────────────────────────────
const TILE_PATTERN = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
];

function getSpan(index) {
  return TILE_PATTERN[index % TILE_PATTERN.length];
}
function colSpanClass(n) {
  return n === 2 ? "md:col-span-2" : "md:col-span-1";
}
function rowSpanClass(n) {
  return n === 2 ? "md:row-span-2" : "md:row-span-1";
}
function minHeightClass(col, row) {
  if (col === 2 && row === 2) return "min-h-[320px]";
  if (row === 2) return "min-h-[240px]";
  return "min-h-[180px]";
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, spanInfo, onOpen }) {
  const { colSpan, rowSpan } = spanInfo;
  const isHero = colSpan === 2 && rowSpan === 2;
  const isTall = rowSpan === 2 && colSpan === 1;

  // Card background color — must match fade gradient end color
  const cardBg = "#ededef";

  const imgHeight = isHero ? "h-[300px]" : isTall ? "h-[300px]" : "h-[200px]";

  return (
    <div
      onClick={() => onOpen(project)}
      className="
        group flex flex-col cursor-pointer h-full
        rounded-[32px] overflow-hidden
        shadow-[0_4px_32px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
      "
      style={{ background: cardBg }}
    >
      {/* ── Image area — full bleed, no margin ── */}
      <div className={`relative w-full flex-shrink-0 overflow-hidden ${imgHeight}`}>
        <Image
          src={project?.thumbnail?.url}
          alt={project?.title}
          fill
          className="object-cover object-top-leftm transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Fade — right edge into card bg */}
        <div
          className="absolute top-0 right-0 h-full w-[50%] pointer-evenwats-none"
          style={{ background: `linear-gradient(to right, transparent 0%, ${cardBg} 100%)` }}
        />

        {/* Fade — bottom edge into card bg */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[90px] pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent 0%, ${cardBg} 100%)` }}
        />

        {/* Favourite — frosted circle top right */}
        <button
          onClick={(e) => e.stopPropagation()}
          aria-label="Save project"
          className="
            absolute top-3 right-3 z-10
            w-9 h-9 rounded-full
            bg-white/30 backdrop-blur-sm
            flex items-center justify-center
            border-none cursor-pointer
            transition-all duration-200 hover:bg-white/50
          "
        >
          <Heart size={15} className="text-white drop-shadow" />
        </button>
      </div>

      {/* ── Body ── */}
      <div
        className="flex flex-col gap-3 px-4 pt-1 pb-4"
        style={{ background: cardBg }}
      >
        {/* Title + category */}
        <div>
          <h3
            className={`
              font-semibold text-neutral-900 leading-tight tracking-tight
              ${isHero ? "text-[22px]" : isTall ? "text-[18px]" : "text-[16px]"}
            `}
          >
            {project.title}
          </h3>
          <p className="text-[13px] text-neutral-500 mt-0.5">
            {project.category}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-700">
            <Tag size={13} className="text-neutral-400" />
            {project.tag ?? project.category}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-700">
            <ExternalLink size={13} className="text-neutral-400" />
            {project.shortCode ?? "Live"}
          </div>
        </div>

        {/* CTA pill */}
        <button
          className="
            w-full rounded-full
            bg-white
            text-[14px] font-semibold text-neutral-900
            border-none cursor-pointer
            shadow-[0_1px_12px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.05)]
            transition-shadow duration-200
            hover:shadow-[0_2px_18px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.08)]
            py-3.5
          "
        >
          View project
        </button>
      </div>
    </div>
  );
}
// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ project, onClose }) {
  if (!project) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      onClick={onClose}
    >
      <ProjectModal project={project} />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export const WebsiteShowCase = ({ projects }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              ✦ Our Work
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-black dark:text-white">
              Projects We're
              <span className="block italic text-primary">Proud Of</span>
            </h2>
          </div>
          <p className="text-black/60 dark:text-white/60 max-w-sm leading-relaxed md:text-right">
            From ambitious startups to established brands — here's what we've
            been building.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ gridAutoFlow: "dense", gridAutoRows: "minmax(160px, auto)" }}
        >
          {projects.map((project, index) => {
            const span = getSpan(index);
            return (
              <div
                key={project.id}
                className={`
                  ${colSpanClass(span.colSpan)}
                  ${rowSpanClass(span.rowSpan)}
                  ${minHeightClass(span.colSpan, span.rowSpan)}
                `}
              >
                <ProjectCard
                  project={project}
                  spanInfo={span}
                  onOpen={setSelected}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </section>

      {selected && (
        <Modal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};