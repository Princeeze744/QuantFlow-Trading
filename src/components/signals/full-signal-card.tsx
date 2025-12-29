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
  Bookmark,
  Zap,
  Target,
  Award,
  Copy,
  Check
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

const updateTypeConfig: Record<string, { icon: any; color: string; bg: string; label: string; gradient: string }> = {
  WIN: { 
    icon: TrendingUp, 
    color: 'text-profit-pulse', 
    bg: 'bg-[rgba(var(--color-profit-pulse),0.12)]', 
    label: 'WIN',
    gradient: 'from-[rgba(var(--color-profit-pulse),0.2)] to-transparent'
  },
  LOSS: { 
    icon: TrendingDown, 
    color: 'text-bear-strike', 
    bg: 'bg-[rgba(var(--color-bear-strike),0.12)]', 
    label: 'LOSS',
    gradient: 'from-[rgba(var(--color-bear-strike),0.2)] to-transparent'
  },
  PARTIAL: { 
    icon: Target, 
    color: 'text-golden-edge', 
    bg: 'bg-[rgba(var(--color-golden-edge),0.12)]', 
    label: 'PARTIAL TP',
    gradient: 'from-[rgba(var(--color-golden-edge),0.2)] to-transparent'
  },
  BREAKEVEN: { 
    icon: Minus, 
    color: 'text-data-stream', 
    bg: 'bg-[rgba(var(--color-data-stream),0.12)]', 
    label: 'BREAKEVEN',
    gradient: 'from-[rgba(var(--color-data-stream),0.2)] to-transparent'
  },
  INFO: { 
    icon: AlertCircle, 
    color: 'text-market-mist', 
    bg: 'bg-panel-edge', 
    label: 'INFO',
    gradient: 'from-[rgba(var(--color-border-subtle),0.3)] to-transparent'
  },
}

