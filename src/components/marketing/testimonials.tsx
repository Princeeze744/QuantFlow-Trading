'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING } from '@/lib/constants'

const testimonials = [
  {
    name: 'David K.',
    role: 'Forex Trader',
    location: 'Lagos, Nigeria',
    avatar: '/avatars/david.jpg',
    content: "Finally, a signal service that actually delivers. The AI analysis is spot on, and I've seen consistent profits since joining. The transparency is what sold me - every signal is logged and verified.",
    rating: 5,
    profit: '+1,200 pips'
  },
  {
    name: 'Sarah M.',
    role: 'Part-time Trader',
    location: 'London, UK',
    avatar: '/avatars/sarah.jpg',
    content: "I was skeptical at first, but the results speak for themselves. The 4-hour schedule fits perfectly with my work. Best investment I've made in my trading journey.",
    rating: 5,
    profit: '+850 pips'
  },
  {
    name: 'Michael O.',
    role: 'Synthetics Trader',
    location: 'Accra, Ghana',
    avatar: '/avatars/michael.jpg',
    content: "The synthetics signals are incredible. Most providers ignore Volatility indices, but Quant Flow nails them consistently. The community is also super helpful.",
    rating: 5,
    profit: '+2,100 pips'
  },
  {
    name: 'James T.',
    role: 'Full-time Trader',
    location: 'Dubai, UAE',
    avatar: '/avatars/james.jpg',
    content: "Been trading for 5 years. This is the first signal service I've trusted. The risk management is solid - always 1:3 R:R. My win rate has improved significantly.",
    rating: 5,
    profit: '+3,500 pips'
  },
  {
    name: 'Amara N.',
    role: 'Beginner Trader',
    location: 'Nairobi, Kenya',
    avatar: '/avatars/amara.jpg',
    content: "As a beginner, the educational content is invaluable. I'm not just copying signals - I'm learning WHY they work. The academy courses are worth the Pro subscription alone.",
    rating: 5,
    profit: '+450 pips'
  },
  {
    name: 'Chris B.',
    role: 'Day Trader',
    location: 'New York, USA',
    avatar: '/avatars/chris.jpg',
    content: "The Telegram alerts are instant. I never miss a signal. Combined with the position calculator, it's a complete trading system. Highly recommend the VIP tier.",
    rating: 5,
    profit: '+1,800 pips'
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" ref={ref} className="py-24 lg:py-32 bg-market-depth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: MOTION.deliberate / 1000, ease: EASING.out }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[rgba(var(--color-data-stream),0.1)] text-data-stream text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6">
            Trusted by traders{' '}
            <span className="text-gradient-profit">worldwide</span>
          </h2>
          <p className="text-lg text-market-mist max-w-2xl mx-auto">
            Real results from real traders. See what our community has to say.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: MOTION.deliberate / 1000,
                ease: EASING.out,
                delay: index * 0.1
              }}
              className={cn(
                "relative p-6 lg:p-8 rounded-2xl",
                "bg-chart-canvas border border-[rgb(var(--color-border-subtle))]",
                "hover:border-[rgb(var(--color-panel-edge))] transition-all duration-300"
              )}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-panel-edge" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-golden-edge text-golden-edge" />
                ))}
              </div>

              {/* Content */}
              <p className="text-market-mist leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Profit Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(var(--color-profit-pulse),0.1)] text-profit-pulse text-sm font-medium mb-6">
                {testimonial.profit}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-[rgb(var(--color-border-subtle))]">
                <div className="w-12 h-12 rounded-full bg-panel-edge flex items-center justify-center text-lg font-bold text-market-mist">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-clear-signal">{testimonial.name}</p>
                  <p className="text-sm text-market-mist">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}