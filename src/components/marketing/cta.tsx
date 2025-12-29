'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Zap, Shield, Clock, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const primaryBtnClass = cn(
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
    "bg-gradient-to-r from-profit-pulse to-[rgba(var(--color-profit-pulse),0.85)]",
    "text-white font-semibold text-lg",
    "shadow-xl shadow-[rgba(var(--color-profit-pulse),0.3)]",
    "hover:shadow-[rgba(var(--color-profit-pulse),0.5)]",
    "transition-all duration-300 active-scale",
    "w-full sm:w-auto"
  )

  const secondaryBtnClass = cn(
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl",
    "bg-panel-edge text-clear-signal font-semibold text-lg",
    "border border-[rgb(var(--color-border-subtle))]",
    "hover:bg-[rgb(var(--color-panel-edge))]",
    "transition-all duration-300 active-scale",
    "w-full sm:w-auto"
  )

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-chart-canvas relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgb(var(--color-profit-pulse))] rounded-full blur-[200px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.08, 0.05] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-[rgb(var(--color-golden-edge))] rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.07, 0.05] 
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[rgb(var(--color-data-stream))] rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--color-profit-pulse),0.1)] border border-[rgba(var(--color-profit-pulse),0.3)] text-profit-pulse text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Start trading smarter today
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6 leading-tight"
          >
            Ready to transform your{' '}
            <span className="text-gradient-profit">trading results?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-market-mist mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of traders who have already discovered the power of AI-driven signals. 
            Your first week is completely free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/register" className={primaryBtnClass}>
                <Zap className="w-5 h-5" />
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="#pricing" className={secondaryBtnClass}>
                View Pricing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10"
          >
            {[
              { icon: Shield, text: '30-day money back' },
              { icon: Clock, text: 'Cancel anytime' },
              { icon: Zap, text: 'Instant access' },
            ].map((item, index) => (
              <motion.div 
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 text-sm text-market-mist"
              >
                <div className="w-8 h-8 rounded-lg bg-[rgba(var(--color-profit-pulse),0.1)] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-profit-pulse" />
                </div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-[rgba(var(--color-profit-pulse),0.3)] to-transparent"
        />
      </div>
    </section>
  )
}