// Currency pair icons/flags mapping
const getAssetIcon = (asset: string) => {
  const pair = asset.toUpperCase()
  if (pair.includes('XAU') || pair.includes('GOLD')) return '🥇'
  if (pair.includes('BTC')) return '₿'
  if (pair.includes('ETH')) return 'Ξ'
  if (pair.includes('USD')) return '💵'
  if (pair.includes('EUR')) return '🇪🇺'
  if (pair.includes('GBP')) return '🇬🇧'
  if (pair.includes('JPY')) return '🇯🇵'
  if (pair.includes('AUD')) return '🇦🇺'
  if (pair.includes('CAD')) return '🇨🇦'
  if (pair.includes('CHF')) return '🇨🇭'
  if (pair.includes('NZD')) return '🇳🇿'
  return '📊'
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
  const [copied, setCopied] = useState(false)

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

  const handleCopySignal = () => {
    const text = `${signal.asset} - ${signal.timeframe}\n${signal.full_analysis || ''}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const netPips = updates.reduce((sum, u) => sum + (u.pips || 0), 0)
  const winCount = updates.filter(u => u.update_type === 'WIN' || u.update_type === 'PARTIAL').length
  const lossCount = updates.filter(u => u.update_type === 'LOSS').length

  const getSummary = (text: string | undefined) => {
    if (!text) return ''
    const lines = text.split('\n').filter(l => l.trim())
    const summary = lines.slice(0, 2).join(' ')
    if (summary.length <= 120) return summary
    return summary.slice(0, 120) + '...'
  }

  const getDisplayStatus = () => {
    if (updates.length === 0) return { 
      label: 'Active', 
      color: 'text-profit-pulse', 
      bg: 'bg-[rgba(var(--color-profit-pulse),0.12)]', 
      dot: 'bg-profit-pulse',
      ring: 'ring-profit-pulse/30'
    }
    
    const hasWin = updates.some(u => u.update_type === 'WIN')
    const hasLoss = updates.some(u => u.update_type === 'LOSS')
    
    if (hasWin && !hasLoss) return { 
      label: 'Won', 
      color: 'text-profit-pulse', 
      bg: 'bg-[rgba(var(--color-profit-pulse),0.12)]', 
      dot: 'bg-profit-pulse',
      ring: 'ring-profit-pulse/30'
    }
    if (hasLoss && !hasWin) return { 
      label: 'Lost', 
      color: 'text-bear-strike', 
      bg: 'bg-[rgba(var(--color-bear-strike),0.12)]', 
      dot: 'bg-bear-strike',
      ring: 'ring-bear-strike/30'
    }
    if (hasWin && hasLoss) return { 
      label: 'Mixed', 
      color: 'text-golden-edge', 
      bg: 'bg-[rgba(var(--color-golden-edge),0.12)]', 
      dot: 'bg-golden-edge',
      ring: 'ring-golden-edge/30'
    }
    
    return { 
      label: 'Active', 
      color: 'text-profit-pulse', 
      bg: 'bg-[rgba(var(--color-profit-pulse),0.12)]', 
      dot: 'bg-profit-pulse',
      ring: 'ring-profit-pulse/30'
    }
  }

  const displayStatus = getDisplayStatus()

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-chart-canvas rounded-2xl overflow-hidden relative",
        "border transition-all duration-300",
        signal.is_featured 
          ? "border-[rgba(var(--color-profit-pulse),0.4)] shadow-[0_0_40px_rgba(var(--color-profit-pulse),0.12)]" 
          : "border-[rgb(var(--color-border-subtle))] hover:border-[rgba(var(--color-border-subtle),1.5)]"
      )}
    >
      {/* Featured Gradient Overlay */}
      {signal.is_featured && (
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--color-profit-pulse),0.05)] via-transparent to-transparent pointer-events-none" />
      )}

      {/* === HEADER === */}
      <div className="p-4 sm:p-5 relative">
        {/* Featured Badge */}
        {signal.is_featured && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[rgba(var(--color-golden-edge),0.2)] to-[rgba(var(--color-golden-edge),0.1)] border border-[rgba(var(--color-golden-edge),0.3)]">
              <Star className="w-3.5 h-3.5 text-golden-edge fill-golden-edge" />
              <span className="text-[10px] font-semibold text-golden-edge uppercase tracking-wide">Featured</span>
            </div>
          </motion.div>
        )}

        {/* Top Row - Asset Info */}
        <div className="flex items-start gap-3 mb-4">
          {/* Asset Icon */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative",
              "bg-gradient-to-br from-panel-edge to-[rgba(var(--color-chart-canvas),0.5)]",
              "border border-[rgb(var(--color-border-subtle))]",
              "shadow-lg shadow-black/20"
            )}
          >
            <span className="text-2xl sm:text-3xl">{getAssetIcon(signal.asset)}</span>
            {/* Status Ring */}
            <div className={cn(
              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
              displayStatus.bg,
              "ring-2 ring-chart-canvas"
            )}>
              <span className={cn("w-2 h-2 rounded-full", displayStatus.dot, displayStatus.label === 'Active' && "animate-pulse")} />
            </div>
          </motion.div>
          
          {/* Asset Info */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-clear-signal tracking-tight">
                {signal.asset}
              </h2>
              <span className="px-2 py-0.5 rounded-lg bg-panel-edge text-market-mist text-xs font-semibold">
                {signal.timeframe}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className={cn("flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-full", displayStatus.bg, displayStatus.color)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", displayStatus.dot)} />
                {displayStatus.label}
              </span>
              <span className="text-market-mist flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatTimeAgo(signal.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Summary Preview */}
        {signal.full_analysis && (
          <p className="text-sm text-market-mist leading-relaxed mb-4 line-clamp-2">
            {getSummary(signal.full_analysis)}
          </p>
        )}

        {/* Stats Bar - Show if has updates */}
        {updates.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center justify-between p-3 sm:p-4 rounded-xl mb-4 relative overflow-hidden",
              "bg-gradient-to-r",
              netPips > 0 ? "from-[rgba(var(--color-profit-pulse),0.1)] to-[rgba(var(--color-profit-pulse),0.02)]" :
              netPips < 0 ? "from-[rgba(var(--color-bear-strike),0.1)] to-[rgba(var(--color-bear-strike),0.02)]" :
              "from-panel-edge to-[rgba(var(--color-panel-edge),0.5)]"
            )}
          >
            {/* Left Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-[rgba(var(--color-profit-pulse),0.15)] flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-profit-pulse" />
                </div>
                <span className="text-sm font-semibold text-profit-pulse">{winCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-[rgba(var(--color-bear-strike),0.15)] flex items-center justify-center">
                  <TrendingDown className="w-3.5 h-3.5 text-bear-strike" />
                </div>
                <span className="text-sm font-semibold text-bear-strike">{lossCount}</span>
              </div>
            </div>
            
            {/* Net Result */}
            <div className="text-right">
              <p className="text-[10px] text-market-mist uppercase tracking-wide mb-0.5">Net Result</p>
              <p className={cn(
                "text-xl sm:text-2xl font-bold font-mono tracking-tight",
                netPips > 0 ? "text-profit-pulse" : netPips < 0 ? "text-bear-strike" : "text-market-mist"
              )}>
                {netPips > 0 ? '+' : ''}{netPips}
                <span className="text-sm ml-1 opacity-70">pips</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Action Buttons - Touch Optimized */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAnalysis(!showAnalysis)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium text-sm transition-all active-scale",
              showAnalysis 
                ? "bg-data-stream text-white shadow-lg shadow-[rgba(var(--color-data-stream),0.3)]" 
                : "bg-panel-edge text-market-mist hover:text-clear-signal hover:bg-[rgba(var(--color-panel-edge),1.2)]"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>{showAnalysis ? 'Hide' : 'Analysis'}</span>
            <motion.div
              animate={{ rotate: showAnalysis ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
          
          {signal.chart_image_url && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowChart(!showChart)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium text-sm transition-all active-scale",
                showChart 
                  ? "bg-data-stream text-white shadow-lg shadow-[rgba(var(--color-data-stream),0.3)]" 
                  : "bg-panel-edge text-market-mist hover:text-clear-signal hover:bg-[rgba(var(--color-panel-edge),1.2)]"
              )}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{showChart ? 'Hide' : 'Chart'}</span>
              <motion.div
                animate={{ rotate: showChart ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          )}

          {/* Quick Actions */}
          <div className="flex gap-1">
            {!isAdmin && (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setSaved(!saved)}
                className={cn(
                  "touch-target rounded-xl transition-all",
                  saved 
                    ? "bg-[rgba(var(--color-golden-edge),0.15)] text-golden-edge" 
                    : "bg-panel-edge text-market-mist hover:text-clear-signal"
                )}
              >
                <Bookmark className={cn("w-5 h-5", saved && "fill-current")} />
              </motion.button>
            )}
            
            {isAdmin && (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={onDelete} 
                className="touch-target rounded-xl bg-panel-edge text-market-mist hover:text-bear-strike hover:bg-[rgba(var(--color-bear-strike),0.1)] transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* === EXPANDABLE ANALYSIS === */}
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
              <div className="relative bg-market-depth rounded-xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
                {/* Copy Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopySignal}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-panel-edge text-market-mist hover:text-clear-signal transition-all z-10"
                >
                  {copied ? <Check className="w-4 h-4 text-profit-pulse" /> : <Copy className="w-4 h-4" />}
                </motion.button>
                
                <div className="p-4 max-h-[50vh] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-clear-signal">
                    {signal.full_analysis}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === EXPANDABLE CHART === */}
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
              <div className="rounded-xl overflow-hidden border border-[rgb(var(--color-border-subtle))]">
                <img 
                  src={signal.chart_image_url} 
                  alt={`${signal.asset} Chart`}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === RESULTS SECTION === */}
      <div className="border-t border-[rgb(var(--color-border-subtle))]">
        <div className="p-4 sm:p-5">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[rgba(var(--color-data-stream),0.2)] to-[rgba(var(--color-data-stream),0.05)] flex items-center justify-center">
                <Award className="w-4 h-4 text-data-stream" />
              </div>
              <div>
                <h3 className="font-semibold text-clear-signal">Trade Results</h3>
                {updates.length > 0 && (
                  <p className="text-xs text-market-mist">{updates.length} update{updates.length !== 1 ? 's' : ''}</p>
                )}
              </div>
            </div>
            
            {/* Add Update - Admin Only */}
            {isAdmin && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddUpdate(!showAddUpdate)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  showAddUpdate 
                    ? "bg-panel-edge text-market-mist"
                    : "bg-profit-pulse text-white shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)]"
                )}
              >
                {showAddUpdate ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{showAddUpdate ? 'Cancel' : 'Add Update'}</span>
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
                  <div className="bg-panel-edge rounded-xl p-4 space-y-3 border border-[rgb(var(--color-border-subtle))]">
                    {/* Type Selection - Visual Pills */}
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(updateTypeConfig).map(([type, config]) => (
                        <button
                          key={type}
                          onClick={() => setNewUpdate({ ...newUpdate, type })}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                            newUpdate.type === type 
                              ? cn(config.bg, config.color, "ring-2", config.color.replace('text-', 'ring-') + '/30')
                              : "bg-chart-canvas text-market-mist hover:text-clear-signal"
                          )}
                        >
                          <config.icon className="w-3.5 h-3.5" />
                          {config.label}
                        </button>
                      ))}
                    </div>

                    {/* Pips Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={newUpdate.pips}
                        onChange={(e) => setNewUpdate({ ...newUpdate, pips: e.target.value })}
                        placeholder="+/- Pips"
                        className="w-28 px-4 py-3 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] text-clear-signal font-mono text-sm placeholder:text-distant-data focus:outline-none focus:ring-2 focus:ring-profit-pulse/30"
                      />
                      <input
                        type="text"
                        value={newUpdate.content}
                        onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                        placeholder="Update description..."
                        className="flex-1 px-4 py-3 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] text-clear-signal text-sm placeholder:text-distant-data focus:outline-none focus:ring-2 focus:ring-profit-pulse/30"
                      />
                    </div>
                    
                    {/* Submit Button */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddUpdate}
                      disabled={addingUpdate || !newUpdate.content.trim()}
                      className="w-full py-3 rounded-xl bg-profit-pulse text-white font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)]"
                    >
                      {addingUpdate ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      Add Update
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Updates List */}
          {loadingUpdates ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-profit-pulse mb-3" />
              <p className="text-sm text-market-mist">Loading updates...</p>
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
                    className={cn(
                      "p-3 sm:p-4 rounded-xl flex items-start gap-3 relative overflow-hidden",
                      config.bg
                    )}
                  >
                    {/* Gradient accent */}
                    <div className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", config.gradient)} />
                    
                    <div className={cn("flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center", config.bg)}>
                      <Icon className={cn("w-4 h-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-clear-signal font-medium">{update.content}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-market-mist">
                          {formatTimeAgo(update.created_at)}
                        </span>
                        {update.pips !== 0 && (
                          <span className={cn(
                            "text-xs font-bold font-mono px-2 py-0.5 rounded-md",
                            update.pips > 0 
                              ? "text-profit-pulse bg-[rgba(var(--color-profit-pulse),0.15)]" 
                              : "text-bear-strike bg-[rgba(var(--color-bear-strike),0.15)]"
                          )}>
                            {update.pips > 0 ? '+' : ''}{update.pips} pips
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Delete - Admin Only */}
                    {isAdmin && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="touch-target rounded-lg text-market-mist hover:text-bear-strike transition-all"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-panel-edge flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-distant-data" />
              </div>
              <p className="text-sm font-medium text-market-mist mb-1">No results yet</p>
              <p className="text-xs text-distant-data">Trade updates will appear here</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  )
}