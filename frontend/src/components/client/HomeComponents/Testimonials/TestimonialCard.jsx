import React from "react";
import Image from "next/image";
import svgImg from "@/assets/svg/angle-start.svg";
import bgImage from "@/assets/testimonialBg.png";
import quorte from "@/assets/svg/quotes.svg";
import avatarDefault from "@/assets/svg/avatarDefault.png";
export const TestimonialCard = () => {
  return (
    <div className="md:h-[90vh] relative md:flex-1 rounded-3xl md:pl-10 p-4 md:p-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center  -z-10 "
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
        }}
      ></div>
      <Image src={quorte} alt="quorte" width={130} height={130} />
      <span className="text-xl md:text-3xl text-secondary-dark font-semibold line-clamp-4  my-auto h-full  ">
        We specialize in creating, developing, and managing a brand’s identity
        to help businesses stand out in the marketplace and connect with their
        target audience.
      </span>
      <div className="flex md:hidden items-center gap-2 mt-4">
        <Image
          src={
            // testimanial?.profileImage ? testimanial?.profileImage :
            avatarDefault
          }
          alt="image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <p className="text-base! text-secondary-dark">Shahid Ajaz</p>
      </div>
      <div className="absolute -bottom-1 -left-0 ">
        <Image src={svgImg} alt="svg" className="w-[70%] hidden md:block " />
        <div className="md:flex items-center  gap-2 hidden  absolute  bottom-5 md:left-5 left-3 mt-4">
          <Image
            src={
              // testimanial?.profileImage ? testimanial?.profileImage :
              avatarDefault
            }
            alt="image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <p className="text-base! text-secondary">Shahid Ajaz</p>
        </div>
      </div>
    </div>
  );
};
