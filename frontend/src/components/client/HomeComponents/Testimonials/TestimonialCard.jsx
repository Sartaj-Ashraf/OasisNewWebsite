import React, { useState, useRef } from "react";
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import svgImg from "@/assets/svg/angle-start.svg";
import bgImage from "@/assets/testimonialBg.png";
import quorte from "@/assets/svg/quotes.svg";
import avatarDefault from "@/assets/svg/avatarDefault.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TestimonialCard = ({ testimonials = [] }) => {
  const [current, setCurrent] = useState(0);
  const splideRef = useRef(null);
  // Navigate to a specific index (for dots)
  const goToSlide = (index) => {
    if (splideRef.current) {
      splideRef.current.splide.go(index);
    }
  };

  // Navigate to Previous Slide
  const goPrev = () => {
    if (splideRef.current) {
      splideRef.current.splide.go("<");
    }
  };

  // Navigate to Next Slide
  const goNext = () => {
    if (splideRef.current) {
      splideRef.current.splide.go(">");
    }
  };

  return (
    <div className="h-[70vh] md:h-[90vh] relative md:flex-1 rounded-3xl   overflow-hidden flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
        }}
      />

      <Image
        src={quorte}
        alt="quorte"
        width={130}
        height={130}
        className="relative z-10 shrink-0 pl-8"
      />

      {/* SPLIDE CAROUSEL */}
      <Splide
        ref={splideRef}
        hasTrack={false}
        options={{
          type: "fade",
          rewind: true,
          autoplay: true,
          interval: 4000,
          arrows: false,
          pagination: false,
        }}
        onMove={(splide, newIndex) => setCurrent(newIndex)}
        className="flex-1 flex flex-col relative z-10 "
      >
        <SplideTrack className="flex-1 h-full">
          {testimonials.map((item, i) => (
            <SplideSlide key={i} className="flex flex-col h-full w-full ">
              <span className="px-8 text-lg md:text-3xl text-secondary-dark font-semibold line-clamp-4 my-auto h-full flex items-center pb-8">
                {item?.testimonial}
              </span>

              <div className="relative ">
                <Image
                  src={svgImg}
                  alt="svg"
                  className="absolute -bottom-1 -left-1 w-[70%] md:w-[50%] z-0 pointer-events-none"
                />

                {/* Desktop author */}
                <div className="flex items-center gap-2 absolute bg-linear-to-r from-teal-500/30 via-teal-300/20 to-transparent w-[35%]  px-2 py-1 rounded-full bottom-0 left-3 mt-4">
                 <div className="w-8 h-8 md:w-14 md:h-14 rounded-full  bg-white overflow-hidden flex items-center justify-center">

                  <Image
                    src={item?.image?.url || avatarDefault}
                    alt="image"
                    width={80}
                    height={80}
                    unoptimized
                    className="object-cover"
                    />
                    </div>
                  <p className="text-base! text-secondary capitalize font-bold">
                    {item?.name}
                  </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>

      {/* STATIC NAVIGATION CONTROLS */}
      {testimonials.length > 1 && (
        <>
          {/* Desktop Navigation (Dots + Arrows Bottom Right) */}
          <div className="flex items-center justify-end gap-1 md:gap-4 absolute bottom-2 right-2 z-20">
            {/* Prev Button */}
            <button
              onClick={goPrev}
              className="text-xl w-10 h-10 md:w-16 md:h-16  bg-black flex items-center justify-center text-white rounded-xl md:rounded-2xl font-bold hover:scale-110 transition-transform"
            >
              <ChevronLeft size={24} />
            </button>
            {/* Next Button */}
            <button
              onClick={goNext}
              className="  w-10 h-10 md:w-16 md:h-16  bg-black flex items-center justify-center text-white rounded-xl md:rounded-2xl font-bold hover:scale-110 transition-transform"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
