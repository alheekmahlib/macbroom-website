"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, ArrowLeft, Loader2, Eye, EyeOff, Key } from "lucide-react";

type Mode = "signin" | "signup" | "activate";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");

  const [mode, setMode] = useState<Mode>(planParam === "pro" ? "activate" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes("Invalid login") || error.message.includes("Invalid credentials")) {
        setError("Invalid email or password. Please try again.");
      } else if (error.message.includes("Email not confirmed")) {
        setError("Please confirm your email first, then sign in.");
      } else {
        setError(error.message);
      }
    } else {
      router.push("/profile");
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      // Handle specific error cases
      if (error.message.includes("already registered") || error.message.includes("already been registered")) {
        setError("This email is already registered. Try signing in instead.");
      } else if (error.message.includes("password")) {
        setError("Password must be at least 6 characters.");
      } else {
        setError(error.message);
      }
    } else {
      setSuccess("Account created! You can now sign in.");
    }
    setLoading(false);
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // First sign in or sign up
    if (!email || !password) {
      setError("Please sign in or create an account first.");
      setLoading(false);
      return;
    }

    // Try to get current session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Try to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Invalid credentials. Please sign in first.");
        setLoading(false);
        return;
      }
    }

    // Activate license
    const { data, error: activationError } = await supabase
      .from("licenses")
      .update({
        status: "active",
        activated_at: new Date().toISOString(),
        user_id: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq("license_key", licenseKey)
      .eq("status", "inactive")
      .select()
      .single();

    if (activationError || !data) {
      setError("Invalid or already activated license key.");
    } else {
      setSuccess("License activated successfully! 🎉");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8B95A8] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-10 glow-accent-subtle"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <img src="/icon.png" alt="MacBroom" width={36} height={36} className="rounded-xl" />
            <span className="text-xl font-bold text-white tracking-tight">
              Mac<span className="text-accent">Broom</span>
            </span>
          </div>

          {/* Mode tabs */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-8">
            {(["signin", "signup", "activate"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  mode === m
                    ? "bg-accent text-white shadow-md"
                    : "text-[#8B95A8] hover:text-white"
                }`}
              >
                {m === "signin" ? "Sign In" : m === "signup" ? "Sign Up" : "Activate"}
              </button>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === "signin"
              ? "Welcome back"
              : mode === "signup"
              ? "Create account"
              : "Activate Pro"}
          </h2>
          <p className="text-sm text-[#8B95A8] mb-6">
            {mode === "signin"
              ? "Sign in to access your MacBroom account."
              : mode === "signup"
              ? "Create a free account to get started."
              : "Enter your license key to unlock Pro features."}
          </p>

          {/* Error / Success */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
            >
              {success}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={mode === "signin" ? handleSignIn : mode === "signup" ? handleSignUp : handleActivate} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#8B95A8] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8B95A8]/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-[#8B95A8]/30 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#8B95A8] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8B95A8]/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-[#8B95A8]/30 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B95A8]/50 hover:text-[#8B95A8] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* License Key (only for activate) */}
            {mode === "activate" && (
              <div>
                <label className="block text-sm font-medium text-[#8B95A8] mb-2">
                  License Key
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8B95A8]/50" />
                  <input
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    required
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-white text-sm placeholder:text-[#8B95A8]/30 outline-none transition-all font-mono tracking-wider"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === "activate" ? "Activating..." : "Loading..."}
                </>
              ) : (
                mode === "signin"
                  ? "Sign In"
                  : mode === "signup"
                  ? "Create Account"
                  : "Activate License"
              )}
            </button>
          </form>

          {/* Footer text */}
          <p className="text-xs text-[#8B95A8]/50 text-center mt-6">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button onClick={() => handleModeChange("signup")} className="text-accent hover:text-accent-hover transition-colors">
                  Sign up
                </button>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button onClick={() => handleModeChange("signin")} className="text-accent hover:text-accent-hover transition-colors">
                  Sign in
                </button>
              </>
            ) : (
              "Have a license key? Sign in and activate it here."
            )}
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <SignInForm />
    </Suspense>
  );
}
