"use client";
import React from "react";
import Image from "next/image";
import bgImage from "@/assets/svg/download.svg";
import { Button } from "@/shared/ClickAble";
import { socailLinks, contactLinks } from "@/utils/navLink";
import contactBg from "@/assets/contact.png"
import Link from "next/link";
export const ContactSection = () => {
  return (
    <section className="mt-10 px-4">
      <div className="relative overflow-hidden rounded-3xl p-8" 
      style={{
        backgroundImage: `url(${contactBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.8,
      }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/50 to-transparent"></div>
        <div className="grid lg:grid-cols-2 gap-8 relative z-10">
          {/* LEFT CONTENT */}
         <div className="text-white space-y-8 relative z-10">
            <h2 className="text-secondary-dark font-medium  leading-tight">
              We’re here to help with your questions.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              
              {/* CONTACT INFO */}
              {contactLinks.map((item, index) => (
                <div key={index}>
                  <p className="text-black mb-2">{item.label}</p>

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-base font-medium break-all text-black hover:underline"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <span className="text-base font-medium text-black">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}

              {/* SOCIAL */}
              <div>
                <p className="text-black mb-2">Social</p>
                <ul className="flex gap-4 text-black">
                  {socailLinks.map((link, index) => (
                    <li
                      key={index}
                      className="hover:text-yellow-400 transition transform hover:scale-110"
                    >
                      <a href={link.path} target="_blank">
                        <link.icon className="w-5 h-5 hover:text-primary-light" size={24} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* RIGHT FORM CARD */}
          <div className="relative w-full max-w-xl mx-auto">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 ">
              <Image
                src={bgImage}
                alt="form bg"
                fill
                className="object-cover rounded-3xl opacity-80"
              />
            </div>

            {/* FORM CONTAINER */}
            <div
              className=" rounded-3xl p-6 flex flex-col justify-between h-full min-h-[420px] max-h-[550px] "
              style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h2 className="font-medium mb-4">
                Get In Touch
              </h2>

              <form className="flex flex-col justify-between flex-1">
                <div className="space-y-5">
                  <input
                    type="text"
                    placeholder="Name*"
                    className="w-full border-b border-gray-300 bg-transparent outline-none py-2 focus:border-black text-sm sm:text-base"
                  />

                  <input
                    type="email"
                    placeholder="E-mail*"
                    className="w-full border-b border-gray-300 bg-transparent outline-none py-2 focus:border-black text-sm sm:text-base"
                  />

                  <textarea
                    placeholder="Message*"
                    rows={3}
                    className="w-full border-b border-gray-300 bg-transparent outline-none py-2 focus:border-black resize-none text-sm sm:text-base"
                  />
                </div>

                <Button type="submit" className="button mt-6 ">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
