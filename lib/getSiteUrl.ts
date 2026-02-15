import type { NextRequest } from 'next/server'

export function getSiteUrl(request: NextRequest): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`
  }

  const host = request.headers.get('host')
  if (host) {
    const proto = host.includes('localhost') ? 'http' : 'https'
    return `${proto}://${host}`
  }

  return new URL(request.url).origin
}

export function getSafeRedirect(url: string | null, defaultPath: string = '/'): string {
  if (!url) return defaultPath
  if (url.startsWith('/') && !url.startsWith('//')) {
    return url
  }
  try {
    const parsed = new URL(url)
    if (parsed.hostname.endsWith('.1p.is') || parsed.hostname.endsWith('.up.railway.app')) {
      return url
    }
  } catch {
    // Invalid URL
  }
  return defaultPath
}
