"use client";
import React, { useState } from "react";
import { navLinks } from "../utils/navLink";
import { LinkBtn } from "./ClickAble";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logoColored.png";
export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative w-full flex items-center justify-end gap-6 px-5 md:px-10 lg:gap-25">
      {/* Desktop Links */}
      <ul className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className="relative group cursor-pointer text-secondary text-sm lg:text-lg font-medium"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Mobile Button */}
      <button className="lg:hidden z-50" onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </button>

      {/* Desktop CTA */}
      <div className="hidden md:block transition hover:scale-105 active:scale-95">
        <LinkBtn link="#" children="Get Started" />
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
          <Image src={logo} alt="Logo" width={120} height={120} />
          <button onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 p-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li
                key={link.name}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition cursor-pointer ${
                  isActive ? "text-black font-semibold" : "text-gray-500"
                } hover:text-black`}
              >
                {link.name}
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="px-6 mt-4">
          <LinkBtn link="#" children="Get Started" />
        </div>
      </div>
    </nav>
  );
};
