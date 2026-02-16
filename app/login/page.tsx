'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { GoogleIcon } from '@/components/GoogleIcon'

function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  const errorParam = searchParams.get('error')

  useEffect(() => {
    console.log('[login] full URL:', window.location.href)
    console.log('[login] hash:', window.location.hash)
    console.log('[login] search:', window.location.search)
  }, [])

  const { signInWithGoogle, loading, error } = useGoogleAuth({
    redirectTo,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">1P Tools</h1>
          <p className="mt-2 text-gray-400">Sign in to access your tools</p>
        </div>

        {(error || errorParam) && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
            {error || errorParam}
          </div>
        )}

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-all hover:bg-gray-100 disabled:opacity-50"
        >
          <GoogleIcon />
          {loading ? 'Connecting...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
