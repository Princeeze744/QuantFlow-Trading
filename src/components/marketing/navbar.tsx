'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION, EASING, APP_CONFIG } from '@/lib/constants'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = "text-market-mist hover:text-clear-signal transition-swift text-sm font-medium"
  const mobileNavLinkClass = "block text-market-mist hover:text-clear-signal transition-swift text-base font-medium py-2"

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-chart-canvas/90 backdrop-blur-xl border-b border-[rgb(var(--color-border-subtle))]" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-profit-pulse flex items-center justify-center">
                <span className="text-white font-bold text-lg">QF</span>
              </div>
              <span className="text-xl font-bold text-clear-signal">
                {APP_CONFIG.name}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className={navLinkClass}>Features</a>
              <a href="#pricing" className={navLinkClass}>Pricing</a>
              <a href="#testimonials" className={navLinkClass}>Testimonials</a>
              <a href="#faq" className={navLinkClass}>FAQ</a>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link href="/login" className={navLinkClass}>Log in</Link>
              <Link
                href="/register"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg",
                  "bg-profit-pulse text-white font-medium text-sm",
                  "hover:opacity-90 transition-swift",
                  "glow-profit"
                )}
              >
                Start Free
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-panel-edge transition-swift"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-clear-signal" />
              ) : (
                <Menu className="w-6 h-6 text-clear-signal" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: MOTION.smooth / 1000, ease: EASING.out }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden bg-chart-canvas border-b border-[rgb(var(--color-border-subtle))]"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>Features</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>Pricing</a>
              <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>Testimonials</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass}>FAQ</a>
              <div className="pt-4 border-t border-[rgb(var(--color-border-subtle))] space-y-3">
                <Link href="/login" className="block text-center text-market-mist hover:text-clear-signal transition-swift text-base font-medium py-2">Log in</Link>
                <Link href="/register" className="block text-center px-5 py-3 rounded-lg bg-profit-pulse text-white font-medium">Start Free</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}