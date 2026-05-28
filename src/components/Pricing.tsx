"use client";

import { useState, useEffect } from "react";
import { Check, Zap } from "lucide-react";

declare global {
  interface Window {
    LemonSqueezy: {
      Url: {
        Open: (url: string) => void;
      };
    };
    createLemonSqueezy: () => void;
  }
}

type BillingPeriod = "monthly" | "yearly" | "lifetime";
type DeviceTier = 1 | 2;

interface Plan {
  name: string;
  description: string;
  features: string[];
  prices: Record<
    DeviceTier,
    Record<
      BillingPeriod,
      { original: number; discounted: number | null }
    >
  >;
  checkoutUrls: Record<DeviceTier, Record<BillingPeriod, string>>;
  cta: string;
  highlighted: boolean;
  popular?: string;
}

// Lemon Squeezy checkout URLs — replace with your actual URLs from LS dashboard
const plans: Plan[] = [
  {
    name: "Free",
    description: "Basic cleaning for everyday use",
    features: [
      "System scan (view only)",
      "Health score monitoring",
      "Menu Bar stats (CPU, RAM, Network)",
      "Storage overview",
    ],
    prices: {
      1: {
        monthly: { original: 0, discounted: null },
        yearly: { original: 0, discounted: null },
        lifetime: { original: 0, discounted: null },
      },
      2: {
        monthly: { original: 0, discounted: null },
        yearly: { original: 0, discounted: null },
        lifetime: { original: 0, discounted: null },
      },
    },
    checkoutUrls: {
      1: { monthly: "", yearly: "", lifetime: "" },
      2: { monthly: "", yearly: "", lifetime: "" },
    },
    cta: "Download Free",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Full cleaning power, no limits",
    features: [
      "Everything in Free, plus:",
      "Smart Clean — remove junk files",
      "App Uninstaller — full removal",
      "Trash Manager",
      "Real-time System Monitor",
      "Priority support",
      "Lifetime updates",
    ],
    prices: {
      1: {
        monthly: { original: 4.99, discounted: null },
        yearly: { original: 34.99, discounted: 24.99 },
        lifetime: { original: 64.99, discounted: 44.99 },
      },
      2: {
        monthly: { original: 6.99, discounted: null },
        yearly: { original: 59.99, discounted: 39.99 },
        lifetime: { original: 84.99, discounted: 59.99 },
      },
    },
    checkoutUrls: {
      1: {
        monthly: "https://alheekmahlib.lemonsqueezy.com/checkout/buy/00ad7def-b61a-425f-afd7-5d8369e4a948?enabled=1718080",
        yearly: "https://alheekmahlib.lemonsqueezy.com/checkout/buy/cf8fc45f-15f2-4731-9aa6-88f69ef742c7?enabled=1718062",
        lifetime: "https://alheekmahlib.lemonsqueezy.com/checkout/buy/df542fb3-fe62-41fc-90c4-15302315176c?enabled=1718031",
      },
      2: {
        monthly: "https://alheekmahlib.lemonsqueezy.com/checkout/buy/0a30c8a9-10f4-43c4-abe4-ac2aa141e564?enabled=1718083",
        yearly: "https://alheekmahlib.lemonsqueezy.com/checkout/buy/147cafad-ecdb-4424-a71d-25263a347649?enabled=1718066",
        lifetime: "https://alheekmahlib.lemonsqueezy.com/checkout/buy/deb0cd76-22c9-4499-98db-a243cfa89a3a?enabled=1718041",
      },
    },
    cta: "Get Pro",
    highlighted: true,
    popular: "yearly",
  },
];

function getPriceDisplay(
  price: { original: number; discounted: number | null },
  period: BillingPeriod
) {
  if (price.original === 0)
    return { amount: "$0", period: "forever", showStrike: false, saved: null };
  const periodLabel =
    period === "monthly" ? "mo" : period === "yearly" ? "yr" : "one-time";
  const hasDiscount =
    price.discounted !== null && price.discounted < price.original;
  return {
    amount: hasDiscount
      ? `$${price.discounted!.toFixed(2)}`
      : `$${price.original.toFixed(2)}`,
    period: periodLabel,
    showStrike: hasDiscount,
    saved: hasDiscount
      ? Math.round((1 - price.discounted! / price.original) * 100)
      : null,
    originalAmount: hasDiscount
      ? `$${price.original.toFixed(2)}`
      : null,
  };
}

