'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  TrendingUp, 
  Shield, 
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING } from '@/lib/constants'

const demoSignals = [
  { asset: 'EUR/USD', direction: 'BUY', entry: '1.0845', tp: '1.0905', status: 'active' },
  { asset: 'GBP/JPY', direction: 'SELL', entry: '187.50', tp: '186.20', status: 'win' },
  { asset: 'XAU/USD', direction: 'BUY', entry: '2045.00', tp: '2075.00', status: 'active' },
]

export function Hero() {
  const [currentSignal, setCurrentSignal] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignal((prev) => (prev + 1) % demoSignals.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const signal = demoSignals[currentSignal]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-market-depth">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgb(var(--color-profit-pulse)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-profit-pulse)) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[rgb(var(--color-profit-pulse))] opacity-10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[rgb(var(--color-data-stream))] opacity-10 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: MOTION.deliberate / 1000, ease: EASING.out }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: MOTION.smooth / 1000, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--color-profit-pulse),0.1)] border border-[rgba(var(--color-profit-pulse),0.3)] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-profit-pulse animate-pulse" />
              <span className="text-sm text-profit-pulse font-medium">Live signals every 4 hours</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-clear-signal leading-tight mb-6">
              The confident <span className="text-gradient-profit">signal</span> in the noise of the markets
            </h1>

            <p className="text-lg sm:text-xl text-market-mist mb-8 max-w-xl">
              AI-powered trading signals with verified track record. Stop guessing. Start trading with precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/register"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
                  "bg-profit-pulse text-white font-semibold text-lg",
                  "hover:opacity-90 transition-swift",
                  "glow-profit"
                )}
              >
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
                  "bg-panel-edge text-clear-signal font-semibold text-lg",
                  "hover:bg-[rgb(var(--color-border-subtle))] transition-swift",
                  "border border-[rgb(var(--color-border-subtle))]"
                )}
              >
                See How It Works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-market-mist">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-profit-pulse" />
                <span>Verified Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-profit-pulse" />
                <span>Every 4 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-profit-pulse" />
                <span>Instant Alerts</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: MOTION.deliberate / 1000, ease: EASING.out, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <SignalPreviewCard signal={signal} />
            </div>
            <div className="absolute top-4 -right-4 w-full h-full bg-chart-canvas/50 rounded-2xl border border-[rgb(var(--color-border-subtle))] -z-10" />
            <div className="absolute top-8 -right-8 w-full h-full bg-chart-canvas/30 rounded-2xl border border-[rgb(var(--color-border-subtle))] -z-20" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: MOTION.smooth / 1000 }}
              className="absolute -bottom-6 -left-6 bg-chart-canvas border border-[rgb(var(--color-border-subtle))] rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(var(--color-profit-pulse),0.15)] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-profit-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-profit-pulse">78.5%</p>
                  <p className="text-xs text-market-mist">Win Rate</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: MOTION.smooth / 1000 }}
              className="absolute -top-6 -right-6 bg-chart-canvas border border-[rgb(var(--color-border-subtle))] rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(var(--color-golden-edge),0.15)] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-golden-edge" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-golden-edge">+2,450</p>
                  <p className="text-xs text-market-mist">Pips This Month</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 50L48 45.7C96 41 192 33 288 35.2C384 37 480 50 576 54.8C672 60 768 57 864 50C960 43 1056 33 1152 33.2C1248 33 1344 43 1392 48.3L1440 53V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            fill="rgb(var(--color-chart-canvas))"
          />
        </svg>
      </div>
    </section>
  )
}

function SignalPreviewCard({ signal }: { signal: typeof demoSignals[0] }) {
  const isBuy = signal.direction === 'BUY'
  const isWin = signal.status === 'win'

  return (
    <motion.div
      key={signal.asset}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: MOTION.smooth / 1000 }}
      className={cn(
        "bg-chart-canvas border rounded-2xl p-6 shadow-2xl",
        isWin 
          ? "border-[rgb(var(--color-profit-pulse))] glow-profit"
          : "border-[rgb(var(--color-border-subtle))]"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            isBuy 
              ? "bg-[rgba(var(--color-bull-run),0.15)]"
              : "bg-[rgba(var(--color-bear-strike),0.15)]"
          )}>
            {isBuy ? (
              <ArrowUpRight className="w-6 h-6 text-bull-run" />
            ) : (
              <ArrowDownRight className="w-6 h-6 text-bear-strike" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-clear-signal">{signal.asset}</h3>
            <span className={cn(
              "text-sm font-medium",
              isBuy ? "text-bull-run" : "text-bear-strike"
            )}>
              {signal.direction} Signal
            </span>
          </div>
        </div>
        
        <div className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium",
          isWin
            ? "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse"
            : "bg-[rgba(var(--color-data-stream),0.15)] text-data-stream"
        )}>
          {isWin ? '✓ TP Hit' : 'Active'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-panel-edge rounded-xl p-4">
          <p className="text-xs text-market-mist mb-1">Entry Price</p>
          <p className="text-xl font-bold text-clear-signal font-mono">{signal.entry}</p>
        </div>
        <div className="bg-panel-edge rounded-xl p-4">
          <p className="text-xs text-market-mist mb-1">Take Profit</p>
          <p className="text-xl font-bold text-profit-pulse font-mono">{signal.tp}</p>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-t border-[rgb(var(--color-border-subtle))]">
        <span className="text-market-mist">Risk : Reward</span>
        <span className="text-lg font-bold text-golden-edge">1 : 3</span>
      </div>
    </motion.div>
  )
}