import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Twitter card image (1200x630). Kept as a standalone file (rather than
// re-exporting from opengraph-image.tsx) because re-exporting `runtime`
// triggers a Next.js build warning.
export const runtime = "nodejs";
// Required for static export (`output: 'export'`).
export const dynamic = "force-static";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0E1A",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(64,115,242,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(123,159,255,0.18), transparent 40%)",
          color: "#F0F4FC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              backgroundColor: "#4073F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
            }}
          >
            🧹
          </div>
          <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -2,
            textAlign: "center",
            padding: "0 80px",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#A5B8FF",
            padding: "0 120px",
            textAlign: "center",
          }}
        >
          Clean, optimize, and speed up your Mac.
        </div>
      </div>
    ),
    size
  );
}
