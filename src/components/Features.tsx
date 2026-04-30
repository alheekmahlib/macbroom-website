"use client";

import { Sparkles, Trash2, Monitor, AppWindow, HardDrive, Shield } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Smart Clean", description: "One-click scan finds junk files, cache, logs, and temporary data across your entire system.", color: "#4073F2", screenshot: "/screenshots/smart-clean.png" },
  { icon: AppWindow, title: "App Uninstaller", description: "Completely remove apps with all their associated files — cache, preferences, and support files.", color: "#10B981", screenshot: "/screenshots/app-uninstaller.png" },
  { icon: Monitor, title: "System Monitor", description: "Real-time CPU, RAM, and network monitoring with beautiful charts and live Menu Bar stats.", color: "#8B5CF6", screenshot: "/screenshots/system-monitor.png" },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20 animate-fade-up">
          <span className="text-sm font-semibold text-accent tracking-wider uppercase mb-3 block">Features</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">Everything You Need</h2>
          <p className="text-txt-dim text-lg max-w-xl mx-auto">Powerful tools designed for macOS, with a beautiful native interface.</p>
        </div>
        <div className="space-y-20 lg:space-y-28">
          {features.map((feature, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div key={i} className={`animate-fade-up flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex-1 max-w-lg">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${feature.color}12`, border: `1px solid ${feature.color}25` }}>
                    <feature.icon size={22} color={feature.color} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-txt-dim text-base lg:text-lg leading-relaxed">{feature.description}</p>
                </div>
                <div className="flex-1 w-full max-w-xl group">
                  <div className="glass-card rounded-2xl p-2 glow-accent transition-transform duration-300 group-hover:scale-[1.02]">
                    <img src={feature.screenshot} alt={`${feature.title} screenshot`} className="w-full rounded-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-20 lg:mt-28 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <div className="glass-card rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">Native macOS Experience</h3>
              <p className="text-txt-dim max-w-lg mx-auto">Built with Swift and SwiftUI for the best performance and smallest footprint. Pure native code.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-2"><img src="/screenshots/system-monitor2.png" alt="System Monitor Menu Bar" className="w-full rounded-lg" /></div>
              <div className="flex items-center justify-center gap-6">
                {[
                  { icon: HardDrive, label: "Storage Analyzer", color: "#EF4444" },
                  { icon: Shield, label: "Safe & Secure", color: "#06B6D4" },
                  { icon: Trash2, label: "Trash Manager", color: "#F59E0B" },
                ].map((item, j) => (
                  <div key={j} className="text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${item.color}12`, border: `1px solid ${item.color}25` }}>
                      <item.icon size={24} color={item.color} />
                    </div>
                    <p className="text-sm text-txt-dim">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
