"use client";

import React, { useEffect, useState } from "react";
import { getClientsService } from "@/services/clients.service";
import { BrandMarqueeSkeleton } from "@/components/skeleton/BrandMarqueeSkeleton";

const BrandItem = ({ brand }) => {
  const src =
    typeof brand?.coverImage?.url === "string"
      ? brand.coverImage.url
      : brand?.coverImage?.url?.src;

  if (!src) return null;


  return (
    <div className="flex items-center justify-center min-w-[180px] md:min-w-[240px]">
      <img
        src={src}
        alt={brand?.name || "Brand"}
        className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
};

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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);
  if (loading) {
    return (
      <BrandMarqueeSkeleton />
    );
  }
  if (!brands.length) {
    return null;
  }

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <>
      <style jsx global>{`
          .marquee-left {
            animation: marqueeLeft 50s linear infinite;
          }
          .marquee-left-reverse {
            animation: marqueeLeft 35s linear infinite;
          }
          .marquee-right {
            animation: marqueeRight 50s linear infinite;
          }

          .marquee-left:hover,
          .marquee-right:hover {
            animation-play-state: paused;
          }

          @keyframes marqueeLeft {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @keyframes marqueeRight {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>

      <section className="py-12 overflow-hidden">
        <div className="container mx-auto ">
          <div className="space-y-10">
            <div className="overflow-hidden">
              <div className="marquee-left-reverse flex gap-12 w-max">
                {duplicatedBrands.map((brand, index) => (
                  <BrandItem
                    key={`row1-${brand?._id || index}-${index}`}
                    brand={brand}
                  />
                ))}
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="marquee-right flex gap-12 w-max">
                {duplicatedBrands.map((brand, index) => (
                  <BrandItem
                    key={`row2-${brand?._id || index}-${index}`}
                    brand={brand}
                  />
                ))}
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="marquee-left flex gap-12 w-max">
                {duplicatedBrands.map((brand, index) => (
                  <BrandItem
                    key={`row3-${brand?._id || index}-${index}`}
                    brand={brand}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}