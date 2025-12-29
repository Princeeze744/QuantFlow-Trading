'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Trophy,
  ChevronDown,
  ChevronUp,
  Filter,
  Loader2,
  Target,
  Zap
} from 'lucide-react'
import { useSignals } from '@/hooks/use-signals'
import { cn } from '@/lib/utils'

export default function HistoryPage() {
  const { signals, loading } = useSignals()
  const [sortBy, setSortBy] = useState<'date' | 'pips'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  const closedSignals = signals.filter((s) => s.status !== 'ACTIVE')
  const wonSignals = closedSignals.filter((s) => s.status === 'TP_HIT')
  const lostSignals = closedSignals.filter((s) => s.status === 'SL_HIT')
  
  const winRate = closedSignals.length > 0 
    ? ((wonSignals.length / closedSignals.length) * 100).toFixed(1) 
    : '0'
  
  const totalPips = closedSignals.reduce((sum, s) => sum + (s.result_pips || 0), 0)

  const sortedSignals = [...closedSignals].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    } else {
      return sortOrder === 'desc' 
        ? (b.result_pips || 0) - (a.result_pips || 0)
        : (a.result_pips || 0) - (b.result_pips || 0)
    }
  })

  const stats = [
    { label: 'Total Closed', value: closedSignals.length, icon: Calendar, color: 'data-stream' },
    { label: 'Wins', value: wonSignals.length, icon: TrendingUp, color: 'profit-pulse' },
    { label: 'Losses', value: lostSignals.length, icon: TrendingDown, color: 'bear-strike' },
    { label: 'Win Rate', value: `${winRate}%`, icon: Trophy, color: 'golden-edge' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-clear-signal mb-1">Trade History</h1>
        <p className="text-market-mist text-sm">Track record of all past signals</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="p-4 rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}/15 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <div>
                <p className={`text-xl lg:text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] lg:text-xs text-market-mist">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Total Pips Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={cn(
          "p-5 rounded-2xl border",
          totalPips >= 0 
            ? "bg-gradient-to-br from-profit-pulse/10 to-transparent border-profit-pulse/20"
            : "bg-gradient-to-br from-bear-strike/10 to-transparent border-bear-strike/20"
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-market-mist mb-1">Total Pips Earned</p>
            <p className={cn(
              "text-3xl lg:text-4xl font-bold",
              totalPips >= 0 ? "text-profit-pulse" : "text-bear-strike"
            )}>
              {totalPips > 0 ? '+' : ''}{totalPips} pips
            </p>
          </div>
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center",
            totalPips >= 0 ? "bg-profit-pulse/15" : "bg-bear-strike/15"
          )}>
            {totalPips >= 0 ? (
              <TrendingUp className="w-7 h-7 text-profit-pulse" />
            ) : (
              <TrendingDown className="w-7 h-7 text-bear-strike" />
            )}
          </div>
        </div>
      </motion.div>

      {/* Signals Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-chart-canvas rounded-2xl border border-[rgb(var(--color-border-subtle))] overflow-hidden"
      >
        {/* Table Header */}
        <div className="p-4 border-b border-[rgb(var(--color-border-subtle))] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-clear-signal">Closed Signals</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (sortBy === 'date') {
                  setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                } else {
                  setSortBy('date')
                  setSortOrder('desc')
                }
              }}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                sortBy === 'date' ? "bg-profit-pulse/15 text-profit-pulse" : "bg-panel-edge text-market-mist"
              )}
            >
              Date
              {sortBy === 'date' && (sortOrder === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}
            </button>
            <button
              onClick={() => {
                if (sortBy === 'pips') {
                  setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                } else {
                  setSortBy('pips')
                  setSortOrder('desc')
                }
              }}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                sortBy === 'pips' ? "bg-profit-pulse/15 text-profit-pulse" : "bg-panel-edge text-market-mist"
              )}
            >
              Pips
              {sortBy === 'pips' && (sortOrder === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-profit-pulse mb-3" />
            <p className="text-market-mist">Loading history...</p>
          </div>
        ) : sortedSignals.length > 0 ? (
          <>
            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-[rgb(var(--color-border-subtle))]">
              {sortedSignals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 hover:bg-panel-edge/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-clear-signal">{signal.asset}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold",
                        signal.direction === 'BUY' 
                          ? "bg-bull-run/15 text-bull-run"
                          : "bg-bear-strike/15 text-bear-strike"
                      )}>
                        {signal.direction}
                      </span>
                    </div>
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-semibold",
                      signal.status === 'TP_HIT' && "bg-profit-pulse/15 text-profit-pulse",
                      signal.status === 'SL_HIT' && "bg-bear-strike/15 text-bear-strike",
                      signal.status === 'EXPIRED' && "bg-golden-edge/15 text-golden-edge",
                      signal.status === 'CANCELLED' && "bg-panel-edge text-distant-data"
                    )}>
                      {signal.status === 'TP_HIT' ? 'WIN' : signal.status === 'SL_HIT' ? 'LOSS' : signal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-market-mist">
                      {new Date(signal.created_at).toLocaleDateString()}
                    </span>
                    <span className={cn(
                      "font-mono font-bold",
                      (signal.result_pips || 0) > 0 ? "text-profit-pulse" : "text-bear-strike"
                    )}>
                      {(signal.result_pips || 0) > 0 ? '+' : ''}{signal.result_pips || 0} pips
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgb(var(--color-border-subtle))] bg-panel-edge/30">
                    <th className="text-left p-4 text-xs font-semibold text-market-mist uppercase tracking-wide">Asset</th>
                    <th className="text-left p-4 text-xs font-semibold text-market-mist uppercase tracking-wide">Direction</th>
                    <th className="text-left p-4 text-xs font-semibold text-market-mist uppercase tracking-wide">Entry</th>
                    <th className="text-left p-4 text-xs font-semibold text-market-mist uppercase tracking-wide">Result</th>
                    <th className="text-left p-4 text-xs font-semibold text-market-mist uppercase tracking-wide">Pips</th>
                    <th className="text-left p-4 text-xs font-semibold text-market-mist uppercase tracking-wide">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSignals.map((signal, index) => (
                    <motion.tr 
                      key={signal.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-[rgb(var(--color-border-subtle))] hover:bg-panel-edge/50 transition-all"
                    >
                      <td className="p-4 font-semibold text-clear-signal">{signal.asset}</td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-bold",
                          signal.direction === 'BUY' 
                            ? "bg-bull-run/15 text-bull-run"
                            : "bg-bear-strike/15 text-bear-strike"
                        )}>
                          {signal.direction}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-market-mist">{signal.entry_price}</td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-bold",
                          signal.status === 'TP_HIT' && "bg-profit-pulse/15 text-profit-pulse",
                          signal.status === 'SL_HIT' && "bg-bear-strike/15 text-bear-strike",
                          signal.status === 'EXPIRED' && "bg-golden-edge/15 text-golden-edge",
                          signal.status === 'CANCELLED' && "bg-panel-edge text-distant-data"
                        )}>
                          {signal.status === 'TP_HIT' ? 'WIN' : signal.status === 'SL_HIT' ? 'LOSS' : signal.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className={cn(
                        "p-4 font-mono font-bold",
                        (signal.result_pips || 0) > 0 ? "text-profit-pulse" : "text-bear-strike"
                      )}>
                        {(signal.result_pips || 0) > 0 ? '+' : ''}{signal.result_pips || 0}
                      </td>
                      <td className="p-4 text-market-mist text-sm">
                        {new Date(signal.created_at).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-panel-edge flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-distant-data" />
            </div>
            <h3 className="text-lg font-semibold text-clear-signal mb-2">No history yet</h3>
            <p className="text-sm text-market-mist">Closed signals will appear here</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}