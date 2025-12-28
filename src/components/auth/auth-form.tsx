'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react'
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
        setSuccess('Check your email to confirm your account!')
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

  const titles = {
    login: 'Welcome back',
    register: 'Create your account',
    'forgot-password': 'Reset your password',
  }

  const subtitles = {
    login: 'Enter your credentials to access your account',
    register: 'Start receiving AI-powered trading signals',
    'forgot-password': 'We\'ll send you a link to reset your password',
  }

  const buttonTexts = {
    login: 'Sign In',
    register: 'Create Account',
    'forgot-password': 'Send Reset Link',
  }

  return (
    <div className="space-y-6">
      <div className="lg:hidden flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-profit-pulse flex items-center justify-center">
            <span className="text-white font-bold text-lg">QF</span>
          </div>
          <span className="text-xl font-bold text-clear-signal">Quant Flow</span>
        </Link>
      </div>

      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-clear-signal mb-2">{titles[mode]}</h2>
        <p className="text-market-mist">{subtitles[mode]}</p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-[rgba(var(--color-bear-strike),0.1)] border border-bear-strike/30">
          <p className="text-sm text-bear-strike">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-lg bg-[rgba(var(--color-profit-pulse),0.1)] border border-profit-pulse/30">
          <p className="text-sm text-profit-pulse">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-market-mist mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-distant-data" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className={cn(
                  "w-full pl-12 pr-4 py-3 rounded-lg",
                  "bg-panel-edge border border-[rgb(var(--color-border-subtle))]",
                  "text-clear-signal placeholder:text-distant-data",
                  "focus:outline-none focus:border-profit-pulse",
                  "transition-swift"
                )}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-market-mist mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-distant-data" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-lg",
                "bg-panel-edge border border-[rgb(var(--color-border-subtle))]",
                "text-clear-signal placeholder:text-distant-data",
                "focus:outline-none focus:border-profit-pulse",
                "transition-swift"
              )}
            />
          </div>
        </div>

        {mode !== 'forgot-password' && (
          <div>
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
                className={cn(
                  "w-full pl-12 pr-12 py-3 rounded-lg",
                  "bg-panel-edge border border-[rgb(var(--color-border-subtle))]",
                  "text-clear-signal placeholder:text-distant-data",
                  "focus:outline-none focus:border-profit-pulse",
                  "transition-swift"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-distant-data hover:text-market-mist transition-swift"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {mode === 'login' && (
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-profit-pulse hover:underline">
              Forgot password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-semibold",
            "bg-profit-pulse text-white",
            "hover:opacity-90 transition-swift",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2"
          )}
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {buttonTexts[mode]}
        </button>
      </form>

      {mode !== 'forgot-password' && <SocialAuth />}

      <div className="text-center text-sm text-market-mist">
        {mode === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-profit-pulse hover:underline font-medium">Sign up</Link>
          </>
        ) : mode === 'register' ? (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-profit-pulse hover:underline font-medium">Sign in</Link>
          </>
        ) : (
          <>
            Remember your password?{' '}
            <Link href="/login" className="text-profit-pulse hover:underline font-medium">Sign in</Link>
          </>
        )}
      </div>
    </div>
  )
}