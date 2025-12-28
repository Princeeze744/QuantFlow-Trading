'use client'

import { useState } from 'react'
import { Calendar, TrendingUp, TrendingDown, Trophy } from 'lucide-react'
import { useSignals } from '@/hooks/use-signals'
import { cn } from '@/lib/utils'

export default function HistoryPage() {
  const { signals, loading } = useSignals()
  
  const closedSignals = signals.filter((s) => s.status !== 'ACTIVE')
  const wonSignals = closedSignals.filter((s) => s.status === 'TP_HIT')
  const lostSignals = closedSignals.filter((s) => s.status === 'SL_HIT')
  
  const winRate = closedSignals.length > 0 
    ? ((wonSignals.length / closedSignals.length) * 100).toFixed(1) 
    : '0'
  
  const totalPips = closedSignals.reduce((sum, s) => sum + (s.result_pips || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-clear-signal mb-2">History</h1>
        <p className="text-market-mist">Track record of all past signals</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-chart-canvas rounded-xl p-4 border border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(var(--color-data-stream),0.15)] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-data-stream" />
            </div>
            <div>
              <p className="text-2xl font-bold text-clear-signal">{closedSignals.length}</p>
              <p className="text-xs text-market-mist">Total Closed</p>
            </div>
          </div>
        </div>

        <div className="bg-chart-canvas rounded-xl p-4 border border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(var(--color-profit-pulse),0.15)] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-profit-pulse" />
            </div>
            <div>
              <p className="text-2xl font-bold text-profit-pulse">{wonSignals.length}</p>
              <p className="text-xs text-market-mist">Wins</p>
            </div>
          </div>
        </div>

        <div className="bg-chart-canvas rounded-xl p-4 border border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(var(--color-bear-strike),0.15)] flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-bear-strike" />
            </div>
            <div>
              <p className="text-2xl font-bold text-bear-strike">{lostSignals.length}</p>
              <p className="text-xs text-market-mist">Losses</p>
            </div>
          </div>
        </div>

        <div className="bg-chart-canvas rounded-xl p-4 border border-[rgb(var(--color-border-subtle))]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(var(--color-golden-edge),0.15)] flex items-center justify-center">
              <Trophy className="w-5 h-5 text-golden-edge" />
            </div>
            <div>
              <p className="text-2xl font-bold text-golden-edge">{winRate}%</p>
              <p className="text-xs text-market-mist">Win Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
        <div className="p-4 border-b border-[rgb(var(--color-border-subtle))]">
          <h2 className="text-lg font-semibold text-clear-signal">Closed Signals</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-market-mist">Loading...</div>
        ) : closedSignals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgb(var(--color-border-subtle))]">
                  <th className="text-left p-4 text-xs font-medium text-market-mist uppercase">Asset</th>
                  <th className="text-left p-4 text-xs font-medium text-market-mist uppercase">Direction</th>
                  <th className="text-left p-4 text-xs font-medium text-market-mist uppercase">Entry</th>
                  <th className="text-left p-4 text-xs font-medium text-market-mist uppercase">Result</th>
                  <th className="text-left p-4 text-xs font-medium text-market-mist uppercase">Pips</th>
                  <th className="text-left p-4 text-xs font-medium text-market-mist uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {closedSignals.map((signal) => (
                  <tr key={signal.id} className="border-b border-[rgb(var(--color-border-subtle))] hover:bg-panel-edge transition-swift">
                    <td className="p-4 font-medium text-clear-signal">{signal.asset}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        signal.direction === 'BUY' 
                          ? "bg-[rgba(var(--color-bull-run),0.15)] text-bull-run"
                          : "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike"
                      )}>
                        {signal.direction}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-market-mist">{signal.entry_price}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        signal.status === 'TP_HIT' && "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse",
                        signal.status === 'SL_HIT' && "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike",
                        signal.status === 'EXPIRED' && "bg-[rgba(var(--color-golden-edge),0.15)] text-golden-edge",
                        signal.status === 'CANCELLED' && "bg-panel-edge text-distant-data"
                      )}>
                        {signal.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className={cn(
                      "p-4 font-mono font-medium",
                      (signal.result_pips || 0) > 0 ? "text-profit-pulse" : "text-bear-strike"
                    )}>
                      {(signal.result_pips || 0) > 0 ? '+' : ''}{signal.result_pips || 0}
                    </td>
                    <td className="p-4 text-market-mist text-sm">
                      {new Date(signal.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-market-mist">
            No closed signals yet
          </div>
        )}
      </div>

      <div className="bg-chart-canvas rounded-xl p-6 border border-[rgb(var(--color-border-subtle))]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-market-mist mb-1">Total Pips Earned</p>
            <p className={cn(
              "text-4xl font-bold",
              totalPips >= 0 ? "text-profit-pulse" : "text-bear-strike"
            )}>
              {totalPips > 0 ? '+' : ''}{totalPips} pips
            </p>
          </div>
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center",
            totalPips >= 0 
              ? "bg-[rgba(var(--color-profit-pulse),0.15)]"
              : "bg-[rgba(var(--color-bear-strike),0.15)]"
          )}>
            {totalPips >= 0 ? (
              <TrendingUp className="w-8 h-8 text-profit-pulse" />
            ) : (
              <TrendingDown className="w-8 h-8 text-bear-strike" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}