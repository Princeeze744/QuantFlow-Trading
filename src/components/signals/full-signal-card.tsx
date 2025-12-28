'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Star,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  X,
  Loader2,
  CheckCircle2,
  FileText,
  Share2,
  Bookmark
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SignalUpdate {
  id: string
  signal_id: string
  update_type: 'WIN' | 'LOSS' | 'PARTIAL' | 'INFO' | 'BREAKEVEN'
  content: string
  pips: number
  created_at: string
}

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

interface FullSignalCardProps {
  signal: Signal
  isAdmin?: boolean
  onDelete?: () => void
}

const updateTypeConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  WIN: { icon: TrendingUp, color: 'text-profit-pulse', bg: 'bg-[rgba(var(--color-profit-pulse),0.15)]', label: '✅ WIN' },
  LOSS: { icon: TrendingDown, color: 'text-bear-strike', bg: 'bg-[rgba(var(--color-bear-strike),0.15)]', label: '❌ LOSS' },
  PARTIAL: { icon: TrendingUp, color: 'text-golden-edge', bg: 'bg-[rgba(var(--color-golden-edge),0.15)]', label: '📊 PARTIAL' },
  BREAKEVEN: { icon: Minus, color: 'text-data-stream', bg: 'bg-[rgba(var(--color-data-stream),0.15)]', label: '➖ BREAKEVEN' },
  INFO: { icon: AlertCircle, color: 'text-market-mist', bg: 'bg-panel-edge', label: 'ℹ️ INFO' },
}

