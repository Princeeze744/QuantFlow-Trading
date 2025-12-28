'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING } from '@/lib/constants'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  variant?: 'default' | 'profit' | 'loss' | 'info' | 'gold'
}

export function StatsCard({ 
  title, 
  value, 
  subtitle,
  icon: Icon, 
  trend,
  variant = 'default' 
}: StatsCardProps) {
  
  const variantStyles = {
    default: {
      iconBg: 'bg-panel-edge',
      iconColor: 'text-market-mist',
    },
    profit: {
      iconBg: 'bg-[rgba(var(--color-profit-pulse),0.15)]',
      iconColor: 'text-profit-pulse',
    },
    loss: {
      iconBg: 'bg-[rgba(var(--color-bear-strike),0.15)]',
      iconColor: 'text-bear-strike',
    },
    info: {
      iconBg: 'bg-[rgba(var(--color-data-stream),0.15)]',
      iconColor: 'text-data-stream',
    },
    gold: {
      iconBg: 'bg-[rgba(var(--color-golden-edge),0.15)]',
      iconColor: 'text-golden-edge',
    },
  }

  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: MOTION.deliberate / 1000,
        ease: EASING.out 
      }}
      className={cn(
        "relative overflow-hidden rounded-lg p-6",
        "bg-chart-canvas border border-[rgb(var(--color-border-subtle))]",
        "transition-smooth hover:border-[rgb(var(--color-panel-edge))]"
      )}
    >
      <div className="flex items-start justify-between">
        {/* Content */}
        <div className="flex-1">
          <p className="text-sm text-market-mist mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <motion.span 
              className="text-3xl font-bold text-clear-signal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: MOTION.reveal / 1000,
                ease: EASING.spring,
                delay: 0.1
              }}
            >
              {value}
            </motion.span>
            
            {/* Trend Indicator */}
            {trend && (
              <span className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-profit-pulse" : "text-bear-strike"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          
          {subtitle && (
            <p className="text-sm text-distant-data mt-1">{subtitle}</p>
          )}
        </div>

        {/* Icon */}
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-lg",
          styles.iconBg
        )}>
          <Icon className={cn("w-6 h-6", styles.iconColor)} />
        </div>
      </div>

      {/* Subtle Gradient Overlay */}
      {variant !== 'default' && (
        <div className={cn(
          "absolute inset-0 opacity-5 pointer-events-none",
          variant === 'profit' && "bg-gradient-to-br from-[rgb(var(--color-profit-pulse))] to-transparent",
          variant === 'loss' && "bg-gradient-to-br from-[rgb(var(--color-bear-strike))] to-transparent",
          variant === 'info' && "bg-gradient-to-br from-[rgb(var(--color-data-stream))] to-transparent",
          variant === 'gold' && "bg-gradient-to-br from-[rgb(var(--color-golden-edge))] to-transparent"
        )} />
      )}
    </motion.div>
  )
}