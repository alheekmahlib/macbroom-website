"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is MacBroom safe to use?",
    a: "Absolutely. MacBroom uses a three-level safety system: safe, caution, and unsafe. Protected system files are never touched. All deletions go to Trash first.",
  },
  {
    q: "How is MacBroom different from CleanMyMac?",
    a: "MacBroom is built with native Swift and SwiftUI — no Electron, no web wrapper. It's faster, lighter, and has no subscriptions. Pay once, use forever.",
  },
  {
    q: "What does the license include?",
    a: "The Pro license includes lifetime access to all features, lifetime updates, and priority support. One license per device.",
  },
  {
    q: "Can I transfer my license to another Mac?",
    a: "Yes! Contact support with your license key and we'll deactivate it from the old device so you can use it on a new one.",
  },
  {
    q: "Does it work on Apple Silicon (M1/M2/M3/M4)?",
    a: "Yes, MacBroom is built as a universal binary and works natively on both Apple Silicon and Intel Macs running macOS 13 or later.",
  },
  {
    q: "Is there a free trial?",
    a: "The free version includes system scanning and monitoring. You can see what needs cleaning before deciding to purchase Pro.",
  },
  {
    q: "How do I get my license key?",
    a: "After purchase, you'll receive your license key instantly by email. You can also find it in your account dashboard on our website.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent tracking-wider uppercase mb-3 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-ocean-700/60 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-txt-dim shrink-0" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-txt-dim leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
