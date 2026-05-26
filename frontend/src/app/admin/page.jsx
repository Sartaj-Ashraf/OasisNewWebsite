"use client";
import React from 'react';
import { Terminal, Target, Code, Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';

const Page = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-accent-light text-text-primary font-sans flex flex-col justify-between p-8 md:p-12">
      
      {/* =========================================================================
          🌀 BACKGROUND LIGHT INFRASTRUCTURE LAYER
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[160px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[140px] mix-blend-screen" />
      </div>

      {/* =========================================================================
          🌐 THE INDUSTRIAL QUOTES MATRIX (FLYING, STRETCHED & SCALED)
          ========================================================================= */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden p-4">
        
        {/* Quote 1: Top Left - Heavy Skew & Left Stretch */}
        <div 
          className="absolute left-[-2%] top-[8%] max-w-xl transition-all duration-700 opacity-20 hover:opacity-40"
          style={{ transform: 'matrix(1, 0, -0.12, 1, 0, 0) scale(1.15)' }}
        >
          <span className="text-[10vw] font-black tracking-tighter text-secondary/15 uppercase leading-none block select-none">CODE RUNS</span>
          <p className="text-sm! font-medium text-text-primary italic -mt-5 pl-6 border-l-2 border-secondary/40">
            "Software is a great combination between artistry and engineering. When you're looking at clean architecture, it looks like beautiful prose."
          </p>
        </div>

        {/* Quote 2: Top Right - High Elevation & Flying Rotation */}
        <div 
          className="absolute right-[5%] top-[15%] max-w-md text-right hidden md:block animate-float"
          style={{ transform: 'rotate(4deg) scale(0.95)' }}
        >
          <div className="flex items-center justify-end gap-2 text-primary-dark/40 mb-1">
            <Target className="w-4 h-4" /> <span className="text-xs font-mono tracking-widest">CONVERSION_FUNNEL</span>
          </div>
          <p className="text-xl! font-bold tracking-tight text-text-primary/70 leading-snug">
            "Marketing is too important to be left solely to the marketing department."
          </p>
          <span className="text-xs! font-semibold text-secondary mt-1 block uppercase tracking-wider">— musaib mushtaq</span>
        </div>

        {/* Quote 3: Left Center - Giant Stretched Structural Text Backdrop */}
        <div 
          className="absolute left-[8%] top-[40%] hidden lg:block"
          style={{ transform: 'skewY(-6deg) scale(1.3)' }}
        >
          <h2 className="text-7xl! font-extrabold tracking-tight text-accent-dark/40 uppercase font-mono select-none">
            BUILD <span className="text-transparent stroke-text">. MEASURE .</span> LEARN
          </h2>
        </div>

        {/* Quote 4: Right Center - Floating Perspective Script */}
        <div 
          className="absolute right-[-4%] top-[45%] max-w-lg hidden xl:block"
          style={{ transform: 'matrix(0.92, -0.05, 0.08, 0.95, 0, 0) scale(1.1)' }}
        >
          <p className="text-2xl! font-light text-text-secondary leading-relaxed">
            "The best marketing doesn't <strong className="font-semibold text-text-primary">feel</strong> like marketing. It feels like an answered prayer to a user's friction point."
          </p>
        </div>

        {/* Quote 5: Lower Left - Deep Engineering Terminal Layout */}
        <div 
          className="absolute left-[4%] bottom-[12%] max-w-lg hidden md:block text-left"
          style={{ transform: 'rotate(-2deg) scale(0.9)' }}
        >
          <div className="flex items-center gap-2 text-secondary/40 font-mono text-xs mb-2">
            <Terminal className="w-3.5 h-3.5" /> <span>sys_manifesto.log</span>
          </div>
          <blockquote className="text-base font-semibold text-text-primary/60 leading-normal">
            "Simplicity is the ultimate sophistication. If your software framework requires ten infrastructure layers before rendering a state, your system model is broken."
          </blockquote>
        </div>

        {/* Quote 6: Lower Right - Massively Scaled Typography Block */}
        <div 
          className="absolute right-[-2%] bottom-[6%] max-w-2xl text-right transition-transform duration-500 hover:scale-105"
          style={{ transform: 'matrix(1, 0, 0.08, 1, 0, 0) scale(1.05)' }}
        >
          <span className="text-[8vw] font-black tracking-tighter text-primary/10 uppercase leading-none block select-none">ATTENTION</span>
          <p className="text-base! font-medium text-text-primary italic mt-[-15px] pr-8 border-r-2 border-primary/40 inline-block max-w-md">
            "In the software economy, attention is the raw currency. Code builds the product, but growth hacking mechanics sustain the ecosystem."
          </p>
        </div>

      </div>

      {/* =========================================================================
          🔥 WORKSPACE HEADER & RUNTIME PIPELINE INTERFACE
          ========================================================================= */}
      <header className="relative z-20 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/20 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-accent rounded-xl border border-border/30 shadow-sm">
            <Cpu className="w-5 h-5 text-secondary animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg! font-bold tracking-tight text-text-primary font-mono">WORKSPACE_ENGINE</h1>
              <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono text-[9px] font-bold uppercase tracking-widest border border-secondary/20">v4.1.0</span>
            </div>
            <p className="text-base! text-text-secondary">Distributing real-time verification modules and telemetry routing protocols.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-accent/40 p-1 rounded-xl border border-border/10 self-start sm:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-text-secondary">
            <Activity className="w-3.5 h-3.5 text-secondary animate-ping" /> PIPELINE_ACTIVE
          </div>
        </div>
      </header>



      {/* =========================================================================
          ⚙️ CUSTOM SYSTEM TRANSLATION RUNTIME TRANSFORMS
          ========================================================================= */}
      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px var(--border);
          color: transparent;
        }
        @keyframes spinCustom {
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes progressLoop {
          0% { left: -40%; }
          100% { left: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(4deg) scale(0.95); }
          50% { transform: translateY(-6px) rotate(5deg) scale(0.96); }
        }
        .animate-spin-custom {
          animation: spinCustom 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-spin-reverse {
          animation: spinReverse 0.9s linear infinite;
        }
        .animate-progress-loop {
          animation: progressLoop 1.8s ease-in-out infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Page;