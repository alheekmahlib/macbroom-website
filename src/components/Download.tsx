"use client";

import { useEffect, useState } from "react";
import { Download, Apple, Monitor } from "lucide-react";

// Static download URL hosted on Cloudflare R2. Always points at the latest
// build, so the site never needs to call the GitHub API at request time.
const DOWNLOAD_URL = "https://pub-d4edf86c1dda40ea8f2d3a52648ca443.r2.dev/MacBroom-latest.zip";

// Sparkle appcast feed. The latest <item> holds the most recent version; we
// read it at runtime so the site never shows a stale version number.
const APPCAST_URL = "https://pub-d4edf86c1dda40ea8f2d3a52648ca443.r2.dev/appcast.xml";

export default function DownloadSection() {
  const downloadUrl = DOWNLOAD_URL;
  // Fallback shown until the appcast resolves; also used if parsing fails.
  const [version, setVersion] = useState("1.3.0");

  useEffect(() => {
    let cancelled = false;
    fetch(APPCAST_URL)
      .then((res) => res.text())
      .then((xml) => {
        if (cancelled) return;
        // The first <item> in the feed is the newest release.
        const doc = new DOMParser().parseFromString(xml, "application/xml");
        const latest = doc.querySelector("item");
        if (!latest) return;

        // Sparkle elements live in a namespace, so getElementsByTagName with
        // the raw "sparkle:shortVersionString" name doesn't match in DOMParser.
        // Walk the item's children and match by localName instead.
        let v: string | null = null;
        latest.childNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const el = node as Element;
            if (el.localName === "shortVersionString" && el.textContent) {
              v = el.textContent;
            }
          }
        });

        // Fallback: parse "<title>MacBroom 1.3.1</title>" → "1.3.1"
        if (!v) {
          const title = latest.getElementsByTagName("title")[0]?.textContent;
          if (title) v = title.replace(/^MacBroom\s+/i, "").trim();
        }

        if (v) setVersion(v);
      })
      .catch(() => {
        // Network/CORS failure — keep the fallback version. Static R2 serves
        // the file with permissive CORS, so this should rarely trigger.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="download" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <span className="text-sm font-semibold text-accent tracking-wider uppercase mb-3 block">Download</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Get MacBroom Now
          </h2>
          <p className="text-txt-dim text-lg max-w-xl mx-auto mb-12">
            Free to download. Unlock Pro features anytime with a license key.
          </p>
        </div>

        <div className="animate-fade-up glass-card rounded-3xl p-8 lg:p-12 glow-accent" style={{ animationDelay: "0.15s" }}>
          {/* App icon */}
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 overflow-hidden">
            <img src="/icon.png" alt="MacBroom" className="w-full h-full" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">MacBroom</h3>
          <p className="text-txt-dim text-sm mb-6">Version {version} · macOS 13+ · Universal Binary</p>

          {/* Download button */}
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent hover:bg-accent-hover text-white font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
          >
            <Download className="w-5 h-5" />
            Download for Mac
          </a>

          {/* System requirements */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-txt-dim">
            <div className="flex items-center gap-2">
              <Apple size={14} />
              macOS 13+
            </div>
            <div className="flex items-center gap-2">
              <Monitor size={14} />
              Apple Silicon & Intel
            </div>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 text-left">
            {[
              "Smart Clean",
              "Disk Analyzer",
              "App Uninstaller",
              "Free Up RAM",
              "System Monitor",
              "Menu Bar Stats",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-txt-dim">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-txt-dim animate-fade-up" style={{ animationDelay: "0.3s" }}>
          {[
            "No data collection",
            "Native Swift app",
            "Free version available",
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
