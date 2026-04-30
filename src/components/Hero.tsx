"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <FloatingOrb className="w-[500px] h-[500px] bg-accent top-[-10%] left-[-10%]" delay={0} />
      <FloatingOrb className="w-[400px] h-[400px] bg-purple-600 bottom-[-10%] right-[-10%]" delay={2} />
      <FloatingOrb className="w-[300px] h-[300px] bg-blue-400 top-[40%] right-[20%]" delay={4} />

      <div ref={ref} className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-txt-dim">
            Trusted by thousands of Mac users
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8 text-white"
        >
          Clean Your Mac{" "}
          <span className="gradient-text">In Seconds</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-txt-dim max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          MacBroom finds and removes hidden junk files, caches, and clutter —
          so your Mac runs like new. Fast, safe, and effortless.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/signin"
            className="group px-8 py-4 rounded-2xl text-base font-semibold bg-accent hover:bg-accent-hover text-white transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] flex items-center gap-2"
          >
            Get Started Free
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
          <a
            href="#features"
            className="px-8 py-4 rounded-2xl text-base font-semibold text-txt-dim hover:text-white glass hover:bg-white/5 transition-all duration-300"
          >
            See Features
          </a>
        </motion.div>

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-2 glow-accent-strong">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-txt-dim">MacBroom</div>
            </div>
            <img
              src="/screenshots/home.png"
              alt="MacBroom Home Screen"
              className="w-full rounded-b-xl"
            />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-txt-dim/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
