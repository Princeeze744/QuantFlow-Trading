'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      const { data: isAdmin } = await supabase.rpc('is_admin')
      
      if (!isAdmin) {
        await supabase.auth.signOut()
        throw new Error('Access denied. Admin only.')
      }

      router.push('/admin')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-market-depth flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-chart-canvas rounded-2xl border border-[rgb(var(--color-border-subtle))] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(var(--color-bear-strike),0.15)] flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-bear-strike" />
            </div>
            <h1 className="text-2xl font-bold text-clear-signal">Admin Access</h1>
            <p className="text-market-mist text-sm mt-1">Restricted area</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-[rgba(var(--color-bear-strike),0.1)] border border-bear-strike/30 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-bear-strike flex-shrink-0" />
              <span className="text-bear-strike text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-market-mist mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal focus:outline-none focus:border-profit-pulse"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-market-mist mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal focus:outline-none focus:border-profit-pulse pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-market-mist hover:text-clear-signal"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-bear-strike text-white hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</>
              ) : (
                <><Shield className="w-5 h-5" /> Access Admin</>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-distant-data text-xs mt-4">
          This area is restricted to administrators only.
        </p>
      </motion.div>
    </div>
  )
}