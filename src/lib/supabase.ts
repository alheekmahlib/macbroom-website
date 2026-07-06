import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yprhjinkisfgnaokzxwq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcmhqaW5raXNmZ25hb2t6eHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMzEyODAsImV4cCI6MjA5MjkwNzI4MH0.Ft6_nBmvsm0h1aJjS52rWLliqidDkle4Cxxx0j5JIsY'

// The canonical production origin. Used as the email-confirmation redirect so
// that the activation link Supabase emails points back to macbroom.com instead
// of the Supabase project URL (which produced a broken "different link").
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://macbroom.com')

// Path users land on after clicking the email confirmation link.
export const AUTH_REDIRECT_URL = `${SITE_URL}/signin`

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // PKCE is the recommended secure flow for serverless / static-hosted SPAs.
    flowType: 'pkce',
    // Persist the session in localStorage so it survives reloads on the static site.
    persistSession: true,
    // Automatically complete the OAuth/email flow when Supabase redirects back
    // to the site with `?code=` / `#access_token=` in the URL.
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
})
