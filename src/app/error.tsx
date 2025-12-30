'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-market-depth flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-bear-strike/15 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-bear-strike" />
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-clear-signal mb-4">
          Something Went Wrong
        </h1>
        <p className="text-market-mist mb-8">
          We encountered an unexpected error. Don't worry, our team has been notified and is working on a fix.
        </p>

        {/* Error Code (optional) */}
        {error.digest && (
          <p className="text-xs text-distant-data mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-profit-pulse text-white font-semibold hover:opacity-90 transition-all w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-panel-edge text-clear-signal font-semibold hover:bg-[rgb(var(--color-border-subtle))] transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}