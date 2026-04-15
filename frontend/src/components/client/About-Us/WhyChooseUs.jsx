"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import whychooseus from "@/assets/videosection/whychooseus.webp";

// ✅ DATA (API READY STRUCTURE)
const features = [
  {
    id: 1,
    title: "Startup Growth",
    description:
      "For startups and growing businesses, an online specialist can develop a digital marketing plan to help you grow.",
    color: "bg-teal-400",
  },
  {
    id: 2,
    title: "Campaign Strategy",
    description:
      "Your digital consultant will also be able to kickstart campaigns and maximise your marketing budget.",
    color: "bg-purple-400",
  },
  {
    id: 3,
    title: "Business Optimization",
    description:
      "Lorem ipsum dolor sit amet, vix an natum labitur eleif, mel amet laoreet prois menandri.",
    color: "bg-red-400",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* LEFT IMAGE */}
        <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden">
          <Image
            src={whychooseus}
            alt="Why Choose Us"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p className="!text-lg uppercase tracking-widest text-gray-400 mb-3">
            WHY CHOOSE US
          </p>

          <h2 className="text-3xl md:text-5xl font-medium text-black leading-tight mb-4">
            Save Time & Effort With <br /> the Ewebot
          </h2>

          <p className="!text-lg text-gray-500 mb-5 max-w-md leading-relaxed">
            Ad nec unum copiosae. Sea ex everti labores, ad option iuvaret qui muva.
          </p>

          {/* LIST */}
          <div className="space-y-4">
            {features.map((item) => (
              <div key={item.id} className="flex items-start gap-3">

                {/* ICON (PERFECT CIRCLE) */}
                <div
                  className={`flex-shrink-0 w-6  h-6 rounded-full flex items-center justify-center text-white ${item.color}`}
                >
                  <Check size={14} />
                </div>

                {/* TEXT CONTENT */}
                <div>
                 
                  <p className="!text-lg text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}