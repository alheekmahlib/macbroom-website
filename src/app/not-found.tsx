import Link from "next/link";

// Custom 404 page — matches the site's dark theme.
// `not-found.tsx` is a server component, so no "use client".
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      {/* soft accent glow background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(64,115,242,0.18), transparent 45%), radial-gradient(circle at 75% 75%, rgba(123,159,255,0.12), transparent 40%)",
        }}
      />
      <div className="relative max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
          <img
            src="/icon.png"
            alt="MacBroom"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold text-white">MacBroom</span>
        </Link>
        <p
          className="text-7xl sm:text-8xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #4073F2, #7B9FFF, #A5B8FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Page not found
        </h1>
        <p className="text-txt-dim text-sm mb-8 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have been
          moved. Let&rsquo;s get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center text-sm font-semibold py-3 px-6 rounded-xl bg-accent hover:bg-accent-hover text-white transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
          >
            Back to Home
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center justify-center text-sm font-semibold py-3 px-6 rounded-xl border border-white/10 text-txt-dim hover:text-white hover:border-white/20 transition-all duration-200"
          >
            Get Support
          </Link>
        </div>
      </div>
    </main>
  );
}
