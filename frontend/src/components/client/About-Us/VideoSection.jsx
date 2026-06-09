"use client";

import { useState, useEffect } from "react";

// Video data
const videos = [
  {
    id: 1,
    video: "/videos/offvideo.mp4",
    title: "Outstanding",
    description:
      "Using AI for SEO is super helpful! It can save you time, improve your rankings, and really amp up your online strategy.",
  },
  {
    id: 2,
    video: "/videos/offvideo.mp4",
    title: "Grow Faster With Smart AI",
    description:
      "Leverage AI-powered tools to boost your growth, automate tasks, and scale your business efficiently.",
  },
  {
    id: 3,
    video: "/videos/offvideo.mp4",
    title: "Next Level Marketing Strategy",
    description:
      "Transform your digital marketing with data-driven strategies and intelligent automation.",
  },
];

export default function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentVideo = videos[currentIndex];

  return (
    <section>
      <div className="relative">

        {/* VIDEO CARD */}
        <div className="relative rounded-3xl overflow-hidden">

          {/* VIDEO */}
          <video
            key={currentIndex}
            src={currentVideo.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[400px] md:h-[500px] object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">

            <h2 className="text-white text-2xl md:text-5xl font-medium mb-4">
              {currentVideo.title}
            </h2>

            <p className="text-gray-200 max-w-xl text-sm md:text-lg leading-relaxed">
              {currentVideo.description}
            </p>

          </div>
        </div>

        {/* DOTS NAVIGATION */}
        <div className="flex justify-center mt-6 gap-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-black"
                  : "w-3 bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}