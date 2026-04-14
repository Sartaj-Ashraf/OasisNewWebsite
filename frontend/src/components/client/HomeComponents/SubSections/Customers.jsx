import { LinkBtn } from "@/shared/ClickAble";
import React from "react";
import svgImg from "@/assets/svg/angle-top-end.svg";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Customers = () => {
  return (
    <div className="h-[300px] md:h-full relative md:col-span-1 bg-linear-to-br from-primary via-primary/70 to-primary/20 w-full p-4 rounded-3xl">
      <div className="absolute top-0 right-0">
        <Image src={svgImg} alt="svg" className="w-full h-full " />
        <Link
          href="/"
          className="absolute top-2 right-2 w-22 h-22 bg-black rounded-3xl flex items-center justify-center"
        >
          <span className="text-white -rotate-45 hover:rotate-0 transition-transform duration-300 ease-in-out cursor-pointer">
            <ArrowRight size={44} />
          </span>
        </Link>
      </div>
      <div className="flex flex-col justify-end h-full gap-4">
        <h3 className="font-medium text-white">AI Innovation Globally Proven</h3>
        <p className="text-white">Used by 50k+ people around the world</p>
        <LinkBtn link="/" children="Discover More" />
      </div>
    </div>
  );
};
