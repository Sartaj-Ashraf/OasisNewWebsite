"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

export default function TextSlider() {
  const splideRef = useRef(null);

  const words = [
    "Digital Marketing",
    "Crypto",
    "SMM",
    "Business",
    "E-commerce",
    "Creative",
    "SEO",
  ];

 useEffect(() => {
  const isMobile = window.innerWidth < 768; // md breakpoint

  const splide = new Splide(splideRef.current, {
    type: "loop",
    autoWidth: true,
    focus: 0,
    trimSpace: false,
    padding: { left: isMobile ? "1rem" : "20%", right: "0" },
    gap: "40px",
    arrows: false,
    pagination: false,
    interval: 2400,
    speed: 1400,
    autoplay: true,
    drag: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    resetProgress: false,
  });

  splide.mount();

  // Rebuild on resize so padding stays in sync if user rotates device
  const handleResize = () => {
    splide.destroy();
    // trigger re-mount by updating a state flag if needed
  };

  return () => {
    splide.destroy();
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return (
    <div className="w-full overflow-hidden  relative">
      <div className="splide" ref={splideRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {words.map((word, i) => (
              <li
                key={i}
                className="splide__slide whitespace-nowrap text-4xl md:text-6xl md:h-[100px] flex items-center font-bold
                           text-black/10 [&.is-active]:text-transparent
                           [&.is-active]:bg-linear-to-r
                           [&.is-active]:from-secondary
                           [&.is-active]:via-secondary
                           [&.is-active]:to-secondary
                           [&.is-active]:bg-clip-text"
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