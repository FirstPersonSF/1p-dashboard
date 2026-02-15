'use client'

import { createBrowserClient } from '@supabase/ssr'

function getCookieOptions() {
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN
  if (!domain) return undefined
  return {
    domain,
    path: '/',
    sameSite: 'lax' as const,
    secure: true,
  }
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookieOptions: getCookieOptions() }
  )
}

let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!browserClient) {
    browserClient = createClient()
  }
  return browserClient
}
