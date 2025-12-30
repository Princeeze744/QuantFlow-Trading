'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  TrendingUp,
  Shield,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

const demoSignals = [
  { asset: 'EUR/USD', direction: 'BUY', entry: '1.0845', tp: '1.0905', status: 'active', flag: '🇪🇺' },
  { asset: 'GBP/JPY', direction: 'SELL', entry: '187.50', tp: '186.20', status: 'win', flag: '🇬🇧' },
  { asset: 'XAU/USD', direction: 'BUY', entry: '2045.00', tp: '2075.00', status: 'active', flag: '🥇' },
]

const stats = [
  { value: '78.5%', label: 'Win Rate', icon: TrendingUp, color: 'profit-pulse' },
  { value: '2.5K+', label: 'Traders', icon: Shield, color: 'data-stream' },
  { value: '24/7', label: 'Support', icon: Clock, color: 'golden-edge' },
]

export function Hero() {
  const [currentSignal, setCurrentSignal] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignal((prev) => (prev + 1) % demoSignals.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const signal = demoSignals[currentSignal]

  const primaryBtnClass = cn(
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
    "bg-gradient-to-r from-profit-pulse to-[rgba(var(--color-profit-pulse),0.85)]",
    "text-white font-semibold text-lg",
    "shadow-xl shadow-[rgba(var(--color-profit-pulse),0.3)]",
    "hover:shadow-[rgba(var(--color-profit-pulse),0.5)]",
    "transition-all duration-300 active-scale"
  )

  const secondaryBtnClass = cn(
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
    "bg-panel-edge text-clear-signal font-semibold text-lg",
    "border border-[rgb(var(--color-border-subtle))]",
    "hover:bg-[rgb(var(--color-panel-edge))]",
    "transition-all duration-300 active-scale"
  )

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden pt-16 lg:pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-market-depth">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgb(var(--color-profit-pulse)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-profit-pulse)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-1/4 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-[rgb(var(--color-profit-pulse))] rounded-full blur-[100px] lg:blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-1/4 w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] bg-[rgb(var(--color-data-stream))] rounded-full blur-[100px] lg:blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] bg-[rgb(var(--color-golden-edge))] rounded-full blur-[100px] lg:blur-[150px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--color-profit-pulse),0.1)] border border-[rgba(var(--color-profit-pulse),0.3)] mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit-pulse opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-profit-pulse" />
              </span>
              <span className="text-sm text-profit-pulse font-medium">Live signals every 4 hours</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-clear-signal leading-[1.1] mb-6"
            >
              The confident{' '}
              <span className="relative inline-block">
                <span className="text-gradient-profit">signal</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    d="M2 6C50 2 150 2 198 6"
                    stroke="rgb(var(--color-profit-pulse))"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              in the noise
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-market-mist mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              AI-powered trading signals with verified track record. Stop guessing. Start trading with precision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/register" className={primaryBtnClass}>
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a href="#features" className={secondaryBtnClass}>
                  <Play className="w-5 h-5" />
                  See How It Works
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Indicators - Desktop Only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="hidden lg:flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-sm text-market-mist"
              >
                <Shield className="w-4 h-4 text-profit-pulse" />
                <span>Verified Results</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-sm text-market-mist"
              >
                <Clock className="w-4 h-4 text-profit-pulse" />
                <span>Every 4 Hours</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-sm text-market-mist"
              >
                <Zap className="w-4 h-4 text-profit-pulse" />
                <span>Instant Alerts</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Desktop Signal Card + Floating Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* ===== FLOATING WIN RATE CARD (Top Left) ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { delay: 0.5, duration: 0.4 },
                scale: { delay: 0.5, duration: 0.4 },
                y: { delay: 0.9, duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-4 -left-4 z-30 bg-chart-canvas border border-[rgb(var(--color-border-subtle))] rounded-2xl p-4 shadow-2xl shadow-black/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(var(--color-profit-pulse),0.25)] to-[rgba(var(--color-profit-pulse),0.05)] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-profit-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-profit-pulse">78.5%</p>
                  <p className="text-xs text-market-mist">Win Rate</p>
                </div>
              </div>
            </motion.div>

            {/* ===== FLOATING PIPS CARD (Top Right) ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { delay: 0.6, duration: 0.4 },
                scale: { delay: 0.6, duration: 0.4 },
                y: { delay: 1.2, duration: 3.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-8 -right-8 z-30 bg-chart-canvas border border-[rgb(var(--color-border-subtle))] rounded-2xl p-4 shadow-2xl shadow-black/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(var(--color-golden-edge),0.25)] to-[rgba(var(--color-golden-edge),0.05)] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-golden-edge" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-golden-edge">+2,450</p>
                  <p className="text-xs text-market-mist">Pips This Month</p>
                </div>
              </div>
            </motion.div>

            {/* ===== FLOATING TRADERS CARD (Bottom Right) ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { delay: 0.7, duration: 0.4 },
                scale: { delay: 0.7, duration: 0.4 },
                y: { delay: 1.5, duration: 2.8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-4 -right-4 z-30 bg-chart-canvas border border-[rgb(var(--color-border-subtle))] rounded-2xl p-4 shadow-2xl shadow-black/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(var(--color-data-stream),0.25)] to-[rgba(var(--color-data-stream),0.05)] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-data-stream" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-data-stream">2,547</p>
                  <p className="text-xs text-market-mist">Active Traders</p>
                </div>
              </div>
            </motion.div>

            {/* ===== MAIN SIGNAL CARD ===== */}
            <div className="relative z-10 mx-8 my-12">
              <SignalPreviewCard signal={signal} />

              {/* Stacked Cards Effect */}
              <div className="absolute top-3 -right-3 w-full h-full bg-chart-canvas/30 rounded-2xl border border-[rgb(var(--color-border-subtle))] -z-10" />
              <div className="absolute top-6 -right-6 w-full h-full bg-chart-canvas/15 rounded-2xl border border-[rgb(var(--color-border-subtle))] -z-20" />
            </div>

            {/* Signal Indicator Dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {demoSignals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSignal(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentSignal
                      ? "bg-profit-pulse w-6"
                      : "bg-panel-edge hover:bg-market-mist w-2"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== MOBILE SIGNAL CARD ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:hidden mt-8"
        >
          <div className="relative">
            <MobileSignalCard signal={signal} />
            
            {/* Signal Indicator Dots - Mobile */}
            <div className="flex justify-center gap-2 mt-4">
              {demoSignals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSignal(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentSignal
                      ? "bg-profit-pulse w-6"
                      : "bg-panel-edge w-2"
                  )}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:hidden mt-6"
        >
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {[
              { value: '78.5%', label: 'Win Rate', icon: TrendingUp, color: 'profit-pulse' },
              { value: '+2,450', label: 'Pips/Month', icon: Zap, color: 'golden-edge' },
              { value: '2,547', label: 'Traders', icon: Shield, color: 'data-stream' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex-shrink-0 flex items-center gap-3 p-3 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))]"
              >
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}/15 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <div>
                  <p className={`text-lg font-bold text-${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-market-mist">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
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

// Desktop Signal Card
function SignalPreviewCard({ signal }: { signal: typeof demoSignals[0] }) {
  const isBuy = signal.direction === 'BUY'
  const isWin = signal.status === 'win'

  const cardClass = cn(
    "bg-chart-canvas border rounded-2xl p-6 shadow-2xl shadow-black/30",
    isWin
      ? "border-[rgba(var(--color-profit-pulse),0.4)] shadow-[0_0_40px_rgba(var(--color-profit-pulse),0.15)]"
      : "border-[rgb(var(--color-border-subtle))]"
  )

  const iconBgClass = cn(
    "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br",
    isBuy
      ? "from-[rgba(var(--color-bull-run),0.2)] to-[rgba(var(--color-bull-run),0.05)]"
      : "from-[rgba(var(--color-bear-strike),0.2)] to-[rgba(var(--color-bear-strike),0.05)]"
  )

  const statusClass = cn(
    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold",
    isWin
      ? "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse"
      : "bg-[rgba(var(--color-data-stream),0.15)] text-data-stream"
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={signal.asset}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.4 }}
        className={cardClass}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} className={iconBgClass}>
              {signal.flag}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-clear-signal">{signal.asset}</h3>
              <div className="flex items-center gap-1.5">
                {isBuy ? (
                  <ArrowUpRight className="w-4 h-4 text-bull-run" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-bear-strike" />
                )}
                <span className={isBuy ? "text-sm font-semibold text-bull-run" : "text-sm font-semibold text-bear-strike"}>
                  {signal.direction}
                </span>
              </div>
            </div>
          </div>

          <div className={statusClass}>
            {isWin ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            )}
            {isWin ? 'TP Hit' : 'Active'}
          </div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-panel-edge rounded-xl p-4">
            <p className="text-xs text-market-mist mb-1">Entry Price</p>
            <p className="text-xl font-bold text-clear-signal font-mono">{signal.entry}</p>
          </div>
          <div className="bg-[rgba(var(--color-profit-pulse),0.1)] rounded-xl p-4 border border-[rgba(var(--color-profit-pulse),0.2)]">
            <p className="text-xs text-profit-pulse mb-1">Take Profit</p>
            <p className="text-xl font-bold text-profit-pulse font-mono">{signal.tp}</p>
          </div>
        </div>

        {/* Risk Reward */}
        <div className="flex items-center justify-between py-4 px-4 rounded-xl bg-[rgba(var(--color-golden-edge),0.05)] border border-[rgba(var(--color-golden-edge),0.15)]">
          <span className="text-market-mist font-medium">Risk : Reward</span>
          <span className="text-xl font-bold text-golden-edge">1 : 3</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Mobile Signal Card - Compact & Beautiful
function MobileSignalCard({ signal }: { signal: typeof demoSignals[0] }) {
  const isBuy = signal.direction === 'BUY'
  const isWin = signal.status === 'win'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={signal.asset}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "bg-chart-canvas border rounded-2xl p-4 shadow-xl",
          isWin
            ? "border-[rgba(var(--color-profit-pulse),0.4)]"
            : "border-[rgb(var(--color-border-subtle))]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br",
              isBuy
                ? "from-[rgba(var(--color-bull-run),0.2)] to-transparent"
                : "from-[rgba(var(--color-bear-strike),0.2)] to-transparent"
            )}>
              {signal.flag}
            </div>
            <div>
              <h3 className="text-lg font-bold text-clear-signal">{signal.asset}</h3>
              <div className="flex items-center gap-1">
                {isBuy ? (
                  <ArrowUpRight className="w-4 h-4 text-bull-run" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-bear-strike" />
                )}
                <span className={cn(
                  "text-sm font-semibold",
                  isBuy ? "text-bull-run" : "text-bear-strike"
                )}>
                  {signal.direction}
                </span>
              </div>
            </div>
          </div>

          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
            isWin
              ? "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse"
              : "bg-[rgba(var(--color-data-stream),0.15)] text-data-stream"
          )}>
            {isWin ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            )}
            {isWin ? 'TP Hit' : 'Active'}
          </div>
        </div>

        {/* Price Row */}
        <div className="flex gap-2">
          <div className="flex-1 bg-panel-edge rounded-xl p-3">
            <p className="text-[10px] text-market-mist mb-0.5">Entry</p>
            <p className="text-lg font-bold text-clear-signal font-mono">{signal.entry}</p>
          </div>
          <div className="flex-1 bg-[rgba(var(--color-profit-pulse),0.1)] rounded-xl p-3 border border-[rgba(var(--color-profit-pulse),0.2)]">
            <p className="text-[10px] text-profit-pulse mb-0.5">Take Profit</p>
            <p className="text-lg font-bold text-profit-pulse font-mono">{signal.tp}</p>
          </div>
          <div className="w-20 bg-[rgba(var(--color-golden-edge),0.1)] rounded-xl p-3 border border-[rgba(var(--color-golden-edge),0.2)] flex flex-col items-center justify-center">
            <p className="text-[10px] text-golden-edge mb-0.5">R:R</p>
            <p className="text-lg font-bold text-golden-edge">1:3</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}