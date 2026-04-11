"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import whychooseus from "@/assets/OurTeam/shahid.jpeg";

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-[#f5f6f7] to-white py-24 px-6 md:px-16">
      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-teal-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="relative w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={whychooseus}
              alt="Why Choose Us"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
              priority
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Save Time & Effort <br /> With the Ewebot
          </h2>

          <p className="text-gray-500 mb-10 max-w-md leading-relaxed">
            Ad nec unum copiosae. Sea ex everti labores, ad option iuvaret qui muva.
          </p>

          {/* LIST */}
          <div className="space-y-5">

            {/* ITEM */}
            {[
              {
                text: "For startups and growing businesses, an online specialist can develop a digital marketing plan.",
                color: "from-teal-400 to-cyan-400",
              },
              {
                text: "Your digital consultant will also be able to kickstart campaigns and maximise your marketing budget.",
                color: "from-purple-400 to-pink-400",
              },
              {
                text: "Lorem ipsum dolor sit amet, vix an natum labitur eleif, mel amet laoreet.",
                color: "from-red-400 to-orange-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/70 backdrop-blur shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                {/* ICON */}
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg`}
                >
                  <Check size={18} />
                </div>

                {/* TEXT */}
                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}