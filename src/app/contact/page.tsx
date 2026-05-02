"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare, Bug, CreditCard, HelpCircle } from "lucide-react";

type Subject = "general" | "bug" | "billing" | "feature";

const subjects: { id: Subject; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General Question", icon: <MessageSquare size={18} /> },
  { id: "bug", label: "Bug Report", icon: <Bug size={18} /> },
  { id: "billing", label: "Billing & License", icon: <CreditCard size={18} /> },
  { id: "feature", label: "Feature Request", icon: <HelpCircle size={18} /> },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<Subject>("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/FORM_ID_PLACEHOLDER", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          _subject: `[MacBroom] ${subjects.find(s => s.id === subject)?.label}`,
          subject: subjects.find(s => s.id === subject)?.label,
          message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-txt-dim text-lg">
            Have a question, bug report, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href="mailto:support@macbroom.com"
            className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.03] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Mail size={22} className="text-accent" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm group-hover:text-accent transition-colors">Email Us</p>
              <p className="text-txt-dim text-xs">support@macbroom.com</p>
            </div>
          </a>
          <a
            href="https://github.com/alheekmahlib/macbroom/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.03] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <Bug size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm group-hover:text-purple-400 transition-colors">Report a Bug</p>
              <p className="text-txt-dim text-xs">GitHub Issues</p>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        {status === "success" ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Message Sent! 🎉</h2>
            <p className="text-txt-dim mb-6">We&apos;ll get back to you as soon as possible.</p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold transition-all"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-bold text-white mb-2">Send us a message</h2>

            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-txt-dim mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-dim mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all text-sm"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-txt-dim mb-3">Subject</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {subjects.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSubject(s.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      subject === s.id
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "bg-black/20 border-white/5 text-txt-dim hover:border-white/10 hover:text-white"
                    }`}
                  >
                    {s.icon}
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{s.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-txt-dim mb-2">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all text-sm resize-none"
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>Something went wrong. Please try again or email us directly.</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* FAQ Teaser */}
        <div className="text-center mt-8">
          <p className="text-txt-dim text-sm">
            Looking for quick answers? Check our{" "}
            <Link href="/#faq" className="text-accent hover:underline">FAQ section</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
