import React from "react";
import { NavBar } from "./NavBar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logoColored.png";
import TextSlider from "./TextSlider";
import { Button } from "./ClickAble";
import svgImg from "@/assets/svg/angle-header.svg";

const HeroBanner = () => {
  return (
    <section className="relative  md:h-screen md:max-h-200  mt-8 ">
      <div className=" bg-accent corner-shape-scoop absolute inset-0 rounded-3xl" />
      {/* Content Layer */}
      <div className="  relative z-10  py-4 md:py-8 h-full ">
      {/* Logo */}
        <Link href="/" className="absolute -top-px left-0 z-10">
          <Image src={svgImg} alt="svg" className="md:w-full md:h-full " />
          <div className="z-20 absolute md:top-5 top-0 md:left-10 left-5">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-36 md:w-48  scale-105 "
            />
          </div>
        </Link>
        <NavBar />
        <div className="flex flex-col justify-center mt-8 h-full ">
          <h2 className=" md:ml-[20%] px-4 md:px-0 pt-4 font-medium text-gray-600">
            AI-Powered
          </h2>

          <TextSlider />
          <h2 className=" md:ml-[20%] px-4 md:px-0 font-medium text-gray-600">
            Crafted For Impact{" "}
          </h2>
          <p className="md:ml-[20%] px-4 md:px-0 text-black/70 lg:w-2xl my-4">
            From custom software to digital marketing, we create solutions that
            accelerate growth and deliver measurable results.{" "}
          </p>
          <Button
            link="/contact"
            className="mb-4 ml-4 w-fit button md:ml-[20%] bg-linear-to-br from-primary via-primary-dark to-primary-dark hover:from-primary-dark hover:via-primary-dark hover:to-primary text-white transition-all duration-300 ease-in-out"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
