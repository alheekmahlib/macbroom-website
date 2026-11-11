import type { Metadata } from "next";
import { faqs } from "@/lib/faq-data";

// /support is a client component; metadata is attached via this sibling layout.
export const metadata: Metadata = {
  title: "Support & Help Center",
  description:
    "Find answers to common MacBroom questions, search the FAQ, or contact our support team for help with your license or the app.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "MacBroom Support & Help Center",
    description:
      "Search the FAQ and find help with MacBroom — licenses, billing, safety, and more.",
    url: "/support",
  },
};

// Duplicate the FAQ structured data here too, since this page renders the FAQ.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
