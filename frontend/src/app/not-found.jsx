"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search, Phone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/book-service", label: "Book a Service" },
  { href: "/contact", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center px-4">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--secondary) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, var(--secondary) 0px, transparent 1px, transparent 60px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto max-w-3xl text-center">
        {/* Giant 404 number */}
        <motion.div
          className="relative mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <span
            className="block text-[160px] sm:text-[200px] md:text-[240px] font-black leading-none select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px",
              WebkitTextStrokeColor: "color-mix(in srgb, var(--secondary) 8%, transparent)",
            }}
          >
            404
          </span>
          {/* Overlaid filled number, slightly offset */}
          <span
            className="absolute inset-0 flex items-center justify-center text-[150px] sm:text-[190px] md:text-[225px] font-black leading-none select-none"
            style={{
              color: "color-mix(in srgb, var(--secondary) 5%, transparent)",
              transform: "translate(4px, 4px)",
            }}
          >
            404
          </span>

          {/* Floating badge */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-white border border-gray-100 shadow-lg rounded-2xl px-5 py-3"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Search className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Page Not Found
            </span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        >
          Oops! Looks like this page{" "}
          <span className="text-transparent bg-clip-text bg-secondary">
            went missing
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10 font-light"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </motion.p>

        {/* Quick Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-2xl border border-gray-100 bg-white text-gray-600 text-sm font-medium hover:border-secondary/30 hover:bg-secondary/[0.03] hover:text-secondary transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:opacity-90 hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-secondary text-secondary font-bold px-6 py-3 rounded-full text-sm transition-all hover:bg-secondary/5"
          >
            <ArrowLeft className="w-4 h-4" />
            View Services
          </Link>
        </motion.div>

        {/* Support note */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-xs"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
        >
          <Phone className="w-3 h-3" />
          <span>
            Need help?{" "}
            <a
              href="tel:+11578365379"
              className="text-primary font-medium hover:underline"
            >
              Call us at +(1) 578-365-379
            </a>
          </span>
        </motion.div>
      </div>
    </section>
  );
}