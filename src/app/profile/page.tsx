"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase, AUTH_REDIRECT_URL } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ErrorReport from "@/components/ErrorReport"
import { motion } from "framer-motion"
import {
  LogIn, LogOut, User, Key, Calendar, CheckCircle, XCircle, Copy, ExternalLink,
  Loader2, Cpu, DollarSign, Clock, Mail, Lock, ShieldCheck, ArrowLeft, Sparkles
} from "lucide-react"

interface License {
  id: string
  license_key: string
  email: string
  plan: string
  billing_cycle: string            // monthly | yearly | lifetime
  device_limit: number
  status: string                   // active | inactive | cancelled | expired
  price_paid: number | null
  device_ids: string[] | string | null
  device_names: string[] | string | null
  signature: string | null
  activated_at: string | null
  expires_at: string | null
  created_at: string
}

export default function Dashboard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<{ email: string; id: string } | null>(null)
  const [licenses, setLicenses] = useState<License[]>([])
  const [loadingLicenses, setLoadingLicenses] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const fetchLicenses = async (userEmail: string) => {
    setLoadingLicenses(true)
    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("email", userEmail)
      .order("created_at", { ascending: false })

    if (error) {
      setError("Couldn't load your licenses. Please try again.")
    } else if (data) {
      setLicenses(data as License[])
    }
    setLoadingLicenses(false)
  }

  // Check session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const u = { email: data.session.user.email ?? "", id: data.session.user.id }
        setUser(u)
        fetchLicenses(u.email)
      }
    })
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message.includes("Invalid") ? "Invalid email or password" : authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const u = { email: data.user.email ?? "", id: data.user.id }
      setUser(u)
      fetchLicenses(u.email)
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setLicenses([])
    setEmail("")
    setPassword("")
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // Helpers for rendering license state.
  const fmtDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString() : "—")
  const fmtPrice = (n: number | null) => (n != null ? `$${n.toFixed(2)}` : "—")
  const fmtBilling = (b: string) => b.charAt(0).toUpperCase() + b.slice(1)
  const fmtDevices = (d: string[] | string | null) => {
    if (!d) return null
    if (Array.isArray(d)) return d.length ? d.join(", ") : null
    return d || null
  }

  // Compute display status: an "active" row whose expiry has passed shows as expired.
  const displayStatus = (l: License): { label: string; color: string; dot: string; Icon: typeof CheckCircle } => {
    if (l.status === "cancelled") return { label: "Cancelled", color: "text-red-400", dot: "bg-red-400", Icon: XCircle }
    if (l.status === "inactive") return { label: "Inactive", color: "text-yellow-400", dot: "bg-yellow-400", Icon: XCircle }
    if (l.status === "active") {
      if (l.expires_at && new Date(l.expires_at) < new Date()) {
        return { label: "Expired", color: "text-gray-400", dot: "bg-gray-400", Icon: XCircle }
      }
      return { label: "Active", color: "text-green-400", dot: "bg-green-400", Icon: CheckCircle }
    }
    return { label: l.status, color: "text-[#8B95A8]", dot: "bg-[#8B95A8]", Icon: XCircle }
  }

  // ===== Unauthenticated: sign-in card (consistent with the rest of the site) =====
  if (!user) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-24">
          {/* Background effects (same as signin page) */}
          <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 glow-accent-subtle"
          >
            {/* Logo */}
            <div className="flex items-center justify-center gap-2.5 mb-8">
              <img src="/icon.png" alt="MacBroom" width={36} height={36} className="rounded-xl" />
              <span className="text-xl font-bold text-white tracking-tight">
                Mac<span className="text-accent">Broom</span>
              </span>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
              <p className="text-sm text-txt-dim">Sign in to manage your licenses</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-txt-dim mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-dim/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-txt-dim/30 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-dim mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-dim/50" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-txt-dim/30 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-txt-dim/50 text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/signin" className="text-accent hover:text-accent-hover transition-colors">
                Sign up
              </Link>
            </p>
          </motion.div>
        </section>
        <Footer />
      </main>
    )
  }

  // ===== Authenticated: license dashboard =====
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        {/* Background effects */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-accent tracking-wider uppercase mb-3">
              <ShieldCheck size={16} />
              <span>Your Account</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">My Licenses</h1>
            <p className="text-txt-dim text-base">
              Manage your MacBroom licenses and activation keys for{" "}
              <span className="text-white font-medium">{user.email}</span>.
            </p>
          </motion.div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
              <ErrorReport message={error} context="profile_licenses" />
            </div>
          )}

          {loadingLicenses ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-3xl p-16 text-center"
            >
              <Loader2 size={32} className="text-accent mx-auto mb-4 animate-spin" />
              <p className="text-sm text-txt-dim">Loading your licenses…</p>
            </motion.div>
          ) : licenses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-12 lg:p-16 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Key size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No licenses yet</h3>
              <p className="text-sm text-txt-dim mb-8 max-w-md mx-auto">
                No licenses are linked to <span className="text-white">{user.email}</span> yet.
                Purchase a Pro license to unlock all MacBroom features.
              </p>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]"
              >
                <ExternalLink size={16} />
                Purchase License
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {licenses.map((license, idx) => {
                const st = displayStatus(license)
                const deviceNames = fmtDevices(license.device_names)
                const planLabel = license.plan.charAt(0).toUpperCase() + license.plan.slice(1)
                const isLifetime = license.billing_cycle === "lifetime"

                return (
                  <motion.div
                    key={license.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="glass-card rounded-3xl p-6 lg:p-8"
                  >
                    {/* Header: plan + status */}
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${st.label === "Active" ? "bg-green-400/10" : "bg-white/5"}`}>
                          <st.Icon size={22} className={st.color} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{planLabel} License</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            <p className={`text-xs font-medium ${st.color}`}>{st.label}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {license.billing_cycle && (
                          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium capitalize">
                            <Sparkles size={12} />
                            {fmtBilling(license.billing_cycle)}
                          </span>
                        )}
                        <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-txt-dim font-medium">
                          {planLabel.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* License Key */}
                    <div className="rounded-2xl bg-white/5 border border-white/5 p-4 mb-5">
                      <p className="text-xs text-txt-dim mb-2 font-medium tracking-wide uppercase">License Key</p>
                      <div className="flex items-center gap-2">
                        <Key size={16} className="text-txt-dim shrink-0" />
                        <code className="text-base font-mono text-white flex-1 truncate tracking-wide">
                          {license.license_key}
                        </code>
                        <button
                          onClick={() => copyKey(license.license_key)}
                          className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-txt-dim hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
                          title="Copy key"
                        >
                          {copiedKey === license.license_key ? (
                            <>
                              <CheckCircle size={14} className="text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Metadata grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Price paid */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center shrink-0">
                          <DollarSign size={14} className="text-green-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-txt-dim uppercase tracking-wide">Paid</p>
                          <p className="text-sm text-white font-medium truncate">{fmtPrice(license.price_paid)}</p>
                        </div>
                      </div>
                      {/* Device limit */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <Cpu size={14} className="text-accent" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-txt-dim uppercase tracking-wide">Devices</p>
                          <p className="text-sm text-white font-medium truncate">
                            {license.device_limit} Mac{license.device_limit > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      {/* Expiry */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-400/10 flex items-center justify-center shrink-0">
                          <Calendar size={14} className="text-purple-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-txt-dim uppercase tracking-wide">
                            {isLifetime ? "Validity" : "Expires"}
                          </p>
                          <p className="text-sm text-white font-medium truncate">
                            {isLifetime ? "Lifetime" : fmtDate(license.expires_at)}
                          </p>
                        </div>
                      </div>
                      {/* Purchased */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center shrink-0">
                          <Clock size={14} className="text-blue-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-txt-dim uppercase tracking-wide">Purchased</p>
                          <p className="text-sm text-white font-medium truncate">{fmtDate(license.created_at)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Activated devices (if any) */}
                    {deviceNames && (
                      <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <User size={14} className="text-txt-dim" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-txt-dim uppercase tracking-wide">Activated on</p>
                          <p className="text-sm text-white font-medium truncate">{deviceNames}</p>
                        </div>
                      </div>
                    )}

                    {/* Manage subscription (monthly/yearly active only) */}
                    {(license.billing_cycle === "monthly" || license.billing_cycle === "yearly") &&
                      st.label === "Active" && (
                        <div className="mt-5 pt-5 border-t border-white/5">
                          <a
                            href="https://alheekmahlib.lemonsqueezy.com/billing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                          >
                            <ExternalLink size={13} />
                            Manage Subscription
                          </a>
                          <p className="text-[11px] text-txt-dim/60 mt-1.5">
                            Cancel renewal, update payment method, or view invoices via Lemon Squeezy.
                          </p>
                        </div>
                      )}
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Sign out */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-sm text-txt-dim hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
