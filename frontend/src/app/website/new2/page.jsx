"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, X, Filter } from "lucide-react";
import Link from "next/link";

// ─── Mock project data ───────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    slug: "luxe-commerce",
    title: "Luxe Commerce",
    category: "E-Commerce",
    tag: "Web Dev",
    year: "2024",
    description:
      "A high-converting storefront built for a luxury fashion brand, featuring AI-powered product recommendations and seamless checkout flows.",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
    bg: "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accent: "#e94560",
    textLight: true,
    size: "large",
  },
  {
    id: 2,
    slug: "verdant-dashboard",
    title: "Verdant Dashboard",
    category: "SaaS",
    tag: "UI/UX",
    year: "2024",
    description:
      "Analytics platform for an agri-tech startup, turning raw sensor data into actionable farm insights.",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    bg: "bg-gradient-to-br from-[#d4edda] via-[#a8d5b5] to-[#6db88a]",
    accent: "#1a4731",
    textLight: false,
    size: "medium",
  },
  {
    id: 3,
    slug: "nova-agency",
    title: "Nova Agency",
    category: "Agency",
    tag: "Branding",
    year: "2023",
    description:
      "Full rebrand and website for a creative studio — bold typography, scroll-driven animations, and a brutalist layout.",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=900&q=80",
    bg: "bg-gradient-to-br from-[#fff1e6] via-[#fddcba] to-[#f8b87a]",
    accent: "#7a2d00",
    textLight: false,
    size: "small",
  },
  {
    id: 4,
    slug: "pulsefit-app",
    title: "PulseFit",
    category: "Health",
    tag: "Web App",
    year: "2024",
    description:
      "Fitness tracking PWA with real-time workout logging, streak tracking, and social challenges.",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    bg: "bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#2d1b4e]",
    accent: "#c084fc",
    textLight: true,
    size: "medium",
  },
  {
    id: 5,
    slug: "realestate-hub",
    title: "EstateHub",
    category: "Real Estate",
    tag: "Web Dev",
    year: "2023",
    description:
      "Property listing platform with advanced map search, virtual tours, and mortgage calculators.",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=900&q=80",
    bg: "bg-gradient-to-br from-[#e8eaf6] via-[#c5cae9] to-[#9fa8da]",
    accent: "#1a237e",
    textLight: false,
    size: "small",
  },
  {
    id: 6,
    slug: "bloom-cafe",
    title: "Bloom Café",
    category: "F&B",
    tag: "Branding",
    year: "2024",
    description:
      "Whimsical brand identity and website for a specialty coffee shop — pastel palette, hand-drawn illustrations, and online ordering.",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80",
    bg: "bg-gradient-to-br from-[#fce4ec] via-[#f8bbd0] to-[#f48fb1]",
    accent: "#880e4f",
    textLight: false,
    size: "large",
  },
];

const categories = ["All", "Web Dev", "UI/UX", "Branding", "Web App"];

// ─── Bottom corner decoration (mirrors BlogCard pattern) ─────────────────────
function BottomCornerSvg({ color }) {
  return (
    <svg
      width="77"
      height="77"
      viewBox="0 0 77 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-px -right-px"
    >
      <path d="M77 0 C77 42.5 42.5 77 0 77 L77 77 Z" fill={color} />
    </svg>
  );
}

