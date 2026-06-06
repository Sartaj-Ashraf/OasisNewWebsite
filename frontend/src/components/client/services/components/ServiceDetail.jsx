import React from "react";
import bgImage from "@/assets/MarketingBg.png";
import bgShape from "@/assets/svg/service-block-cover.svg";
import { CheckIcon } from "lucide-react";

export const ServiceDetail = ({ content }) => {
  return (
    <div
      className="w-full md:h-screen rounded-2xl p-4 md:p-8 relative flex"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute right-0 top-0 bottom-0 items-center select-none z-1 hidden sm:flex">
        <span
          className="font-medium tracking-tighter text-8xl text-white/30 p-6"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {content.sideText}
        </span>
      </div>

      <div className="relative md:w-3xl h-full flex flex-col overflow-hidden">
        <div
          className="p-8 md:bg-cover rounded-2xl bg-right h-full"
          style={{
            backgroundImage: `url(${bgShape.src})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-xs font-bold tracking-[0.15em] text-purple-800 mb-4">
            {content.label}
          </p>

          <h2
            className="text-[#0f0f1a] mb-4"
            style={{
              fontSize: "clamp(22px, 4vw, 42px)",
              letterSpacing: "-0.5px",
            }}
          >
            {content.title}
          </h2>

          <p className="text-sm leading-relaxed text-[#3a3a4a] mb-7 max-w-xl">
            {content.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {content.features.map((item) => (
              <div key={item} className="flex items-center gap-2 w-fit">
                <CheckIcon size={18} />
                <span className="text-sm font-medium text-[#1a1a2e]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button className="px-7 py-3 rounded-full text-sm font-semibold border border-violet-700 text-purple-900 bg-transparent transition-all duration-200 hover:bg-violet-700 hover:text-white cursor-pointer tracking-wide w-fit">
            {content.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};