'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Smartphone,
  Mail,
  MessageSquare,
  LogOut,
  ChevronRight,
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
  const tier = profile?.subscription_tier || 'FREE'

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

      {/* Account Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xs font-bold text-distant-data uppercase tracking-wide mb-3 px-1">
          Account
        </h3>
        <div className="rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] overflow-hidden divide-y divide-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center justify-between p-4 hover:bg-panel-edge/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center">
                <User className="w-5 h-5 text-market-mist" />
              </div>
              <div>
                <p className="font-medium text-clear-signal text-sm">Profile Information</p>
                <p className="text-xs text-market-mist">Update your name and email</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-distant-data" />
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-panel-edge/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center">
                <Shield className="w-5 h-5 text-market-mist" />
              </div>
              <div>
                <p className="font-medium text-clear-signal text-sm">Password & Security</p>
                <p className="text-xs text-market-mist">Change password, enable 2FA</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-distant-data" />
          </div>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xs font-bold text-distant-data uppercase tracking-wide mb-3 px-1">
          Notifications
        </h3>
        <div className="rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] overflow-hidden divide-y divide-[rgb(var(--color-border-subtle))]">
          {/* Email Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center">
                <Mail className="w-5 h-5 text-market-mist" />
              </div>
              <div>
                <p className="font-medium text-clear-signal text-sm">Email Notifications</p>
                <p className="text-xs text-market-mist">Signal alerts via email</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(n => ({ ...n, email: !n.email }))}
              className={cn(
                "w-12 h-7 rounded-full transition-all relative",
                notifications.email ? "bg-profit-pulse" : "bg-panel-edge"
              )}
            >
              <motion.div
                animate={{ x: notifications.email ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-md absolute top-1"
              />
            </button>
          </div>

          {/* Push Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-market-mist" />
              </div>
              <div>
                <p className="font-medium text-clear-signal text-sm">Push Notifications</p>
                <p className="text-xs text-market-mist">Browser push alerts</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(n => ({ ...n, push: !n.push }))}
              className={cn(
                "w-12 h-7 rounded-full transition-all relative",
                notifications.push ? "bg-profit-pulse" : "bg-panel-edge"
              )}
            >
              <motion.div
                animate={{ x: notifications.push ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-md absolute top-1"
              />
            </button>
          </div>

          {/* Telegram Toggle */}
          <div className={cn(
            "flex items-center justify-between p-4",
            tier === 'FREE' && "opacity-60"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-market-mist" />
              </div>
              <div>
                <p className="font-medium text-clear-signal text-sm">Telegram Alerts</p>
                <p className="text-xs text-market-mist">
                  {tier === 'FREE' ? 'Upgrade to Pro for Telegram' : 'Instant Telegram alerts'}
                </p>
              </div>
            </div>
            <button
              onClick={() => tier !== 'FREE' && setNotifications(n => ({ ...n, telegram: !n.telegram }))}
              disabled={tier === 'FREE'}
              className={cn(
                "w-12 h-7 rounded-full transition-all relative",
                notifications.telegram ? "bg-profit-pulse" : "bg-panel-edge",
                tier === 'FREE' && "cursor-not-allowed"
              )}
            >
              <motion.div
                animate={{ x: notifications.telegram ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-md absolute top-1"
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Subscription Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xs font-bold text-distant-data uppercase tracking-wide mb-3 px-1">
          Subscription
        </h3>
        <div className="rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] overflow-hidden">
          <div className="flex items-center justify-between p-4 hover:bg-panel-edge/50 transition-all">
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