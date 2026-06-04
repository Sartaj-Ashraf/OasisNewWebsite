"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import bottomCorner from "@/assets/svg/bottomCorner.svg";

// ─── Project data — replace images with your real screenshots ───────────────
const projects = [
  {
    id: 1,
    slug: "luxe-commerce",
    title: "Luxe Commerce",
    category: "E-Commerce",
    tag: "Web Dev",
    year: "2024",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
  },
  {
    id: 2,
    slug: "verdant-dashboard",
    title: "Verdant Dashboard",
    category: "SaaS",
    tag: "UI/UX",
    year: "2024",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
  },
  {
    id: 3,
    slug: "nova-agency",
    title: "Nova Agency",
    category: "Agency",
    tag: "Branding",
    year: "2023",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=900&q=80",
  },
  {
    id: 4,
    slug: "pulsefit-app",
    title: "PulseFit",
    category: "Health",
    tag: "Web App",
    year: "2024",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  },
  {
    id: 5,
    slug: "realestate-hub",
    title: "EstateHub",
    category: "Real Estate",
    tag: "Web Dev",
    year: "2023",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=900&q=80",
  },
  {
    id: 6,
    slug: "bloom-cafe",
    title: "Bloom Café",
    category: "F&B",
    tag: "Branding",
    year: "2024",
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80",
  },
];

const categories = ["All", "Web Dev", "UI/UX", "Branding", "Web App"];

// ─── ProjectCard — faithful to your BlogCard DNA ────────────────────────────
export const ProjectCard = ({ project }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="relative bg-white w-full flex flex-col rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Screenshot */}
      <div className="relative w-full h-[190px] overflow-hidden flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Browser chrome strip — makes it look like a real website preview */}
        <div className="absolute top-0 inset-x-0 h-7 bg-white/90 backdrop-blur-sm flex items-center px-3 gap-1.5 border-b border-black/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <span className="ml-2 flex-1 h-4 rounded-full bg-black/5 text-[9px] text-black/30 flex items-center px-2 truncate">
            {project.url}
          </span>
        </div>

        {/* Hover: live site chip */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-black shadow-md"
        >
          <ExternalLink size={10} />
          Live Site
        </a>
      </div>

      {/* Bottom corner — same as BlogCard */}
      <div className="absolute -bottom-1 -right-1 z-10">
        <Image src={bottomCorner} alt="" width={77} height={77} />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 pl-8 pr-4 py-6 gap-2">
        {/* Tag pill */}
        <span className="self-start text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/5 text-black/40">
          {project.tag}
        </span>

        <h3 className="text-base font-medium text-black line-clamp-1 mt-1">
          {project.title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/6">
          <span className="text-xs text-black/50">{project.category}</span>
          <span className="text-xs text-black/30">{project.year}</span>
        </div>
      </div>
    </Link>
  );
};

// ─── Projects section — mirrors BlogSection wrapper exactly ─────────────────
export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tag === activeFilter);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-accent-dark mt-8 rounded-3xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2>Our Projects</h2>

        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border transition-all duration-200
                ${activeFilter === cat
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black/40 border-black/12 hover:border-black/30 hover:text-black/70"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* CTA row */}
      <div className="flex items-center justify-between pt-2 border-t border-black/6">
        <p className="text-sm text-black/40">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-primary-dark text-white text-sm font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

// ─── Standalone /projects page ───────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <section className="px-4 md:px-8 py-12">
      <ProjectsSection />
    </section>
  );
}