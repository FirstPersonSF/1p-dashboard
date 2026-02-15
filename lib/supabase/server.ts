import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

export async function createServerClient() {
  const cookieStore = await cookies()

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: getCookieOptions(),
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Called from Server Component — middleware handles refresh
          }
        },
      },
    }
  )
}
