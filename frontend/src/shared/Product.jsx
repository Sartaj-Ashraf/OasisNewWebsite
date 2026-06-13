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
      <div className="mx-auto ">

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">

          {/* ── LEFT: text ── */}
          <div>

            {/* Name + logo */}
            <div className="flex flex-col gap-3 mb-4">
             
              <h2
                className=" font-meidum tracking-tight leading-none"
                style={{ color: "var(--secondary-dark)" }}
              >
                MangoReview
              </h2>
            
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
              MangoReview helps businesses collect, manage, and showcase Google reviews completely on autopilot. Stop chasing customers for feedback  let AI handle your reputation while you focus on running your business.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-2 mb-8">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center bg-secondary/20 text-secondary-dark"
               
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
          <div className="hidden flex-col items-center  gap-2 lg:block w-full">
           <div className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="MangoReview"
                width={100}
                height={100}
                className="object-contain"
              />
              <h4 className="text-gray-500 text-lg!">Dashboard</h4>
              </div>
            <div
              className="relative w-xl aspect-video shadow-xl overflow-hidden rounded-2xl"
             
            >
              <Image
                src={AnalysisImage}
                alt="MangoReview Analytics Dashboard"
                fill
                priority
                quality={100}
                className="object-contain "
                sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
               
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}