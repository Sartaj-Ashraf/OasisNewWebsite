import React from "react";
import { navLinks, socailLinks } from "@/utils/navLink";
import Image from "next/image";

import svgImg from "@/assets/svg/angle-header.svg";
import svgImgBottom from "@/assets/svg/angle-footer.svg";
import logo from "@/assets/logoColored.png";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="container py-6">
      <div className="md:h-[70vh] bg-secondary-dark rounded-3xl relative overflow-hidden">
        {/* TOP SVG */}
        <div className="absolute -top-[1px] left-0">
          <Image
            src={svgImg}
            alt="svg"
            className="w-[70%] md:w-full md:h-full"
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

        {/* BOTTOM SVG */}
        <div className="absolute md:-right-[1px] -right-26 -bottom-1 ">
          <Image
            src={svgImgBottom}
            alt="svg"
            width={100}
            height={100}
            className="w-full md:h-full"
          />

          <p className="text-secondary-dark absolute bottom-5 md:bottom-5 left-15 md:left-20 z-10 text-xs md:text-sm">
            Copyright © 2025 Oasis Ascend. All rights reserved.
          </p>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto p-4 h-full">
          <div className="flex flex-wrap items-start gap-10 md:gap-20 h-full py-24 md:py-20">
            {/* QUICK LINKS */}
            <div className="flex flex-col gap-3">
              <span className="text-lg md:text-3xl font-medium text-primary-light">
                Quick Links
              </span>

              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-white hover:text-primary-light transition-all flex items-center hover:translate-x-1 duration-200 ease-in-out "
                    >
                     <ArrowRight className="w-3.5 h-3.5 mr-2" /> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col gap-3">
              <span className="text-lg md:text-3xl font-medium text-primary-light">
                Contact Us
              </span>

              <ul className="flex flex-col gap-1">
                <li>
                  <p className="text-primary-light text-sm mb-1">
                    Email us
                  </p>  

                  <Link
                    href="mailto:sales@oasisascend.com"
                    className="text-white hover:text-primary transition-colors"
                  >
                    sales@oasisascend.com
                  </Link>
                </li>

                <li>
                  <p className="text-primary-light text-sm mb-1">
                    Call us
                  </p>

                  <Link
                    href="tel:+918491012121"
                    className="text-white hover:text-primary transition-colors"
                  >
                    +91 84910 12121
                  </Link>
                </li>

                <li>
                  <p className="text-primary-light text-sm mb-1">
                    WhatsApp
                  </p>

                  <Link
                    href="https://wa.me/918491012121"
                    target="_blank"
                    className="text-white hover:text-primary transition-colors"
                  >
                    +91 84910 12121
                  </Link>
                </li>

                <li>
                  <p className="text-primary-light text-sm mb-1">
                    Address
                  </p>

                  <span className="text-white">
                    Srinagar, Kashmir, India
                  </span>
                </li>
              </ul>
            </div>

            {/* SOCIAL */}
            <div className="md:absolute right-10 bottom-25 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                {socailLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-secondary-dark transition-all"
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};