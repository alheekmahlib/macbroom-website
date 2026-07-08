"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase, AUTH_REDIRECT_URL } from "@/lib/supabase"
import { LogIn, LogOut, User, Key, Calendar, CheckCircle, XCircle, Copy, ExternalLink, Loader2, Cpu, DollarSign, Clock } from "lucide-react"

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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: AUTH_REDIRECT_URL,
      },
    })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Supabase returns success (not an error) for an already-registered email;
    // the tell-tale sign is an empty `identities` array.
    if (!data.user || (data.user.identities ?? []).length === 0) {
      setError("Email already registered. Try signing in.")
      setLoading(false)
      return
    }

    setError("")
    // Email confirmation not required — user is signed in right away.
    if (data.session) {
      const u = { email: data.user.email ?? "", id: data.user.id }
      setUser(u)
      fetchLicenses(u.email)
    } else {
      setError(`We've sent a verification link to ${email}. Check your email to confirm your account.`)
      setPassword("")
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
  const displayStatus = (l: License): { label: string; color: string } => {
    if (l.status === "cancelled") return { label: "Cancelled", color: "text-red-400" }
    if (l.status === "inactive") return { label: "Inactive", color: "text-yellow-400" }
    if (l.status === "active") {
      if (l.expires_at && new Date(l.expires_at) < new Date()) {
        return { label: "Expired", color: "text-gray-400" }
      }
      return { label: "Active", color: "text-green-400" }
    }
    return { label: l.status, color: "text-[#8B95A8]" }
  }

  // Auth form
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A]">
        <div className="w-full max-w-sm mx-auto px-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <img src="/icon.png" alt="MacBroom" width={36} height={36} className="rounded-xl" />
            <span className="text-xl font-bold text-white">MacBroom</span>
          </div>

          <div className="rounded-2xl bg-[#161F33] border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-1">Welcome back</h2>
            <p className="text-sm text-[#8B95A8] mb-6">Sign in to manage your licenses</p>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs text-[#8B95A8] mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-[#8B95A8]/50 focus:outline-none focus:border-[#4073F2]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8B95A8] mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-[#8B95A8]/50 focus:outline-none focus:border-[#4073F2]"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#4073F2] hover:bg-[#5A8AFF] py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                <LogIn size={16} />
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                className="w-full text-sm text-[#8B95A8] hover:text-white transition-colors py-1"
              >
                Don&apos;t have an account? <span className="text-[#4073F2]">Sign up</span>
              </button>
            </form>
          </div>

          <Link href="/" className="block text-center text-xs text-[#8B95A8] mt-6 hover:text-white transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#121D2E]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4073F2] to-[#7B9FFF] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">Profile</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User size={14} className="text-[#8B95A8]" />
              <span className="text-sm text-[#8B95A8]">{user.email}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-[#8B95A8] hover:text-red-400 transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-white mb-2">My Licenses</h1>
        <p className="text-sm text-[#8B95A8] mb-8">
          Manage your MacBroom licenses and activation keys for <span className="text-white">{user.email}</span>.
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loadingLicenses ? (
          <div className="rounded-2xl bg-[#161F33] border border-white/5 p-12 text-center">
            <Loader2 size={32} className="text-[#4073F2] mx-auto mb-4 animate-spin" />
            <p className="text-sm text-[#8B95A8]">Loading your licenses…</p>
          </div>
        ) : licenses.length === 0 ? (
          <div className="rounded-2xl bg-[#161F33] border border-white/5 p-12 text-center">
            <Key size={40} className="text-[#8B95A8] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No licenses yet</h3>
            <p className="text-sm text-[#8B95A8] mb-6">
              No licenses are linked to <span className="text-white">{user.email}</span> yet.
              Purchase a Pro license to get started.
            </p>
            <Link href="/#pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#4073F2] hover:bg-[#5A8AFF] px-6 py-2.5 rounded-lg transition-colors">
              <ExternalLink size={14} />
              Purchase License
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {licenses.map((license) => {
              const st = displayStatus(license)
              const deviceNames = fmtDevices(license.device_names)
              const planLabel = license.plan.charAt(0).toUpperCase() + license.plan.slice(1)

              return (
                <div key={license.id} className="rounded-xl bg-[#161F33] border border-white/5 p-6">
                  {/* Header: plan + status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {st.label === "Active" ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : (
                        <XCircle size={20} className={st.color} />
                      )}
                      <div>
                        <h3 className="font-semibold text-white">{planLabel} License</h3>
                        <p className={`text-xs ${st.color}`}>{st.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {license.billing_cycle && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[#4073F2]/10 text-[#5A8AFF] capitalize">
                          {fmtBilling(license.billing_cycle)}
                        </span>
                      )}
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-[#8B95A8]">
                        {planLabel.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* License Key */}
                    <div className="flex items-center gap-2">
                      <Key size={14} className="text-[#8B95A8]" />
                      <code className="text-sm font-mono text-white bg-white/5 px-3 py-1 rounded flex-1 truncate">
                        {license.license_key}
                      </code>
                      <button
                        onClick={() => copyKey(license.license_key)}
                        className="text-[#8B95A8] hover:text-white transition-colors p-1"
                        title="Copy key"
                      >
                        {copiedKey === license.license_key ? (
                          <CheckCircle size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    {/* Metadata grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {/* Price paid */}
                      <div className="flex items-center gap-2">
                        <DollarSign size={12} className="text-[#8B95A8]" />
                        <span className="text-[#8B95A8]">Paid: <span className="text-white">{fmtPrice(license.price_paid)}</span></span>
                      </div>
                      {/* Device limit */}
                      <div className="flex items-center gap-2">
                        <Cpu size={12} className="text-[#8B95A8]" />
                        <span className="text-[#8B95A8]">Devices: <span className="text-white">{license.device_limit} Mac{license.device_limit > 1 ? "s" : ""}</span></span>
                      </div>
                      {/* Expiry */}
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-[#8B95A8]" />
                        <span className="text-[#8B95A8]">
                          {license.billing_cycle === "lifetime" ? "Lifetime" : "Expires"}:{" "}
                          <span className="text-white">
                            {license.billing_cycle === "lifetime" ? "Never" : fmtDate(license.expires_at)}
                          </span>
                        </span>
                      </div>
                      {/* Created */}
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-[#8B95A8]" />
                        <span className="text-[#8B95A8]">Purchased: <span className="text-white">{fmtDate(license.created_at)}</span></span>
                      </div>
                    </div>

                    {/* Activated devices (if any) */}
                    {deviceNames && (
                      <div className="flex items-center gap-2 text-xs pt-1">
                        <User size={12} className="text-[#8B95A8]" />
                        <span className="text-[#8B95A8]">Activated on: <span className="text-white">{deviceNames}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
