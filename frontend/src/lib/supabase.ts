import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fallback to hardcoded values if env vars are missing
const finalUrl = supabaseUrl || 'https://eklnszaeiggnufvqqvod.supabase.co'
const finalKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbG5zemFlaWdnbnVmdnFxdm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1OTYxMDgsImV4cCI6MjA3NDE3MjEwOH0.PGpWphX8JHyEuA5c_IPHpzVVF_zQCA1tDzC_68wezQI'

export const supabase = createClient(finalUrl, finalKey)

// For server-side operations
export const supabaseAdmin = createClient(
  finalUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbG5zemFlaWdnbnVmdnFxdm9kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODU5NjEwOCwiZXhwIjoyMDc0MTcyMTA4fQ.LfNYfiXr4owaaZ76frEGpU-ubkzwb4UewZtHeUFmWDU',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)