"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Supabase email links (confirmation, recovery, magic-link, email change) land
 * the user on whatever URL is configured as the "Site URL" in the Supabase
 * dashboard. On a static site that URL is usually the homepage (`/`), which does
 * NOT host an auth client — so the `?code=...` / `#access_token=...` payload
 * never gets exchanged into a session and the flow silently dies.
 *
 * This component runs on every page. If it detects an auth payload in the URL,
 * it forwards the user to `/signin` (preserving all params/hash) so the Supabase
 * client living there can complete the exchange and the recovery/confirmation
 * UI can take over.
 */
export default function AuthRedirectHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Already on /signin — let that page handle it.
    if (pathname === "/signin") return;

    const hasAuthCode = searchParams.get("code");
    const hasAuthError = searchParams.get("error");
    const hasAuthType =
      searchParams.get("type") &&
      ["recovery", "signup", "email_change", "invite", "magiclink"].includes(
        searchParams.get("type") as string
      );

    // OAuth/email flows can also appear in the URL hash (`#access_token=...`).
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const hasHashToken = hash.includes("access_token") || hash.includes("error_code");

    if (hasAuthCode || hasAuthError || hasAuthType || hasHashToken) {
      // Preserve the original query string (and hash) so /signin can process it.
      const search = window.location.search || "";
      router.replace(`/signin${search}${hash}`);
    }
  }, [pathname, searchParams, router]);

  return null;
}
