"use client";

import { useState } from "react";
import { Loader, X, Plus, Megaphone, Palette, Headphones } from "lucide-react";
import bgImage from "@/assets/svg/download.svg";
const services = [
  {
    id: "marketing",
    title: "Marketing",
    description:
      "We specialize in creating, developing, and managing a brand's identity to help businesses stand out in the marketplace and connect with their target audience.",
    bg: "bg-gradient-to-br from-[#cce8f8] via-[#a8d4f0] to-[#7bbde8]",
    titleColor: "text-[#1a2a3a]",
    descColor: "text-[#2a3a50]",
    btnBorder: "border-[#a088cc] text-[#2a1a60]",
    iconColor: "#1a2a3a",
    ServiceIcon: Megaphone,
  },
  {
    id: "design",
    title: "Design",
    description:
      "We craft visually compelling and user-centric design systems that transform complex ideas into intuitive, beautiful experiences across every touchpoint.",
    bg: "bg-gradient-to-br from-[#e8d0f8] via-[#c9a8ee] to-[#a87ad8]",
    titleColor: "text-[#2a1040]",
    descColor: "text-[#3a1860]",
    btnBorder: "border-[#c080e0] text-[#2a1040]",
    iconColor: "#2a1040",
    ServiceIcon: Palette,
  },
  {
    id: "support",
    title: "Support",
    description:
      "We provide dedicated, around-the-clock support to ensure your business runs smoothly — resolving issues swiftly and keeping your customers satisfied.",
    bg: "bg-gradient-to-br from-[#dde3ea] via-[#c8d0db] to-[#b0bcc8]",
    titleColor: "text-[#1a2530]",
    descColor: "text-[#2a3845]",
    btnBorder: "border-[#8090a0] text-[#1a2530]",
    iconColor: "#1a2530",
    ServiceIcon: Headphones,
  },
];

function RibbonShape() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="420"
        cy="180"
        rx="260"
        ry="200"
        fill="rgba(255,255,255,0.22)"
        transform="rotate(-20 420 180)"
      />
      <path
        d="M320 -30 C500 40 580 180 540 320 C500 450 330 490 200 400 C70 310 50 140 180 50 Z"
        fill="rgba(255,255,255,0.18)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <path
        d="M440 20 C600 100 630 280 550 380 C470 480 300 470 200 360 C100 250 130 60 280 10 Z"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
      />
      <path
        d="M500 100 C600 200 580 360 460 400 C340 440 220 370 240 260 C260 150 420 -10 500 100 Z"
        fill="rgba(255,255,255,0.16)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Services() {
  const [active, setActive] = useState("marketing");

  return (
    <div className="flex items-center justify-center py-8 px-4 min-h-screen">
      {/*
        Layout:
        - Mobile  (< md): flex-col, full width, each panel expands vertically
        - Desktop (≥ md): flex-row, fixed 420px height, each panel expands horizontally
      */}
      <div className="flex flex-col md:flex-row h-[90vh] gap-3 w-full ">
        {services.map((s) => {
          const isOpen = active === s.id;
          const { ServiceIcon } = s;

          return (
            <div
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`
            relative rounded-3xl overflow-hidden cursor-pointer
                transition-all duration-500 ease-in-out p-8
                ${s.bg}

                /* --- MOBILE: vertical accordion (height-based) --- */
                ${isOpen ? "h-[380px]" : "h-[64px]"}

                /* --- DESKTOP: horizontal accordion (flex-based) --- */
                md:h-auto
                ${isOpen ? "md:flex-[5]" : "md:flex-[0.55] md:hover:flex-[0.7]"}
              `}
              style={{ minWidth: 0 }}
            >
              <RibbonShape />

              {/* ── MOBILE: collapsed bar label (horizontal) ── */}
              <div
                className={`
                  md:hidden absolute inset-0 flex flex-row items-center justify-between p-6 z-10
                  transition-opacity duration-300
                  ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
              >
                <div className="flex items-center gap-3 ">
                  <ServiceIcon
                    size={32}
                    strokeWidth={1.8}
                    color={s.iconColor}
                    className="opacity-70"
                  />
                  <span
                    className="text-[13px] font-bold tracking-widest uppercase"
                    style={{ color: s.iconColor }}
                  >
                    {s.title}
                  </span>
                </div>
                <div className="w-5.5 h-5.5 rounded-full border-[1.5px] border-white/70 flex items-center justify-center text-white/90">
                  <Plus size={13} strokeWidth={2.5} />
                </div>
              </div>

              {/* ── DESKTOP: collapsed vertical label ── */}
              <div
                className={`
                  hidden md:flex
                  absolute inset-0 flex-col items-center justify-end pb-5 gap-3 z-10
                  transition-opacity duration-300
                  ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
              >
                <span
                  className="text-2xl font-bold tracking-widest uppercase text-white/90"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {s.title}
                </span>
                <div className="w-[22px] h-[22px] rounded-full border-[1.5px] border-white/70 flex items-center justify-center text-white/90">
                  <Plus size={13} strokeWidth={2.5} />
                </div>
              </div>

              {/* ── Glass card — expanded (shared mobile + desktop) ── */}
              <div
                className={`
                  absolute z-10 flex flex-col
                  /* Mobile: full inset with padding */
                  inset-3 p-6
                  /* Desktop: left-anchored fixed-width card */
                  md:top-4 md:left-4 md:bottom-4 md:right-auto md:w-xl 
                  transition-opacity duration-200 rounded-[2rem_0_2rem_2rem]
                  ${isOpen ? "opacity-100 pointer-events-auto delay-150" : "opacity-0 pointer-events-none delay-0"}
                `}
        
              >
                 {/* Background image with opacity */}
                <div
                  className="-z-10 absolute inset-0 rounded-[2rem_0_2rem_2rem] "
                  style={{
                    backgroundImage: `url(${bgImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.7, 
                  }}
                />
                <div className="mt-auto">
                  <div className="mb-2 opacity-50"> 
                    <ServiceIcon
                      size={32}
                      strokeWidth={1.8}
                      color={s.iconColor}
                    />
                  </div>
                  <h2
                    className={`text-[32px] md:text-[36px] font-extrabold leading-tight tracking-tight ${s.titleColor} mb-2`}
                  >
                    {s.title}
                  </h2>
                  <p className={` leading-relaxed ${s.descColor} opacity-85 `}>
                    {s.description}
                  </p>
                  <button
                    className={`mt-5 px-5 py-2 rounded-full border text-[10px] font-bold tracking-widest uppercase hover:bg-white/30 transition-colors ${s.btnBorder}`}
                  >
                    Discover More
                  </button>
                </div>
              </div>

              {/* ── Side label + close — desktop only ── */}
              <div
                className={`
                  hidden md:flex
                  absolute bottom-5 right-4 z-20 flex-col items-center gap-3
                  transition-opacity duration-200
                  ${isOpen ? "opacity-100 pointer-events-auto delay-150" : "opacity-0 pointer-events-none"}
                `}
              >
                <span
                  className="text-2xl font-bold tracking-widest uppercase text-white/80"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {s.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive("");
                  }}
                  className="w-6 h-6 rounded-full border-[1.5px] border-white/70 flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>

              {/* ── Close button — mobile only (top-right of expanded card) ── */}
              <button
                className={`
                  md:hidden absolute top-5 right-5 z-30
                  w-7 h-7 rounded-full border-[1.5px] border-white/70
                  flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors
                  ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive("");
                }}
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
