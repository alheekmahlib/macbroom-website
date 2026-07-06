"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase, AUTH_REDIRECT_URL } from "@/lib/supabase"
import { LogIn, LogOut, User, Key, Calendar, CheckCircle, XCircle, Copy, ExternalLink } from "lucide-react"

interface License {
  license_key: string
  email: string
  plan: string
  status: string
  activated_at: string
  expires_at: string | null
  device_name: string | null
}

export default function Dashboard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<{ email: string; id: string } | null>(null)
  const [licenses, setLicenses] = useState<License[]>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const fetchLicenses = async (userId: string) => {
    const { data } = await supabase
      .from("licenses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (data) setLicenses(data)
  }

  // Check session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser({ email: data.session.user.email ?? "", id: data.session.user.id })
        fetchLicenses(data.session.user.id)
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
      setUser({ email: data.user.email ?? "", id: data.user.id })
      fetchLicenses(data.user.id)
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
      setUser({ email: data.user.email ?? "", id: data.user.id })
      fetchLicenses(data.user.id)
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
        <p className="text-sm text-[#8B95A8] mb-8">Manage your MacBroom licenses and activation keys.</p>

        {licenses.length === 0 ? (
          <div className="rounded-2xl bg-[#161F33] border border-white/5 p-12 text-center">
            <Key size={40} className="text-[#8B95A8] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No licenses yet</h3>
            <p className="text-sm text-[#8B95A8] mb-6">Purchase a license to activate MacBroom Pro.</p>
            <Link href="/#pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#4073F2] hover:bg-[#5A8AFF] px-6 py-2.5 rounded-lg transition-colors">
              <ExternalLink size={14} />
              Purchase License
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {licenses.map((license, i) => {
              const isActive = license.status === "active" && (!license.expires_at || new Date(license.expires_at) > new Date())
              const expiresDate = license.expires_at ? new Date(license.expires_at).toLocaleDateString() : "Never"

              return (
                <div key={i} className="rounded-xl bg-[#161F33] border border-white/5 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {isActive ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : (
                        <XCircle size={20} className="text-red-400" />
                      )}
                      <div>
                        <h3 className="font-semibold text-white">{license.plan.charAt(0).toUpperCase() + license.plan.slice(1)} License</h3>
                        <p className="text-xs text-[#8B95A8]">{isActive ? "Active" : license.status}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-[#8B95A8]">
                      {license.plan.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* License Key */}
                    <div className="flex items-center gap-2">
                      <Key size={14} className="text-[#8B95A8]" />
                      <code className="text-sm font-mono text-white bg-white/5 px-3 py-1 rounded flex-1">
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

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-[#8B95A8]" />
                        <span className="text-[#8B95A8]">Expires: <span className="text-white">{expiresDate}</span></span>
                      </div>
                      {license.device_name && (
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-[#8B95A8]" />
                          <span className="text-[#8B95A8]">Device: <span className="text-white">{license.device_name}</span></span>
                        </div>
                      )}
                    </div>
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
