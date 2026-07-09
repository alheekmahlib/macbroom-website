"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faq-data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm font-semibold text-accent tracking-wider uppercase mb-3 block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-ocean-700/60 overflow-hidden">
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown size={16} className={`text-txt-dim shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-sm text-txt-dim leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
