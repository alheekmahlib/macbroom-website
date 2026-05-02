import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ocean-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/icon.png" alt="MacBroom" width={28} height={28} className="rounded-lg" />
              <span className="text-lg font-bold text-white">
                Mac<span className="text-accent">Broom</span>
              </span>
            </Link>
            <p className="text-sm text-txt-dim max-w-sm leading-relaxed">
              The ultimate Mac cleaning and optimization tool. Built with Swift, designed for macOS.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Sign In", href: "/signin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-txt-dim hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service"].map((t) => (
                <li key={t}>
                  <a href="#" className="text-sm text-txt-dim hover:text-white transition-colors">{t}</a>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-txt-dim hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-dim">
            © 2025 Al-Heekmah Library. All rights reserved.
          </p>
          <p className="text-xs text-txt-dim flex items-center gap-1.5">
            Built with <Heart size={12} className="text-red-400" /> for macOS
          </p>
        </div>
      </div>
    </footer>
  );
}
