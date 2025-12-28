'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  PlusCircle, 
  TrendingUp, 
  Users, 
  BarChart3,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { useSignals } from '@/hooks/use-signals'
import { cn } from '@/lib/utils'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function AdminDashboard() {
  const { signals } = useSignals()
  
  const activeSignals = signals.filter(s => s.status === 'ACTIVE')
  const totalSignals = signals.length
  const wonSignals = signals.filter(s => s.status === 'TP_HIT').length
  const lostSignals = signals.filter(s => s.status === 'SL_HIT').length
  const winRate = totalSignals > 0 ? ((wonSignals / (wonSignals + lostSignals || 1)) * 100).toFixed(1) : '0'
  const totalPips = signals.reduce((sum, s) => sum + (s.result_pips || 0), 0)

  const quickActions = [
    { href: '/admin/signals/new', icon: PlusCircle, label: 'New Signal', color: 'profit' },
    { href: '/admin/signals', icon: TrendingUp, label: 'Manage Signals', color: 'data' },
    { href: '/admin/users', icon: Users, label: 'Users', color: 'gold' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics', color: 'data' },
  ]

  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-clear-signal mb-2">Admin Dashboard</h1>
        <p className="text-market-mist">Manage your trading signals platform</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link key={action.href} href={action.href}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "p-6 rounded-xl border cursor-pointer transition-all duration-300",
                "bg-chart-canvas border-[rgb(var(--color-border-subtle))]",
                "hover:border-profit-pulse hover:shadow-[0_0_30px_rgba(var(--color-profit-pulse),0.15)]"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                action.color === 'profit' && "bg-[rgba(var(--color-profit-pulse),0.15)]",
                action.color === 'data' && "bg-[rgba(var(--color-data-stream),0.15)]",
                action.color === 'gold' && "bg-[rgba(var(--color-golden-edge),0.15)]"
              )}>
                <action.icon className={cn(
                  "w-6 h-6",
                  action.color === 'profit' && "text-profit-pulse",
                  action.color === 'data' && "text-data-stream",
                  action.color === 'gold' && "text-golden-edge"
                )} />
              </div>
              <h3 className="text-lg font-semibold text-clear-signal">{action.label}</h3>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Signals"
          value={activeSignals.length}
          icon={Zap}
          color="profit"
        />
        <StatCard
          title="Win Rate"
          value={`${winRate}%`}
          icon={Target}
          color="gold"
        />
        <StatCard
          title="Total Pips"
          value={totalPips > 0 ? `+${totalPips}` : totalPips}
          icon={totalPips >= 0 ? ArrowUpRight : ArrowDownRight}
          color={totalPips >= 0 ? 'profit' : 'loss'}
        />
        <StatCard
          title="Total Signals"
          value={totalSignals}
          icon={TrendingUp}
          color="data"
        />
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={item}>
        <div className="bg-chart-canvas rounded-xl border border-[rgb(var(--color-border-subtle))] overflow-hidden">
          <div className="p-4 border-b border-[rgb(var(--color-border-subtle))] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-clear-signal">Recent Signals</h2>
            <Link href="/admin/signals" className="text-sm text-profit-pulse hover:underline">View all</Link>
          </div>
          
          {signals.length > 0 ? (
            <div className="divide-y divide-[rgb(var(--color-border-subtle))]">
              {signals.slice(0, 5).map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 flex items-center justify-between hover:bg-panel-edge transition-swift"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      signal.direction === 'BUY' 
                        ? "bg-[rgba(var(--color-bull-run),0.15)]"
                        : "bg-[rgba(var(--color-bear-strike),0.15)]"
                    )}>
                      {signal.direction === 'BUY' ? (
                        <ArrowUpRight className="w-5 h-5 text-bull-run" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-bear-strike" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-clear-signal">{signal.asset}</p>
                      <p className="text-sm text-market-mist">{signal.direction} • {signal.timeframe}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      signal.status === 'ACTIVE' && "bg-[rgba(var(--color-data-stream),0.15)] text-data-stream",
                      signal.status === 'TP_HIT' && "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse",
                      signal.status === 'SL_HIT' && "bg-[rgba(var(--color-bear-strike),0.15)] text-bear-strike",
                      signal.status === 'EXPIRED' && "bg-[rgba(var(--color-golden-edge),0.15)] text-golden-edge"
                    )}>
                      {signal.status.replace('_', ' ')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-market-mist">
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No signals yet. Create your first signal!</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ title, value, icon: Icon, color }: { 
  title: string
  value: string | number
  icon: React.ElementType
  color: 'profit' | 'loss' | 'gold' | 'data'
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-chart-canvas border border-[rgb(var(--color-border-subtle))]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-market-mist mb-1">{title}</p>
          <p className={cn(
            "text-2xl font-bold",
            color === 'profit' && "text-profit-pulse",
            color === 'loss' && "text-bear-strike",
            color === 'gold' && "text-golden-edge",
            color === 'data' && "text-data-stream"
          )}>{value}</p>
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          color === 'profit' && "bg-[rgba(var(--color-profit-pulse),0.15)]",
          color === 'loss' && "bg-[rgba(var(--color-bear-strike),0.15)]",
          color === 'gold' && "bg-[rgba(var(--color-golden-edge),0.15)]",
          color === 'data' && "bg-[rgba(var(--color-data-stream),0.15)]"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            color === 'profit' && "text-profit-pulse",
            color === 'loss' && "text-bear-strike",
            color === 'gold' && "text-golden-edge",
            color === 'data' && "text-data-stream"
          )} />
        </div>
      </div>
    </motion.div>
  )
}