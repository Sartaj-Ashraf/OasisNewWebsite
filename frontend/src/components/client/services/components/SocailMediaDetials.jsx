"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import angletop from "@/assets/svg/angle-top-right.svg";
// Import Swiper React components and core styles
import { Swiper, SwiperSlide } from "swiper/react";
// Import required modules: Autoplay and Pagination (bubbles)
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  Video,
  Users,
  Sparkles,
  Megaphone,
  MessageSquare,
  Palette,
} from "lucide-react";

const stats = [
  { number: "50M+", label: "Impressions Generated" },
  { number: "4.6%", label: "Avg. Engagement Rate" },
  { number: "200+", label: "Creator Partnerships" },
  { number: "8X", label: "Average Follower ROI" },
];

const services = [
  {
    icon: <Video className="w-6 h-6" />,
    title: "Short-Form Video Production",
    desc: "Produce thumb-stopping Reels, TikToks, and Shorts designed for organic virality and brand affinity.",
    Image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop", // Dynamic modern digital interface
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Management",
    desc: "Foster real-time conversations, turn comments into customers, and build a cult-like brand following.",
    Image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop", // Warm collaborative abstract connection
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Influencer & Creator Strategy",
    desc: "Partner with heavily vetted creators who match your aesthetic and hold genuine influence over your audience.",
    Image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1000&auto=format&fit=crop", // Neon studio setup vibes
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Paid Social & Amplification",
    desc: "Scale winning organic content through hyper-targeted Meta, TikTok, and LinkedIn ad configurations.",
    Image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop", // Cyber-punk digital workstation
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Social Listening & Trends",
    desc: "Monitor industry conversations and intercept culture-defining moments before they happen.",
    Image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // Flowing fluid data visual
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Visual Identity & Grid Styling",
    desc: "Establish a cohesive, premium visual ecosystem across all platforms with custom high-end graphic assets.",
    Image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", // Pastel geometric aesthetic rendering
  },
];

const reasons = [
  {
    title: "Platform-Native Content",
    desc: "We don't cross-post blindly. Every asset is tailored to match the unique algorithm and psychology of each specific platform.",
  },
  {
    title: "Velocity & Trend Interception",
    desc: "Social moves at lightning speed. Our agile production process allows us to capitalize on macro trends within hours, not weeks.",
  },
  {
    title: "Vetted Creator Networks",
    desc: "No vanity metrics. We only work with creators who generate provable, highly converting engagement with real audiences.",
  },
  {
    title: "Cultivating Community, Not Just Reach",
    desc: "Impressions look good on paper, but loyal communities scale businesses. We build real, active customer advocacy.",
  },
];

/* ── Scroll-reveal hook ───────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Animated counter ─────────────────────────────────────────── */
function Counter({ value }) {
  const [display, setDisplay] = useState("0");
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    let step = 0,
      steps = 40;
    const t = setInterval(() => {
      step++;
      const p = 1 - Math.pow(1 - step / steps, 3);
      setDisplay(Math.round(p * num) + suffix);
      if (step >= steps) clearInterval(t);
    }, 1200 / steps);
    return () => clearInterval(t);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export const SocialMediaDetails = () => {
  const [statsRef, statsIn] = useInView(0.1);
  const [servicesRef, servicesIn] = useInView(0.05);
  const [whyRef, whyIn] = useInView(0.1);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* ── STATS SECTION (Overlapping Hero) ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-6 relative z-20">
        <div
          ref={statsRef}
          className="bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white p-8 md:p-12 rounded-[2rem]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 md:divide-x divide-slate-200/60">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group flex flex-col items-center justify-center text-center transition-all duration-700 ease-out transform ${statsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <Counter value={stat.number} />
                </div>
                <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES / CAROUSEL SECTION ─────────────────────── */}
      <section className="py-8 mx-auto px-6 my-8 md:px-12 rounded-3xl">
        <div ref={servicesRef}>
          {/* Header */}
          <div
            className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${servicesIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Platform Domination
            </h2>
            <p className="text-lg text-slate-600">
              Native social strategies designed to capture human attention and
              spark virality.
            </p>
          </div>

          {/* Swiper Slider Wrapper */}
          <div
            className={`transition-all duration-700 delay-300 ${servicesIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="w-full !pb-12"
            >
              {services.map((svc, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="relative h-85 rounded-3xl overflow-hidden group cursor-pointer"
                    style={{
                      backgroundImage: `url(${svc.Image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute top-0 -right-1 z-20 ">
                      <Image
                        src={angletop}
                        width={200}
                        height={200}
                        alt="Design mask overlay"
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Bottom-Up Shadow Gradient for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-transparent transition-opacity duration-300 group-hover:opacity-95"></div>

                    {/* Content Overlaid at the Bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 flex flex-col justify-between h-full z-10">
                      <div className="text-white bg-white/10 backdrop-blur-md w-fit p-3 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300 mt-2">
                        {svc.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl! font-medium text-white tracking-tight mb-2">
                          {svc.title}
                        </h4>
                        <p className="text-white/70 text-sm font-medium mb-2 group-hover:text-white/90 transition-colors duration-300">
                          {svc.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US SECTION ─────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-24">
        <div
          ref={whyRef}
          className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side: Copy */}
          <div
            className={`transition-all duration-700 ease-out ${whyIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
              An attention engine engineered for{" "}
              <span className="text-primary italic">
                unrivaled culture-fit.
              </span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Oasis Ascend breaks through the digital static. We don't just
              accumulate hollow analytics or vanity likes; we turn attention
              into currency by treating social media as your primary mechanism
              for community growth and commercial intent.
            </p>

            <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl border-l-4 border-l-sky-500">
              <p className="text-slate-700 font-medium italic">
                "They stopped treating our channels like digital billboards and
                started building an asset. Our organic video pipeline alone
                scaled our DTC checkouts by 4.5X."
              </p>
              <div className="mt-4 font-bold text-slate-900 text-sm">
                VP of Growth, NeoAesthetic Brands
              </div>
            </div>
          </div>

          {/* Right Side: Features List */}
          <div className="space-y-6">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 transition-all duration-700 ease-out ${whyIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="text-xl font-medium text-slate-900 mb-1">
                    {reason.title}
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
