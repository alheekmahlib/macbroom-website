"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bug, ChevronDown } from "lucide-react"
import SupportForm from "./SupportForm"

interface ErrorReportProps {
  /** The error message shown to the user. */
  message: string
  /** Where the error happened (used as ticket subject + context). */
  context?: string
}

/**
 * Inline "Report this" affordance that sits next to an error message.
 * Expands into a compact SupportForm pre-filled as a bug report, so the user
 * can report the issue in one click without leaving the page.
 */
export default function ErrorReport({ message, context }: ErrorReportProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-txt-dim hover:text-red-400 transition-colors"
      >
        <Bug size={12} />
        Report this issue
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <SupportForm
                defaultType="bug"
                defaultSubject={context ? `${context}: ${message}`.slice(0, 120) : message.slice(0, 120)}
                extraContext={{ error_message: message, error_context: context, source: "inline_error_report" }}
                compact
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
