'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Plus, 
  Loader2, 
  Trash2, 
  Filter,
  TrendingUp,
  Star,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Signal {
  id: string
  asset: string
  timeframe: string
  status: string
  full_analysis?: string
  is_featured?: boolean
  created_at: string
}

export default function ManageSignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')
  const [deleting, setDeleting] = useState<string | null>(null)

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signal?')) return
    
    setDeleting(id)
    try {
      const res = await fetch(`/api/signals/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSignals(signals.filter(s => s.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    } finally {
      setDeleting(null)
    }
  }

  const filteredSignals = signals.filter(s => {
    if (filter === 'ALL') return true
    if (filter === 'FEATURED') return s.is_featured
    return s.status === filter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-clear-signal">Manage Signals</h1>
          <p className="text-market-mist">View and delete signals</p>
        </div>
        <Link href="/admin/signals/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-xl bg-profit-pulse text-white font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> New Signal
          </motion.button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-5 h-5 text-market-mist" />
        {['ALL', 'ACTIVE', 'FEATURED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-swift",
              filter === f 
                ? "bg-profit-pulse text-white" 
                : "bg-panel-edge text-market-mist hover:text-clear-signal"
            )}
          >
            {f === 'ALL' ? 'All' : f === 'FEATURED' ? '⭐ Featured' : '🟢 Active'}
          </button>
        ))}
      </div>

      {/* Signals List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-profit-pulse" />
        </div>
      ) : filteredSignals.length > 0 ? (
        <div className="bg-chart-canvas rounded-2xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgb(var(--color-border-subtle))] bg-panel-edge">
                <th className="text-left p-4 text-sm font-medium text-market-mist">ASSET</th>
                <th className="text-left p-4 text-sm font-medium text-market-mist">TIMEFRAME</th>
                <th className="text-left p-4 text-sm font-medium text-market-mist">POSTED</th>
                <th className="text-left p-4 text-sm font-medium text-market-mist">STATUS</th>
                <th className="text-right p-4 text-sm font-medium text-market-mist">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredSignals.map((signal) => (
                <tr key={signal.id} className="border-b border-[rgb(var(--color-border-subtle))] last:border-0 hover:bg-panel-edge/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-profit-pulse" />
                      <div>
                        <span className="font-medium text-clear-signal">{signal.asset}</span>
                        {signal.is_featured && (
                          <Star className="w-4 h-4 text-golden-edge inline ml-2" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-panel-edge text-market-mist text-sm">
                      {signal.timeframe}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-market-mist">
                      <Clock className="w-4 h-4" />
                      {new Date(signal.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-lg bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse text-sm">
                      ACTIVE
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(signal.id)}
                      disabled={deleting === signal.id}
                      className="p-2 rounded-lg hover:bg-[rgba(var(--color-bear-strike),0.15)] text-market-mist hover:text-bear-strike transition-swift disabled:opacity-50"
                    >
                      {deleting === signal.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-chart-canvas rounded-2xl border border-[rgb(var(--color-border-subtle))]">
          <TrendingUp className="w-16 h-16 text-distant-data mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-clear-signal mb-2">No Signals Found</h3>
          <p className="text-market-mist mb-4">Create your first signal to get started</p>
          <Link href="/admin/signals/new">
            <button className="px-6 py-2 rounded-xl bg-profit-pulse text-white font-medium">
              Create Signal
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}