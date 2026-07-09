"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, LifeBuoy, Ticket, CheckCircle, Clock, XCircle } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SupportForm from "@/components/SupportForm"
import { faqs } from "@/lib/faq-data"
import { supabase } from "@/lib/supabase"
import { fetchUserTickets, type SupportTicket } from "@/lib/support"

const STATUS_META: Record<string, { label: string; color: string; Icon: typeof Clock }> = {
  open: { label: "Open", color: "text-yellow-400", Icon: Clock },
  answered: { label: "Answered", color: "text-green-400", Icon: CheckCircle },
  closed: { label: "Closed", color: "text-txt-dim", Icon: XCircle },
}

export default function SupportPage() {
  const [query, setQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [tickets, setTickets] = useState<SupportTicket[]>([])

  const filtered = query.trim()
    ? faqs.filter((f) => {
        const q = query.toLowerCase()
        return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      })
    : faqs

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      const email = data.session?.user?.email
      if (email) {
        setUser({ email })
        const t = await fetchUserTickets(email)
        if (active) setTickets(t)
      }
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent tracking-wider uppercase mb-3">
              <LifeBuoy size={16} />
              <span>Support</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">How can we help?</h1>
            <p className="text-txt-dim text-base max-w-xl mx-auto">
              Search our FAQ, or send us a message. We typically reply within 24 hours.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-12"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt-dim/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions… e.g. license, Apple Silicon, refund"
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass-card text-white text-base placeholder:text-txt-dim/40 outline-none focus:ring-1 focus:ring-accent/20"
            />
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-lg font-bold text-white mb-5">
              {query.trim() ? `Results (${filtered.length})` : "Frequently asked"}
            </h2>
            {filtered.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <p className="text-sm text-txt-dim mb-4">No articles match &ldquo;{query}&rdquo;.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((f, i) => (
                  <div key={i} className="glass-card rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="text-sm font-medium text-white pr-4">{f.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-txt-dim shrink-0 transition-transform duration-200 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-5 pb-5 text-sm text-txt-dim leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            id="contact"
            className="glass-card rounded-3xl p-8 lg:p-10 mb-12"
          >
            <h2 className="text-xl font-bold text-white mb-1">Still need help?</h2>
            <p className="text-sm text-txt-dim mb-6">Send us a message and we&apos;ll get back to you.</p>
            <SupportForm defaultType="general" />
          </motion.div>

          {/* User's tickets (only when signed in) */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Ticket size={18} className="text-accent" />
                Your tickets
              </h2>
              {tickets.length === 0 ? (
                <div className="glass-card rounded-2xl p-6 text-center">
                  <p className="text-sm text-txt-dim">No tickets yet. Messages you send will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.map((t) => {
                    const sm = STATUS_META[t.status] ?? STATUS_META.open
                    return (
                      <div key={t.id} className="glass-card rounded-2xl p-5">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-xs font-mono text-accent">#{t.id.slice(0, 8)}</span>
                          <span className={`inline-flex items-center gap-1 text-xs font-medium ${sm.color}`}>
                            <sm.Icon size={12} />
                            {sm.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white mb-1">{t.subject || t.type}</p>
                        <p className="text-xs text-txt-dim line-clamp-2">{t.message}</p>
                        <p className="text-[11px] text-txt-dim/60 mt-2">
                          {new Date(t.created_at).toLocaleString()}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
