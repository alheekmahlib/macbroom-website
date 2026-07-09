"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LifeBuoy, X, Search, Bug, MessageSquare, ChevronDown, HelpCircle } from "lucide-react"
import { searchFaqs } from "@/lib/faq-data"
import SupportForm from "./SupportForm"

type Panel = "menu" | "search" | "report" | "contact"

export default function HelpWidget() {
  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState<Panel>("menu")
  const [query, setQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const results = query.trim() ? searchFaqs(query, 5) : []

  const close = () => setOpen(false)
  const go = (p: Panel) => {
    setPanel(p)
    setQuery("")
    setExpandedFaq(null)
  }

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-50 print:hidden">
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 w-[92vw] max-w-sm glass-card rounded-3xl p-5 shadow-2xl shadow-black/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {panel !== "menu" && (
                  <button
                    onClick={() => go("menu")}
                    className="p-1 -ml-1 rounded-lg text-txt-dim hover:text-white hover:bg-white/5 transition-colors"
                    aria-label="Back"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                )}
                <h3 className="text-sm font-semibold text-white">
                  {panel === "menu" && "How can we help?"}
                  {panel === "search" && "Search help"}
                  {panel === "report" && "Report a bug"}
                  {panel === "contact" && "Contact us"}
                </h3>
              </div>
              <button
                onClick={close}
                className="p-1 rounded-lg text-txt-dim hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* MENU */}
            {panel === "menu" && (
              <div className="space-y-2">
                <button
                  onClick={() => go("search")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">Search help</p>
                    <p className="text-xs text-txt-dim">Find quick answers in our FAQ</p>
                  </div>
                </button>
                <button
                  onClick={() => go("report")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-400/10 flex items-center justify-center shrink-0">
                    <Bug className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">Report a bug</p>
                    <p className="text-xs text-txt-dim">Something not working?</p>
                  </div>
                </button>
                <button
                  onClick={() => go("contact")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-400/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">Contact us</p>
                    <p className="text-xs text-txt-dim">General, billing, or feature requests</p>
                  </div>
                </button>
              </div>
            )}

            {/* SEARCH */}
            {panel === "search" && (
              <div>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-dim/50" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your question…"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-txt-dim/30 outline-none transition-all"
                  />
                </div>

                {query.trim() === "" ? (
                  <p className="text-xs text-txt-dim text-center py-6">
                    Search our FAQs above. Can&apos;t find it?{" "}
                    <button onClick={() => go("contact")} className="text-accent hover:underline">
                      Contact us
                    </button>
                  </p>
                ) : results.length === 0 ? (
                  <div className="text-center py-6">
                    <HelpCircle className="w-7 h-7 text-txt-dim/40 mx-auto mb-2" />
                    <p className="text-xs text-txt-dim mb-3">No results for &ldquo;{query}&rdquo;</p>
                    <button
                      onClick={() => go("contact")}
                      className="text-xs font-medium text-accent hover:underline"
                    >
                      Send us a message instead →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[40vh] overflow-y-auto">
                    {results.map((f, i) => (
                      <div key={i} className="rounded-xl bg-white/5 border border-white/5 overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                          className="w-full text-left px-3 py-2.5 text-sm text-white hover:bg-white/5 transition-colors"
                        >
                          {f.q}
                        </button>
                        {expandedFaq === i && (
                          <p className="px-3 pb-3 text-xs text-txt-dim leading-relaxed">{f.a}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* REPORT (bug) */}
            {panel === "report" && (
              <SupportForm
                defaultType="bug"
                compact
                onSubmitted={() => {
                  setTimeout(close, 2500)
                }}
              />
            )}

            {/* CONTACT */}
            {panel === "contact" && (
              <SupportForm
                defaultType="general"
                compact
                onSubmitted={() => {
                  setTimeout(close, 2500)
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen(!open)
          setPanel("menu")
        }}
        aria-label={open ? "Close help" : "Open help"}
        aria-expanded={open}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-black/40 transition-colors ${
          open
            ? "bg-white/10 text-white"
            : "bg-accent hover:bg-accent-hover text-white"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="help"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <LifeBuoy className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
