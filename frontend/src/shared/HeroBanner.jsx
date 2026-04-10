import React from "react";
import { NavBar } from "./NavBar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logoColored.png";
import TextSlider from "./TextSlider";
import { Button } from "./ClickAble";

const HeroBanner = () => {
  return (
    <section className="relative h-screen  mt-8">
      {/* Logo */}
      <Link href="#" className="absolute top-5 left-5 z-10 ">
        <Image src={logo} alt="Logo" width={180} height={180} />
      </Link>
      <div className="hero bg-accent corner-shape-scoop absolute inset-0" />

      {/* Content Layer */}
      <div className="  relative z-10  py-4 md:py-8   h-full ">
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
