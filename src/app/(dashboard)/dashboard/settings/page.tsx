'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  LogOut,
  ChevronRight,
  Check,
  Crown,
  Zap
} from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function SettingsPage() {
  const { user, profile } = useUser()
  const router = useRouter()
  const supabase = createClient()
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    telegram: false,
  })

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Trader'
  const tier = profile?.tier || 'FREE'

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile Information',
          description: 'Update your name and email',
          action: 'edit',
        },
        {
          icon: Shield,
          label: 'Password & Security',
          description: 'Change password, enable 2FA',
          action: 'edit',
        },
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Mail,
          label: 'Email Notifications',
          description: 'Signal alerts via email',
          toggle: true,
          enabled: notifications.email,
          onToggle: () => setNotifications(n => ({ ...n, email: !n.email })),
        },
        {
          icon: Smartphone,
          label: 'Push Notifications',
          description: 'Browser push alerts',
          toggle: true,
          enabled: notifications.push,
          onToggle: () => setNotifications(n => ({ ...n, push: !n.push })),
        },
        {
          icon: MessageSquare,
          label: 'Telegram Alerts',
          description: tier === 'FREE' ? 'Upgrade to Pro for Telegram' : 'Instant Telegram alerts',
          toggle: tier !== 'FREE',
          enabled: notifications.telegram,
          onToggle: () => setNotifications(n => ({ ...n, telegram: !n.telegram })),
          locked: tier === 'FREE',
        },
      ]
    },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-clear-signal mb-1">Settings</h1>
        <p className="text-market-mist text-sm">Manage your account preferences</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))]"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-profit-pulse/20 to-profit-pulse/5 flex items-center justify-center text-2xl font-bold text-profit-pulse border border-profit-pulse/20">
            {firstName.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-clear-signal">{profile?.full_name || 'Trader'}</h2>
            <p className="text-sm text-market-mist">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold",
                tier === 'VIP' && "bg-golden-edge/15 text-golden-edge",
                tier === 'PRO' && "bg-profit-pulse/15 text-profit-pulse",
                tier === 'BASIC' && "bg-data-stream/15 text-data-stream",
                tier === 'FREE' && "bg-panel-edge text-market-mist"
              )}>
                {tier === 'VIP' && <Crown className="w-3 h-3" />}
                {tier === 'PRO' && <Zap className="w-3 h-3" />}
                {tier} Plan
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Card (for non-VIP) */}
      {tier !== 'VIP' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Link
            href="/#pricing"
            className="block p-5 rounded-2xl bg-gradient-to-br from-profit-pulse/10 to-transparent border border-profit-pulse/20 hover:border-profit-pulse/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-profit-pulse/15 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-profit-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-clear-signal">Upgrade Your Plan</p>
                  <p className="text-xs text-market-mist">Get real-time alerts & more features</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-profit-pulse" />
            </div>
          </Link>
        </motion.div>
      )}

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + sectionIndex * 0.1 }}
        >
          <h3 className="text-xs font-bold text-distant-data uppercase tracking-wide mb-3 px-1">
            {section.title}
          </h3>
          <div className="rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] overflow-hidden divide-y divide-[rgb(var(--color-border-subtle))]">
            {section.items.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between p-4 hover:bg-panel-edge/50 transition-all",
                  item.locked && "opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-market-mist" />
                  </div>
                  <div>
                    <p className="font-medium text-clear-signal text-sm">{item.label}</p>
                    <p className="text-xs text-market-mist">{item.description}</p>
                  </div>
                </div>
                
                {item.toggle ? (
                  <button
                    onClick={item.onToggle}
                    disabled={item.locked}
                    className={cn(
                      "w-12 h-7 rounded-full transition-all relative",
                      item.enabled ? "bg-profit-pulse" : "bg-panel-edge"
                    )}
                  >
                    <motion.div
                      animate={{ x: item.enabled ? 22 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-white shadow-md absolute top-1"
                    />
                  </button>
                ) : (
                  <ChevronRight className="w-5 h-5 text-distant-data" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Subscription Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xs font-bold text-distant-data uppercase tracking-wide mb-3 px-1">
          Subscription
        </h3>
        <div className="rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-market-mist" />
              </div>
              <div>
                <p className="font-medium text-clear-signal text-sm">Billing & Payments</p>
                <p className="text-xs text-market-mist">Manage your subscription</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-distant-data" />
          </div>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-bear-strike/10 border border-bear-strike/20 text-bear-strike font-semibold hover:bg-bear-strike/20 transition-all active-scale"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </motion.div>

      {/* App Version */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-distant-data pt-4"
      >
        Quant Flow Trading v1.0.0
      </motion.p>
    </div>
  )
}