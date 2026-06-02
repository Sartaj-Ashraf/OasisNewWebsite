"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import whychooseus from "@/assets/rocket.png";

// ✅ DATA
const features = [
  {
    id: 1,
    title: "Startup Growth",
    description:
      "Oasis Ascend helps businesses build strong digital foundations with scalable web solutions and modern brand strategies.",
    color: "bg-teal-400",
  },
  {
    id: 2,
    title: "Campaign Strategy",
    description:
      "We create result-driven marketing campaigns that improve visibility, generate quality leads, and boost engagement.",
    color: "bg-purple-400",
  },
  {
    id: 3,
    title: "Business Optimization",
    description:
      "Our team delivers innovative technology and performance-focused solutions tailored for long-term business growth.",
    color: "bg-red-400",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="">
      <div className=" mx-auto grid md:grid-cols-2 gap-10 items-center">

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
          <span className="text-sm uppercase tracking-widest text-gray-400 mb-2">
            WHY CHOOSE US
          </span>

          <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-4 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Save Time & Effort <br /> With Oasis Ascend
          </h2>

          <p className="!text-lg text-gray-500 mb-4 max-w-md leading-relaxed">
            We help brands grow faster with smart digital solutions, creative strategies, and modern technology.
          </p>

          {/* LIST */}
          <div className="space-y-2">
            {features.map((item) => (
              <div key={item.id} className="flex items-start gap-3">

                {/* ICON */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white ${item.color}`}
                >
                  <Check size={14} />
                </div>

                {/* TEXT CONTENT */}
                <div>
                  <span className=" text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
                    {item.description}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}