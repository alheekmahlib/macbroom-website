"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Copy, Check, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  const [transactionId, setTransactionId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Try sessionStorage (set by paddle.checkout.completed event on pricing page)
    const storedTxId = sessionStorage.getItem("paddle_transaction_id");
    const storedOrderId = sessionStorage.getItem("paddle_order_id");

    // 2. Try URL params
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    let txId = params.get("transaction_id")
      || params.get("checkout_id")
      || params.get("order_id")
      || storedTxId
      || storedOrderId;

    // 3. Try hash fragment
    if (!txId && hash) {
      try {
        const hashData = JSON.parse(decodeURIComponent(hash.substring(1)));
        txId = hashData.transaction_id || hashData.checkout_id || hashData.order_id;
      } catch {
        const hashParams = new URLSearchParams(hash.substring(1));
        txId = hashParams.get("transaction_id")
          || hashParams.get("checkout_id")
          || hashParams.get("order_id");
      }
    }

    if (txId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransactionId(txId);
      // Clear so it's not shown again on revisit
      sessionStorage.removeItem("paddle_transaction_id");
      sessionStorage.removeItem("paddle_order_id");
    }
  }, []);

  const handleCopy = async () => {
    if (!transactionId) return;
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = transactionId;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Thank You! 🎉
        </h1>
        <p className="text-txt-dim text-lg mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Your purchase was successful.
          <br />
          You&apos;re all set to unlock MacBroom Pro!
        </p>

        {/* Transaction ID */}
        {transactionId ? (
          <div className="animate-fade-up bg-white/5 border border-white/10 rounded-2xl p-6 mb-6" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-txt-dim mb-3">Your License Key (Transaction ID):</p>
            <div className="flex items-center gap-3 bg-black/30 rounded-xl p-4 border border-white/5">
              <code className="text-accent font-mono text-sm sm:text-base flex-1 text-left break-all">
                {transactionId}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Copy"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-txt-dim hover:text-white" />
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-up bg-white/5 border border-white/10 rounded-2xl p-6 mb-6" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-txt-dim mb-2">
              Your license key has been sent to your email.
            </p>
            <p className="text-sm text-txt-dim">
              You can also find it in your{" "}
              <a
                href="https://sandbox-vendors.paddle.com/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Paddle Dashboard
              </a>
              .
            </p>
          </div>
        )}

        {/* Steps */}
        <div className="animate-fade-up text-left bg-white/5 border border-white/10 rounded-2xl p-6 mb-8" style={{ animationDelay: "0.25s" }}>
          <h3 className="text-sm font-semibold text-white mb-4">How to activate:</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0">1</span>
              <span className="text-sm text-txt-dim">
                <Link href="/#download" className="text-accent hover:underline">
                  Download MacBroom
                </Link>{" "}
                if you haven&apos;t already
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0">2</span>
              <span className="text-sm text-txt-dim">Open MacBroom and go to <strong className="text-white">Settings</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0">3</span>
              <span className="text-sm text-txt-dim">
                Paste your license key and click <strong className="text-white">Activate</strong>
              </span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="animate-fade-up flex flex-col sm:flex-row gap-3 justify-center" style={{ animationDelay: "0.3s" }}>
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