export function FullSignalCard({ signal, isAdmin = false, onDelete }: FullSignalCardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [updates, setUpdates] = useState<SignalUpdate[]>([])
  const [loadingUpdates, setLoadingUpdates] = useState(true)
  const [showAddUpdate, setShowAddUpdate] = useState(false)
  const [newUpdate, setNewUpdate] = useState({ type: 'WIN', content: '', pips: '' })
  const [addingUpdate, setAddingUpdate] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchUpdates()
  }, [signal.id])

  const fetchUpdates = async () => {
    try {
      const res = await fetch(`/api/signals/${signal.id}/updates`)
      if (res.ok) {
        const data = await res.json()
        setUpdates(data)
      }
    } catch (err) {
      console.error('Failed to fetch updates:', err)
    } finally {
      setLoadingUpdates(false)
    }
  }

  const handleAddUpdate = async () => {
    if (!newUpdate.content.trim()) return
    
    setAddingUpdate(true)
    try {
      const res = await fetch(`/api/signals/${signal.id}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          update_type: newUpdate.type,
          content: newUpdate.content,
          pips: parseFloat(newUpdate.pips) || 0,
        }),
      })
      
      if (res.ok) {
        await fetchUpdates()
        setNewUpdate({ type: 'WIN', content: '', pips: '' })
        setShowAddUpdate(false)
      }
    } catch (err) {
      console.error('Failed to add update:', err)
    } finally {
      setAddingUpdate(false)
    }
  }

  const handleDeleteUpdate = async (updateId: string) => {
    try {
      const res = await fetch(`/api/updates/${updateId}`, { method: 'DELETE' })
      if (res.ok) {
        setUpdates(updates.filter(u => u.id !== updateId))
      }
    } catch (err) {
      console.error('Failed to delete update:', err)
    }
  }

  const netPips = updates.reduce((sum, u) => sum + (u.pips || 0), 0)

  const getSummary = (text: string | undefined) => {
    if (!text) return ''
    const firstParagraph = text.split('\n\n')[0]
    if (firstParagraph.length <= 100) return firstParagraph
    return firstParagraph.slice(0, 100) + '...'
  }

  const getDisplayStatus = () => {
    if (updates.length === 0) return { label: 'Active', color: 'text-profit-pulse', bg: 'bg-[rgba(var(--color-profit-pulse),0.15)]', dot: 'bg-profit-pulse' }
    
    const hasWin = updates.some(u => u.update_type === 'WIN')
    const hasLoss = updates.some(u => u.update_type === 'LOSS')
    
    if (hasWin && !hasLoss) return { label: 'Won', color: 'text-profit-pulse', bg: 'bg-[rgba(var(--color-profit-pulse),0.15)]', dot: 'bg-profit-pulse' }
    if (hasLoss && !hasWin) return { label: 'Lost', color: 'text-bear-strike', bg: 'bg-[rgba(var(--color-bear-strike),0.15)]', dot: 'bg-bear-strike' }
    if (hasWin && hasLoss) return { label: 'Mixed', color: 'text-golden-edge', bg: 'bg-[rgba(var(--color-golden-edge),0.15)]', dot: 'bg-golden-edge' }
    
    return { label: 'Active', color: 'text-profit-pulse', bg: 'bg-[rgba(var(--color-profit-pulse),0.15)]', dot: 'bg-profit-pulse' }
  }

  const displayStatus = getDisplayStatus()

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return past.toLocaleDateString()
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-chart-canvas rounded-2xl overflow-hidden",
        "border transition-swift",
        signal.is_featured 
          ? "border-profit-pulse/50 shadow-[0_0_30px_rgba(var(--color-profit-pulse),0.1)]" 
          : "border-[rgb(var(--color-border-subtle))]"
      )}
    >
      {/* === HEADER === */}
      <div className="p-4 sm:p-5">
        {/* Top Row - Asset & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Asset Icon */}
            <div className={cn(
              "flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center",
              "bg-gradient-to-br from-[rgba(var(--color-profit-pulse),0.2)] to-[rgba(var(--color-profit-pulse),0.05)]"
            )}>
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-profit-pulse" />
            </div>
            
            {/* Asset Info */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-clear-signal truncate">
                  {signal.asset}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-panel-edge text-market-mist text-xs font-medium">
                  {signal.timeframe}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("flex items-center gap-1 text-xs font-medium", displayStatus.color)}>
                  <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", displayStatus.dot)} />
                  {displayStatus.label}
                </span>
                <span className="text-distant-data">•</span>
                <span className="text-xs text-market-mist flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(signal.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {signal.is_featured && (
              <div className="touch-target rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-golden-edge fill-golden-edge" />
              </div>
            )}
            
            {!isAdmin && (
              <button 
                onClick={() => setSaved(!saved)}
                className="touch-target rounded-xl text-market-mist hover:text-clear-signal transition-swift"
              >
                <Bookmark className={cn("w-5 h-5", saved && "fill-current text-golden-edge")} />
              </button>
            )}
            
            {isAdmin && (
              <button 
                onClick={onDelete} 
                className="touch-target rounded-xl text-market-mist hover:text-bear-strike transition-swift"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Summary Preview */}
        {signal.full_analysis && (
          <p className="text-sm text-market-mist leading-relaxed mb-4">
            {getSummary(signal.full_analysis)}
          </p>
        )}

        {/* Quick Stats - Mobile Optimized */}
        {updates.length > 0 && (
          <div className={cn(
            "flex items-center justify-between p-3 rounded-xl mb-4",
            netPips > 0 ? "bg-[rgba(var(--color-profit-pulse),0.1)]" :
            netPips < 0 ? "bg-[rgba(var(--color-bear-strike),0.1)]" :
            "bg-panel-edge"
          )}>
            <span className="text-sm text-market-mist">Total Result</span>
            <span className={cn(
              "text-lg font-bold font-mono",
              netPips > 0 ? "text-profit-pulse" : netPips < 0 ? "text-bear-strike" : "text-market-mist"
            )}>
              {netPips > 0 ? '+' : ''}{netPips} pips
            </span>
          </div>
        )}

        {/* Action Buttons - Touch Optimized */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-swift",
              showAnalysis 
                ? "bg-data-stream text-white" 
                : "bg-panel-edge text-market-mist hover:text-clear-signal"
            )}
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">{showAnalysis ? 'Hide' : 'View'}</span> Analysis
          </button>
          
          {signal.chart_image_url && (
            <button
              onClick={() => setShowChart(!showChart)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-swift",
                showChart 
                  ? "bg-data-stream text-white" 
                  : "bg-panel-edge text-market-mist hover:text-clear-signal"
              )}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{showChart ? 'Hide' : 'View'}</span> Chart
            </button>
          )}
        </div>
      </div>

      {/* === EXPANDABLE CONTENT === */}
      <AnimatePresence>
        {showAnalysis && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              <div className="bg-market-depth rounded-xl p-4 border border-[rgb(var(--color-border-subtle))] max-h-[50vh] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-clear-signal">
                  {signal.full_analysis}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChart && signal.chart_image_url && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              <img 
                src={signal.chart_image_url} 
                alt={`${signal.asset} Chart`}
                className="w-full rounded-xl border border-[rgb(var(--color-border-subtle))]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === RESULTS SECTION === */}
      <div className="border-t border-[rgb(var(--color-border-subtle))]">
        <div className="p-4 sm:p-5">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-clear-signal flex items-center gap-2">
              📊 Results
              {updates.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-panel-edge text-xs text-market-mist">
                  {updates.length}
                </span>
              )}
            </h3>
            
            {/* Add Update - Admin Only */}
            {isAdmin && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddUpdate(!showAddUpdate)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-profit-pulse text-white text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span> Update
              </motion.button>
            )}
          </div>

          {/* Add Update Form - Admin Only */}
          {isAdmin && (
            <AnimatePresence>
              {showAddUpdate && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="bg-panel-edge rounded-xl p-4 space-y-3">
                    {/* Type & Pips Row */}
                    <div className="flex gap-2">
                      <select
                        value={newUpdate.type}
                        onChange={(e) => setNewUpdate({ ...newUpdate, type: e.target.value })}
                        className="flex-1 px-3 py-2.5 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] text-clear-signal text-sm"
                      >
                        <option value="WIN">✅ WIN</option>
                        <option value="LOSS">❌ LOSS</option>
                        <option value="PARTIAL">📊 PARTIAL</option>
                        <option value="BREAKEVEN">➖ BREAKEVEN</option>
                        <option value="INFO">ℹ️ INFO</option>
                      </select>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={newUpdate.pips}
                        onChange={(e) => setNewUpdate({ ...newUpdate, pips: e.target.value })}
                        placeholder="Pips"
                        className="w-24 px-3 py-2.5 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] text-clear-signal font-mono text-sm"
                      />
                    </div>
                    
                    {/* Content Input */}
                    <input
                      type="text"
                      value={newUpdate.content}
                      onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                      placeholder="e.g. Primary entry hit TP1"
                      className="w-full px-3 py-2.5 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] text-clear-signal text-sm"
                    />
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowAddUpdate(false)}
                        className="flex-1 py-2.5 rounded-xl text-market-mist font-medium text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddUpdate}
                        disabled={addingUpdate || !newUpdate.content.trim()}
                        className="flex-1 py-2.5 rounded-xl bg-profit-pulse text-white font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {addingUpdate ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Updates List */}
          {loadingUpdates ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-profit-pulse" />
            </div>
          ) : updates.length > 0 ? (
            <div className="space-y-2">
              {updates.map((update, index) => {
                const config = updateTypeConfig[update.update_type] || updateTypeConfig.INFO
                const Icon = config.icon
                return (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn("p-3 rounded-xl flex items-start gap-3", config.bg)}
                  >
                    <div className={cn("p-1.5 rounded-lg", config.bg)}>
                      <Icon className={cn("w-4 h-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-clear-signal">{update.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-market-mist">
                          {formatTimeAgo(update.created_at)}
                        </span>
                        {update.pips !== 0 && (
                          <span className={cn(
                            "text-xs font-mono font-semibold px-1.5 py-0.5 rounded",
                            update.pips > 0 
                              ? "text-profit-pulse bg-[rgba(var(--color-profit-pulse),0.1)]" 
                              : "text-bear-strike bg-[rgba(var(--color-bear-strike),0.1)]"
                          )}>
                            {update.pips > 0 ? '+' : ''}{update.pips}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Delete - Admin Only */}
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="touch-target rounded-lg text-market-mist hover:text-bear-strike transition-swift"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-panel-edge flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-distant-data" />
              </div>
              <p className="text-sm text-market-mist">No results yet</p>
              <p className="text-xs text-distant-data mt-1">Updates will appear here</p>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}