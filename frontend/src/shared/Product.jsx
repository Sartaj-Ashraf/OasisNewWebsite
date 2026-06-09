"use client";

import Image from "next/image";
import { LinkBtn } from "./ClickAble";
import Logo from "@/assets/OurProductsLogo/MangoLogo.png";
import AnalysisImage from "@/assets/OurProductsLogo/AnalysisImage.jpeg";

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const FEATURES = [
  "Automated review requests via SMS & Email",
  "AI-powered response generator",
  "Real-time reputation dashboard",
  "Google Business Profile integration",
];

export default function ProductSection() {
  return (
    <section className="py-16 md:py-24" >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Label ── */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6" style={{ background: "var(--primary)" }} />
          <p className="text-[10.5px] font-bold uppercase tracking-[.22em]" style={{ color: "var(--secondary)" }}>
            Our Products
          </p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: text ── */}
          <div>

            {/* Name + logo */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={Logo}
                alt="MangoReview"
                width={36}
                height={36}
                className="object-contain"
              />
              <h2
                className="text-[32px] md:text-[40px] font-extrabold tracking-tight leading-none"
                style={{ color: "var(--secondary-dark)" }}
              >
                MangoReview
              </h2>
              <span
                className="inline-flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[.1em] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(16,185,129,.1)", color: "#065f46", border: "1px solid rgba(16,185,129,.2)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
                Live
              </span>
            </div>

            {/* Tagline */}
            <p className="text-[15px] font-semibold mb-4" style={{ color: "var(--secondary)" }}>
              Reputation Management, Automated.
            </p>

            {/* Description */}
            <p
              className="text-[14px] leading-[1.85] mb-7"
              style={{ color: "var(--text-secondary)" }}
            >
              MangoReview helps businesses collect, manage, and showcase Google reviews completely on autopilot. Stop chasing customers for feedback — let AI handle your reputation while you focus on running your business.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-2.5 mb-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--secondary-dark)", color: "var(--primary)" }}
                  >
                    <CheckIcon />
                  </div>
                  <span className="text-[13px] font-medium" style={{ color: "var(--secondary-dark)" }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-0.5" style={{ color: "var(--primary)" }}>
                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
              </div>
              <span className="text-[13px] font-bold" style={{ color: "var(--secondary-dark)" }}>4.8</span>
              <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>· 120+ reviews</span>
            </div>

            {/* CTA */}
            <LinkBtn
              link="https://mangoreview.in/"
              target="_blank"
              className="button mb-1 bg-linear-to-br from-primary via-primary to-primary-dark hover:primary-dark hover:via-primary hover:to-primary disabled:opacity-70"
            >
              Visit MangoReview
            </LinkBtn>

          </div>

          {/* ── RIGHT: image ── */}
          <div className="hidden lg:block w-full">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ paddingBottom: "70%" }}
            >
              <Image
                src={AnalysisImage}
                alt="MangoReview Analytics Dashboard"
                fill
                priority
                quality={100}
                className="object-cover object-left-top"
                sizes="(max-width: 1024px) 0px, 50vw"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}