"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setUser({ email: data.session.user.email ?? "" });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? "" } : null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Hash links (Features/Pricing/FAQ) only exist on the homepage. When we're on
  // an inner page (e.g. /profile, /signin), prefix them with "/" so they route
  // to the homepage anchor instead of staying on the current page.
  const onInnerPage = pathname !== "/";
  const navLinks = [
    { label: "Features", href: onInnerPage ? "/#features" : "#features" },
    { label: "Pricing", href: onInnerPage ? "/#pricing" : "#pricing" },
    { label: "FAQ", href: onInnerPage ? "/#faq" : "#faq" },
  ];
  const allNavLinks = user ? [...navLinks, { label: "Profile", href: "/profile" }] : navLinks;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-black/10" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/icon.png" alt="MacBroom" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold text-white tracking-tight">Mac<span className="text-accent">Broom</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {allNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-4 py-2 rounded-lg text-sm font-medium text-txt-dim hover:text-white hover:bg-white/5 transition-all duration-200">{link.label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <User size={14} className="text-txt-dim" />
                  <span className="text-sm text-txt-dim max-w-[150px] truncate">{user.email}</span>
                </div>
                <button onClick={handleSignOut} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-txt-dim hover:text-white hover:bg-white/5 transition-all"><LogOut size={14} />Sign Out</button>
              </div>
            ) : (
              <Link href="/signin" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent hover:bg-accent-hover text-white transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]">Sign In</Link>
            )}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[72px] z-40 p-4 md:hidden animate-fade-in-scale">
          <div className="glass rounded-2xl p-4 space-y-1">
            {allNavLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-txt-dim hover:text-white hover:bg-white/5 transition-all">{link.label}</Link>
            ))}
            <div className="pt-2 border-t border-white/5">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 text-sm text-txt-dim"><User size={14} /><span className="truncate">{user.email}</span></div>
                  <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-400/10 transition-all"><LogOut size={14} className="inline mr-1.5" />Sign Out</button>
                </>
              ) : (
                <Link href="/signin" onClick={() => setMobileOpen(false)} className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold bg-accent hover:bg-accent-hover text-white transition-all">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
