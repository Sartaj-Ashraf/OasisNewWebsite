"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css";

export default function Marque() {
  const splideRef = useRef(null);

  const words = [
    "Web Development",
    "Digital Marketing",
    "SEO",
    "SMM",
    "E-commerce",
    "Business",
    "Crypto",
    "Creative",
  ];

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
    <div className="w-full overflow-hidden py-4 relative pt-10">
      
      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10
        bg-gradient-to-r from-white to-transparent" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10
        bg-gradient-to-l from-white to-transparent" />

      {/* SPLIDE */}
      <div className="splide" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {words.map((word, i) => (
              <li
                key={i}
                className="splide__slide whitespace-nowrap uppercase text-5xl md:text-8xl font-bold text-black/10"
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}