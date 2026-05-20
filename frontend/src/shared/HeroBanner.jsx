import React from "react";
import { NavBar } from "./NavBar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logoColored.png";
import TextSlider from "./TextSlider";
import { Button } from "./ClickAble";
import svgImg from '@/assets/svg/angle-header.svg'

const HeroBanner = () => {
  return (
    <section className="relative h-screen max-h-[800px]  mt-8">
      {/* Logo */}
       <div className="absolute -top-[1px] left-0 z-10">
                     <Image src={svgImg} alt="svg" className="md:w-full md:h-full " />
                     <div className="flex items-center gap-2 absolute md:top-5 top-0 md:left-10 left-5">
                        <Image
                         src={logo}
                         alt="logo"
                         width={100}
                         height={100}
                         className="w-36 md:w-48"
                       />
                     </div>
                   </div>
      <div className=" bg-accent corner-shape-scoop absolute inset-0 rounded-3xl" />

      {/* Content Layer */}
      <div className="  relative z-10  py-4 md:py-8 h-full ">
        <NavBar />
        <div className="flex flex-col justify-center h-full ">
          <h1 className="md:ml-[20%] px-4 md:px-0 font-medium text-black/70">AI-Powered</h1>

          <TextSlider />
          <h1 className="md:ml-[20%] px-4 md:px-0 font-medium text-black/70">
            Smart Solutions
          </h1>
          <p className="md:ml-[20%] px-4 md:px-0 text-black/70 lg:w-xl">
            AI-powered SEO (Search Engine Optimization) offers a bunch of
            benefits that can save time, boost rankings, and make your digital
            strategy way more efficient.
          </p>
          <Button className="w-fit button md:ml-[20%]">Get Started</Button>
        </div>
      </div>

      <div></div>
    </section>
  );
};

export default HeroBanner;
