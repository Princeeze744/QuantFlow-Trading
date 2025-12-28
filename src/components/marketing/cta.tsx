'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Zap, Shield, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING } from '@/lib/constants'

export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-chart-canvas relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgb(var(--color-profit-pulse))] opacity-10 blur-[200px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: MOTION.deliberate / 1000, ease: EASING.out }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--color-profit-pulse),0.1)] border border-[rgba(var(--color-profit-pulse),0.3)] text-profit-pulse text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Start trading smarter today
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6">
            Ready to transform your{' '}
            <span className="text-gradient-profit">trading results?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-market-mist mb-10 max-w-2xl mx-auto">
            Join thousands of traders who have already discovered the power of AI-driven signals. 
            Your first week is completely free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/register"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
                "bg-profit-pulse text-white font-semibold text-lg",
                "hover:opacity-90 transition-swift",
                "glow-profit",
                "w-full sm:w-auto"
              )}
            >
              Get Started Free
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="#pricing"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
                "bg-panel-edge text-clear-signal font-semibold text-lg",
                "hover:bg-[rgb(var(--color-border-subtle))] transition-swift",
                "border border-[rgb(var(--color-border-subtle))]",
                "w-full sm:w-auto"
              )}
            >
              View Pricing
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-market-mist">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-profit-pulse" />
              <span>30-day money back</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-profit-pulse" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-profit-pulse" />
              <span>Instant access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}