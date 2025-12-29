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
  Target,
  Brain,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Our signals are generated using advanced AI that analyzes trends, swing points, and market structure with consistent precision.',
    color: 'profit',
    badge: 'Smart'
  },
  {
    icon: Shield,
    title: 'Verified Track Record',
    description: 'Every signal is publicly logged with timestamped proof. No hiding losses. Complete transparency.',
    color: 'data',
    badge: 'Trusted'
  },
  {
    icon: Clock,
    title: 'Every 4 Hours',
    description: 'Signals delivered like clockwork. 12pm, 4pm, 8pm, 12am, 4am, 8am. Consistency builds trust.',
    color: 'gold',
    badge: 'Reliable'
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description: 'Get alerts via web, email, and Telegram the moment a new signal drops. Never miss an opportunity.',
    color: 'profit',
    badge: 'Fast'
  },
  {
    icon: Target,
    title: '1:3 Risk Reward',
    description: 'Every signal comes with precise entry, stop loss, and take profit levels. Always targeting 1:3 R:R.',
    color: 'data',
    badge: 'Precise'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track win rates, total pips, and performance by asset. Data-driven trading decisions.',
    color: 'gold',
    badge: 'Insights'
  },
  {
    icon: Calculator,
    title: 'Position Calculator',
    description: 'Built-in lot size calculator based on your account size and risk percentage. Trade smart.',
    color: 'profit',
    badge: 'Tools'
  },
  {
    icon: GraduationCap,
    title: 'Trading Academy',
    description: 'Learn why signals work. Each signal includes analysis so you become a better trader.',
    color: 'data',
    badge: 'Learn'
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join a community of serious traders. Share results, discuss strategies, grow together.',
    color: 'gold',
    badge: 'Social'
  },
]

const colorMap = {
  profit: {
    bg: 'bg-[rgba(var(--color-profit-pulse),0.08)]',
    border: 'border-[rgba(var(--color-profit-pulse),0.2)]',
    icon: 'text-profit-pulse',
    iconBg: 'from-[rgba(var(--color-profit-pulse),0.2)] to-[rgba(var(--color-profit-pulse),0.05)]',
    badge: 'bg-[rgba(var(--color-profit-pulse),0.1)] text-profit-pulse',
    glow: 'hover:shadow-[0_0_40px_rgba(var(--color-profit-pulse),0.15)]'
  },
  data: {
    bg: 'bg-[rgba(var(--color-data-stream),0.08)]',
    border: 'border-[rgba(var(--color-data-stream),0.2)]',
    icon: 'text-data-stream',
    iconBg: 'from-[rgba(var(--color-data-stream),0.2)] to-[rgba(var(--color-data-stream),0.05)]',
    badge: 'bg-[rgba(var(--color-data-stream),0.1)] text-data-stream',
    glow: 'hover:shadow-[0_0_40px_rgba(var(--color-data-stream),0.15)]'
  },
  gold: {
    bg: 'bg-[rgba(var(--color-golden-edge),0.08)]',
    border: 'border-[rgba(var(--color-golden-edge),0.2)]',
    icon: 'text-golden-edge',
    iconBg: 'from-[rgba(var(--color-golden-edge),0.2)] to-[rgba(var(--color-golden-edge),0.05)]',
    badge: 'bg-[rgba(var(--color-golden-edge),0.1)] text-golden-edge',
    glow: 'hover:shadow-[0_0_40px_rgba(var(--color-golden-edge),0.15)]'
  }
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" ref={ref} className="py-20 lg:py-32 bg-chart-canvas relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgba(var(--color-profit-pulse),0.03)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[rgba(var(--color-data-stream),0.03)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-[rgba(var(--color-profit-pulse),0.1)] text-profit-pulse text-sm font-semibold mb-6"
          >
            Features
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6 leading-tight">
            Everything you need to{' '}
            <span className="text-gradient-profit">trade with confidence</span>
          </h2>
          <p className="text-lg text-market-mist max-w-2xl mx-auto leading-relaxed">
            Professional-grade tools and insights, designed for traders who take their craft seriously.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color as keyof typeof colorMap]
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05
                }}
                className={cn(
                  "group relative p-6 lg:p-8 rounded-2xl",
                  "bg-market-depth border border-[rgb(var(--color-border-subtle))]",
                  "transition-all duration-300",
                  "hover:border-[rgba(var(--color-border-subtle),1.5)]",
                  colors.glow
                )}
              >
                {/* Badge */}
                <span className={cn(
                  "absolute top-4 right-4 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide",
                  colors.badge
                )}>
                  {feature.badge}
                </span>

                {/* Icon */}
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-5",
                    "bg-gradient-to-br",
                    colors.iconBg,
                    "border",
                    colors.border
                  )}
                >
                  <feature.icon className={cn("w-7 h-7", colors.icon)} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-clear-signal mb-2 group-hover:text-profit-pulse transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-market-mist leading-relaxed">
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[rgba(var(--color-profit-pulse),0.1)] to-[rgba(var(--color-profit-pulse),0.02)] border border-[rgba(var(--color-profit-pulse),0.2)] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(var(--color-profit-pulse),0.1)] rounded-full blur-3xl" />
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6">
                {[
                  { icon: CheckCircle2, text: 'No credit card required' },
                  { icon: CheckCircle2, text: 'Free tier available' },
                  { icon: CheckCircle2, text: 'Cancel anytime' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-profit-pulse">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-profit-pulse text-white font-semibold shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)] hover:shadow-[rgba(var(--color-profit-pulse),0.5)] transition-all"
                >
                  Get Started Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}