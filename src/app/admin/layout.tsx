'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@/hooks/use-user'
import { Loader2, Shield, LayoutDashboard, PlusCircle, TrendingUp, LogOut } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/signals/new', label: 'New Signal', icon: PlusCircle },
  { href: '/admin/signals', label: 'Manage Signals', icon: TrendingUp },
]

function AdminContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAdmin, loading } = useUser()
  const supabase = createClient()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && (!user || !isAdmin)) {
      router.replace('/admin/login')
    }
  }, [user, isAdmin, loading, mounted, router])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-market-depth flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-profit-pulse" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-market-depth flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-bear-strike mx-auto mb-4" />
          <p className="text-market-mist">Access denied. Redirecting...</p>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-market-depth">
      <header className="bg-chart-canvas border-b border-[rgb(var(--color-border-subtle))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bear-strike flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-clear-signal">Admin Panel</h1>
                <p className="text-xs text-market-mist">Quant Flow Trading</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-market-mist hover:text-clear-signal">
                View Site →
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-bear-strike hover:bg-[rgba(var(--color-bear-strike),0.1)] transition-swift"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-swift",
                      isActive 
                        ? "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike" 
                        : "text-market-mist hover:text-clear-signal hover:bg-panel-edge"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Admin login page - no auth required
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // All other admin pages - require auth
  return <AdminContent>{children}</AdminContent>
}