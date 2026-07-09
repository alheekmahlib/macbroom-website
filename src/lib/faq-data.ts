// Shared FAQ data. Used by the homepage FAQ component, the HelpWidget search,
// and the /support page — so they never drift out of sync.

export interface FaqItem {
  q: string
  a: string
  category?: string
}

export const faqs: FaqItem[] = [
  {
    q: "Is MacBroom safe to use?",
    a: "Absolutely. MacBroom uses a three-level safety system: safe, caution, and unsafe. Protected system files are never touched. All deletions go to Trash first.",
    category: "Safety",
  },
  {
    q: "How is MacBroom different from CleanMyMac?",
    a: "MacBroom is built with native Swift and SwiftUI — no Electron, no web wrapper. It's faster and lighter. Choose from monthly, yearly, or lifetime plans.",
    category: "Product",
  },
  {
    q: "What does the license include?",
    a: "The Pro license includes access to all features and updates. Available as monthly, yearly, or lifetime plans. One license per device.",
    category: "Billing",
  },
  {
    q: "Can I transfer my license to another Mac?",
    a: "Yes! Contact support with your license key and we'll deactivate it from the old device so you can use it on a new one.",
    category: "Billing",
  },
  {
    q: "Does it work on Apple Silicon (M1/M2/M3/M4)?",
    a: "Yes, MacBroom is built natively for Apple Silicon and runs natively on all M-series Macs running macOS 13 or later.",
    category: "Product",
  },
  {
    q: "Is there a free trial?",
    a: "The free version includes system scanning and monitoring. You can see what needs cleaning before deciding to purchase Pro.",
    category: "Billing",
  },
  {
    q: "How do I get my license key?",
    a: "After purchase, you'll receive your license key instantly by email. You can also find it in your account dashboard on our website.",
    category: "Billing",
  },
  {
    q: "How do I activate my license?",
    a: "Open MacBroom, go to Settings, paste your license key, and click Activate. You can also activate from your profile page on the website.",
    category: "Billing",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel anytime. Monthly and yearly subscriptions auto-renew until cancelled. Lifetime licenses never expire.",
    category: "Billing",
  },
  {
    q: "What macOS version do I need?",
    a: "MacBroom requires macOS 13 (Ventura) or later, running on Apple Silicon (M1/M2/M3/M4).",
    category: "Product",
  },
]

// Simple client-side keyword search used by the HelpWidget.
export function searchFaqs(query: string, limit = 4): FaqItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const scored = faqs
    .map((f) => {
      const text = (f.q + " " + f.a + " " + (f.category ?? "")).toLowerCase()
      let score = 0
      for (const term of q.split(/\s+/)) {
        if (text.includes(term)) score += 1
        if (f.q.toLowerCase().includes(term)) score += 2
      }
      return { f, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.f)
}
