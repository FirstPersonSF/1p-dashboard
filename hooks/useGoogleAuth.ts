'use client'

import { useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

interface UseGoogleAuthOptions {
  redirectTo?: string
  callbackPath?: string
  siteUrl?: string
}

interface UseGoogleAuthReturn {
  signInWithGoogle: () => Promise<void>
  loading: boolean
  error: string | null
  clearError: () => void
}

export function useGoogleAuth(options: UseGoogleAuthOptions = {}): UseGoogleAuthReturn {
  const { redirectTo = '/', callbackPath = '/auth/callback', siteUrl } = options
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signInWithGoogle = async () => {
    setError(null)
    setLoading(true)

    try {
      const supabase = getSupabaseClient()
      const baseUrl = siteUrl
        || process.env.NEXT_PUBLIC_SITE_URL
        || (typeof window !== 'undefined' ? window.location.origin : '')

      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${baseUrl}${callbackPath}?redirect=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
      }
    } catch (err) {
      console.error('Google sign-in error:', err)
      console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('ANON_KEY set:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      console.log('SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL)
      setError('Failed to initialize Google sign-in')
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return { signInWithGoogle, loading, error, clearError }
}
