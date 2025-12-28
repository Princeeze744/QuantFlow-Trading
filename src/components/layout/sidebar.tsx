'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  TrendingUp,
  History,
  Calculator,
  Users,
  GraduationCap,
  Settings,
  Crown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION } from '@/lib/constants'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  subscriptionTier?: string
}

const userNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/signals', icon: TrendingUp, label: 'Signals' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/calculator', icon: Calculator, label: 'Calculator', tier: 'PRO' },
  { href: '/dashboard/community', icon: Users, label: 'Community', tier: 'PRO' },
  { href: '/dashboard/academy', icon: GraduationCap, label: 'Academy' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar({ isOpen, onClose, subscriptionTier = 'FREE' }: SidebarProps) {
  const pathname = usePathname()

  const canAccess = (tier?: string) => {
    if (!tier) return true
    const tierOrder = ['FREE', 'BASIC', 'PRO', 'VIP']
    const userTierIndex = tierOrder.indexOf(subscriptionTier)
    const requiredTierIndex = tierOrder.indexOf(tier)
    return userTierIndex >= requiredTierIndex
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.swift / 1000 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64",
          "bg-chart-canvas border-r border-[rgb(var(--color-border-subtle))]",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 px-6 flex items-center border-b border-[rgb(var(--color-border-subtle))]">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-profit-pulse flex items-center justify-center">
                <span className="text-white font-bold text-sm">QF</span>
              </div>
              <span className="text-lg font-semibold text-clear-signal">Quant Flow</span>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <div className="mb-6">
              <p className="px-3 mb-2 text-xs font-medium text-distant-data uppercase tracking-wider">Menu</p>
              {userNavItems.map((item) => {
                const isActive = pathname === item.href
                const hasAccess = canAccess(item.tier)
                
                if (!hasAccess) {
                  return (
                    <div
                      key={item.href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-distant-data cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-panel-edge text-distant-data">{item.tier}</span>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-swift",
                      isActive
                        ? "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse"
                        : "text-market-mist hover:text-clear-signal hover:bg-panel-edge"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {subscriptionTier !== 'VIP' && (
            <div className="p-4 m-3 rounded-lg bg-[rgba(var(--color-golden-edge),0.1)] border border-[rgba(var(--color-golden-edge),0.3)]">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-golden-edge" />
                <span className="text-sm font-medium text-golden-edge">Upgrade</span>
              </div>
              <p className="text-xs text-market-mist mb-3">Unlock all features with Pro or VIP</p>
              <Link
                href="/pricing"
                className="block w-full py-2 text-center text-sm font-medium rounded-lg bg-golden-edge text-market-depth hover:opacity-90 transition-swift"
              >
                View Plans
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}