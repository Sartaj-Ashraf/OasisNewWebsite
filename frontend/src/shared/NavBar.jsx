"use client";
import React, { useState } from "react";
import { navLinks } from "../utils/navLink";
import { LinkBtn } from "./ClickAble";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logoColored.png";
import Link from "next/link";
export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative w-full flex items-center justify-end gap-6 px-5 md:px-10 lg:gap-25 ">
      {/* Desktop Links */}
      <ul className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
          href={link.path}
            key={link.name}
            className="relative group cursor-pointer text-secondary text-sm md:text-base font-sans font-medium"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </ul>

      {/* Mobile Button */}
      <button className="lg:hidden z-50" onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </button>

      {/* Desktop CTA */}
      <div className="hidden md:block transition hover:scale-105 active:scale-95">
        <LinkBtn link="/contact-us" children="Contact-us" className={`bg-linear-to-br from-primary via-primary to-primary-dark hover:from-primary-dark hover:via-primary-dark  hover:to-primary`}/>
      </div>

      {/* 🔥 Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 🔥 Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm rounded-l-3xl bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <Link href="/"><Image src={logo} alt="Logo" width={120} height={120} /></Link>
          <button onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 p-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
              href={link.path}
                key={link.name}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition cursor-pointer ${
                  isActive ? "text-black font-semibold" : "text-gray-500"
                } hover:text-black`}
              >
                {link.name}
              </Link>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="px-6 mt-4">
          <LinkBtn link="/contact-us" children="Get Started" className={`bg-linear-to-br from-primary via-primary to-primary-dark hover:from-primary hover:via-primary hover:to-primary-dark`}/>
        </div>
      </div>
    </nav>
  );
};
