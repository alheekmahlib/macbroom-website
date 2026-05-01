import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yprhjinkisfgnaokzxwq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcmhqaW5raXNmZ25hb2t6eHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMzEyODAsImV4cCI6MjA5MjkwNzI4MH0.Ft6_nBmvsm0h1aJjS52rWLliqidDkle4Cxxx0j5JIsY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
