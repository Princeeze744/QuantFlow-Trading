'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  TrendingUp,
  Shield,
  Clock,
  Bell,
  BarChart3,
  Users,
  Calculator,
  GraduationCap,
  Zap,
  Target,
  Brain,
  CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING } from '@/lib/constants'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Our signals are generated using advanced AI that analyzes trends, swing points, and market structure with consistent precision.',
    color: 'profit'
  },
  {
    icon: Shield,
    title: 'Verified Track Record',
    description: 'Every signal is publicly logged with timestamped proof. No hiding losses. Complete transparency.',
    color: 'data'
  },
  {
    icon: Clock,
    title: 'Every 4 Hours',
    description: 'Signals delivered like clockwork. 12pm, 4pm, 8pm, 12am, 4am, 8am. Consistency builds trust.',
    color: 'gold'
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description: 'Get alerts via web, email, and Telegram the moment a new signal drops. Never miss an opportunity.',
    color: 'profit'
  },
  {
    icon: Target,
    title: '1:3 Risk Reward',
    description: 'Every signal comes with precise entry, stop loss, and take profit levels. Always targeting 1:3 R:R.',
    color: 'data'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track win rates, total pips, and performance by asset. Data-driven trading decisions.',
    color: 'gold'
  },
  {
    icon: Calculator,
    title: 'Position Calculator',
    description: 'Built-in lot size calculator based on your account size and risk percentage. Trade smart.',
    color: 'profit'
  },
  {
    icon: GraduationCap,
    title: 'Trading Academy',
    description: 'Learn why signals work. Each signal includes analysis so you become a better trader.',
    color: 'data'
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join a community of serious traders. Share results, discuss strategies, grow together.',
    color: 'gold'
  },
]

const colorMap = {
  profit: {
    bg: 'bg-[rgba(var(--color-profit-pulse),0.1)]',
    border: 'border-[rgba(var(--color-profit-pulse),0.3)]',
    icon: 'text-profit-pulse',
    glow: 'group-hover:shadow-[0_0_30px_rgba(var(--color-profit-pulse),0.2)]'
  },
  data: {
    bg: 'bg-[rgba(var(--color-data-stream),0.1)]',
    border: 'border-[rgba(var(--color-data-stream),0.3)]',
    icon: 'text-data-stream',
    glow: 'group-hover:shadow-[0_0_30px_rgba(var(--color-data-stream),0.2)]'
  },
  gold: {
    bg: 'bg-[rgba(var(--color-golden-edge),0.1)]',
    border: 'border-[rgba(var(--color-golden-edge),0.3)]',
    icon: 'text-golden-edge',
    glow: 'group-hover:shadow-[0_0_30px_rgba(var(--color-golden-edge),0.2)]'
  }
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" ref={ref} className="py-24 lg:py-32 bg-market-depth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: MOTION.deliberate / 1000, ease: EASING.out }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[rgba(var(--color-profit-pulse),0.1)] text-profit-pulse text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6">
            Everything you need to{' '}
            <span className="text-gradient-profit">trade with confidence</span>
          </h2>
          <p className="text-lg text-market-mist max-w-2xl mx-auto">
            Professional-grade tools and insights, designed for traders who take their craft seriously.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color as keyof typeof colorMap]
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: MOTION.deliberate / 1000,
                  ease: EASING.out,
                  delay: index * 0.05
                }}
                className={cn(
                  "group relative p-6 lg:p-8 rounded-2xl",
                  "bg-chart-canvas border border-[rgb(var(--color-border-subtle))]",
                  "transition-all duration-300",
                  "hover:border-[rgb(var(--color-panel-edge))]",
                  colors.glow
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                  colors.bg,
                  "border",
                  colors.border
                )}>
                  <feature.icon className={cn("w-7 h-7", colors.icon)} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-clear-signal mb-3">
                  {feature.title}
                </h3>
                <p className="text-market-mist leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: MOTION.deliberate / 1000, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))]">
            <div className="flex items-center gap-2 text-profit-pulse">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-[rgb(var(--color-border-subtle))]" />
            <div className="flex items-center gap-2 text-profit-pulse">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Free tier available</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-[rgb(var(--color-border-subtle))]" />
            <div className="flex items-center gap-2 text-profit-pulse">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}