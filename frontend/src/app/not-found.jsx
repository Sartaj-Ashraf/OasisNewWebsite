"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Wrench } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function NotFound() {
  return (
    <section className="login-bg flex items-center justify-center px-4">

      {/* Glow */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full" />

      <div className="container text-center relative z-10">

        {/* 404 */}
        <motion.h1
          className="text-[120px] md:text-[180px] font-black bg-gradient-to-b from-white/10 to-white/0 bg-clip-text text-transparent"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-white mt-2"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-400 mt-3 max-w-md mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          Looks like this page is broken or removed.
          Let’s get you back to fixing things with Gofixy.
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <Link
            href="/"
            className="flex items-center gap-2 justify-center bg-primary text-black font-semibold px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </motion.div>

        {/* Help */}
        <motion.p
          className="mt-10 text-gray-500 text-sm"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
        >
          Need help? <span className="text-yellow-400">Contact support</span>
        </motion.p>

      </div>
    </section>
  );
}