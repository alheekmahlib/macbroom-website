import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacBroom — The Ultimate Mac Cleaner",
  description:
    "Clean, optimize, and speed up your Mac. Remove junk files, manage apps, and monitor system performance.",
  icons: {
    icon: "/macbroom-website/icon.png",
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
        {children}
      </body>
    </html>
  );
}
