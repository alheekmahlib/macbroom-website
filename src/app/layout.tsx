import type { Metadata } from "next";
import { Suspense } from "react";
import AuthRedirectHandler from "@/components/AuthRedirectHandler";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacBroom — The Ultimate Mac Cleaner",
  description:
    "Clean, optimize, and speed up your Mac. Remove junk files, manage apps, and monitor system performance.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0A0E1A", color: "#F0F4FC" }}>
        {/* useSearchParams requires a Suspense boundary during static export. */}
        <Suspense fallback={null}>
          <AuthRedirectHandler />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
