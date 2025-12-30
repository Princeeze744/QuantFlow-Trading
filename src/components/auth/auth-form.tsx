'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { SocialAuth } from './social-auth'

interface AuthFormProps {
  mode: 'login' | 'register' | 'forgot-password'
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  // Countdown timer for redirect after registration
  useEffect(() => {
    if (countdown === null) return
    
    if (countdown === 0) {
      router.push('/login')
      return
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })
        if (error) throw error
        setSuccess('Account created successfully!')
        setCountdown(5) // Start 5 second countdown
      } else if (mode === 'forgot-password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
        setSuccess('Check your email for the reset link!')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const content = {
    login: {
      title: 'Welcome back',
      subtitle: 'Enter your credentials to access your account',
      button: 'Sign In',
      buttonIcon: null,
    },
    register: {
      title: 'Create your account',
      subtitle: 'Start receiving AI-powered trading signals',
      button: 'Create Account',
      buttonIcon: Sparkles,
    },
    'forgot-password': {
      title: 'Reset your password',
      subtitle: "We'll send you a link to reset your password",
      button: 'Send Reset Link',
      buttonIcon: Mail,
    },
  }

  const { title, subtitle, button, buttonIcon: ButtonIcon } = content[mode]

  return (
    <div className="space-y-6">
      {/* Mobile Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lg:hidden flex justify-center mb-6"
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-profit-pulse flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">QF</span>
          </div>
          <div>
            <span className="text-xl font-bold text-clear-signal block leading-tight">Quant Flow</span>
            <span className="text-[10px] text-profit-pulse font-semibold uppercase tracking-wider">Trading</span>
          </div>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center lg:text-left"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-clear-signal mb-2">{title}</h2>
        <p className="text-market-mist">{subtitle}</p>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-bear-strike/10 border border-bear-strike/30"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-bear-strike flex-shrink-0 mt-0.5" />
              <p className="text-sm text-bear-strike">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message - Enhanced for Registration */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-profit-pulse/10 border border-profit-pulse/30"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-profit-pulse flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-profit-pulse font-medium">{success}</p>
                
                {/* Show redirect message for registration */}
                {mode === 'register' && countdown !== null && (
                  <div className="mt-3 space-y-3">
                    <p className="text-xs text-market-mist">
                      Redirecting to login in {countdown} seconds...
                    </p>
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-profit-pulse text-white text-sm font-semibold hover:bg-profit-pulse/90 transition-all"
                    >
                      Sign In Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form - Hide after successful registration */}
      {!(mode === 'register' && success) && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Full Name (Register only) */}
          {mode === 'register' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-medium text-market-mist mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-distant-data" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal placeholder:text-distant-data focus:outline-none focus:border-profit-pulse transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: mode === 'register' ? 0.3 : 0.25 }}
          >
            <label className="block text-sm font-medium text-market-mist mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-distant-data" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal placeholder:text-distant-data focus:outline-none focus:border-profit-pulse transition-all"
              />
            </div>
          </motion.div>

          {/* Password */}
          {mode !== 'forgot-password' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: mode === 'register' ? 0.35 : 0.3 }}
            >
              <label className="block text-sm font-medium text-market-mist mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-distant-data" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-base bg-panel-edge border border-[rgb(var(--color-border-subtle))] text-clear-signal placeholder:text-distant-data focus:outline-none focus:border-profit-pulse transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-distant-data hover:text-market-mist transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {mode === 'register' && (
                <p className="text-xs text-distant-data mt-2">Must be at least 6 characters</p>
              )}
            </motion.div>
          )}

          {/* Forgot Password Link */}
          {mode === 'login' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex justify-end"
            >
              <Link
                href="/forgot-password"
                className="text-sm text-profit-pulse hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-base bg-profit-pulse text-white hover:bg-profit-pulse/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-profit-pulse/25"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : ButtonIcon ? (
                <ButtonIcon className="w-5 h-5" />
              ) : null}
              {button}
            </button>
          </motion.div>
        </motion.form>
      )}

      {/* Social Auth - Hide after successful registration */}
      {mode !== 'forgot-password' && !(mode === 'register' && success) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SocialAuth />
        </motion.div>
      )}

      {/* Footer Links - Hide after successful registration */}
      {!(mode === 'register' && success) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-market-mist"
        >
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-profit-pulse hover:underline font-semibold">
                Sign up
              </Link>
            </>
          ) : mode === 'register' ? (
            <>
              Already have an account?{' '}
              <Link href="/login" className="text-profit-pulse hover:underline font-semibold">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Remember your password?{' '}
              <Link href="/login" className="text-profit-pulse hover:underline font-semibold">
                Sign in
              </Link>
            </>
          )}
        </motion.div>
      )}

      {/* Terms (Register only) - Hide after successful registration */}
      {mode === 'register' && !success && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-distant-data"
        >
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-market-mist hover:text-profit-pulse transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-market-mist hover:text-profit-pulse transition-colors">
            Privacy Policy
          </Link>
        </motion.p>
      )}
    </div>
  )
}