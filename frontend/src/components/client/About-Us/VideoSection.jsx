"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import thumb1 from "@/assets/OurTeam/shahid.jpeg";
import thumb2 from "@/assets/OurTeam/mehran.jpeg";
import thumb3 from "@/assets/OurTeam/asif.jpeg";

export default function VideoSection() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      id: 1,
      thumbnail: thumb1,
      video: "/videos/offvideo.mp4",
    },
    {
      id: 2,
      thumbnail: thumb2,
      video: "/videos/offvideo.mp4",
    },
    {
      id: 3,
      thumbnail: thumb3,
      video: "/videos/offvideo.mp4",
    },
  ];

  // ✅ AUTO SLIDE (5 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-[#f5f6f7] py-20 px-6 md:px-16">
      <div className=" container max-w-6xl mx-auto relative">

        {/* CAROUSEL */}
        <div className="relative group">

          {/* IMAGE */}
          <div
            onClick={() => setOpen(true)}
            className="relative rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={videos[currentIndex].thumbnail}
                alt="Video"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-xl hover:scale-110 transition">
                ▶
              </div>
            </div>
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* DOTS */}
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

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">

            {/* CLOSE */}
            <button
              className="absolute top-6 right-6 text-white text-3xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {/* VIDEO */}
            <div className="w-[90%] max-w-3xl aspect-video">
              <video
                src={videos[currentIndex].video}
                controls
                autoPlay
                muted
                className="w-full h-full rounded-xl shadow-2xl"
              />
            </div>

          </div>
        )}
      </div>
    </section>
  );
}