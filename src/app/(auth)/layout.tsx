'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Zap, ArrowLeft } from 'lucide-react'

const stats = [
  { value: '78.5%', label: 'Win Rate', icon: TrendingUp, color: 'profit-pulse' },
  { value: '2,450+', label: 'Pips/Month', icon: Zap, color: 'golden-edge' },
  { value: '2,500+', label: 'Traders', icon: Shield, color: 'data-stream' },
]

const testimonial = {
  quote: "Finally, a signal service that actually delivers. The transparency is what sold me.",
  author: "David K.",
  role: "Forex Trader"
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-market-depth flex">
      {/* ===== LEFT PANEL (Desktop Only) ===== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgb(var(--color-profit-pulse)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-profit-pulse)) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15] 
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[rgb(var(--color-profit-pulse))] rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.15, 0.1] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-[rgb(var(--color-data-stream))] rounded-full blur-[150px]" 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-12 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-profit-pulse to-[rgba(var(--color-profit-pulse),0.7)] flex items-center justify-center shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)]"
              >
                <span className="text-white font-bold text-xl">QF</span>
              </motion.div>
              <div>
                <span className="text-2xl font-bold text-clear-signal block leading-tight">Quant Flow</span>
                <span className="text-[10px] text-profit-pulse font-semibold uppercase tracking-wider">Trading</span>
              </div>
            </Link>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-lg"
          >
            <h1 className="text-4xl xl:text-5xl font-bold text-clear-signal mb-6 leading-tight">
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
            </h1>
            <p className="text-lg text-market-mist leading-relaxed mb-8">
              Join thousands of traders receiving AI-powered signals every 4 hours. 
              Verified results. Transparent track record.
            </p>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 rounded-2xl bg-chart-canvas/50 border border-[rgb(var(--color-border-subtle))] backdrop-blur-sm"
            >
              <p className="text-market-mist italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-profit-pulse/20 to-profit-pulse/5 flex items-center justify-center text-sm font-bold text-profit-pulse">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-clear-signal">{testimonial.author}</p>
                  <p className="text-xs text-market-mist">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-8 xl:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/15 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-market-mist">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== RIGHT PANEL (Form) ===== */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen min-h-[100dvh]">
        {/* Mobile Header */}
        <div className="lg:hidden safe-top">
          <div className="flex items-center justify-between p-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-market-mist hover:text-clear-signal transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>

        {/* Mobile Safe Area */}
        <div className="safe-bottom" />
      </div>
    </div>
  )
}