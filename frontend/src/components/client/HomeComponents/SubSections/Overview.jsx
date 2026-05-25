import { LinkBtn } from "@/shared/ClickAble";
import Image from "next/image";
import React from "react";
import svgImg from "@/assets/svg/angle-button-end.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import bgImage from "@/assets/Digital3.webp";

export const Overview = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] sm:col-span-3 rounded-2xl overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/10 via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-10">
        
        {/* Top Content */}
        <div className="max-w-2xl">
          
          {/* Small Label */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm text-white/80 mb-6">
            ✦ Digital Growth Agency
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
            Empowering Your
            <span className="block bg-linear-to-r from-white via-primary to-primary-dark bg-clip-text text-transparent italic">
              Business Growth
            </span>
            with OasisAscend
          </h2>

          {/* Description */}
          <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-white max-w-xl">
            OasisAscend builds impactful websites and powerful digital
            experiences that attract audiences, strengthen brands, and
            accelerate business growth globally.
          </p>

          {/* Button */}
          <div className="mt-8">
            <LinkBtn
              link="/"
              children="Explore Now"
              className="bg-linear-to-r from-primary via-primary to-primary-dark text-white px-7 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/30"
            />
          </div>
        </div>

        {/* Bottom Right Arrow */}
        <div className="absolute bottom-0 right-0">
          <Image src={svgImg} alt="svg" className="w-full h-full" />

          <Link
            href="/"
            className="absolute bottom-2 right-2 w-22 h-22 bg-black rounded-3xl flex items-center justify-center"
          >
            <span className="text-white -rotate-45 hover:rotate-0 transition-transform duration-300 ease-in-out">
              <ArrowRight size={40} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};