'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Bell, 
  Loader2, 
  Filter,
  Sparkles,
  ChevronRight,
  Zap
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

export default function DashboardPage() {
  const { isAdmin, user, profile } = useUser()
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'featured'>('all')

  useEffect(() => {
    fetchSignals()
  }, [])

  const fetchSignals = async () => {
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

  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Trader'

  return (
    <div className="space-y-6">
      {/* === WELCOME HEADER (Mobile Optimized) === */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(var(--color-profit-pulse),0.15)] via-chart-canvas to-chart-canvas border border-[rgba(var(--color-profit-pulse),0.2)] p-4 sm:p-6"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[rgba(var(--color-profit-pulse),0.1)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[rgba(var(--color-golden-edge),0.1)] to-transparent rounded-full blur-2xl" />
        
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-market-mist text-sm mb-1">Welcome back</p>
              <h1 className="text-xl sm:text-2xl font-bold text-clear-signal mb-2">
                {firstName} 👋
              </h1>
              <p className="text-sm text-market-mist">
                {activeCount > 0 ? (
                  <>You have <span className="text-profit-pulse font-semibold">{activeCount} active</span> signals</>
                ) : (
                  'No active signals right now'
                )}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex-shrink-0 text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(var(--color-profit-pulse),0.15)]">
                <Zap className="w-4 h-4 text-profit-pulse" />
                <span className="text-sm font-semibold text-profit-pulse">{signals.length}</span>
              </div>
              <p className="text-xs text-market-mist mt-1">Total Signals</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* === FEATURED SIGNAL HIGHLIGHT === */}
      {featuredSignal && filter === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-golden-edge" />
            <span className="text-sm font-medium text-golden-edge">Featured Signal</span>
          </div>
          <FullSignalCard 
            signal={featuredSignal} 
            isAdmin={isAdmin}
            onDelete={() => handleDelete(featuredSignal.id)}
          />
        </motion.div>
      )}

      {/* === FILTER TABS (Mobile Optimized) === */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-swift",
            filter === 'all' 
              ? "bg-profit-pulse text-white" 
              : "bg-panel-edge text-market-mist"
          )}
        >
          All Signals
        </button>
        <button
          onClick={() => setFilter('active')}
          className={cn(
            "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-swift",
            filter === 'active' 
              ? "bg-profit-pulse text-white" 
              : "bg-panel-edge text-market-mist"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          Active
          {activeCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">
              {activeCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setFilter('featured')}
          className={cn(
            "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-swift",
            filter === 'featured' 
              ? "bg-golden-edge text-market-depth" 
              : "bg-panel-edge text-market-mist"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Featured
        </button>
      </div>

      {/* === SIGNALS LIST === */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-profit-pulse mb-4" />
          <p className="text-sm text-market-mist">Loading signals...</p>
        </div>
      ) : filteredSignals.length > 0 ? (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredSignals
            .filter(s => filter !== 'all' || !s.is_featured) // Don't duplicate featured in "all"
            .map((signal, index) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-3xl bg-panel-edge flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-10 h-10 text-distant-data" />
          </div>
          <h3 className="text-lg font-semibold text-clear-signal mb-2">
            {filter === 'all' ? 'No Signals Yet' : 
             filter === 'active' ? 'No Active Signals' : 
             'No Featured Signals'}
          </h3>
          <p className="text-sm text-market-mist mb-6 max-w-xs mx-auto">
            {filter === 'all' 
              ? 'Trading signals will appear here when posted by the admin.' 
              : 'Try viewing all signals instead.'}
          </p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-panel-edge text-market-mist hover:text-clear-signal transition-swift"
            >
              View All Signals
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}

      {/* === QUICK TIP (Mobile Only) === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="lg:hidden mt-8 p-4 rounded-2xl bg-[rgba(var(--color-data-stream),0.1)] border border-[rgba(var(--color-data-stream),0.2)]"
      >
        <p className="text-xs text-data-stream font-medium mb-1">💡 Pro Tip</p>
        <p className="text-sm text-market-mist">
          Tap on "View Analysis" to see full trading analysis and entry points for each signal.
        </p>
      </motion.div>
    </div>
  )
}