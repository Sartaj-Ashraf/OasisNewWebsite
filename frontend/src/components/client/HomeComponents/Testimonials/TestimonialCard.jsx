import React from "react";
import Image from "next/image";
import svgImg from "@/assets/svg/angle-start.svg";
import bgImage from "@/assets/testimonialBg.png";
export const TestimonialCard = () => {
  return (
    <div className="h-[60vh] md:h-[90vh] relative  md:flex-1  rounded-3xl pl-10 p-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center W-[60%] -z-10 "
        style={{ 
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition:"center",
          backgroundRepeat:"no-repeat",
          opacity: 0.5
        }}
      ></div>
      <div className="absolute -bottom-1 -left-0 ">
        <Image src={svgImg} alt="svg" className="w-[70%] md:w-full md:h-full " />
        <div className="flex items-center gap-2 absolute md:bottom-10 bottom-5 md:left-5 left-3">
           <Image
            src="/path/to/image.jpg"
            alt="image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm text-secondary">Shahid Ajaz</p>
        </div>
      </div>
      <span className="text-xl md:text-4xl text-secondary-dark font-semibold my-auto h-full ">
        We specialize in creating, developing, and managing a brand’s identity
        to help businesses stand out in the marketplace and connect with their
        target audience.
      </span>
    </div>
  );
};
