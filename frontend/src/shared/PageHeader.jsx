"use client";

import React from "react";
import { NavBar } from "./NavBar";
import Image from "next/image";
import logo from "@/assets/logoColored.png";
import svgImg from "@/assets/svg/angle-header.svg";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const PageHeader = ({title}) => {
  return (
    <section className="relative h-screen max-h-[55vh] my-8">  
      {/* Top SVG + Logo */}
      <div className="absolute -top-[1px] left-0 z-20">
        <Image
          src={svgImg}
          alt="svg"
          className=" w-full md:w-full md:h-full"
        />
        <Link href='/' className="flex items-center gap-2 absolute md:top-5 top-2 md:left-10 left-5 z-40">
       <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-44 md:w-48"
          />
       
        </Link>
      </div>

      {/* Background */}
      <div className="bg-accent corner-shape-scoop absolute inset-0 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col py-4 md:py-8">
        
        {/* Navbar */}
        <NavBar />

        {/* Centered Title */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <h1 className="font-semibold text-2xl md:text-7xl! text-black/80 text-center">
            {title}
          </h1>

          <p className="text-sm md:text-base flex items-center gap-1">
            Home <ChevronRight size={16}/> <span className="text-secondary">{title}</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default PageHeader;