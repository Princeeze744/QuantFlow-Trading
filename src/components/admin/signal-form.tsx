'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Upload, 
  X, 
  Loader2, 
  Send,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  TrendingUp,
  TrendingDown,
  Target,
  Brain
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { TRADING_PAIRS, TIMEFRAMES } from '@/lib/constants'

interface ParsedSignal {
  asset: string
  timeframe: string
  trend: string
  confidence: number
  primary_setup: {
    direction: 'BUY' | 'SELL'
    entry_price: number
    stop_loss: number
    take_profit: number
    risk_reward: string
    execution_type: string
    probability: string
  }
  alternative_setups: Array<{
    direction: 'BUY' | 'SELL'
    entry_price: number
    stop_loss: number
    take_profit: number
    risk_reward: string
    execution_type: string
    probability: string
  }>
  key_resistance: number[]
  key_support: number[]
  summary: string
  risk_notes: string
}

export function SignalForm() {
  const router = useRouter()
  const supabase = createClient()
  
  const [step, setStep] = useState<'paste' | 'review' | 'success'>('paste')
  const [rawText, setRawText] = useState('')
  const [parsed, setParsed] = useState<ParsedSignal | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [chartImage, setChartImage] = useState<File | null>(null)
  const [chartPreview, setChartPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedSetup, setSelectedSetup] = useState<'primary' | number>('primary')

  const handleParse = async () => {
    if (!rawText.trim()) {
      setError('Please paste your analysis first')
      return
    }

    setIsParsing(true)
    setError(null)

    try {
      const response = await fetch('/api/parse-signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis: rawText }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to parse')
      }

      const result = await response.json()
      setParsed(result)
      setStep('review')
    } catch (err: any) {
      setError(err.message || 'Failed to parse analysis')
    } finally {
      setIsParsing(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setChartImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setChartPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const getCurrentSetup = () => {
    if (!parsed) return null
    if (selectedSetup === 'primary') return parsed.primary_setup
    return parsed.alternative_setups[selectedSetup as number]
  }

  const handlePublish = async () => {
    if (!parsed) return
    
    const setup = getCurrentSetup()
    if (!setup) return

    setIsPublishing(true)
    setError(null)

    try {
      let chartImageUrl = null
      if (chartImage) {
        const fileName = `${Date.now()}-${chartImage.name}`
        const { error: uploadError } = await supabase.storage.from('charts').upload(fileName, chartImage)
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('charts').getPublicUrl(fileName)
          chartImageUrl = publicUrl
        }
      }

      const response = await fetch('/api/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset: parsed.asset,
          direction: setup.direction,
          entry_price: setup.entry_price,
          stop_loss: setup.stop_loss,
          take_profit: setup.take_profit,
          risk_reward: parseFloat(setup.risk_reward.split(':')[1] || '3'),
          timeframe: parsed.timeframe,
          analysis: parsed.summary,
          chart_image_url: chartImageUrl,
        }),
      })

      if (!response.ok) throw new Error('Failed to create signal')

      setStep('success')
      setTimeout(() => router.push('/admin/signals'), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsPublishing(false)
    }
  }

  const setup = getCurrentSetup()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {['paste', 'review', 'success'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold", step === s ? "bg-profit-pulse text-white scale-110" : i < ['paste', 'review', 'success'].indexOf(step) ? "bg-profit-pulse text-white" : "bg-panel-edge text-market-mist")}>
              {i < ['paste', 'review', 'success'].indexOf(step) ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
            </div>
            {i < 2 && <div className={cn("w-16 h-1 mx-2 rounded-full", i < ['paste', 'review', 'success'].indexOf(step) ? "bg-profit-pulse" : "bg-panel-edge")} />}
          </div>
        ))}
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-[rgba(var(--color-bear-strike),0.1)] border border-bear-strike/30 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-bear-strike" />
          <p className="text-bear-strike">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto"><X className="w-5 h-5 text-bear-strike" /></button>
        </motion.div>
      )}

      {/* Step 1: Paste */}
      {step === 'paste' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
          <div className="p-4 border-b border-[rgb(var(--color-border-subtle))] bg-panel-edge">
            <h2 className="text-lg font-semibold text-clear-signal flex items-center gap-2">
              <Brain className="w-5 h-5 text-profit-pulse" />
              AI-Powered Signal Parser
            </h2>
            <p className="text-sm text-market-mist">Paste your analysis - AI will extract all trade setups</p>
          </div>
          <div className="p-4">
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste your full trading analysis here..."
              className="w-full h-80 p-4 rounded-xl resize-none bg-market-depth border border-[rgb(var(--color-border-subtle))] text-clear-signal placeholder:text-distant-data focus:outline-none focus:border-profit-pulse font-mono text-sm"
            />
          </div>
          <div className="p-4 border-t border-[rgb(var(--color-border-subtle))] flex justify-end">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleParse} disabled={isParsing || !rawText.trim()} className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-profit-pulse text-white hover:opacity-90 disabled:opacity-50">
              {isParsing ? <><Loader2 className="w-5 h-5 animate-spin" /> AI Parsing...</> : <><Sparkles className="w-5 h-5" /> Parse with AI</>}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Review */}
      {step === 'review' && parsed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <button onClick={() => setStep('paste')} className="text-sm text-market-mist hover:text-clear-signal">← Back</button>

          {/* Setup Selector */}
          <div className="bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))] p-4">
            <h3 className="text-sm font-medium text-market-mist mb-3">Select Setup to Publish:</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedSetup('primary')} className={cn("px-4 py-2 rounded-lg text-sm font-medium", selectedSetup === 'primary' ? "bg-profit-pulse text-white" : "bg-panel-edge text-market-mist")}>
                Primary ({parsed.primary_setup.probability})
              </button>
              {parsed.alternative_setups?.map((alt, i) => (
                <button key={i} onClick={() => setSelectedSetup(i)} className={cn("px-4 py-2 rounded-lg text-sm font-medium", selectedSetup === i ? "bg-data-stream text-white" : "bg-panel-edge text-market-mist")}>
                  Alt {i + 1} ({alt.probability})
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {setup && (
            <div className="bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
              <div className="p-4 border-b border-[rgb(var(--color-border-subtle))] bg-panel-edge">
                <p className="text-sm font-medium text-market-mist">SIGNAL PREVIEW</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", setup.direction === 'BUY' ? "bg-[rgba(var(--color-bull-run),0.15)]" : "bg-[rgba(var(--color-bear-strike),0.15)]")}>
                      {setup.direction === 'BUY' ? <TrendingUp className="w-7 h-7 text-bull-run" /> : <TrendingDown className="w-7 h-7 text-bear-strike" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-clear-signal">{parsed.asset}</h3>
                      <div className="flex items-center gap-2">
                        <span className={cn("px-2 py-0.5 rounded text-sm font-medium", setup.direction === 'BUY' ? "bg-[rgba(var(--color-bull-run),0.15)] text-bull-run" : "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike")}>{setup.direction}</span>
                        <span className="px-2 py-0.5 rounded text-sm bg-panel-edge text-market-mist">{parsed.timeframe}</span>
                        <span className="px-2 py-0.5 rounded text-sm bg-panel-edge text-market-mist">{setup.execution_type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-market-mist">Confidence</p>
                    <p className="text-xl font-bold text-golden-edge">{parsed.confidence}/10</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-panel-edge rounded-xl p-4">
                    <p className="text-xs text-market-mist mb-1">Entry Price</p>
                    <p className="text-xl font-bold text-clear-signal font-mono">{setup.entry_price}</p>
                  </div>
                  <div className="bg-panel-edge rounded-xl p-4">
                    <p className="text-xs text-market-mist mb-1">Stop Loss</p>
                    <p className="text-xl font-bold text-bear-strike font-mono">{setup.stop_loss}</p>
                  </div>
                  <div className="bg-panel-edge rounded-xl p-4">
                    <p className="text-xs text-market-mist mb-1">Take Profit</p>
                    <p className="text-xl font-bold text-profit-pulse font-mono">{setup.take_profit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-4 border-t border-b border-[rgb(var(--color-border-subtle))]">
                  <div>
                    <p className="text-xs text-market-mist">Risk:Reward</p>
                    <p className="text-lg font-bold text-golden-edge">{setup.risk_reward}</p>
                  </div>
                  <div>
                    <p className="text-xs text-market-mist">Trend</p>
                    <p className="text-lg font-medium text-clear-signal">{parsed.trend}</p>
                  </div>
                  <div>
                    <p className="text-xs text-market-mist">Probability</p>
                    <p className="text-lg font-medium text-data-stream">{setup.probability}</p>
                  </div>
                </div>

                {parsed.summary && (
                  <div className="bg-panel-edge rounded-xl p-4">
                    <p className="text-xs text-market-mist mb-2">Summary</p>
                    <p className="text-market-mist">{parsed.summary}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chart Upload */}
          <div className="bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
            <div className="p-4 border-b border-[rgb(var(--color-border-subtle))] bg-panel-edge">
              <h3 className="font-semibold text-clear-signal flex items-center gap-2"><ImageIcon className="w-5 h-5 text-data-stream" /> Chart (Optional)</h3>
            </div>
            <div className="p-4">
              {chartPreview ? (
                <div className="relative">
                  <img src={chartPreview} alt="Chart" className="w-full rounded-xl" />
                  <button onClick={() => { setChartImage(null); setChartPreview(null); }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-bear-strike text-white flex items-center justify-center"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-[rgb(var(--color-border-subtle))] rounded-xl p-8 flex flex-col items-center gap-4 hover:border-profit-pulse transition-all">
                    <Upload className="w-12 h-12 text-distant-data" />
                    <p className="text-clear-signal">Drop image or click</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handlePublish} disabled={isPublishing} className="px-8 py-3 rounded-xl font-semibold flex items-center gap-2 bg-profit-pulse text-white hover:opacity-90 disabled:opacity-50 glow-profit">
              {isPublishing ? <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</> : <><Send className="w-5 h-5" /> Publish Signal</>}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Success */}
      {step === 'success' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-chart-canvas rounded-xl border border-profit-pulse p-12 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-20 h-20 rounded-full bg-[rgba(var(--color-profit-pulse),0.15)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-profit-pulse" />
          </motion.div>
          <h2 className="text-2xl font-bold text-clear-signal mb-2">Signal Published!</h2>
          <p className="text-market-mist">Redirecting...</p>
        </motion.div>
      )}
    </div>
  )
}