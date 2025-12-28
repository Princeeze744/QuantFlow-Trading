'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MOTION, EASING } from '@/lib/constants'

const stats = [
  { value: 78.5, suffix: '%', label: 'Win Rate', prefix: '' },
  { value: 2450, suffix: '+', label: 'Pips This Month', prefix: '' },
  { value: 500, suffix: '+', label: 'Active Traders', prefix: '' },
  { value: 4, suffix: 'hrs', label: 'Signal Frequency', prefix: 'Every ' },
]

export function StatsBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 bg-chart-canvas border-y border-[rgb(var(--color-border-subtle))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: MOTION.deliberate / 1000,
                ease: EASING.out,
                delay: index * 0.1
              }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-2">
                {stat.prefix}
                {isInView ? (
                  <AnimatedNumber value={stat.value} />
                ) : (
                  '0'
                )}
                <span className="text-profit-pulse">{stat.suffix}</span>
              </div>
              <p className="text-market-mist text-sm sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1500 // ms
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  // Format based on value type
  if (value % 1 !== 0) {
    return <>{displayValue.toFixed(1)}</>
  }
  return <>{Math.floor(displayValue).toLocaleString()}</>
}