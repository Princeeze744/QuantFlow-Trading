'use client'

import { useState } from 'react'
import { Filter, Zap } from 'lucide-react'
import { SignalCard } from '@/components/signals/signal-card'
import { useSignals } from '@/hooks/use-signals'
import { cn } from '@/lib/utils'

const statusFilters = [
  { value: '', label: 'All Signals' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'TP_HIT', label: 'Won' },
  { value: 'SL_HIT', label: 'Lost' },
  { value: 'EXPIRED', label: 'Expired' },
]

export default function SignalsPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const { signals, loading } = useSignals(statusFilter || undefined)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-clear-signal mb-2">Signals</h1>
        <p className="text-market-mist">All trading signals in one place</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-market-mist flex-shrink-0" />
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-swift",
              statusFilter === filter.value
                ? "bg-profit-pulse text-white"
                : "bg-panel-edge text-market-mist hover:text-clear-signal"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-chart-canvas animate-pulse" />
          ))}
        </div>
      ) : signals.length > 0 ? (
        <div className="grid gap-4">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))]">
          <Zap className="w-12 h-12 text-distant-data mx-auto mb-4" />
          <h3 className="text-lg font-medium text-clear-signal mb-2">No signals found</h3>
          <p className="text-market-mist">
            {statusFilter ? 'Try changing the filter' : 'New signals are posted every 4 hours'}
          </p>
        </div>
      )}
    </div>
  )
}