"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import angletop from "@/assets/svg/angle-top-right.svg";
// Import Swiper React components and core styles
import { Swiper, SwiperSlide } from 'swiper/react';
// Import required modules: Autoplay and Pagination (bubbles)
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination'; //
const stats = [
  { number: "250+", label: "Campaigns Delivered" },
  { number: "95%",  label: "Client Satisfaction" },
  { number: "5M+",  label: "Audience Reached" },
  { number: "3X",   label: "Average ROI" },
];

import { Share2, TrendingUp, Newspaper, Mail, BarChart3, Search } from "lucide-react";

const services = [
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Social Media Strategy",
    desc: "Build brand authority and drive organic engagement across all major social networks.",
    Image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // Abstract liquid matte geometry
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Performance Advertising",
    desc: "Maximize your reach with precision-targeted PPC and paid social campaigns.",
    Image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop", // 3D tech/neon grid structure
  },
  {
    icon: <Newspaper className="w-6 h-6" />,
    title: "Content Marketing",
    desc: "Distribute high-value content that educates your audience and accelerates conversions.",
    Image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", // Soft holographic glassmorphism
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Lifecycle Marketing",
    desc: "Automate email and SMS workflows to retain customers and increase lifetime value.",
    Image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1000&auto=format&fit=crop", // Vibrant mesh gradient wave
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Advanced Analytics",
    desc: "Gain crystal-clear visibility into your marketing performance with custom reporting dashboards.",
    Image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", // Dark cyber-network data nodes
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "SEO Optimization",
    desc: "Dominate search rankings and capture high-intent traffic with technical and on-page SEO.",
    Image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop", // Clean, minimal 3D architectural render
  },
];

const reasons = [
  { title: "Customised Marketing Strategies", desc: "We don't believe in one-size-fits-all. Every campaign is tailored to your specific market." },
  { title: "Data-Driven Decision Making", desc: "Every move we make is backed by rigorous data analysis and continuous A/B testing." },
  { title: "Transparent Reporting", desc: "Full access to your metrics 24/7. You always know exactly where your budget is going." },
  { title: "Growth-Focused Approach", desc: "Our ultimate metric is your revenue. If you aren't growing, we aren't succeeding." },
];

/* ── Scroll-reveal hook ───────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
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
    let step = 0, steps = 40;
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

export default function DigitalMarketingPage() {
  const [statsRef, statsIn] = useInView(0.1);
  const [servicesRef, servicesIn] = useInView(0.05);
  const [whyRef, whyIn] = useInView(0.1);

  return (
    <div className="min-h-screen ">
      
      {/* ── STATS SECTION (Overlapping Hero) ──────────────────────── */}
<section className="max-w-7xl mx-auto px-6 md:px-12 -mt-6 relative z-20">
  {/* Modern Glassmorphism Card */}
  <div 
    ref={statsRef} 
    className="bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white p-8 md:p-12 rounded-[2rem]"
  >
    {/* Grid with spacing adjustments for better breathing room */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 md:divide-x divide-slate-200/60">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={`group flex flex-col items-center justify-center text-center transition-all duration-700 ease-out transform ${statsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          {/* 
            Gradient Text & Interactive Scale:
            Numbers now have a sleek dark gradient and scale up slightly when hovered.
          */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            <Counter value={stat.number} />
          </div>
          
          {/* 
            Premium Typography for Labels:
            Using uppercase, extra tracking (letter-spacing), and a muted color for a high-end agency look.
          */}
          <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-[0.2em]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

   <section className="py-8 mx-auto px-6 my-8 md:px-12 rounded-3xl">
      <div ref={servicesRef}>
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${servicesIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Comprehensive Capabilities</h2>
          <p className="text-lg text-slate-600">End-to-end digital marketing services designed to dominate your market sector.</p>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className={`transition-all duration-700 delay-300 ${servicesIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
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
            slidesPerView={1} // Defaults to 1 for mobile
            loop={true}
            breakpoints={{
              // Tablet: Shows 2 cards
              640: { 
                slidesPerView: 2, 
                spaceBetween: 16 
              },
              // Standard Desktop and up: Shows exactly 4 cards
              1024: { 
                slidesPerView: 4, 
                spaceBetween: 24 
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
                    backgroundRepeat: "no-repeat"
                  }}
                >
                  <div className="absolute top-0 -right-1 z-20 ">
                   <Image src={angletop} width={200} height={200} className="object-cover w-full h-full"/>
                  </div>
                  {/* Bottom-Up Shadow Gradient for Legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-transparent transition-opacity duration-300 group-hover:opacity-95"></div>

                  {/* Content Overlaid at the Bottom */}
                  <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 flex flex-col justify-between h-full z-10">
                    
                    
                    <h4 className="text-2xl font-medium text-white tracking-tight">
                      {svc.title}
                    </h4>
                    <p className="text-white/70 text-sm font-medium mb-2  group-hover:text-white/90 transition-colors duration-300">
                      {svc.desc}
                    </p>
                    
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
        <div ref={whyRef} className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Copy */}
          <div className={`transition-all duration-700 ease-out ${whyIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <h2 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
              A partnership focused entirely on <span className="text-primary italic">measurable growth.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Oasis Ascend doesn't just execute campaigns; we act as an extension of your team. We combine enterprise-level technology with industry-leading expertise to deliver results you can see on your bottom line.
            </p>
            
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl border-l-4 border-l-secondary">
              <p className="text-slate-700 font-medium italic">
                "Their data-driven approach overhauled our entire acquisition strategy. We saw a 300% increase in qualified leads within the first quarter."
              </p>
              <div className="mt-4 font-bold text-slate-900 text-sm"> Director of Marketing, TechCorp</div>
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
                <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-blue-100 flex items-center justify-center text-secondary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-2xl! font-medium text-slate-900 mb-1">{reason.title}</h5>
                  <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    
    </div>
  );
}