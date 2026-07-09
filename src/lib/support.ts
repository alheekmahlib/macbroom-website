import { supabase } from "./supabase"

// Formspree endpoint (same one the old /contact page used). Forwards to email.
// The PRIMARY recipient (info@vexaltech.dev) is set in the Formspree dashboard;
// it cannot be overridden from the client for anti-spam reasons. The CC list
// below is attached to every submission via the _cc field.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjwnorw"
const SUPPORT_CC = "haozo89@gmail.com, ahmedalboishee@gmail.com"

export type TicketType = "general" | "bug" | "billing" | "feature"

export interface SupportTicketInput {
  type: TicketType
  subject?: string
  message: string
  email: string
  /** Optional caller-provided context merged on top of the auto-collected one. */
  extraContext?: Record<string, unknown>
}

export interface SupportTicket {
  id: string
  email: string
  type: TicketType
  subject: string | null
  message: string
  context: Record<string, unknown> | null
  status: string
  created_at: string
  updated_at: string
}

export const TICKET_TYPE_LABELS: Record<TicketType, string> = {
  general: "General Question",
  bug: "Bug Report",
  billing: "Billing & License",
  feature: "Feature Request",
}

/**
 * Collect non-identifying context about the current page/session so a bug
 * report already includes "what the user was doing / where / on what browser"
 * without them having to type it.
 */
export function collectContext(extra?: Record<string, unknown>): Record<string, unknown> {
  const ctx: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
  }
  if (typeof window !== "undefined") {
    ctx.page = window.location.pathname
    ctx.url = window.location.href
    ctx.referrer = document.referrer || null
    ctx.userAgent = navigator.userAgent
    ctx.language = navigator.language
    // Screen / viewport helps reproduce layout bugs.
    ctx.viewport = `${window.innerWidth}x${window.innerHeight}`
    ctx.screen = `${window.screen.width}x${window.screen.height}`
  }
  return { ...ctx, ...extra }
}

/**
 * Submit a support ticket. Writes to Supabase (for persistence + the profile
 * tickets list) AND posts to Formspree (for instant email notification).
 * Returns the created ticket id on success; never throws — failures are
 * surfaced via the returned `error`.
 */
export async function submitTicket(
  input: SupportTicketInput
): Promise<{ ticketId?: string; error?: string }> {
  const context = collectContext(input.extraContext)

  // 1) Supabase insert (best-effort). If RLS / network fails, we still send the
  //    Formspree email so the user's report is never lost.
  let ticketId: string | undefined
  try {
    const { data, error } = await supabase
      .from("support_tickets")
      .insert({
        email: input.email,
        type: input.type,
        subject: input.subject ?? null,
        message: input.message,
        context,
      })
      .select("id")
      .single()

    if (!error && data?.id) {
      ticketId = data.id as string
    }
  } catch {
    // Ignore — Formspree is the safety net.
  }

  // 2) Formspree email (always attempted).
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        _cc: SUPPORT_CC,
        _subject: `[MacBroom${ticketId ? ` #${ticketId.slice(0, 8)}` : ""}] ${
          TICKET_TYPE_LABELS[input.type]
        }`,
        type: TICKET_TYPE_LABELS[input.type],
        subject: input.subject ?? "",
        message: input.message,
        ticket_id: ticketId ?? "",
        context_json: JSON.stringify(context, null, 2),
      }),
    })
  } catch {
    // If Formspree also failed but we have a ticket id, still call it success.
    if (!ticketId) {
      return { error: "Could not submit your message. Please try again or email support@macbroom.com." }
    }
  }

  if (!ticketId) {
    // Formspree sent (probably) but no DB record — still acceptable.
    return {}
  }
  return { ticketId }
}

/** Fetch the tickets belonging to the currently signed-in user (by email). */
export async function fetchUserTickets(email: string): Promise<SupportTicket[]> {
  const { data, error } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(20)

  if (error || !data) return []
  return data as SupportTicket[]
}