export default function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>("yearly");
  const [devices, setDevices] = useState<DeviceTier>(1);

  useEffect(() => {
    // Load Lemon.js dynamically
    if (typeof window !== "undefined" && !window.LemonSqueezy) {
      const script = document.createElement("script");
      script.src = "https://app.lemonsqueezy.com/js/lemon.js";
      script.defer = true;
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);

  const handleCheckout = () => {
    const url = plans[1].checkoutUrls[devices][billing];
    if (!url) return;

    if (typeof window !== "undefined" && window.LemonSqueezy) {
      window.LemonSqueezy.Url.Open(url);
    } else {
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4073F2]/[0.03] to-transparent pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 animate-fade-up">
          <span className="text-sm font-semibold text-accent tracking-wider uppercase mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Simple, Transparent Pricing
          </h2>
          <p className="text-txt-dim text-lg max-w-xl mx-auto">
            Start free, upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex rounded-xl bg-white/5 p-1">
            {(["monthly", "yearly", "lifetime"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  billing === b
                    ? "bg-accent text-white shadow-md"
                    : "text-txt-dim hover:text-white"
                }`}
              >
                {b === "monthly"
                  ? "Monthly"
                  : b === "yearly"
                  ? "Yearly"
                  : "Lifetime"}
                {b === "yearly" && (
                  <span className="ml-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">
                    SAVE 30%
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-txt-dim">Devices:</span>
            <div className="flex rounded-xl bg-white/5 p-1">
              {([1, 2] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDevices(d)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    devices === d
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-txt-dim hover:text-white border border-transparent"
                  }`}
                >
                  {d === 1 ? "1 Mac" : "2 Macs"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => {
            const display = getPriceDisplay(
              plan.prices[devices][billing],
              billing
            );
            return (
              <div
                key={i}
                className={`animate-fade-up relative rounded-2xl p-7 lg:p-8 border transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-ocean-700 border-accent/30 glow-accent"
                    : "bg-ocean-700/60 border-white/5"
                }`}
                style={{ animationDelay: `${i * 0.15 + 0.2}s` }}
              >
                {plan.popular === billing && plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-xs font-semibold text-white flex items-center gap-1.5">
                    <Zap size={12} /> Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    {display.showStrike && display.originalAmount && (
                      <span className="text-lg text-txt-dim line-through">
                        {display.originalAmount}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-white">
                      {display.amount}
                    </span>
                    <span className="text-sm text-txt-dim">
                      /{display.period}
                    </span>
                  </div>
                  {display.showStrike && display.saved && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                      Save {display.saved}%
                    </div>
                  )}
                  <p className="text-sm text-txt-dim mt-3">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-txt-dim">{feature}</span>
                    </li>
                  ))}
                  {plan.highlighted && (
                    <li className="flex items-start gap-3">
                      <Check
                        size={16}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-txt-dim font-medium">
                        {devices === 1 ? "1 device" : "2 devices"}
                      </span>
                    </li>
                  )}
                </ul>
                <button
                  onClick={plan.highlighted ? handleCheckout : undefined}
                  className={`block w-full text-center text-sm font-semibold py-3 rounded-xl transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-accent hover:bg-accent-hover text-white hover:shadow-lg hover:shadow-accent/25 cursor-pointer"
                      : "border border-white/10 text-txt-dim hover:text-white hover:border-white/20"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
        <div
          className="text-center mt-8 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
            <Zap size={14} /> Launch Offer — Limited Time Discount
          </span>
        </div>
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 text-sm text-txt-dim animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {["Secure payment", "Cancel anytime", "Instant delivery"].map(
            (t, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={14} className="text-green-400" />
                {t}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
