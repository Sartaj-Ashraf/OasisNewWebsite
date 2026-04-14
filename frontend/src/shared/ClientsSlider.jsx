"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css";
import Image from "next/image";
import logo1 from "@/assets/clientlogo/1.png";
import logo2 from "@/assets/clientlogo/2.png";
import logo3 from "@/assets/clientlogo/3.png";
import logo4 from "@/assets/clientlogo/4.png";
import logo5 from "@/assets/clientlogo/5.png";
import logo6 from "@/assets/clientlogo/6.png";
export function ClientsSlider() {
  const splideRef = useRef(null);

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

  useEffect(() => {
    const splide = new Splide(splideRef.current, {
      type: "loop",
      drag: false,
      arrows: false,
      pagination: false,
      autoWidth: true,
      gap: "40px",

      speed: 0, // IMPORTANT: remove slide animation feel
      autoScroll: {
        speed: 1, // controls smooth continuous motion
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    });

    splide.mount({ AutoScroll });

    return () => splide.destroy();
  }, []);

  return (
    <div className="w-full overflow-hidden relative ">
      {/* LEFT FADE */}
      <div
        className="hidden lg:block pointer-events-none absolute left-0 top-0 h-full w-24 z-10
        bg-linear-to-r from-white to-transparent"
      />

      {/* RIGHT FADE */}
      <div
        className="hidden lg:block pointer-events-none absolute right-0 top-0 h-full w-24 z-10
        bg-linear-to-l from-white to-transparent"
      />

      {/* SPLIDE */}
      <div className="splide bg-black" ref={splideRef}>
        <div className="splide__track">
          <div className="splide__list flex items-center ">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="splide__slide whitespace-nowrap uppercase text-5xl md:text-8xl font-bold text-black/10"
              >
                <Image src={logo} alt={`Client ${i + 1}`} width={100} height={100} className=""  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
