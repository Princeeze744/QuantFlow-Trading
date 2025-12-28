'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check, X, Crown, Zap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING, TIER_FEATURES } from '@/lib/constants'

const tiers = [
  {
    key: 'FREE',
    name: 'Free',
    price: 0,
    description: 'Get started with delayed signals',
    features: [
      { text: 'Delayed signals (4-6 hours)', included: true },
      { text: 'Limited signal history (7 days)', included: true },
      { text: 'Basic performance stats', included: true },
      { text: 'Email support', included: true },
      { text: 'Real-time signals', included: false },
      { text: 'Telegram alerts', included: false },
      { text: 'Position calculator', included: false },
      { text: 'Community access', included: false },
    ],
    cta: 'Start Free',
    popular: false,
    icon: null
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
      { text: 'Position calculator', included: false },
      { text: 'Community access', included: false },
    ],
    cta: 'Get Basic',
    popular: false,
    icon: Zap
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
      { text: '1-on-1 coaching', included: false },
      { text: 'Early signal access', included: false },
    ],
    cta: 'Get Pro',
    popular: true,
    icon: Star
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
      { text: 'Custom trade setups', included: true },
      { text: 'VIP Discord channel', included: true },
      { text: 'Lifetime updates', included: true },
    ],
    cta: 'Get VIP',
    popular: false,
    icon: Crown
  },
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const getPrice = (price: number) => {
    if (billingPeriod === 'yearly') {
      return Math.floor(price * 10) // 2 months free
    }
    return price
  }

  return (
    <section id="pricing" ref={ref} className="py-24 lg:py-32 bg-chart-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: MOTION.deliberate / 1000, ease: EASING.out }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[rgba(var(--color-golden-edge),0.1)] text-golden-edge text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6">
            Choose your{' '}
            <span className="text-gradient-gold">trading edge</span>
          </h2>
          <p className="text-lg text-market-mist max-w-2xl mx-auto mb-8">
            Start free, upgrade when you're ready. All plans include our core signal technology.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-xl bg-panel-edge">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-swift",
                billingPeriod === 'monthly'
                  ? "bg-profit-pulse text-white"
                  : "text-market-mist hover:text-clear-signal"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-swift flex items-center gap-2",
                billingPeriod === 'yearly'
                  ? "bg-profit-pulse text-white"
                  : "text-market-mist hover:text-clear-signal"
              )}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-golden-edge/20 text-golden-edge text-xs">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: MOTION.deliberate / 1000,
                ease: EASING.out,
                delay: index * 0.1
              }}
              className={cn(
                "relative flex flex-col rounded-2xl",
                "border transition-all duration-300",
                tier.popular
                  ? "bg-[rgba(var(--color-profit-pulse),0.05)] border-profit-pulse scale-105 lg:scale-110 z-10"
                  : "bg-market-depth border-[rgb(var(--color-border-subtle))] hover:border-[rgb(var(--color-panel-edge))]"
              )}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-profit-pulse text-white text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 lg:p-8 flex-1">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {tier.icon && (
                      <tier.icon className={cn(
                        "w-5 h-5",
                        tier.key === 'VIP' ? "text-golden-edge" : "text-profit-pulse"
                      )} />
                    )}
                    <h3 className="text-xl font-bold text-clear-signal">{tier.name}</h3>
                  </div>
                  <p className="text-sm text-market-mist">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-clear-signal">
                      ${getPrice(tier.price)}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-market-mist">
                        /{billingPeriod === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && tier.price > 0 && (
                    <p className="text-sm text-profit-pulse mt-1">
                      ${tier.price}/mo billed yearly
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-profit-pulse flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-distant-data flex-shrink-0 mt-0.5" />
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
              </div>

              {/* CTA */}
              <div className="p-6 lg:p-8 pt-0">
                <Link
                  href={tier.price === 0 ? "/register" : `/register?plan=${tier.key.toLowerCase()}`}
                  className={cn(
                    "block w-full py-3 px-6 rounded-xl text-center font-semibold transition-swift",
                    tier.popular
                      ? "bg-profit-pulse text-white hover:opacity-90 glow-profit"
                      : tier.key === 'VIP'
                        ? "bg-golden-edge text-market-depth hover:opacity-90"
                        : "bg-panel-edge text-clear-signal hover:bg-[rgb(var(--color-border-subtle))]"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: MOTION.deliberate / 1000, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-market-mist">
            🔒 30-day money-back guarantee. No questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  )
}