'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check, X, Crown, Zap, Star, Sparkles, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const tiers = [
  {
    key: 'FREE',
    name: 'Free',
    price: 0,
    description: 'Get started with delayed signals',
    features: [
      { text: 'Delayed signals (4-6 hours)', included: true },
      { text: 'Limited signal history', included: true },
      { text: 'Basic performance stats', included: true },
      { text: 'Email support', included: true },
      { text: 'Real-time signals', included: false },
      { text: 'Telegram alerts', included: false },
    ],
    cta: 'Start Free',
    popular: false,
    icon: null,
    color: 'default'
  },
  {
    key: 'BASIC',
    name: 'Basic',
    price: 29,
    description: 'Real-time signals for serious traders',
    features: [
      { text: 'Real-time signals', included: true },
      { text: 'Full signal history', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Performance analytics', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Telegram alerts', included: false },
    ],
    cta: 'Get Basic',
    popular: false,
    icon: Zap,
    color: 'data'
  },
  {
    key: 'PRO',
    name: 'Pro',
    price: 79,
    description: 'Full toolkit for professional traders',
    features: [
      { text: 'Everything in Basic', included: true },
      { text: 'Telegram instant alerts', included: true },
      { text: 'Position size calculator', included: true },
      { text: 'Community chat access', included: true },
      { text: 'Signal analysis & reasoning', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Get Pro',
    popular: true,
    icon: Star,
    color: 'profit'
  },
  {
    key: 'VIP',
    name: 'VIP',
    price: 199,
    description: 'The ultimate trading experience',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: '1-on-1 coaching calls', included: true },
      { text: 'Early access to signals', included: true },
      { text: 'Exclusive market insights', included: true },
      { text: 'Direct line to analyst', included: true },
      { text: 'VIP Discord channel', included: true },
    ],
    cta: 'Get VIP',
    popular: false,
    icon: Crown,
    color: 'gold'
  },
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const getPrice = (price: number) => {
    if (billingPeriod === 'yearly') {
      return Math.floor(price * 10)
    }
    return price
  }

  return (
    <section id="pricing" ref={ref} className="py-20 lg:py-32 bg-chart-canvas relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[rgba(var(--color-profit-pulse),0.03)] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-14"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--color-golden-edge),0.1)] text-golden-edge text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Pricing
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6 leading-tight">
            Choose your{' '}
            <span className="text-gradient-gold">trading edge</span>
          </h2>
          <p className="text-lg text-market-mist max-w-2xl mx-auto mb-8">
            Start free, upgrade when you're ready. All plans include our core signal technology.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-panel-edge">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                billingPeriod === 'monthly'
                  ? "bg-profit-pulse text-white shadow-lg"
                  : "text-market-mist hover:text-clear-signal"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                billingPeriod === 'yearly'
                  ? "bg-profit-pulse text-white shadow-lg"
                  : "text-market-mist hover:text-clear-signal"
              )}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-golden-edge/20 text-golden-edge text-[10px] font-bold">
                -17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {tiers.map((tier, index) => (
              <PricingCard 
                key={tier.key} 
                tier={tier} 
                index={index}
                isInView={isInView}
                billingPeriod={billingPeriod}
                getPrice={getPrice}
                isMobile
              />
            ))}
          </div>
          <p className="text-center text-xs text-distant-data mt-2">
            ← Swipe to compare plans →
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {tiers.map((tier, index) => (
            <PricingCard 
              key={tier.key} 
              tier={tier} 
              index={index}
              isInView={isInView}
              billingPeriod={billingPeriod}
              getPrice={getPrice}
            />
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 lg:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-market-mist"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-profit-pulse" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-profit-pulse" />
            <span>Instant access after payment</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PricingCard({ 
  tier, 
  index, 
  isInView,
  billingPeriod,
  getPrice,
  isMobile = false
}: { 
  tier: typeof tiers[0]
  index: number
  isInView: boolean
  billingPeriod: 'monthly' | 'yearly'
  getPrice: (price: number) => number
  isMobile?: boolean
}) {
  const ctaClass = cn(
    "block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all duration-200 active-scale",
    tier.popular
      ? "bg-gradient-to-r from-profit-pulse to-[rgba(var(--color-profit-pulse),0.85)] text-white shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)]"
      : tier.key === 'VIP'
        ? "bg-gradient-to-r from-golden-edge to-[rgba(var(--color-golden-edge),0.85)] text-market-depth shadow-lg shadow-[rgba(var(--color-golden-edge),0.3)]"
        : "bg-panel-edge text-clear-signal hover:bg-[rgb(var(--color-border-subtle))]"
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: isMobile ? 0 : index * 0.1 }}
      className={cn(
        "relative flex flex-col rounded-2xl border transition-all duration-300",
        tier.popular
          ? "bg-gradient-to-b from-[rgba(var(--color-profit-pulse),0.08)] to-transparent border-profit-pulse shadow-xl shadow-[rgba(var(--color-profit-pulse),0.1)] lg:scale-105 z-10"
          : "bg-market-depth border-[rgb(var(--color-border-subtle))] hover:border-[rgba(var(--color-border-subtle),1.5)]",
        isMobile && "flex-shrink-0 w-[280px] snap-center"
      )}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <span className="px-4 py-1.5 rounded-full bg-profit-pulse text-white text-xs font-bold shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="p-5 lg:p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            {tier.icon && (
              <tier.icon className={cn(
                "w-5 h-5",
                tier.key === 'VIP' ? "text-golden-edge" : 
                tier.key === 'PRO' ? "text-profit-pulse" : "text-data-stream"
              )} />
            )}
            <h3 className="text-lg font-bold text-clear-signal">{tier.name}</h3>
          </div>
          <p className="text-xs text-market-mist">{tier.description}</p>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl lg:text-4xl font-bold text-clear-signal">
              ${getPrice(tier.price)}
            </span>
            {tier.price > 0 && (
              <span className="text-sm text-market-mist">
                /{billingPeriod === 'yearly' ? 'yr' : 'mo'}
              </span>
            )}
          </div>
          {billingPeriod === 'yearly' && tier.price > 0 && (
            <p className="text-xs text-profit-pulse mt-1">
              ${tier.price}/mo billed yearly
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {feature.included ? (
                <div className="w-5 h-5 rounded-full bg-[rgba(var(--color-profit-pulse),0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-profit-pulse" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-panel-edge flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-distant-data" />
                </div>
              )}
              <span className={cn(
                "text-sm",
                feature.included ? "text-market-mist" : "text-distant-data"
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={tier.price === 0 ? "/register" : `/register?plan=${tier.key.toLowerCase()}`}
          className={ctaClass}
        >
          {tier.cta}
        </Link>
      </div>
    </motion.div>
  )
}