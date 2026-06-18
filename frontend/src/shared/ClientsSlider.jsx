"use client";

import React, { useEffect, useState } from "react";
import { getClientsService } from "@/services/clients.service";
import { BrandMarqueeSkeleton } from "@/components/skeleton/BrandMarqueeSkeleton";

// 1. Refactored Brand Item with Grayscale-to-Color UX
const BrandItem = ({ brand, isDuplicate }) => {
  const src =
    typeof brand?.coverImage?.url === "string"
      ? brand.coverImage.url
      : brand?.coverImage?.url?.src;

  if (!src) return null;

  return (
    <div 
      className="flex items-center justify-center min-w-[160px] md:min-w-[220px] p-6 group cursor-pointer"
      aria-hidden={isDuplicate ? "true" : undefined}
    >
      <img
        src={src}
        alt={brand?.name || "Partner Brand"}
        className="h-10 md:h-14 w-auto object-contain transition-all duration-400 ease-in-out grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1"
      />
    </div>
  );
};

// 2. Reusable Marquee Row Component
const MarqueeRow = ({ brands, speed = "40s" }) => {
  // Two sets are mathematically perfect for a -50% translation loop
  const duplicatedBrands = [...brands, ...brands]; 

  return (
    <div className="flex overflow-hidden group">
      <div
        className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused]"
        style={{ animationDuration: speed }}
      >
        {duplicatedBrands.map((brand, index) => (
          <BrandItem
            key={`brand-${brand?._id || index}-${index}`}
            brand={brand}
            isDuplicate={index >= brands.length}
          />
        ))}
      </div>
    </div>
  );
};

// 3. Main Marquee Component
export default function BrandMarquee() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const res = await getClientsService();
        const data = res?.data || [];
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <BrandMarqueeSkeleton />;
  if (!brands.length) return null;

  return (
    <>
      <style jsx global>{`
        .animate-marquee-left {
          animation: marqueeLeft linear infinite;
        }

        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Accessibility: Stop animation for users sensitive to motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left {
            animation: none;
          }
          .group > div {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      {/* Change 'bg-white' to match your site's background color */}
      <section className="p bg-white overflow-hidden relative border-y border-gray-50">
        
        <div className="container mx-auto px-4 text-center mb-2">
          <h2 className="text-sm md:text-base font-medium text-secondary-dark ">
            Trusted by innovative companies
          </h2>
        </div>

        {/* Single Marquee Container with Gradient Fades */}
        <div className="relative">
          {/* Left Gradient Mask */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          
          {/* Single Row */}
          <MarqueeRow brands={brands} speed="40s" />

          {/* Right Gradient Mask */}
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </>
  );
}