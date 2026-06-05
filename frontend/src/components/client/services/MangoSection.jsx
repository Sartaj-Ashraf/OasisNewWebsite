"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Automated Review Requests",
    desc: "Send perfectly timed review invites via email or SMS — right after a purchase, service, or interaction.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Multi-Platform Aggregation",
    desc: "Collect and display reviews from Google, Facebook, Trustpilot, and more in one unified dashboard.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    title: "Reputation Analytics",
    desc: "Track your average rating, review velocity, and sentiment trends over time with clear visual reports.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    title: "Review Widgets",
    desc: "Embed beautiful, on-brand review widgets on your website to build trust and convert more visitors.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Respond & Engage",
    desc: "Reply to reviews directly from the dashboard — keep your reputation warm and your customers heard.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Negative Review Alerts",
    desc: "Get instant alerts for low-rated reviews so you can respond quickly before issues escalate.",
  },
];

const stats = [
  { value: "3.5×", label: "more reviews collected" },
  { value: "92%", label: "average open rate on review requests" },
  { value: "48h", label: "average setup time" },
];

const testimonials = [
  {
    name: "Priya Nair",
    role: "Owner, The Spice Garden",
    text: "Mango tripled our Google reviews in 6 weeks. Our restaurant now shows up first in local search. It just works.",
    rating: 5,
  },
  {
    name: "James Rutherford",
    role: "GM, AutoDrive Dealership",
    text: "We were struggling with a handful of bad reviews drowning us out. Mango helped us flood in the good ones — legitimately.",
    rating: 5,
  },
  {
    name: "Sana Mirza",
    role: "Founder, Wellness & Co.",
    text: "The widget on our site alone converted 3 high-value clients last month. Pure social proof, beautifully displayed.",
    rating: 5,
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function MangoSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── Hero ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div>
            {/* Product badge */}
            <div className="inline-flex items-center gap-2 bg-[#FFF7ED] border border-[#FED7AA] rounded-full px-3 py-1 mb-6">
              <span className="text-[10px] font-semibold tracking-widest text-orange-500 uppercase">
                Product by Oasis Ascend
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6">
              Turn happy customers into{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-500">reviews</span>
                <span
                  className="absolute bottom-1 left-0 w-full h-3 bg-orange-100 -z-0 rounded"
                  aria-hidden="true"
                />
              </span>{" "}
              that win you business.
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Mango is a review gathering and reputation management tool. Collect, manage, and showcase customer reviews across every major platform — on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm rounded-xl px-6 py-3.5"
              >
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 font-semibold text-sm rounded-xl px-6 py-3.5"
              >
                See a Demo
              </Link>
            </div>
          </div>

          {/* Stats card panel */}
          <div className="grid grid-cols-1 gap-4">
            {/* Mock UI preview card */}
            <div className="bg-gray-950 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  </div>
                  <span className="text-sm font-semibold">Mango Dashboard</span>
                </div>
                <span className="text-xs text-gray-400">Live</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {stats.map((s, i) => (
                  <div key={i} className="bg-gray-900 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-orange-400">{s.value}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Mini review feed */}
              <div className="space-y-2">
                {[
                  { name: "Sarah M.", text: "Absolutely brilliant service!", platform: "G" },
                  { name: "Tom K.", text: "5 stars, would recommend.", platform: "FB" },
                  { name: "Anita R.", text: "Best decision we made.", platform: "TP" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-900 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {r.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-300 truncate">{r.text}</div>
                    </div>
                    <div className="text-[9px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                      {r.platform}
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} width="8" height="8" viewBox="0 0 24 24" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Features ── */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">What Mango Does</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Everything you need to own<br className="hidden sm:block" /> your online reputation.
            </h3>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 group ${
                  activeFeature === i
                    ? "border-orange-200 bg-orange-50"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    activeFeature === i ? "bg-orange-500 text-white" : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {f.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1.5">{f.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="mb-24 bg-gray-950 rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-orange-400 uppercase mb-3">How It Works</p>
            <h3 className="text-3xl font-bold text-white">Up and running in minutes.</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {/* connector line desktop */}
            <div className="hidden sm:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-orange-500/30 via-orange-500/60 to-orange-500/30" />

            {[
              {
                step: "01",
                title: "Connect your platforms",
                desc: "Link your Google Business, Facebook, and other review channels in one click.",
              },
              {
                step: "02",
                title: "Set your campaigns",
                desc: "Define who gets review requests, when, and through which channel — SMS or email.",
              },
              {
                step: "03",
                title: "Watch reviews roll in",
                desc: "Monitor incoming reviews, respond, and publish the best ones to your website automatically.",
              },
            ].map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-400 font-bold text-lg font-mono">{s.step}</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{s.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">Real Results</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Businesses love Mango.</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <StarRating count={t.rating} />
                  <p className="text-gray-700 text-sm leading-relaxed mt-4 mb-6">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{t.name}</div>
                    <div className="text-[11px] text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div className="bg-orange-500 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to grow your reputation?
            </h3>
            <p className="text-orange-100 text-sm">
              Start free. No contracts. Cancel anytime.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50 transition-colors text-orange-600 font-semibold text-sm rounded-xl px-6 py-3.5"
            >
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold text-sm rounded-xl px-6 py-3.5"
            >
              Talk to Sales
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}