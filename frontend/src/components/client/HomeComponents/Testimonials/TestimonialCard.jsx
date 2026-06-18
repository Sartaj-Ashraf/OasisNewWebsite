import React, { useState, useRef } from "react";
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import svgImg from "@/assets/svg/angle-start.svg";
import bgImage from "@/assets/testimonialBg.jpg";
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
    <div className=" relative  md:flex-1 rounded-3xl   overflow-hidden flex flex-col justify-between">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      />
    <div className="w-30 h-30 md:w-40 md:h-40 ">

       <Image
        src={quorte}
        alt="quorte"
        width={130}
        height={130}
        className="relative z-10 shrink-0 pl-8"
        />
        </div>

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
        className="flex-1 flex flex-col  relative z-10 "
      >
        <SplideTrack className="flex-1 h-full">
          {testimonials.map((item, i) => (
            <SplideSlide
              key={i}
              className="flex flex-col justify-between h-full w-full"
            >
              {/* Fixed Height Testimonial Section */}
              <div className="px-8 h-[180px] md:h-full flex items-center overflow-hidden">
                <span className="text-lg md:text-3xl text-shadow-md text-white font-semibold line-clamp-4 md:line-clamp-none">
                  "{item?.testimonial}" 
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative">
                  <Image
                    src={svgImg}
                    alt="svg"
                    className="-left-1  md:w-[70%] z-10 pointer-events-none"
                  />

                  <div className="flex items-center gap-2 bg-linear-to-r from-teal-500/30 via-transparent to-transparent z-20 px-2 py-2  h-fit  md:h-18 rounded-full absolute inset-0 mt-auto">
                    <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-white overflow-hidden flex items-center justify-center">
                      <Image
                        src={item?.image?.url || avatarDefault}
                        alt="image"
                        width={80}
                        height={80}
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <span className="text-sm md:text-base text-secondary capitalize font-bold">
                      {item?.name}
                    </span>
                  </div>
                </div>

                {testimonials.length > 1 && (
                  <div className="flex items-center gap-1 md:gap-4 z-20 px-4">
                    <button
                      onClick={goPrev}
                      className="text-xl w-10 h-10 md:w-16 md:h-16 bg-black flex items-center justify-center text-white rounded-xl md:rounded-2xl font-bold hover:scale-110 transition-transform"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onClick={goNext}
                      className="w-10 h-10 md:w-16 md:h-16 bg-black flex items-center justify-center text-white rounded-xl md:rounded-2xl font-bold hover:scale-110 transition-transform"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                )}
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
};
