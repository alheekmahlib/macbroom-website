import type { Metadata } from "next";

// /signin is a client component; metadata is attached via this sibling layout.
export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your MacBroom account to manage your licenses and subscriptions.",
  alternates: { canonical: "/signin" },
  // Auth pages add no search value and should not be indexed.
  robots: { index: false, follow: false },
};

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
