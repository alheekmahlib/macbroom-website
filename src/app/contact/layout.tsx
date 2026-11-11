import type { Metadata } from "next";

// /contact is a client component, so it can't export `metadata` itself.
// A sibling layout (this file) is the App Router way to attach metadata
// to a client-route segment.
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the MacBroom team. Send us a message, report a bug, or ask a question — we typically reply within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MacBroom",
    description:
      "Send us a message, report a bug, or ask a question about MacBroom.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
