"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Send, CheckCircle, AlertCircle, Bug, CreditCard, Lightbulb, MessageSquare } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { submitTicket, TICKET_TYPE_LABELS, type TicketType } from "@/lib/support"

const TYPE_OPTIONS: { id: TicketType; label: string; Icon: typeof Bug }[] = [
  { id: "general", label: "General", Icon: MessageSquare },
  { id: "bug", label: "Bug Report", Icon: Bug },
  { id: "billing", label: "Billing", Icon: CreditCard },
  { id: "feature", label: "Feature", Icon: Lightbulb },
]

interface SupportFormProps {
  /** Pre-select a ticket type (e.g. "bug" when launched from an error). */
  defaultType?: TicketType
  /** Pre-fill the subject (e.g. the error message text). */
  defaultSubject?: string
  /** Extra context to attach (e.g. { error: "...", action: "load_licenses" }). */
  extraContext?: Record<string, unknown>
  /** Called after a successful submission. */
  onSubmitted?: (ticketId?: string) => void
  /** Compact layout (used inside the HelpWidget popover). */
  compact?: boolean
}

export default function SupportForm({
  defaultType = "general",
  defaultSubject = "",
  extraContext,
  onSubmitted,
  compact = false,
}: SupportFormProps) {
  const [type, setType] = useState<TicketType>(defaultType)
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState(defaultSubject)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const [ticketId, setTicketId] = useState<string | undefined>()

  // Pre-fill the email from the signed-in session.
  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session?.user?.email) setEmail(data.session.user.email)
    })
    return () => {
      active = false
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return
    setStatus("sending")
    setError("")

    const { ticketId: id, error: err } = await submitTicket({
      type,
      subject,
      message,
      email,
      extraContext,
    })

    if (err) {
      setStatus("error")
      setError(err)
      return
    }
    setTicketId(id)
    setStatus("success")
    setMessage("")
    onSubmitted?.(id)
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${compact ? "py-6" : "py-12"}`}
      >
        <div className={`mx-auto mb-4 rounded-2xl bg-green-400/10 flex items-center justify-center ${compact ? "w-12 h-12" : "w-16 h-16"}`}>
          <CheckCircle className={compact ? "w-6 h-6 text-green-400" : "w-8 h-8 text-green-400"} />
        </div>
        <h3 className={`font-bold text-white mb-1 ${compact ? "text-base" : "text-xl"}`}>Message sent!</h3>
        <p className="text-sm text-txt-dim">
          We&apos;ll get back to you at <span className="text-white">{email}</span> shortly.
        </p>
        {ticketId && (
          <p className="text-xs text-txt-dim mt-3">
            Ticket reference: <span className="font-mono text-accent">#{ticketId.slice(0, 8)}</span>
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type selector */}
      <div>
        <label className="block text-xs font-medium text-txt-dim mb-2">Type</label>
        <div className="grid grid-cols-4 gap-1.5">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setType(opt.id)}
              aria-pressed={type === opt.id}
              className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-[11px] font-medium transition-all ${
                type === opt.id
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-white/10 bg-white/5 text-txt-dim hover:bg-white/10 hover:text-white"
              }`}
            >
              <opt.Icon className="w-4 h-4" />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-txt-dim mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-txt-dim/30 outline-none transition-all"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-medium text-txt-dim mb-2">Subject (optional)</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief summary"
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-txt-dim/30 outline-none transition-all"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium text-txt-dim mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={compact ? 3 : 5}
          placeholder="Describe your issue or question…"
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-txt-dim/30 outline-none transition-all resize-none"
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send {TICKET_TYPE_LABELS[type]}
          </>
        )}
      </button>

      <p className="text-[11px] text-txt-dim/60 text-center">
        Page, browser, and timestamp are attached automatically.
      </p>
    </form>
  )
}
