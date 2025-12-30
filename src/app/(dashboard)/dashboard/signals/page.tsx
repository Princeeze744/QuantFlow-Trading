'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Target,
  Loader2,
  SlidersHorizontal
} from 'lucide-react'
import { FullSignalCard } from '@/components/signals/full-signal-card'
import { useSignals } from '@/hooks/use-signals'
import { useUser } from '@/hooks/use-user'
import { cn } from '@/lib/utils'

const statusFilters = [
  { value: '', label: 'All', icon: SlidersHorizontal },
  { value: 'ACTIVE', label: 'Active', icon: Zap, color: 'data-stream' },
  { value: 'TP_HIT', label: 'Won', icon: TrendingUp, color: 'profit-pulse' },
  { value: 'SL_HIT', label: 'Lost', icon: TrendingDown, color: 'bear-strike' },
  { value: 'EXPIRED', label: 'Expired', icon: Clock, color: 'golden-edge' },
]

export default function SignalsPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const { signals, loading } = useSignals(statusFilter || undefined)
  const { isAdmin } = useUser()

  const activeCount = signals.filter(s => s.status === 'ACTIVE').length
  const wonCount = signals.filter(s => s.status === 'TP_HIT').length
  const lostCount = signals.filter(s => s.status === 'SL_HIT').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-clear-signal mb-1">All Signals</h1>
        <p className="text-market-mist text-sm">Browse and filter all trading signals</p>
      </motion.div>

      {/* Quick Stats - Mobile Horizontal Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide"
      >
        {[
          { label: 'Total', value: signals.length, icon: Target, color: 'data-stream' },
          { label: 'Active', value: activeCount, icon: Zap, color: 'profit-pulse' },
          { label: 'Won', value: wonCount, icon: TrendingUp, color: 'profit-pulse' },
          { label: 'Lost', value: lostCount, icon: TrendingDown, color: 'bear-strike' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="flex-shrink-0 flex items-center gap-3 p-3 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] min-w-[120px]"
          >
            <div className={`w-9 h-9 rounded-lg bg-${stat.color}/15 flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 text-${stat.color}`} />
            </div>
            <div>
              <p className={`text-lg font-bold text-${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-market-mist uppercase">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="sticky top-14 lg:top-16 z-20 -mx-4 px-4 lg:mx-0 lg:px-0 py-3 bg-market-depth/80 backdrop-blur-xl"
      >
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {statusFilters.map((filter) => {
            const isActive = statusFilter === filter.value
            return (
              <motion.button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-profit-pulse text-white shadow-lg shadow-profit-pulse/20"
                    : "bg-panel-edge text-market-mist hover:text-clear-signal"
                )}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Signals List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="h-48 rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] animate-pulse"
            />
          ))}
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-profit-pulse" />
            <span className="ml-2 text-market-mist">Loading signals...</span>
          </div>
        </div>
      ) : signals.length > 0 ? (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {signals.map((signal, index) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <FullSignalCard
                  signal={signal as any}
                  isAdmin={isAdmin}
                  onDelete={() => {}}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-chart-canvas rounded-2xl border border-[rgb(var(--color-border-subtle))]"
        >
          <div className="w-20 h-20 rounded-2xl bg-panel-edge flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-distant-data" />
          </div>
          <h3 className="text-lg font-semibold text-clear-signal mb-2">No signals found</h3>
          <p className="text-sm text-market-mist max-w-sm mx-auto">
            {statusFilter 
              ? 'Try changing the filter to see more signals' 
              : 'New signals are posted every 4 hours. Check back soon!'}
          </p>
          {statusFilter && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setStatusFilter('')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-panel-edge text-clear-signal font-medium hover:bg-[rgb(var(--color-border-subtle))] transition-all"
            >
              Clear Filter
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  )
}