// ─── Individual project card ─────────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  const textBase = project.textLight ? "text-white" : "text-[#111]";
  const textMuted = project.textLight ? "text-white/60" : "text-black/50";
  const borderColor = project.textLight
    ? "border-white/15"
    : "border-black/10";

  return (
    <div
      className={`
        relative rounded-3xl overflow-hidden cursor-pointer group
        ${project.bg}
        transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl
        flex flex-col
        max-h-135   
      `}
      onClick={() => onOpen(project)}
    >
      {/* ── Website screenshot image ── */}
      <div className="relative w-full h-45 shrink-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Ribbon shapes for depth */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="340"
          cy="60"
          rx="180"
          ry="130"
          fill="rgba(255,255,255,0.08)"
          transform="rotate(-15 340 60)"
        />
        <circle
          cx="380"
          cy="280"
          r="120"
          fill="rgba(255,255,255,0.05)"
        />
      </svg>

      {/* Bottom decorative corner */}
      <BottomCornerSvg
        color={project.textLight ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}
      />

      {/* Card content — p-7 preserved exactly */}
      <div className="relative flex flex-col flex-1 p-7">
        {/* Header row */}
        <div className="relative z-10 flex items-center justify-between mb-auto">
          <span
            className={`text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${borderColor} ${textMuted}`}
          >
            {project.tag}
          </span>
          <span className={`text-xs ${textMuted}`}>{project.year}</span>
        </div>

        {/* Title */}
        <div className="relative z-10 mt-6">
          <p className={`text-xs uppercase tracking-widest mb-2 ${textMuted}`}>
            {project.category}
          </p>
          <h3 className={`text-2xl md:text-3xl font-semibold leading-tight ${textBase}`}>
            {project.title}
          </h3>
          <p className={`mt-3 text-sm leading-relaxed line-clamp-2 ${textMuted}`}>
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div
          className={`relative z-10 flex items-center justify-between mt-6 pt-4 border-t ${borderColor}`}
        >
          <span className={`text-xs font-medium ${textMuted}`}>View Project</span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-0 -rotate-45"
            style={{ background: project.accent }}
          >
            <ArrowRight size={14} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Full-screen project modal ───────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const textBase = project.textLight ? "text-white" : "text-[#111]";
  const textMuted = project.textLight ? "text-white/60" : "text-black/50";
  const borderColor = project.textLight ? "border-white/15" : "border-black/10";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className={`
          relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden
          ${project.bg}
          p-8 md:p-12
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 w-8 h-8 rounded-full border flex items-center justify-center ${borderColor} ${textMuted} hover:opacity-80 transition`}
        >
          <X size={14} />
        </button>

        <span className={`text-xs uppercase tracking-widest ${textMuted}`}>
          {project.category} · {project.year}
        </span>
        <h2 className={`text-4xl font-semibold mt-2 ${textBase}`}>
          {project.title}
        </h2>
        <p className={`mt-4 leading-relaxed ${textMuted}`}>
          {project.description}
        </p>

        <div className={`mt-8 pt-6 border-t ${borderColor} flex items-center gap-4`}>
          <Link
            href={project.url}
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
            style={{ background: project.accent }}
          >
            Live Site <ExternalLink size={13} />
          </Link>
          <Link
            href={`/projects/${project.slug}`}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium border ${borderColor} ${textBase} hover:opacity-70 transition`}
          >
            Case Study <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tag === activeFilter);

  const spanClass = (size) => {
    if (size === "large") return "md:col-span-2 md:row-span-2";
    if (size === "medium") return "md:col-span-1 md:row-span-2";
    return "md:col-span-1 md:row-span-1";
  };

  const minH = (size) => {
    if (size === "large") return "min-h-[340px]";
    if (size === "medium") return "min-h-[260px]";
    return "min-h-[200px]";
  };

  return (
    <>
      <section className="px-4 md:px-8 py-12">
        {/* ── Page header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              ✦ Our Work
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-black">
              Projects We're
              <span className="block italic text-primary">Proud Of</span>
            </h1>
          </div>
          <p className="text-black/60 max-w-sm leading-relaxed md:text-right">
            From ambitious startups to established brands — here's what we've
            been building.
          </p>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <Filter size={14} className="text-black/30 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase
                border transition-all duration-200
                ${
                  activeFilter === cat
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black/50 border-black/15 hover:border-black/40 hover:text-black"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto] gap-4 auto-rows-fr">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`${spanClass(project.size)} ${minH(project.size)}`}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div className="mt-10 bg-accent-dark rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              Got a project in mind?
            </h2>
            <p className="text-black/50 mt-1">
              Let's build something remarkable together.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-primary-dark text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Modal ── */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
