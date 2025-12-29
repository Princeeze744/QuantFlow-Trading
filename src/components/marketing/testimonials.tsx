'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, TrendingUp, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'David K.',
    role: 'Forex Trader',
    location: 'Lagos, Nigeria',
    content: "Finally, a signal service that actually delivers. The AI analysis is spot on, and I've seen consistent profits since joining. The transparency is what sold me.",
    rating: 5,
    profit: '+1,200 pips',
    color: 'profit'
  },
  {
    name: 'Sarah M.',
    role: 'Part-time Trader',
    location: 'London, UK',
    content: "I was skeptical at first, but the results speak for themselves. The 4-hour schedule fits perfectly with my work. Best investment I've made.",
    rating: 5,
    profit: '+850 pips',
    color: 'data'
  },
  {
    name: 'Michael O.',
    role: 'Synthetics Trader',
    location: 'Accra, Ghana',
    content: "The synthetics signals are incredible. Most providers ignore Volatility indices, but Quant Flow nails them consistently. The community is super helpful.",
    rating: 5,
    profit: '+2,100 pips',
    color: 'gold'
  },
  {
    name: 'James T.',
    role: 'Full-time Trader',
    location: 'Dubai, UAE',
    content: "Been trading for 5 years. This is the first signal service I've trusted. The risk management is solid - always 1:3 R:R. My win rate improved significantly.",
    rating: 5,
    profit: '+3,500 pips',
    color: 'profit'
  },
  {
    name: 'Amara N.',
    role: 'Beginner Trader',
    location: 'Nairobi, Kenya',
    content: "As a beginner, the educational content is invaluable. I'm not just copying signals - I'm learning WHY they work. The academy is worth it alone.",
    rating: 5,
    profit: '+450 pips',
    color: 'data'
  },
  {
    name: 'Chris B.',
    role: 'Day Trader',
    location: 'New York, USA',
    content: "The Telegram alerts are instant. I never miss a signal. Combined with the position calculator, it's a complete trading system. Highly recommend VIP.",
    rating: 5,
    profit: '+1,800 pips',
    color: 'gold'
  },
]

const colorMap = {
  profit: {
    gradient: 'from-[rgba(var(--color-profit-pulse),0.15)] to-transparent',
    badge: 'bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse',
    border: 'hover:border-[rgba(var(--color-profit-pulse),0.3)]',
    glow: 'hover:shadow-[0_0_30px_rgba(var(--color-profit-pulse),0.1)]'
  },
  data: {
    gradient: 'from-[rgba(var(--color-data-stream),0.15)] to-transparent',
    badge: 'bg-[rgba(var(--color-data-stream),0.15)] text-data-stream',
    border: 'hover:border-[rgba(var(--color-data-stream),0.3)]',
    glow: 'hover:shadow-[0_0_30px_rgba(var(--color-data-stream),0.1)]'
  },
  gold: {
    gradient: 'from-[rgba(var(--color-golden-edge),0.15)] to-transparent',
    badge: 'bg-[rgba(var(--color-golden-edge),0.15)] text-golden-edge',
    border: 'hover:border-[rgba(var(--color-golden-edge),0.3)]',
    glow: 'hover:shadow-[0_0_30px_rgba(var(--color-golden-edge),0.1)]'
  }
}

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 bg-market-depth relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[rgba(var(--color-profit-pulse),0.03)] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[rgba(var(--color-data-stream),0.03)] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--color-data-stream),0.1)] text-data-stream text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4 fill-current" />
            Testimonials
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6 leading-tight">
            Trusted by traders{' '}
            <span className="text-gradient-profit">worldwide</span>
          </h2>
          <p className="text-lg text-market-mist max-w-2xl mx-auto">
            Real results from real traders. See what our community has to say.
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.name} 
                testimonial={testimonial} 
                index={index}
                isInView={isInView}
                isMobile
              />
            ))}
          </div>
          {/* Scroll Hint */}
          <p className="text-center text-xs text-distant-data mt-2">
            ← Swipe to see more →
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 lg:mt-16 grid grid-cols-3 gap-4 lg:gap-8 p-6 rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))]"
        >
          {[
            { value: '2,500+', label: 'Active Traders' },
            { value: '78.5%', label: 'Avg Win Rate' },
            { value: '15,000+', label: 'Pips Generated' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-profit-pulse">{stat.value}</p>
              <p className="text-xs lg:text-sm text-market-mist">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ 
  testimonial, 
  index, 
  isInView,
  isMobile = false 
}: { 
  testimonial: typeof testimonials[0]
  index: number
  isInView: boolean
  isMobile?: boolean
}) {
  const colors = colorMap[testimonial.color as keyof typeof colorMap]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: isMobile ? 0 : index * 0.1 }}
      className={cn(
        "relative flex flex-col p-5 lg:p-6 rounded-2xl",
        "bg-chart-canvas border border-[rgb(var(--color-border-subtle))]",
        "transition-all duration-300",
        colors.border,
        colors.glow,
        isMobile && "flex-shrink-0 w-[300px] snap-center"
      )}
    >
      {/* Gradient Accent */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r",
        colors.gradient
      )} />

      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 w-6 h-6 text-panel-edge opacity-50" />

      {/* Rating */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-golden-edge text-golden-edge" />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-market-mist leading-relaxed mb-4 flex-1">
        "{testimonial.content}"
      </p>

      {/* Profit Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold", colors.badge)}>
          <TrendingUp className="w-3.5 h-3.5" />
          {testimonial.profit}
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[rgb(var(--color-border-subtle))]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-panel-edge to-chart-canvas flex items-center justify-center text-sm font-bold text-clear-signal border border-[rgb(var(--color-border-subtle))]">
          {testimonial.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-clear-signal text-sm truncate">{testimonial.name}</p>
          <div className="flex items-center gap-1 text-xs text-market-mist">
            <span>{testimonial.role}</span>
            <span>•</span>
            <MapPin className="w-3 h-3" />
            <span className="truncate">{testimonial.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}