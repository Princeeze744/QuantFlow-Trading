'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  TrendingUp,
  History,
  GraduationCap,
  Settings,
  Bell,
  Menu,
  X,
  User,
  Crown,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/use-user'
import { createClient } from '@/lib/supabase/client'

// Bottom nav items (max 5 for mobile)
const bottomNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/dashboard/signals', icon: TrendingUp, label: 'Signals' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/academy', icon: GraduationCap, label: 'Learn' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, profile } = useUser()
  const supabase = createClient()
  const [showMenu, setShowMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-market-depth flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-profit-pulse border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-market-depth">
      {/* === MOBILE HEADER === */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 safe-top">
        <div className="glass border-b border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center justify-between px-4 h-14">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-profit-pulse flex items-center justify-center">
                <span className="text-white font-bold text-sm">QF</span>
              </div>
              <span className="font-semibold text-clear-signal">Quant Flow</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button className="touch-target rounded-xl text-market-mist hover:text-clear-signal transition-swift relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-profit-pulse rounded-full" />
              </button>
              
              <button 
                onClick={() => setShowMenu(true)}
                className="touch-target rounded-xl text-market-mist hover:text-clear-signal transition-swift"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* === DESKTOP SIDEBAR === */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 flex-col bg-chart-canvas border-r border-[rgb(var(--color-border-subtle))]">
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-[rgb(var(--color-border-subtle))]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-profit-pulse flex items-center justify-center">
              <span className="text-white font-bold">QF</span>
            </div>
            <span className="text-lg font-semibold text-clear-signal">Quant Flow</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 mb-3 text-xs font-medium text-distant-data uppercase tracking-wider">Menu</p>
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-swift",
                  isActive
                    ? "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse"
                    : "text-market-mist hover:text-clear-signal hover:bg-panel-edge"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Upgrade Card */}
        <div className="p-3">
          <div className="p-4 rounded-xl bg-[rgba(var(--color-golden-edge),0.1)] border border-[rgba(var(--color-golden-edge),0.2)]">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-golden-edge" />
              <span className="text-sm font-medium text-golden-edge">Upgrade</span>
            </div>
            <p className="text-xs text-market-mist mb-3">Unlock all features with Pro</p>
            <Link
              href="/pricing"
              className="block w-full py-2 text-center text-sm font-medium rounded-lg bg-golden-edge text-market-depth hover:opacity-90 transition-swift"
            >
              View Plans
            </Link>
          </div>
        </div>

        {/* User */}
        <div className="p-3 border-t border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-panel-edge flex items-center justify-center">
              <User className="w-5 h-5 text-market-mist" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-clear-signal truncate">
                {profile?.full_name || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-market-mist">Free Plan</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg text-market-mist hover:text-bear-strike hover:bg-[rgba(var(--color-bear-strike),0.1)] transition-swift"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* === MOBILE SLIDE-OUT MENU === */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-chart-canvas border-l border-[rgb(var(--color-border-subtle))] safe-top safe-bottom"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border-subtle))]">
                  <span className="font-semibold text-clear-signal">Menu</span>
                  <button 
                    onClick={() => setShowMenu(false)}
                    className="touch-target rounded-xl text-market-mist hover:text-clear-signal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-[rgb(var(--color-border-subtle))]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-panel-edge flex items-center justify-center">
                      <User className="w-6 h-6 text-market-mist" />
                    </div>
                    <div>
                      <p className="font-medium text-clear-signal">
                        {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-sm text-market-mist">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Upgrade Banner */}
                <div className="p-4">
                  <div className="p-4 rounded-xl gradient-premium border border-[rgba(var(--color-profit-pulse),0.2)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-5 h-5 text-golden-edge" />
                      <span className="font-medium text-golden-edge">Go Pro</span>
                    </div>
                    <p className="text-sm text-market-mist mb-3">
                      Unlock premium signals & features
                    </p>
                    <Link
                      href="/pricing"
                      onClick={() => setShowMenu(false)}
                      className="block w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-golden-edge text-market-depth"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                </div>

                {/* Logout */}
                <div className="mt-auto p-4 border-t border-[rgb(var(--color-border-subtle))]">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-bear-strike hover:bg-[rgba(var(--color-bear-strike),0.1)] transition-swift"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* === DESKTOP HEADER === */}
      <header className="hidden lg:block fixed top-0 left-64 right-0 z-40 bg-chart-canvas/80 backdrop-blur-md border-b border-[rgb(var(--color-border-subtle))]">
        <div className="flex items-center justify-between px-8 h-16">
          <div>
            <h1 className="text-lg font-semibold text-clear-signal">Quant Flow Trading</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl text-market-mist hover:text-clear-signal hover:bg-panel-edge transition-swift">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-profit-pulse rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[rgb(var(--color-border-subtle))]">
              <div className="w-9 h-9 rounded-full bg-panel-edge flex items-center justify-center">
                <User className="w-5 h-5 text-market-mist" />
              </div>
              <div>
                <p className="text-sm font-medium text-clear-signal">
                  {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-profit-pulse">FREE</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* === MAIN CONTENT === */}
      <main className={cn(
        "min-h-screen",
        "pt-14 pb-20", // Mobile: header + bottom nav
        "lg:pt-16 lg:pb-8 lg:pl-64" // Desktop
      )}>
        <div className="px-4 py-4 lg:px-8 lg:py-6">
          {children}
        </div>
      </main>

      {/* === MOBILE BOTTOM NAVIGATION === */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom">
        <div className="glass border-t border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center justify-around px-2 py-2">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-1 py-1 px-3 min-w-[56px]"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    className={cn(
                      "p-2 rounded-xl transition-swift",
                      isActive 
                        ? "bg-[rgba(var(--color-profit-pulse),0.15)]" 
                        : "bg-transparent"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-swift",
                      isActive ? "text-profit-pulse" : "text-market-mist"
                    )} />
                  </motion.div>
                  <span className={cn(
                    "text-xs font-medium transition-swift",
                    isActive ? "text-profit-pulse" : "text-distant-data"
                  )}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}