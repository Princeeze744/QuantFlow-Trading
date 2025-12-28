'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Send, Upload, X, Loader2, Star, CheckCircle2, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { TIMEFRAMES } from '@/lib/constants'

const COMMON_PAIRS = [
  'USD/JPY', 'EUR/USD', 'GBP/USD', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD',
  'EUR/JPY', 'GBP/JPY', 'EUR/GBP', 'AUD/JPY', 'CHF/JPY',
  'XAU/USD', 'XAG/USD',
  'Boom 300', 'Boom 500', 'Boom 1000', 'Boom 150', 'Boom 900',
  'Crash 300', 'Crash 500', 'Crash 1000', 'Crash 150', 'Crash 900',
  'Volatility 10', 'Volatility 25', 'Volatility 50', 'Volatility 75', 'Volatility 100',
  'Step Index', 'Range Break 100', 'Range Break 200',
  'US30', 'NAS100', 'SPX500', 'GER40', 'UK100',
  'BTC/USD', 'ETH/USD',
]

export function SimpleSignalForm() {
  const router = useRouter()
  const supabase = createClient()
  
  const [asset, setAsset] = useState('')
  const [customAsset, setCustomAsset] = useState('')
  const [timeframe, setTimeframe] = useState('M15')
  const [fullAnalysis, setFullAnalysis] = useState('')
  const [chartImage, setChartImage] = useState<File | null>(null)
  const [chartPreview, setChartPreview] = useState<string | null>(null)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPolishing, setIsPolishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const finalAsset = asset === 'CUSTOM' ? customAsset : asset

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setChartImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setChartPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handlePolish = async () => {
    if (!fullAnalysis.trim()) {
      setError('Please paste your analysis first')
      return
    }

    setIsPolishing(true)
    setError(null)

    try {
      const res = await fetch('/api/polish-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis: fullAnalysis }),
      })

      if (!res.ok) throw new Error('Failed to polish')

      const { polished } = await res.json()
      setFullAnalysis(polished)
    } catch (err: any) {
      setError('Failed to polish analysis. You can still publish as-is.')
    } finally {
      setIsPolishing(false)
    }
  }

  const handlePublish = async () => {
    if (!finalAsset || !fullAnalysis.trim()) {
      setError('Please select/enter an asset and paste your analysis')
      return
    }

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
          asset: finalAsset,
          timeframe,
          full_analysis: fullAnalysis,
          chart_image_url: chartImageUrl,
          is_featured: isFeatured,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to create signal')
      }

      setSuccess(true)
      setTimeout(() => router.push('/admin/signals'), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsPublishing(false)
    }
  }

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-chart-canvas rounded-2xl border border-profit-pulse p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-[rgba(var(--color-profit-pulse),0.15)] flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-profit-pulse" />
        </motion.div>
        <h2 className="text-2xl font-bold text-clear-signal mb-2">Signal Published!</h2>
        <p className="text-market-mist">Redirecting to signals...</p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="p-4 rounded-xl bg-[rgba(var(--color-bear-strike),0.1)] border border-bear-strike/30 flex items-center gap-3"
        >
          <span className="text-bear-strike">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-5 h-5 text-bear-strike" />
          </button>
        </motion.div>
      )}

      <div className="bg-chart-canvas rounded-2xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[rgb(var(--color-border-subtle))] bg-panel-edge">
          <h2 className="text-xl font-bold text-clear-signal">Create New Signal</h2>
          <p className="text-sm text-market-mist">Paste your analysis - use AI to polish it</p>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Asset & Timeframe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-market-mist mb-2">Asset *</label>
              <select 
                value={asset} 
                onChange={(e) => setAsset(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal focus:outline-none focus:border-profit-pulse"
              >
                <option value="">Select Asset</option>
                {COMMON_PAIRS.map(pair => <option key={pair} value={pair}>{pair}</option>)}
                <option value="CUSTOM">✏️ Type Custom...</option>
              </select>
              
              {asset === 'CUSTOM' && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  type="text"
                  value={customAsset}
                  onChange={(e) => setCustomAsset(e.target.value.toUpperCase())}
                  placeholder="e.g. EUR/NZD"
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal focus:outline-none focus:border-profit-pulse"
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm text-market-mist mb-2">Timeframe</label>
              <select 
                value={timeframe} 
                onChange={(e) => setTimeframe(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal focus:outline-none focus:border-profit-pulse"
              >
                {TIMEFRAMES.map(tf => <option key={tf} value={tf}>{tf}</option>)}
              </select>
            </div>
          </div>

          {/* Full Analysis */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-market-mist">
                Full Analysis *
              </label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePolish}
                disabled={isPolishing || !fullAnalysis.trim()}
                className="px-3 py-1.5 rounded-lg bg-[rgba(var(--color-golden-edge),0.15)] text-golden-edge text-sm font-medium flex items-center gap-1.5 hover:bg-[rgba(var(--color-golden-edge),0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPolishing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Polishing...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> AI Polish</>
                )}
              </motion.button>
            </div>
            <textarea
              value={fullAnalysis}
              onChange={(e) => setFullAnalysis(e.target.value)}
              placeholder="Paste your complete trading analysis here...

Then click 'AI Polish' to format it beautifully!"
              className="w-full h-80 px-4 py-4 rounded-xl bg-market-depth border border-[rgb(var(--color-border-subtle))] text-clear-signal focus:outline-none focus:border-profit-pulse resize-none text-sm leading-relaxed"
            />
          </div>

          {/* Chart Upload */}
          <div>
            <label className="block text-sm text-market-mist mb-2">Chart Image (optional)</label>
            {chartPreview ? (
              <div className="relative">
                <img src={chartPreview} alt="Chart" className="w-full rounded-xl border border-[rgb(var(--color-border-subtle))]" />
                <button 
                  onClick={() => { setChartImage(null); setChartPreview(null); }} 
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-bear-strike text-white flex items-center justify-center hover:opacity-80 transition-swift"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-[rgb(var(--color-border-subtle))] rounded-xl p-8 flex flex-col items-center gap-3 hover:border-profit-pulse hover:bg-[rgba(var(--color-profit-pulse),0.02)] transition-all">
                  <Upload className="w-10 h-10 text-distant-data" />
                  <p className="text-market-mist">Drop chart image or click to upload</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Feature Toggle */}
          <label className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(var(--color-golden-edge),0.1)] border border-golden-edge/20 cursor-pointer hover:bg-[rgba(var(--color-golden-edge),0.15)] transition-all">
            <input 
              type="checkbox" 
              checked={isFeatured} 
              onChange={(e) => setIsFeatured(e.target.checked)} 
              className="w-5 h-5 rounded accent-golden-edge" 
            />
            <Star className="w-5 h-5 text-golden-edge" />
            <div>
              <p className="text-clear-signal font-medium">Feature on Landing Page</p>
              <p className="text-xs text-market-mist">Show this signal prominently on homepage</p>
            </div>
          </label>
        </div>

        {/* Publish */}
        <div className="p-4 sm:p-6 border-t border-[rgb(var(--color-border-subtle))] bg-panel-edge flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePublish}
            disabled={isPublishing || !finalAsset || !fullAnalysis.trim()}
            className="px-8 py-3 rounded-xl font-semibold flex items-center gap-2 bg-profit-pulse text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed glow-profit"
          >
            {isPublishing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</>
            ) : (
              <><Send className="w-5 h-5" /> Publish Signal</>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}