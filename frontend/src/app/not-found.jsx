"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, LifeBuoy } from "lucide-react";

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
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4 overflow-hidden relative select-none">
      
      {/* Decorative Light Glows */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-yellow-400/10 blur-[120px] rounded-full -z-0" />
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-blue-400/5 blur-[120px] rounded-full -z-0" />

      <div className="container text-center relative z-10">
        
        {/* Large 404 Text - Using Slate for Light Theme */}
        <motion.h1
          className="text-[120px] md:text-[200px] font-primary leading-none bg-gradient-to-b from-slate-200 to-transparent bg-clip-text text-transparent select-none"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-slate-900 -mt-10"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-slate-500 mt-4 max-w-md mx-auto text-lg"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          It seems the page you are looking for has been moved or doesn't exist. 
          Let’s get you back to the dashboard.
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <Link
            href="/admin"
            className="flex items-center gap-2 justify-center bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:scale-105 transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </Link>
          
          <Link
            href="/admin/support"
            className="flex items-center gap-2 justify-center bg-white text-secondary font-bold px-8 py-4 rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
          >
            <LifeBuoy className="w-5 h-5" />
            Contact Support
          </Link>
        </motion.div>

        {/* Brand Footer */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-2 grayscale opacity-50"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
        >
            <div className="w-6 h-6 bg-primary rounded-lg rotate-45 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span className="text-slate-900 font-bold tracking-tight">Oasis Ascend</span>
        </motion.div>

      </div>
    </section>
  );
}