'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Twitter, 
  Youtube,
  Linkedin,
  Send,
  Mail,
  MapPin,
  ArrowUpRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const socialLinks = [
  { 
    name: 'YouTube', 
    href: 'https://www.youtube.com/@Trade2winacademy', 
    icon: Youtube,
    color: 'hover:bg-red-500/20 hover:text-red-400'
  },
  { 
    name: 'X (Twitter)', 
    href: 'https://x.com/Trade2uWinn', 
    icon: Twitter,
    color: 'hover:bg-sky-500/20 hover:text-sky-400'
  },
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/prince-ochidi-67a980255/', 
    icon: Linkedin,
    color: 'hover:bg-blue-500/20 hover:text-blue-400'
  },
  { 
    name: 'Telegram', 
    href: 'https://t.me/quantflow', 
    icon: Send,
    color: 'hover:bg-sky-500/20 hover:text-sky-400'
  },
]

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Trading Academy', href: '/dashboard/academy' },
    { label: 'Signal History', href: '/dashboard/history' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Help Center', href: '/help' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Risk Disclosure', href: '/risk-disclosure' },
    { label: 'Refund Policy', href: '/refunds' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-market-depth border-t border-[rgb(var(--color-border-subtle))] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[rgba(var(--color-profit-pulse),0.02)] rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(var(--color-data-stream),0.02)] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
            
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-profit-pulse to-[rgba(var(--color-profit-pulse),0.7)] flex items-center justify-center shadow-lg shadow-[rgba(var(--color-profit-pulse),0.2)]"
                >
                  <span className="text-white font-bold text-lg">QF</span>
                </motion.div>
                <div>
                  <span className="text-xl font-bold text-clear-signal block leading-tight">Quant Flow</span>
                  <span className="text-[10px] text-profit-pulse font-semibold uppercase tracking-wider">Trading</span>
                </div>
              </Link>

              <p className="text-market-mist text-sm mb-6 max-w-sm leading-relaxed">
                AI-powered trading signals with verified results. The confident signal in the noise of the markets.
              </p>

              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-clear-signal mb-3">
                  Subscribe to market insights
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={cn(
                      "flex-1 px-4 py-2.5 rounded-xl text-sm",
                      "bg-panel-edge border border-[rgb(var(--color-border-subtle))]",
                      "text-clear-signal placeholder:text-distant-data",
                      "focus:outline-none focus:border-profit-pulse",
                      "transition-all duration-200"
                    )}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 rounded-xl bg-profit-pulse text-white font-medium hover:opacity-90 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-10 h-10 rounded-xl bg-panel-edge flex items-center justify-center",
                      "text-market-mist transition-all duration-200",
                      social.color
                    )}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-xs font-bold text-clear-signal uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-sm text-market-mist hover:text-profit-pulse transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-xs font-bold text-clear-signal uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-market-mist hover:text-profit-pulse transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-xs font-bold text-clear-signal uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-market-mist hover:text-profit-pulse transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-xs font-bold text-clear-signal uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-market-mist hover:text-profit-pulse transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgb(var(--color-border-subtle))] py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-distant-data text-center lg:text-left">
              © {new Date().getFullYear()} Quant Flow Trading. All rights reserved.
            </p>

            {/* Risk Disclaimer */}
            <p className="text-xs text-distant-data text-center lg:text-right max-w-xl leading-relaxed">
              ⚠️ Trading involves substantial risk of loss. Past performance is not indicative of future results. 
              Only trade with capital you can afford to lose.
            </p>
          </div>
        </div>
      </div>

      {/* Safe Area for Mobile */}
      <div className="safe-bottom" />
    </footer>
  )
}