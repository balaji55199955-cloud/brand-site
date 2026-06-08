import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// ⚠️ NEVER use this in browser code or client components
// ONLY use in API route handlers and server-side functions
export const adminSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
