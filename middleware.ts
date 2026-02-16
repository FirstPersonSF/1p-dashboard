import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function getSiteUrl(req: NextRequest): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  const forwardedHost = req.headers.get('x-forwarded-host')
  const forwardedProto = req.headers.get('x-forwarded-proto') || 'https'
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`
  }
  const host = req.headers.get('host')
  if (host) {
    const proto = host.includes('localhost') ? 'http' : 'https'
    return `${proto}://${host}`
  }
  return 'http://localhost:3000'
}

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: { headers: req.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          res = NextResponse.next({ request: { headers: req.headers } })
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()
  console.log('[middleware]', req.nextUrl.pathname, '| user:', user?.email ?? 'null', '| error:', error?.message ?? 'none')
  console.log('[middleware] cookies:', req.cookies.getAll().map(c => c.name))

  const siteUrl = getSiteUrl(req)
  const isAuthRoute = req.nextUrl.pathname === '/login' || req.nextUrl.pathname.startsWith('/auth/')
  console.log('[middleware] isAuthRoute:', isAuthRoute, '| siteUrl:', siteUrl)

  if (!isAuthRoute && (!user || error)) {
    const redirectUrl = new URL('/login', siteUrl)
    return NextResponse.redirect(redirectUrl)
  }

  if (req.nextUrl.pathname === '/login' && user && !error) {
    return NextResponse.redirect(new URL('/', siteUrl))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
