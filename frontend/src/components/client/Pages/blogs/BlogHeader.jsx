"use client";

import React from "react";
import Image from "next/image";
import logo from "@/assets/logoColored.png";
import svgImg from "@/assets/svg/angle-header.svg";
import { ChevronRight } from "lucide-react";
import { NavBar } from "@/shared/NavBar";

export const BlogHeader = ({title}) => {
  return (
    <section className="relative h-[60vh] md:h-[70vh]  my-8">  
      {/* Top SVG + Logo */}
      <div className="absolute -top-[1px] left-0 z-10">
        <Image
          src={svgImg}
          alt="svg"
          className="md:w-full md:h-full"
        />
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

      {/* Background */}
      <div className="bg-accent corner-shape-scoop absolute inset-0 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col py-4 md:py-8">
        
        {/* Navbar */}
        <NavBar />

        {/* Centered Title */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <h2 className="md:w-5xl mx-auto  font-semibold text-black/80 text-center">
            {title}
          </h2>

          <p className="px-6 text-sm! md:text-base flex md:items-center gap-1">
           <span className="flex items-center self-start">Home <ChevronRight size={16}/> </span> <span className="text-gray-600">{title}</span>
          </p>
        </div>

      </div>
    </section>
  );
};

