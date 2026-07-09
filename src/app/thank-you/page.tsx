"use client";

import { CheckCircle, Download, ArrowRight, Key, Mail } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ThankYouContent() {
  const searchParams = useSearchParams();
  // Lemon Squeezy can pass an order_id / checkout_id back to this page.
  const orderId =
    searchParams.get("order_id") ||
    searchParams.get("checkout_id") ||
    searchParams.get("ls_order") ||
    undefined;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-3 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Thank You! 🎉
        </h1>
        <p
          className="text-txt-dim text-lg mb-8 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Your purchase was successful.
          <br />
          You&apos;re all set to unlock MacBroom Pro!
        </p>

        {/* License key delivery info */}
        <div
          className="animate-fade-up bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-white">Check your email</p>
          </div>
          <p className="text-sm text-txt-dim mb-2">
            Your license key has been sent to the email address you used at checkout.
          </p>
          {orderId && (
            <p className="text-xs text-txt-dim/70 mt-2">
              Order reference: <code className="text-accent font-mono">{orderId}</code>
            </p>
          )}
          <p className="text-xs text-txt-dim/70 mt-3">
            You can also find your license key anytime in your{" "}
            <Link href="/profile" className="text-accent hover:underline">
              account profile
            </Link>
            .
          </p>
        </div>

        {/* Steps */}
        <div
          className="animate-fade-up text-left bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
          style={{ animationDelay: "0.25s" }}
        >
          <h3 className="text-sm font-semibold text-white mb-4">How to activate:</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0">
                1
              </span>
              <span className="text-sm text-txt-dim">
                <Link href="/#download" className="text-accent hover:underline">
                  Download MacBroom
                </Link>{" "}
                if you haven&apos;t already
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0">
                2
              </span>
              <span className="text-sm text-txt-dim">
                Open MacBroom and go to <strong className="text-white">Settings</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0">
                3
              </span>
              <span className="text-sm text-txt-dim flex items-center gap-1.5 flex-wrap">
                Paste your
                <Key className="w-3.5 h-3.5 text-accent inline" />
                license key and click <strong className="text-white">Activate</strong>
              </span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-3 justify-center"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/#download"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
          >
            <Download className="w-4 h-4" />
            Download MacBroom
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/10 text-txt-dim hover:text-white hover:border-white/20 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
