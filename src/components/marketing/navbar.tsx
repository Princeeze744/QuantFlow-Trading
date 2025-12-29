'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-[rgba(var(--color-chart-canvas),0.85)] backdrop-blur-xl border-b border-[rgba(var(--color-border-subtle),0.5)] shadow-lg shadow-black/10" 
            : "bg-transparent"
        )}
      >
        <div className="safe-top" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-profit-pulse to-[rgba(var(--color-profit-pulse),0.7)] flex items-center justify-center shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)] group-hover:shadow-[rgba(var(--color-profit-pulse),0.5)] transition-all duration-300"
              >
                <span className="text-white font-bold text-lg">QF</span>
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-clear-signal block leading-tight">Quant Flow</span>
                <span className="text-[10px] text-profit-pulse font-semibold uppercase tracking-wider">Trading</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="relative px-4 py-2 text-market-mist hover:text-clear-signal transition-all text-sm font-medium rounded-lg hover:bg-[rgba(var(--color-panel-edge),0.5)] group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-profit-pulse scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link 
                href="/login" 
                className="px-4 py-2 text-market-mist hover:text-clear-signal transition-all text-sm font-medium rounded-lg hover:bg-[rgba(var(--color-panel-edge),0.5)]"
              >
                Log in
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/register"
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
                    "bg-gradient-to-r from-profit-pulse to-[rgba(var(--color-profit-pulse),0.85)] text-white font-semibold text-sm",
                    "shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)] hover:shadow-[rgba(var(--color-profit-pulse),0.5)]",
                    "transition-all duration-300"
                  )}
                >
                  Start Free
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden touch-target rounded-xl bg-panel-edge/50 text-clear-signal"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-16 left-0 right-0 z-50 lg:hidden bg-chart-canvas border-b border-[rgb(var(--color-border-subtle))] shadow-2xl shadow-black/30"
            >
              <div className="safe-top" />
              <div className="px-4 py-6">
                {/* Nav Links */}
                <nav className="space-y-1 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-clear-signal font-medium hover:bg-panel-edge transition-all active-scale"
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 text-market-mist" />
                    </motion.a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="h-px bg-[rgb(var(--color-border-subtle))] my-4" />

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link 
                      href="/login" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-5 py-3.5 rounded-xl text-clear-signal font-medium bg-panel-edge hover:bg-[rgba(var(--color-panel-edge),1.2)] transition-all active-scale"
                    >
                      Log in
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Link 
                      href="/register" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-profit-pulse to-[rgba(var(--color-profit-pulse),0.85)] text-white font-semibold shadow-lg shadow-[rgba(var(--color-profit-pulse),0.3)] active-scale"
                    >
                      <Sparkles className="w-4 h-4" />
                      Start Free Trial
                    </Link>
                  </motion.div>
                </div>

                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xs text-market-mist">
                    ✓ No credit card required • ✓ Free tier available
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}