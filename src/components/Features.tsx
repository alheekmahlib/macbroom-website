"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Trash2, Monitor, AppWindow, HardDrive, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Smart Clean",
    description: "One-click scan finds junk files, cache, logs, and temporary data across your entire system.",
    color: "#4073F2",
    screenshot: "/screenshots/smart-clean.png",
  },
  {
    icon: AppWindow,
    title: "App Uninstaller",
    description: "Completely remove apps with all their associated files — cache, preferences, and support files.",
    color: "#10B981",
    screenshot: "/screenshots/app-uninstaller.png",
  },
  {
    icon: Monitor,
    title: "System Monitor",
    description: "Real-time CPU, RAM, and network monitoring with beautiful charts and live Menu Bar stats.",
    color: "#8B5CF6",
    screenshot: "/screenshots/system-monitor.png",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-sm font-semibold text-accent tracking-wider uppercase mb-3 block">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Everything You Need
          </h2>
          <p className="text-txt-dim text-lg max-w-xl mx-auto">
            Powerful tools designed for macOS, with a beautiful native interface.
          </p>
        </motion.div>

        {/* Feature showcases — alternating layout */}
        <div className="space-y-20 lg:space-y-28">
          {features.map((feature, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={i}
                ref={i === 0 ? ref : undefined}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: i * 0.15 }}
                className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`}
              >
                {/* Text */}
                <div className="flex-1 max-w-lg">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${feature.color}12`, border: `1px solid ${feature.color}25` }}
                  >
                    <feature.icon size={22} color={feature.color} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-txt-dim text-base lg:text-lg leading-relaxed">{feature.description}</p>
                </div>

                {/* Screenshot */}
                <div className="flex-1 w-full max-w-xl">
                  <motion.div
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    className="glass-card rounded-2xl p-2 glow-accent"
                  >
                    <img
                      src={feature.screenshot}
                      alt={`${feature.title} screenshot`}
                      className="w-full rounded-xl"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom highlight — extra screenshots row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 lg:mt-28"
        >
          <div className="glass-card rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">Native macOS Experience</h3>
              <p className="text-txt-dim max-w-lg mx-auto">
                Built with Swift and SwiftUI for the best performance and smallest footprint. Pure native code.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-2">
                <img
                  src="/screenshots/system-monitor2.png"
                  alt="System Monitor Menu Bar"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="flex items-center justify-center gap-6">
                {[
                  { icon: HardDrive, label: "Storage Analyzer", color: "#EF4444" },
                  { icon: Shield, label: "Safe & Secure", color: "#06B6D4" },
                  { icon: Trash2, label: "Trash Manager", color: "#F59E0B" },
                ].map((item, j) => (
                  <div key={j} className="text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: `${item.color}12`, border: `1px solid ${item.color}25` }}
                    >
                      <item.icon size={24} color={item.color} />
                    </div>
                    <p className="text-sm text-txt-dim">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
