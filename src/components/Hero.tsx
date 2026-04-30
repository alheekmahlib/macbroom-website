"use client";

import { Sparkles, ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute rounded-full blur-3xl opacity-20 w-[500px] h-[500px] bg-accent top-[-10%] left-[-10%] animate-float" />
      <div className="absolute rounded-full blur-3xl opacity-20 w-[400px] h-[400px] bg-purple-600 bottom-[-10%] right-[-10%] animate-float-delayed" />
      <div className="absolute rounded-full blur-3xl opacity-20 w-[300px] h-[300px] bg-blue-400 top-[40%] right-[20%] animate-float-delayed2" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8" style={{ animationDelay: "0.1s" }}>
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-txt-dim">Trusted by thousands of Mac users</span>
        </div>

        <h1 className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8 text-white" style={{ animationDelay: "0.2s" }}>
          Clean Your Mac <span className="gradient-text">In Seconds</span>
        </h1>

        <p className="animate-fade-up text-lg sm:text-xl text-txt-dim max-w-2xl mx-auto mb-12 leading-relaxed" style={{ animationDelay: "0.35s" }}>
          MacBroom finds and removes hidden junk files, caches, and clutter — so your Mac runs like new. Fast, safe, and effortless.
        </p>

        <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4 mb-20" style={{ animationDelay: "0.5s" }}>
          <Link href="/signin" className="group px-8 py-4 rounded-2xl text-base font-semibold bg-accent hover:bg-accent-hover text-white transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] flex items-center gap-2">
            Get Started Free <span className="inline-block animate-bounce-x">→</span>
          </Link>
          <a href="#features" className="px-8 py-4 rounded-2xl text-base font-semibold text-txt-dim hover:text-white glass hover:bg-white/5 transition-all duration-300">See Features</a>
        </div>

        <div className="animate-fade-up relative max-w-4xl mx-auto" style={{ animationDelay: "0.65s" }}>
          <div className="glass-card rounded-2xl p-2 glow-accent-strong">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-txt-dim">MacBroom</div>
            </div>
            <img src="/screenshots/home.png" alt="MacBroom Home Screen" className="w-full rounded-b-xl" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
          <div className="animate-bounce-y"><ArrowDown className="w-5 h-5 text-txt-dim/50" /></div>
        </div>
      </div>
    </section>
  );
}
