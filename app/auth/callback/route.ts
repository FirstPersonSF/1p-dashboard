import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSiteUrl, getSafeRedirect } from '@/lib/getSiteUrl'

function getCookieOptions() {
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN
  if (!domain) return {}
  return {
    domain,
    sameSite: 'lax' as const,
    secure: true,
    path: '/',
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const redirect = searchParams.get('redirect') || searchParams.get('next')

  const siteUrl = getSiteUrl(request)
  const safeRedirect = getSafeRedirect(redirect, '/')

  const redirectUrl = safeRedirect.startsWith('http') ? safeRedirect : `${siteUrl}${safeRedirect}`

  if (code) {
    const cookiesToSet: Array<{ name: string; value: string; options: Record<string, unknown> }> = []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookies) {
            cookies.forEach(({ name, value, options }) => {
              cookiesToSet.push({ name, value, options: options || {} })
            })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const baseCookieOptions = getCookieOptions()

      const response = new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="refresh" content="0;url=${redirectUrl}">
            <script>window.location.href = "${redirectUrl}";</script>
          </head>
          <body><p>Redirecting...</p></body>
        </html>`,
        { status: 200, headers: { 'Content-Type': 'text/html' } }
      )

      cookiesToSet.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, {
          ...options,
          ...baseCookieOptions,
        })
      })

      return response
    }

    return NextResponse.redirect(`${siteUrl}/login?error=${encodeURIComponent(error.message)}`)
  }

  return NextResponse.redirect(`${siteUrl}/login?error=no_code`)
}
