'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Timer,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING } from '@/lib/constants'
import type { Signal } from '@/types/database'

interface SignalCardProps {
  signal: Signal
  onFollow?: (signalId: string) => void
  isFollowed?: boolean
}

export function SignalCard({ signal, onFollow, isFollowed = false }: SignalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const isBuy = signal.direction === 'BUY'
  const isActive = signal.status === 'ACTIVE'
  const isWin = signal.status === 'TP_HIT'
  const isLoss = signal.status === 'SL_HIT'
  
  // Calculate time ago
  const timeAgo = getTimeAgo(new Date(signal.created_at))
  
  // Calculate pip distance
  const entryPrice = parseFloat(String(signal.entry_price))
  const stopLoss = parseFloat(String(signal.stop_loss))
  const takeProfit = parseFloat(String(signal.take_profit))
  
  const slPips = Math.abs(entryPrice - stopLoss) * 10000
  const tpPips = Math.abs(takeProfit - entryPrice) * 10000

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: MOTION.deliberate / 1000,
        ease: EASING.out 
      }}
      className={cn(
        "relative overflow-hidden rounded-lg",
        "bg-chart-canvas border border-[rgb(var(--color-border-subtle))]",
        "transition-smooth hover:border-[rgb(var(--color-panel-edge))]",
        isActive && "hover:glow-profit",
        isWin && "border-l-4 border-l-[rgb(var(--color-bull-run))]",
        isLoss && "border-l-4 border-l-[rgb(var(--color-bear-strike))]"
      )}
    >
      {/* Status Indicator - Top Right */}
      <div className="absolute top-4 right-4">
        <StatusBadge status={signal.status} />
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Header: Asset + Direction */}
        <div className="flex items-start gap-4 mb-6">
          {/* Direction Icon */}
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg",
            isBuy 
              ? "bg-[rgba(var(--color-bull-run),0.15)]" 
              : "bg-[rgba(var(--color-bear-strike),0.15)]"
          )}>
            {isBuy ? (
              <TrendingUp className="w-6 h-6 text-bull-run" />
            ) : (
              <TrendingDown className="w-6 h-6 text-bear-strike" />
            )}
          </div>
          
          {/* Asset & Direction */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-clear-signal mb-1">
              {signal.asset}
            </h3>
            <div className="flex items-center gap-3">
              <span className={cn(
                "px-2.5 py-1 rounded text-sm font-medium",
                isBuy 
                  ? "bg-[rgba(var(--color-bull-run),0.15)] text-bull-run"
                  : "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike"
              )}>
                {signal.direction}
              </span>
              <span className="text-sm text-market-mist flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {timeAgo}
              </span>
              <span className="text-sm text-distant-data">
                {signal.timeframe}
              </span>
            </div>
          </div>
        </div>

        {/* Price Levels Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Entry */}
          <div className="bg-panel-edge rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-data-stream" />
              <span className="text-xs text-market-mist uppercase tracking-wide">Entry</span>
            </div>
            <span className="text-lg font-semibold text-clear-signal font-mono">
              {formatPrice(signal.entry_price)}
            </span>
          </div>
          
          {/* Stop Loss */}
          <div className="bg-panel-edge rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-bear-strike" />
              <span className="text-xs text-market-mist uppercase tracking-wide">Stop Loss</span>
            </div>
            <span className="text-lg font-semibold text-clear-signal font-mono">
              {formatPrice(signal.stop_loss)}
            </span>
            <span className="block text-xs text-bear-strike mt-1">
              -{slPips.toFixed(1)} pips
            </span>
          </div>
          
          {/* Take Profit */}
          <div className="bg-panel-edge rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-bull-run" />
              <span className="text-xs text-market-mist uppercase tracking-wide">Take Profit</span>
            </div>
            <span className="text-lg font-semibold text-clear-signal font-mono">
              {formatPrice(signal.take_profit)}
            </span>
            <span className="block text-xs text-bull-run mt-1">
              +{tpPips.toFixed(1)} pips
            </span>
          </div>
        </div>

        {/* R:R Badge + Result */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-[rgba(var(--color-golden-edge),0.15)] text-golden-edge text-sm font-medium">
              R:R {signal.risk_reward}
            </span>
            
            {/* Result if closed */}
            {signal.result_pips && (
              <span className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium",
                signal.result_pips > 0 
                  ? "bg-[rgba(var(--color-bull-run),0.15)] text-bull-run"
                  : "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike"
              )}>
                {signal.result_pips > 0 ? '+' : ''}{signal.result_pips.toFixed(1)} pips
              </span>
            )}
          </div>

          {/* Follow Button - Only for active signals */}
          {isActive && onFollow && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFollow(signal.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-swift",
                isFollowed
                  ? "bg-profit-pulse text-white"
                  : "bg-panel-edge text-clear-signal hover:bg-[rgba(var(--color-profit-pulse),0.2)] hover:text-profit-pulse"
              )}
            >
              {isFollowed ? 'Following' : 'Follow Signal'}
            </motion.button>
          )}
        </div>

        {/* Expandable Analysis */}
        {signal.analysis && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-market-mist hover:text-clear-signal transition-swift w-full"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <span>{isExpanded ? 'Hide Analysis' : 'View Analysis'}</span>
            </button>
            
            <motion.div
              initial={false}
              animate={{ 
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: MOTION.smooth / 1000, ease: EASING.inOut }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-[rgb(var(--color-border-subtle))]">
                <p className="text-sm text-market-mist leading-relaxed">
                  {signal.analysis}
                </p>
                
                {/* Chart Image if available */}
                {signal.chart_image_url && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img 
                      src={signal.chart_image_url} 
                      alt={`${signal.asset} chart analysis`}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// Status Badge Component
function StatusBadge({ status }: { status: Signal['status'] }) {
  const config = {
    ACTIVE: {
      icon: Timer,
      text: 'Active',
      className: 'bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse'
    },
    TP_HIT: {
      icon: CheckCircle2,
      text: 'TP Hit',
      className: 'bg-[rgba(var(--color-bull-run),0.15)] text-bull-run'
    },
    SL_HIT: {
      icon: XCircle,
      text: 'SL Hit',
      className: 'bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike'
    },
    EXPIRED: {
      icon: Clock,
      text: 'Expired',
      className: 'bg-[rgba(var(--color-distant-data),0.15)] text-distant-data'
    },
    CANCELLED: {
      icon: XCircle,
      text: 'Cancelled',
      className: 'bg-[rgba(var(--color-distant-data),0.15)] text-distant-data'
    }
  }
  
  const { icon: Icon, text, className } = config[status]
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
      className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  )
}

// Helper Functions
function formatPrice(price: number | string): string {
  const num = typeof price === 'string' ? parseFloat(price) : price
  
  // Determine decimal places based on price magnitude
  if (num >= 100) return num.toFixed(2) // Indices, JPY pairs
  if (num >= 1) return num.toFixed(4) // Most forex
  return num.toFixed(5) // Some exotic pairs
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}