'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  Target,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { ParsedSignal, calculatePips, validateParsedSignal } from '@/lib/signal-parser'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ParsedPreviewProps {
  parsed: ParsedSignal
  onEdit: (field: string, value: any) => void
}

export function ParsedPreview({ parsed, onEdit }: ParsedPreviewProps) {
  const [showRawAnalysis, setShowRawAnalysis] = useState(false)
  const validation = validateParsedSignal(parsed)
  
  const slPips = parsed.entryPrice && parsed.stopLoss && parsed.asset
    ? calculatePips(parsed.entryPrice, parsed.stopLoss, parsed.asset)
    : null
    
  const tpPips = parsed.entryPrice && parsed.takeProfit && parsed.asset
    ? calculatePips(parsed.entryPrice, parsed.takeProfit, parsed.asset)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Validation Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "p-4 rounded-xl flex items-center gap-3",
          validation.valid 
            ? "bg-[rgba(var(--color-profit-pulse),0.1)] border border-profit-pulse/30"
            : "bg-[rgba(var(--color-golden-edge),0.1)] border border-golden-edge/30"
        )}
      >
        {validation.valid ? (
          <>
            <CheckCircle2 className="w-6 h-6 text-profit-pulse" />
            <div>
              <p className="font-medium text-profit-pulse">All data extracted successfully!</p>
              <p className="text-sm text-market-mist">Review below and publish when ready</p>
            </div>
          </>
        ) : (
          <>
            <AlertCircle className="w-6 h-6 text-golden-edge" />
            <div>
              <p className="font-medium text-golden-edge">Missing required fields</p>
              <p className="text-sm text-market-mist">Please fill in: {validation.missing.join(', ')}</p>
            </div>
          </>
        )}
      </motion.div>

      {/* Main Signal Card Preview */}
      <div className="bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
        <div className="p-4 border-b border-[rgb(var(--color-border-subtle))] bg-panel-edge">
          <p className="text-sm font-medium text-market-mist">SIGNAL PREVIEW</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center",
                  parsed.direction === 'BUY' 
                    ? "bg-[rgba(var(--color-bull-run),0.15)]"
                    : parsed.direction === 'SELL'
                    ? "bg-[rgba(var(--color-bear-strike),0.15)]"
                    : "bg-panel-edge"
                )}
              >
                {parsed.direction === 'BUY' ? (
                  <TrendingUp className="w-7 h-7 text-bull-run" />
                ) : parsed.direction === 'SELL' ? (
                  <TrendingDown className="w-7 h-7 text-bear-strike" />
                ) : (
                  <Target className="w-7 h-7 text-market-mist" />
                )}
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-clear-signal">
                  {parsed.asset || 'Select Asset'}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-sm font-medium",
                    parsed.direction === 'BUY' && "bg-[rgba(var(--color-bull-run),0.15)] text-bull-run",
                    parsed.direction === 'SELL' && "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike",
                    !parsed.direction && "bg-panel-edge text-market-mist"
                  )}>
                    {parsed.direction || 'Direction'}
                  </span>
                  {parsed.timeframe && (
                    <span className="px-2 py-0.5 rounded text-sm bg-panel-edge text-market-mist">
                      {parsed.timeframe}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {parsed.confidence && (
              <div className="text-right">
                <p className="text-sm text-market-mist">Confidence</p>
                <p className="text-xl font-bold text-golden-edge">{parsed.confidence}/10</p>
              </div>
            )}
          </div>

          {/* Price Levels */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-panel-edge rounded-xl p-4"
            >
              <p className="text-xs text-market-mist mb-1">Entry Price</p>
              <p className="text-xl font-bold text-clear-signal font-mono">
                {parsed.entryPrice || '---'}
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-panel-edge rounded-xl p-4"
            >
              <p className="text-xs text-market-mist mb-1">Stop Loss</p>
              <p className="text-xl font-bold text-bear-strike font-mono">
                {parsed.stopLoss || '---'}
              </p>
              {slPips && (
                <p className="text-xs text-bear-strike">-{slPips} pips</p>
              )}
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-panel-edge rounded-xl p-4"
            >
              <p className="text-xs text-market-mist mb-1">Take Profit</p>
              <p className="text-xl font-bold text-profit-pulse font-mono">
                {parsed.takeProfit || '---'}
              </p>
              {tpPips && (
                <p className="text-xs text-profit-pulse">+{tpPips} pips</p>
              )}
            </motion.div>
          </div>

          {/* R:R and Stats Row */}
          <div className="flex items-center justify-between py-4 border-t border-b border-[rgb(var(--color-border-subtle))]">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-market-mist">Risk:Reward</p>
                <p className="text-lg font-bold text-golden-edge">{parsed.riskReward || '---'}</p>
              </div>
              {parsed.trend && (
                <div>
                  <p className="text-xs text-market-mist">Trend</p>
                  <p className="text-lg font-medium text-clear-signal">{parsed.trend}</p>
                </div>
              )}
              {parsed.executionType && (
                <div>
                  <p className="text-xs text-market-mist">Execution</p>
                  <p className="text-lg font-medium text-data-stream">{parsed.executionType}</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Levels */}
          {(parsed.keyResistance.length > 0 || parsed.keySupport.length > 0) && (
            <div className="grid grid-cols-2 gap-4">
              {parsed.keyResistance.length > 0 && (
                <div>
                  <p className="text-xs text-market-mist mb-2 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Key Resistance
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {parsed.keyResistance.map((level, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike text-sm font-mono">
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {parsed.keySupport.length > 0 && (
                <div>
                  <p className="text-xs text-market-mist mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Key Support
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {parsed.keySupport.map((level, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse text-sm font-mono">
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Summary */}
          {parsed.summary && (
            <div className="bg-panel-edge rounded-xl p-4">
              <p className="text-xs text-market-mist mb-2">Analysis Summary</p>
              <p className="text-market-mist leading-relaxed">{parsed.summary}</p>
            </div>
          )}
        </div>
      </div>

      {/* Raw Analysis Toggle */}
      <button
        onClick={() => setShowRawAnalysis(!showRawAnalysis)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-panel-edge hover:bg-[rgb(var(--color-border-subtle))] transition-swift"
      >
        <span className="text-sm text-market-mist">View Raw Analysis</span>
        {showRawAnalysis ? (
          <ChevronUp className="w-5 h-5 text-market-mist" />
        ) : (
          <ChevronDown className="w-5 h-5 text-market-mist" />
        )}
      </button>

      <AnimatePresence>
        {showRawAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <pre className="p-4 rounded-xl bg-market-depth border border-[rgb(var(--color-border-subtle))] text-xs text-market-mist overflow-auto max-h-64 whitespace-pre-wrap">
              {parsed.rawAnalysis}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}