import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSiteUrl } from '@/lib/getSiteUrl'

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, {
              ...options,
              ...(domain ? { domain } : {}),
            })
          })
        },
      },
    }
  )

  await supabase.auth.signOut()

  const siteUrl = getSiteUrl(request)
  return NextResponse.redirect(new URL('/login', siteUrl), { status: 302 })
}
