'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  PlayCircle,
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Target,
  Shield,
  Zap,
  Star
} from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'Trading Fundamentals',
    description: 'Learn the basics of forex and synthetic trading',
    lessons: 8,
    duration: '2 hours',
    icon: BookOpen,
    color: 'data-stream',
    free: true,
    progress: 100,
  },
  {
    id: 2,
    title: 'Technical Analysis',
    description: 'Master chart patterns and indicators',
    lessons: 12,
    duration: '4 hours',
    icon: TrendingUp,
    color: 'profit-pulse',
    free: true,
    progress: 60,
  },
  {
    id: 3,
    title: 'Risk Management',
    description: 'Protect your capital like a pro',
    lessons: 6,
    duration: '1.5 hours',
    icon: Shield,
    color: 'golden-edge',
    free: true,
    progress: 0,
  },
  {
    id: 4,
    title: 'Signal Execution',
    description: 'How to execute our signals effectively',
    lessons: 5,
    duration: '1 hour',
    icon: Target,
    color: 'profit-pulse',
    free: false,
    progress: 0,
  },
  {
    id: 5,
    title: 'Advanced Strategies',
    description: 'Take your trading to the next level',
    lessons: 10,
    duration: '3 hours',
    icon: Zap,
    color: 'golden-edge',
    free: false,
    progress: 0,
  },
]

const quickTips = [
  {
    title: 'Always use stop loss',
    description: 'Never enter a trade without a defined exit point.',
  },
  {
    title: 'Risk 1-2% per trade',
    description: 'Protect your account from large drawdowns.',
  },
  {
    title: 'Follow the 1:3 R:R',
    description: 'Our signals target 1:3 risk-reward ratio.',
  },
]

export default function AcademyPage() {
  const { profile } = useUser()
  const tier = profile?.tier || 'FREE'
  const hasProAccess = tier !== 'FREE'

  const completedCourses = courses.filter(c => c.progress === 100).length
  const totalProgress = Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-clear-signal mb-1">Trading Academy</h1>
        <p className="text-market-mist text-sm">Learn to trade like a pro</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl bg-gradient-to-br from-profit-pulse/10 to-transparent border border-profit-pulse/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-market-mist mb-1">Your Progress</p>
            <p className="text-2xl font-bold text-clear-signal">{completedCourses}/{courses.length} Courses</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-profit-pulse/15 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-profit-pulse" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-panel-edge overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-profit-pulse to-golden-edge"
          />
        </div>
        <p className="text-xs text-market-mist mt-2">{totalProgress}% complete</p>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xs font-bold text-distant-data uppercase tracking-wide mb-3 px-1">
          Quick Tips
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
          {quickTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex-shrink-0 w-[260px] p-4 rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))]"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-golden-edge/15 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-golden-edge" />
                </div>
                <div>
                  <p className="font-semibold text-clear-signal text-sm mb-1">{tip.title}</p>
                  <p className="text-xs text-market-mist">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Courses */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xs font-bold text-distant-data uppercase tracking-wide mb-3 px-1">
          Courses
        </h3>
        <div className="space-y-3">
          {courses.map((course, index) => {
            const isLocked = !course.free && !hasProAccess
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={cn(
                  "p-4 rounded-2xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))] transition-all",
                  isLocked ? "opacity-70" : "hover:border-[rgba(var(--color-border-subtle),1.5)]"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-${course.color}/15 flex items-center justify-center flex-shrink-0`}>
                    {isLocked ? (
                      <Lock className="w-6 h-6 text-distant-data" />
                    ) : (
                      <course.icon className={`w-6 h-6 text-${course.color}`} />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-clear-signal">{course.title}</h4>
                      {course.progress === 100 && (
                        <CheckCircle2 className="w-5 h-5 text-profit-pulse flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-market-mist mb-3">{course.description}</p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-distant-data">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-3.5 h-3.5" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      {!course.free && (
                        <span className="px-2 py-0.5 rounded bg-golden-edge/15 text-golden-edge font-semibold">
                          PRO
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {course.progress > 0 && course.progress < 100 && (
                      <div className="mt-3">
                        <div className="h-1.5 rounded-full bg-panel-edge overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-profit-pulse"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-market-mist mt-1">{course.progress}% complete</p>
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <ChevronRight className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isLocked ? "text-distant-data" : "text-market-mist"
                  )} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Upgrade CTA (for free users) */}
      {!hasProAccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/#pricing"
            className="block p-5 rounded-2xl bg-gradient-to-br from-golden-edge/15 to-transparent border border-golden-edge/20 hover:border-golden-edge/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-golden-edge/15 flex items-center justify-center">
                <Zap className="w-6 h-6 text-golden-edge" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-clear-signal">Unlock All Courses</p>
                <p className="text-xs text-market-mist">Upgrade to Pro for full academy access</p>
              </div>
              <ChevronRight className="w-5 h-5 text-golden-edge" />
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  )
}