import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-market-depth flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-profit-pulse to-golden-edge">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-panel-edge flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-distant-data" />
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-clear-signal mb-4">
          Page Not Found
        </h1>
        <p className="text-market-mist mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-profit-pulse text-white font-semibold hover:opacity-90 transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-panel-edge text-clear-signal font-semibold hover:bg-[rgb(var(--color-border-subtle))] transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}