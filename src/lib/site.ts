// Central site configuration used by metadata, JSON-LD, and SEO utilities.
// Keeping these in one place avoids drift across the app.

export const siteConfig = {
  name: "MacBroom",
  tagline: "The Ultimate Mac Cleaner",
  description:
    "Clean, optimize, and speed up your Mac. Remove junk files, manage apps, and monitor system performance with MacBroom.",
  url: "https://macbroom.com",
  locale: "en_US",
  // Company behind the product (used in Organization schema + legal pages).
  publisher: "VexalTech",
  supportEmail: "info@vexaltech.dev",
  // macOS app download + auto-update feed.
  downloadUrl:
    "https://pub-d4edf86c1dda40ea8f2d3a52648ca443.r2.dev/MacBroom-latest.zip",
  githubIssues: "https://github.com/alheekmahlib/macbroom/issues",
  // Social share image is generated via src/app/opengraph-image.tsx and
  // auto-linked by Next.js, so no explicit ogImage path is needed here.
} as const;

// Helper for per-route canonical + metadataBase URLs.
export const siteUrl = (path = "") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
