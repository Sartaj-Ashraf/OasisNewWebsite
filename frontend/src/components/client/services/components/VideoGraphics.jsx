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
  { number: "500+", label: "Projects Delivered" },
  { number: "10M+", label: "Views Generated" },
  { number: "300+", label: "Creative Assets Designed" },
  { number: "98%", label: "Client Satisfaction" },
];

const services = [
  {
    icon: <Video className="w-6 h-6" />,
    title: "Professional Video Editing",
    desc: "Transform raw footage into engaging videos optimized for marketing, social media, and brand storytelling.",
    Image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Motion Graphics",
    desc: "Bring ideas to life with dynamic animations, transitions, titles, and visual effects.",
    Image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Brand Identity Design",
    desc: "Create memorable logos, brand systems, typography, and visual guidelines that define your business.",
    Image:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Social Media Design",
    desc: "Design eye-catching posts, stories, banners, and ad creatives tailored for every platform.",
    Image:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Marketing Materials",
    desc: "Create brochures, flyers, presentations, and promotional assets that strengthen your brand.",
    Image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Commercial Video Production",
    desc: "Produce professional promotional videos, product showcases, and advertising content.",
    Image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
  },
];

const reasons = [
  {
    title: "Creative-First Approach",
    desc: "Every design and video is crafted with storytelling, branding, and audience engagement at its core.",
  },
  {
    title: "Premium Visual Quality",
    desc: "From color grading and motion graphics to polished brand assets, we deliver professional-quality creative work.",
  },
  {
    title: "Multi-Platform Optimization",
    desc: "We create content tailored for social media, websites, advertisements, presentations, and marketing campaigns.",
  },
  {
    title: "Fast & Reliable Delivery",
    desc: "Our streamlined creative process ensures high-quality output delivered on time without compromising quality.",
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

export const VideoGraphics = () => {
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
            <h2 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
              Creative excellence designed for{" "}
              <span className="text-primary italic">
                impactful brand storytelling.
              </span>
            </h2>
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
              Oasis Ascend helps businesses elevate their brand through
              professional video editing and graphic design services. From
              engaging social media content and promotional videos to complete
              brand identities and marketing materials, we create visuals that
              capture attention, communicate your message, and leave a lasting
              impression.
            </p>

            <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl border-l-4 border-l-sky-500">
              <p className="text-slate-700 font-medium italic">
                "The Oasis Ascend creative team transformed our brand presence.
                Their video editing and graphic design work helped us create
                more engaging content, improve brand consistency, and achieve
                significantly higher audience engagement."
              </p>
              <div className="mt-4 font-bold text-slate-900 text-sm">
                Creative Director, Client Partner
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
