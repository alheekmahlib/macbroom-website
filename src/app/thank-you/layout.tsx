import type { Metadata } from "next";

// /thank-you is a client component; metadata is attached via this sibling layout.
export const metadata: Metadata = {
  title: "Thank You",
  description: "Your MacBroom purchase is complete. Thank you for your support!",
  alternates: { canonical: "/thank-you" },
  // Transient post-purchase page — should not be indexed.
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
