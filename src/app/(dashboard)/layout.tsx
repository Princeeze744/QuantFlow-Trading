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
  LogOut,
  ChevronRight,
  Sparkles,
  Shield,
  HelpCircle,
  MessageSquare,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/use-user'
import { createClient } from '@/lib/supabase/client'

// Navigation items
const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/dashboard/signals', icon: TrendingUp, label: 'Signals' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/academy', icon: GraduationCap, label: 'Learn' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

// Menu items for slide-out
const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/signals', icon: TrendingUp, label: 'All Signals' },
  { href: '/dashboard/history', icon: History, label: 'Trade History' },
  { href: '/dashboard/academy', icon: GraduationCap, label: 'Academy' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

const supportItems = [
  { href: '/help', icon: HelpCircle, label: 'Help Center' },
  { href: '/feedback', icon: MessageSquare, label: 'Send Feedback' },
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
  const [hasNotifications] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Close menu on route change
    setShowMenu(false)
  }, [pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Trader'
  const userInitial = firstName.charAt(0).toUpperCase()

  // Loading state with skeleton
  if (!mounted) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-market-depth flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-profit-pulse flex items-center justify-center">
            <span className="text-white font-bold text-lg">QF</span>
          </div>
          <div className="w-8 h-8 border-2 border-profit-pulse border-t-transparent rounded-full animate-spin" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-market-depth">
      {/* ============================================
          MOBILE HEADER - Glass with blur
          ============================================ */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="safe-top bg-[rgba(var(--color-chart-canvas),0.85)] backdrop-blur-xl border-b border-[rgba(var(--color-border-subtle),0.5)]">
          <div className="flex items-center justify-between px-4 h-14">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2.5 active-scale">
              <motion.div 
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-profit-pulse to-[rgba(var(--color-profit-pulse),0.7)] flex items-center justify-center shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)]"
              >
                <span className="text-white font-bold text-sm">QF</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-semibold text-clear-signal text-sm leading-tight">Quant Flow</span>
                <span className="text-[10px] text-profit-pulse font-medium">Trading</span>
              </div>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-0.5">
              {/* Notification Bell */}
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="touch-target rounded-2xl text-market-mist hover:text-clear-signal transition-swift relative"
              >
                <Bell className="w-5 h-5" />
                {hasNotifications && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2.5 right-2.5 w-2 h-2 bg-profit-pulse rounded-full ring-2 ring-[rgb(var(--color-chart-canvas))]"
                  >
                    <span className="absolute inset-0 rounded-full bg-profit-pulse animate-ping opacity-75" />
                  </motion.span>
                )}
              </motion.button>
              
              {/* User Avatar / Menu Button */}
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMenu(true)}
                className="touch-target rounded-2xl flex items-center gap-2 ml-1"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-panel-edge to-[rgba(var(--color-border-subtle),0.5)] flex items-center justify-center ring-2 ring-[rgba(var(--color-profit-pulse),0.2)]">
                  <span className="text-sm font-semibold text-clear-signal">{userInitial}</span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
          DESKTOP SIDEBAR - Premium design
          ============================================ */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 flex-col bg-chart-canvas border-r border-[rgb(var(--color-border-subtle))]">
        {/* Logo */}
        <div className="h-16 px-5 flex items-center border-b border-[rgb(var(--color-border-subtle))]">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-profit-pulse to-[rgba(var(--color-profit-pulse),0.7)] flex items-center justify-center shadow-lg shadow-[rgba(var(--color-profit-pulse),0.25)] group-hover:shadow-[rgba(var(--color-profit-pulse),0.4)] transition-all duration-300"
            >
              <span className="text-white font-bold">QF</span>
            </motion.div>
            <div>
              <span className="text-lg font-semibold text-clear-signal block leading-tight">Quant Flow</span>
              <span className="text-xs text-profit-pulse font-medium">Trading Platform</span>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 mb-4 text-[11px] font-semibold text-distant-data uppercase tracking-widest">Navigation</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-[rgba(var(--color-profit-pulse),0.12)] text-profit-pulse"
                    : "text-market-mist hover:text-clear-signal hover:bg-panel-edge"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-profit-pulse rounded-r-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-profit-pulse")} />
                <span className="font-medium">{item.label}</span>
                {item.label === 'Signals' && (
                  <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-profit-pulse text-white rounded-full">
                    NEW
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Upgrade Card */}
        <div className="p-3">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-[rgba(var(--color-golden-edge),0.15)] to-[rgba(var(--color-golden-edge),0.05)] border border-[rgba(var(--color-golden-edge),0.25)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-[rgba(var(--color-golden-edge),0.1)] rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-golden-edge" />
                <span className="text-sm font-semibold text-golden-edge">Go Premium</span>
              </div>
              <p className="text-xs text-market-mist mb-4 leading-relaxed">Unlock advanced signals, priority alerts & more</p>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl bg-golden-edge text-market-depth hover:opacity-90 transition-swift"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* User Section */}
        <div className="p-3 border-t border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-panel-edge to-[rgba(var(--color-border-subtle),0.5)] flex items-center justify-center ring-2 ring-[rgba(var(--color-profit-pulse),0.15)]">
              <span className="text-sm font-semibold text-clear-signal">{userInitial}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-clear-signal truncate">{firstName}</p>
              <p className="text-xs text-profit-pulse font-medium">Free Plan</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 rounded-lg text-market-mist hover:text-bear-strike hover:bg-[rgba(var(--color-bear-strike),0.1)] transition-swift"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </aside>

      {/* ============================================
          MOBILE SLIDE-OUT MENU - Premium Experience
          ============================================ */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowMenu(false)}
              className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-[320px] bg-chart-canvas border-l border-[rgb(var(--color-border-subtle))] flex flex-col"
            >
              {/* Safe area top */}
              <div className="safe-top" />
              
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--color-border-subtle))]">
                <span className="font-semibold text-clear-signal">Menu</span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(false)}
                  className="touch-target rounded-xl text-market-mist hover:text-clear-signal bg-panel-edge"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* User Profile Card */}
              <div className="p-5">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-panel-edge to-[rgba(var(--color-chart-canvas),0.5)] border border-[rgb(var(--color-border-subtle))]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-profit-pulse to-[rgba(var(--color-profit-pulse),0.6)] flex items-center justify-center shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)]">
                      <span className="text-xl font-bold text-white">{userInitial}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-clear-signal text-lg">{firstName}</p>
                      <p className="text-sm text-market-mist truncate">{user?.email}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse rounded-full">
                          FREE
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-3 overflow-y-auto">
                <p className="px-3 mb-2 text-[10px] font-semibold text-distant-data uppercase tracking-widest">Menu</p>
                <div className="space-y-1">
                  {menuItems.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setShowMenu(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all active-scale",
                            isActive
                              ? "bg-[rgba(var(--color-profit-pulse),0.12)] text-profit-pulse"
                              : "text-market-mist hover:text-clear-signal hover:bg-panel-edge"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium flex-1">{item.label}</span>
                          <ChevronRight className={cn("w-4 h-4 transition-transform", isActive && "text-profit-pulse")} />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Support Section */}
                <p className="px-3 mt-6 mb-2 text-[10px] font-semibold text-distant-data uppercase tracking-widest">Support</p>
                <div className="space-y-1">
                  {supportItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + 0.05 * index }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-market-mist hover:text-clear-signal hover:bg-panel-edge transition-all active-scale"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium flex-1">{item.label}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Upgrade Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[rgba(var(--color-golden-edge),0.2)] to-[rgba(var(--color-golden-edge),0.05)] border border-[rgba(var(--color-golden-edge),0.3)] relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[rgba(var(--color-golden-edge),0.2)] rounded-full blur-3xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-golden-edge flex items-center justify-center shadow-lg shadow-[rgba(var(--color-golden-edge),0.4)]">
                      <Crown className="w-6 h-6 text-market-depth" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-golden-edge">Upgrade to Pro</p>
                      <p className="text-xs text-market-mist">Unlock all features</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-golden-edge" />
                  </div>
                </div>
              </motion.div>

              {/* Logout Button */}
              <div className="p-4 border-t border-[rgb(var(--color-border-subtle))]">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-xl bg-[rgba(var(--color-bear-strike),0.1)] text-bear-strike font-medium transition-all hover:bg-[rgba(var(--color-bear-strike),0.15)]"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </motion.button>
              </div>

              {/* Safe area bottom */}
              <div className="safe-bottom" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================
          DESKTOP HEADER
          ============================================ */}
      <header className="hidden lg:block fixed top-0 left-64 right-0 z-40 bg-[rgba(var(--color-chart-canvas),0.8)] backdrop-blur-xl border-b border-[rgb(var(--color-border-subtle))]">
        <div className="flex items-center justify-between px-8 h-16">
          <div>
            <h1 className="text-lg font-semibold text-clear-signal">Welcome back, {firstName} 👋</h1>
            <p className="text-xs text-market-mist">Here's what's happening with your trades</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl text-market-mist hover:text-clear-signal hover:bg-panel-edge transition-swift"
            >
              <Bell className="w-5 h-5" />
              {hasNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-profit-pulse rounded-full ring-2 ring-[rgb(var(--color-chart-canvas))]">
                  <span className="absolute inset-0 rounded-full bg-profit-pulse animate-ping opacity-75" />
                </span>
              )}
            </motion.button>
            <div className="w-px h-8 bg-[rgb(var(--color-border-subtle))]" />
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-panel-edge to-[rgba(var(--color-border-subtle),0.5)] flex items-center justify-center ring-2 ring-[rgba(var(--color-profit-pulse),0.15)]">
                <span className="text-sm font-semibold text-clear-signal">{userInitial}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-clear-signal">{firstName}</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-profit-pulse" />
                  <p className="text-xs text-profit-pulse font-medium">Free Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
          MAIN CONTENT
          ============================================ */}
      <main className={cn(
        "min-h-screen",
        "pt-14 pb-20",
        "lg:pt-16 lg:pb-8 lg:pl-64"
      )}>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-4 lg:px-8 lg:py-6"
        >
          {children}
        </motion.div>
      </main>

      {/* ============================================
          MOBILE BOTTOM NAVIGATION - Premium Design
          ============================================ */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="safe-bottom bg-[rgba(var(--color-chart-canvas),0.9)] backdrop-blur-xl border-t border-[rgba(var(--color-border-subtle),0.5)]">
          <div className="flex items-center justify-around px-2 py-2 relative">
            {/* Animated Background Pill */}
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              if (!isActive) return null
              return (
                <motion.div
                  key={item.href}
                  layoutId="bottomnav-active"
                  className="absolute top-2 w-16 h-12 bg-[rgba(var(--color-profit-pulse),0.12)] rounded-2xl"
                  style={{ left: `calc(${index * 20}% + 10% - 32px)` }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )
            })}
            
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 py-1.5 px-3 min-w-[64px] relative z-10"
                >
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    animate={{ 
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="p-1.5"
                  >
                    <item.icon 
                      className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        isActive ? "text-profit-pulse" : "text-market-mist"
                      )} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>
                  <motion.span 
                    animate={{ 
                      opacity: isActive ? 1 : 0.7,
                      scale: isActive ? 1 : 0.95 
                    }}
                    className={cn(
                      "text-[10px] font-semibold transition-colors duration-200",
                      isActive ? "text-profit-pulse" : "text-distant-data"
                    )}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-profit-pulse"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}