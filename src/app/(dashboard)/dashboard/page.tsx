'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Loader2, 
  Sparkles,
  ChevronRight,
  Zap,
  Target,
  Trophy,
  Flame,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react'
import { FullSignalCard } from '@/components/signals/full-signal-card'
import { useUser } from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Signal {
  id: string
  asset: string
  timeframe: string
  status: string
  full_analysis?: string
  chart_image_url?: string
  is_featured?: boolean
  created_at: string
}

// Greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Good morning', emoji: '☀️' }
  if (hour < 17) return { text: 'Good afternoon', emoji: '🌤️' }
  if (hour < 21) return { text: 'Good evening', emoji: '🌅' }
  return { text: 'Good night', emoji: '🌙' }
}

// Get motivational message
const getMotivation = (signalCount: number, activeCount: number) => {
  if (signalCount === 0) return "Ready to start your trading journey?"
  if (activeCount > 3) return "Hot market! Multiple opportunities available"
  if (activeCount > 0) return "Active signals waiting for your action"
  return "Markets are quiet, stay patient"
}

export default function DashboardPage() {
  const { isAdmin, user, profile } = useUser()
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'featured'>('all')

  useEffect(() => {
    fetchSignals()
  }, [])

  const fetchSignals = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const res = await fetch('/api/signals')
      if (res.ok) {
        const data = await res.json()
        setSignals(data)
      }
    } catch (err) {
      console.error('Failed to fetch signals:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleDelete = async (signalId: string) => {
    if (!confirm('Delete this signal?')) return
    
    try {
      const res = await fetch(`/api/signals/${signalId}`, { method: 'DELETE' })
      if (res.ok) {
        setSignals(signals.filter(s => s.id !== signalId))
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const filteredSignals = signals.filter(s => {
    if (filter === 'active') return s.status === 'ACTIVE'
    if (filter === 'featured') return s.is_featured
    return true
  })

  const featuredSignal = signals.find(s => s.is_featured)
  const activeCount = signals.filter(s => s.status === 'ACTIVE').length
  const featuredCount = signals.filter(s => s.is_featured).length

  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Trader'
  const greeting = getGreeting()
  const motivation = getMotivation(signals.length, activeCount)

  // Stats data
  const stats = [
    { 
      label: 'Total Signals', 
      value: signals.length, 
      icon: Target, 
      color: 'profit-pulse',
      bg: 'from-[rgba(var(--color-profit-pulse),0.15)] to-[rgba(var(--color-profit-pulse),0.05)]'
    },
    { 
      label: 'Active Now', 
      value: activeCount, 
      icon: Flame, 
      color: 'golden-edge',
      bg: 'from-[rgba(var(--color-golden-edge),0.15)] to-[rgba(var(--color-golden-edge),0.05)]'
    },
    { 
      label: 'Featured', 
      value: featuredCount, 
      icon: Trophy, 
      color: 'data-stream',
      bg: 'from-[rgba(var(--color-data-stream),0.15)] to-[rgba(var(--color-data-stream),0.05)]'
    },
  ]

  // Filter options
  const filterOptions = [
    { key: 'all', label: 'All', count: signals.length },
    { key: 'active', label: 'Active', count: activeCount, dot: true },
    { key: 'featured', label: 'Featured', count: featuredCount, icon: Sparkles },
  ]

  return (
    <div className="space-y-6">
      {/* ============================================
          HERO WELCOME SECTION
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--color-profit-pulse),0.12)] via-chart-canvas to-chart-canvas" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[rgba(var(--color-profit-pulse),0.15)] to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[rgba(var(--color-golden-edge),0.1)] to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[rgba(var(--color-data-stream),0.05)] to-transparent rounded-full blur-3xl" />
        
        <div className="relative p-5 sm:p-6 lg:p-8">
          {/* Top Row - Greeting & Time */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-2"
              >
                <span className="text-2xl">{greeting.emoji}</span>
                <span className="text-sm text-market-mist font-medium">{greeting.text}</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-clear-signal tracking-tight"
              >
                {firstName}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base text-market-mist mt-1 max-w-md"
              >
                {motivation}
              </motion.p>
            </div>
            
            {/* Refresh Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fetchSignals(true)}
              disabled={refreshing}
              className="touch-target rounded-xl bg-[rgba(var(--color-panel-edge),0.8)] text-market-mist hover:text-clear-signal transition-all"
            >
              <RefreshCw className={cn("w-5 h-5", refreshing && "animate-spin")} />
            </motion.button>
          </div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-3 gap-2 sm:gap-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "relative p-3 sm:p-4 rounded-xl sm:rounded-2xl overflow-hidden",
                  "bg-gradient-to-br border",
                  stat.bg,
                  `border-${stat.color}/20`
                )}
              >
                <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2", `bg-${stat.color}/15`)}>
                  <stat.icon className={cn("w-4 h-4 sm:w-5 sm:h-5", `text-${stat.color}`)} />
                </div>
                <p className={cn("text-xl sm:text-2xl lg:text-3xl font-bold", `text-${stat.color}`)}>
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-market-mist font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ============================================
          FEATURED SIGNAL - PREMIUM HIGHLIGHT
          ============================================ */}
      <AnimatePresence>
        {featuredSignal && filter === 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[rgba(var(--color-golden-edge),0.2)] to-[rgba(var(--color-golden-edge),0.05)] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-golden-edge" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-golden-edge">Featured Signal</h2>
                  <p className="text-[10px] text-market-mist">Top pick from our analysts</p>
                </div>
              </div>
              <Link 
                href="/dashboard/signals" 
                className="flex items-center gap-1 text-xs text-market-mist hover:text-clear-signal transition-swift"
              >
                View all
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <FullSignalCard 
              signal={featuredSignal} 
              isAdmin={isAdmin}
              onDelete={() => handleDelete(featuredSignal.id)}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* ============================================
          FILTER TABS - MOBILE OPTIMIZED
          ============================================ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="sticky top-14 lg:top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-market-depth/80 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-panel-edge">
            {filterOptions.map((option) => {
              const isActive = filter === option.key
              return (
                <motion.button
                  key={option.key}
                  onClick={() => setFilter(option.key as any)}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive 
                      ? "text-white" 
                      : "text-market-mist hover:text-clear-signal"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filter-active"
                      className={cn(
                        "absolute inset-0 rounded-lg",
                        option.key === 'featured' ? "bg-golden-edge" : "bg-profit-pulse"
                      )}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {option.dot && (
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        isActive ? "bg-white" : "bg-current animate-pulse"
                      )} />
                    )}
                    {option.icon && <option.icon className="w-3.5 h-3.5" />}
                    {option.label}
                    {option.count > 0 && (
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                        isActive ? "bg-white/20" : "bg-panel-edge"
                      )}>
                        {option.count}
                      </span>
                    )}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* ============================================
          SIGNALS LIST
          ============================================ */}
      <section>
        {/* Section Header */}
        {!loading && filteredSignals.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-4"
          >
            <h2 className="text-sm font-semibold text-clear-signal">
              {filter === 'all' ? 'All Signals' : filter === 'active' ? 'Active Signals' : 'Featured Signals'}
              <span className="ml-2 text-market-mist font-normal">
                ({filteredSignals.filter(s => filter !== 'all' || !s.is_featured).length})
              </span>
            </h2>
          </motion.div>
        )}

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-panel-edge flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-profit-pulse" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-profit-pulse/20 blur-xl"
              />
            </div>
            <p className="text-sm text-market-mist mt-4">Loading signals...</p>
            <p className="text-xs text-distant-data mt-1">Fetching the latest opportunities</p>
          </motion.div>
        ) : filteredSignals.length > 0 ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredSignals
              .filter(s => filter !== 'all' || !s.is_featured)
              .map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <FullSignalCard
                    signal={signal}
                    isAdmin={isAdmin}
                    onDelete={() => handleDelete(signal.id)}
                  />
                </motion.div>
              ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 sm:py-20"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-panel-edge to-[rgba(var(--color-chart-canvas),0.5)] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20"
            >
              <TrendingUp className="w-12 h-12 text-distant-data" />
            </motion.div>
            <h3 className="text-xl font-bold text-clear-signal mb-2">
              {filter === 'all' ? 'No Signals Yet' : 
               filter === 'active' ? 'No Active Signals' : 
               'No Featured Signals'}
            </h3>
            <p className="text-sm text-market-mist mb-8 max-w-sm mx-auto leading-relaxed">
              {filter === 'all' 
                ? 'Trading signals will appear here when posted. Stay tuned for opportunities!' 
                : 'Try viewing all signals to see what\'s available.'}
            </p>
            {filter !== 'all' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter('all')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-panel-edge text-clear-signal font-medium hover:bg-[rgba(var(--color-panel-edge),1.2)] transition-all"
              >
                View All Signals
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}
      </section>

      {/* ============================================
          QUICK TIPS - MOBILE ONLY
          ============================================ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="lg:hidden space-y-3 mt-8"
      >
        <h3 className="text-xs font-semibold text-distant-data uppercase tracking-wide">Quick Tips</h3>
        
        {/* Tip Card 1 */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-[rgba(var(--color-data-stream),0.1)] to-[rgba(var(--color-data-stream),0.02)] border border-[rgba(var(--color-data-stream),0.15)]"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(var(--color-data-stream),0.15)] flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-data-stream" />
            </div>
            <div>
              <p className="text-sm font-medium text-clear-signal mb-1">View Full Analysis</p>
              <p className="text-xs text-market-mist leading-relaxed">
                Tap on "Analysis" button to see detailed entry points, stop loss, and take profit levels.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tip Card 2 */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-[rgba(var(--color-golden-edge),0.1)] to-[rgba(var(--color-golden-edge),0.02)] border border-[rgba(var(--color-golden-edge),0.15)]"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(var(--color-golden-edge),0.15)] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-golden-edge" />
            </div>
            <div>
              <p className="text-sm font-medium text-clear-signal mb-1">Featured Signals</p>
              <p className="text-xs text-market-mist leading-relaxed">
                Featured signals are high-confidence setups hand-picked by our expert analysts.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}