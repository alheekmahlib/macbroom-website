import type { Metadata } from "next";

// /profile is a client component; metadata is attached via this sibling layout.
export const metadata: Metadata = {
  title: "Your Account",
  description:
    "Manage your MacBroom licenses, activate keys, and view your subscription.",
  alternates: { canonical: "/profile" },
  // Private, user-specific page — no search value.
  robots: { index: false, follow: false },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
