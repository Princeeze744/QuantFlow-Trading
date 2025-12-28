'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Menu, 
  X, 
  User,
  Settings,
  LogOut,
  Crown,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { MOTION, EASING, APP_CONFIG } from '@/lib/constants'

interface HeaderProps {
  user?: {
    email: string
    full_name?: string | null
    avatar_url?: string | null
    subscription_tier?: string
  }
  onMenuToggle?: () => void
  isSidebarOpen?: boolean
}

export function Header({ user, onMenuToggle, isSidebarOpen }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [hasNotifications] = useState(true)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className={cn(
      "sticky top-0 z-40",
      "h-16 px-4 lg:px-6",
      "bg-chart-canvas/80 backdrop-blur-xl",
      "border-b border-[rgb(var(--color-border-subtle))]",
      "flex items-center justify-between"
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-panel-edge transition-swift"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5 text-market-mist" />
          ) : (
            <Menu className="w-5 h-5 text-market-mist" />
          )}
        </button>

        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-profit-pulse flex items-center justify-center">
            <span className="text-white font-bold text-sm">QF</span>
          </div>
          <span className="hidden sm:block text-lg font-semibold text-clear-signal">{APP_CONFIG.name}</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg hover:bg-panel-edge transition-swift">
          <Bell className="w-5 h-5 text-market-mist" />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-profit-pulse rounded-full" />
          )}
        </button>

        {user && (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-swift",
                "hover:bg-panel-edge",
                isProfileOpen && "bg-panel-edge"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-panel-edge flex items-center justify-center overflow-hidden">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-market-mist" />
                )}
              </div>
              
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-clear-signal">{user.full_name || user.email.split('@')[0]}</p>
                <div className="flex items-center gap-1">
                  {user.subscription_tier === 'VIP' && <Crown className="w-3 h-3 text-golden-edge" />}
                  <span className="text-xs text-market-mist">{user.subscription_tier || 'FREE'}</span>
                </div>
              </div>
              
              <ChevronDown className={cn(
                "w-4 h-4 text-market-mist transition-smooth hidden md:block",
                isProfileOpen && "rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: MOTION.swift / 1000, ease: EASING.out }}
                    className={cn(
                      "absolute right-0 top-full mt-2 z-50",
                      "w-56 py-2 rounded-lg",
                      "bg-chart-canvas border border-[rgb(var(--color-border-subtle))]",
                      "shadow-xl"
                    )}
                  >
                    <div className="px-4 py-3 border-b border-[rgb(var(--color-border-subtle))]">
                      <p className="text-sm font-medium text-clear-signal">{user.full_name || 'User'}</p>
                      <p className="text-xs text-market-mist truncate">{user.email}</p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-market-mist hover:text-clear-signal hover:bg-panel-edge transition-swift"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-market-mist hover:text-clear-signal hover:bg-panel-edge transition-swift"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      {user.subscription_tier !== 'VIP' && (
                        <Link
                          href="/pricing"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-golden-edge hover:bg-[rgba(var(--color-golden-edge),0.1)] transition-swift"
                        >
                          <Crown className="w-4 h-4" />
                          Upgrade Plan
                        </Link>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[rgb(var(--color-border-subtle))]">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-market-mist hover:text-clear-signal hover:bg-panel-edge transition-swift w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  )
}