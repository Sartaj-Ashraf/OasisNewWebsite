import { Button } from "@/shared/ClickAble";
import Image from "next/image";
import React from "react";
import svgImg from "@/assets/svg/angle-button-end.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import bgImage from "@/assets/Digital3.jpg";
export const Overview = () => {
  return (
    <div
      className="flex flex-col gap-4 relative  w-full h-[400px] md:h-[500px] sm:col-span-3 text-white p-6 rounded-3xl overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div className="absolute inset-0 bg-linear-to-br from-secondary-dark/90 to-transparent" /> */}
      <div className="absolute bottom-0 right-0  ">
        <Image src={svgImg} alt="svg" className="w-full h-full " />
        <Link
          href="/"
          className="absolute bottom-2 right-2 w-22 h-22 bg-black rounded-3xl flex items-center justify-center"
        >
          <span className="text-white -rotate-45 hover:rotate-0 transition-transform duration-300 ease-in-out cursor-pointer">
            <ArrowRight size={44} />
          </span>
        </Link>
      </div>
      <div className="relative z-10">
        <h2 className="font-medium">
          Empowering Your Business Growth with OasisAscend
        </h2>
        <p>
          OasisAscend drives business growth through impactful websites and
          digital marketing, creating engaging experiences that attract,
          connect, and convert audiences.
        </p>
        <div>
          <Button children="Explore Now" />
        </div>
      </div>
    </div>
  );
};
