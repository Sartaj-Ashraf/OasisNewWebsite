"use client";

import Link from "next/link";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";

export const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="w-[90vw] h-[98vh] flex flex-col rounded-2xl overflow-hidden bg-[#0f0f11] border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
      {/* Browser Header */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#1a1a1f] border-b border-white/10">
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 truncate">
          {project?.link}
        </div>

        {/* Open Live Site */}
        <Link
          href={project?.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-2 py-1 rounded-lg bg-primary text-white text-xs hover:opacity-90 transition"
        >
          <ExternalLink size={14} />
          Live Site
        </Link>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Website Preview */}
      <div className="flex-1 bg-white">
        <iframe
          src={project?.link}
          title={project?.title}
          className="w-full h-full border-0"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141417] border-t border-white/10">
        <div className="flex gap-2">
          <div className="w-18 aspect-video rounded-lg overflow-hidden">
            <Image
              src={project?.logo?.url}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              alt={project?.title}
            />
          </div>
          <div>
            <h5 className="text-white font-medium">{project?.title}</h5>

            <p className="text-xs text-white/50">Live website preview</p>
          </div>
        </div>

        <Link
          href={project?.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Open in New Tab
        </Link>
      </div>
    </div>
  );
};
