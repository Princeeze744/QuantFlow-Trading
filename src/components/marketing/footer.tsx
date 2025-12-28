'use client'

import Link from 'next/link'
import { 
  Twitter, 
  Instagram, 
  Youtube,
  Send,
  Mail
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-market-depth border-t border-[rgb(var(--color-border-subtle))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-profit-pulse flex items-center justify-center">
                <span className="text-white font-bold text-lg">QF</span>
              </div>
              <span className="text-xl font-bold text-clear-signal">
                {APP_CONFIG.name}
              </span>
            </Link>

            <p className="text-market-mist mb-6 max-w-sm">
              AI-powered trading signals with verified results. 
              The confident signal in the noise of the markets.
            </p>

            <div className="mb-6">
              <p className="text-sm font-medium text-clear-signal mb-3">
                Subscribe to market insights
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-lg",
                    "bg-panel-edge border border-[rgb(var(--color-border-subtle))]",
                    "text-clear-signal placeholder:text-distant-data",
                    "focus:outline-none focus:border-profit-pulse",
                    "transition-swift"
                  )}
                />
                <button className="px-4 py-2.5 rounded-lg bg-profit-pulse text-white font-medium hover:opacity-90 transition-swift">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://twitter.com/quantflow" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-panel-edge flex items-center justify-center text-market-mist hover:text-clear-signal hover:bg-[rgb(var(--color-border-subtle))] transition-swift" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/quantflow" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-panel-edge flex items-center justify-center text-market-mist hover:text-clear-signal hover:bg-[rgb(var(--color-border-subtle))] transition-swift" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/quantflow" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-panel-edge flex items-center justify-center text-market-mist hover:text-clear-signal hover:bg-[rgb(var(--color-border-subtle))] transition-swift" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://t.me/quantflow" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-panel-edge flex items-center justify-center text-market-mist hover:text-clear-signal hover:bg-[rgb(var(--color-border-subtle))] transition-swift" aria-label="Telegram">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-clear-signal uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Features</a></li>
              <li><a href="#pricing" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Pricing</a></li>
              <li><a href="#testimonials" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Testimonials</a></li>
              <li><a href="#faq" className="text-market-mist hover:text-clear-signal transition-swift text-sm">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-clear-signal uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-market-mist hover:text-clear-signal transition-swift text-sm">About Us</Link></li>
              <li><Link href="/blog" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Blog</Link></li>
              <li><Link href="/careers" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-clear-signal uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/academy" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Trading Academy</Link></li>
              <li><Link href="/signals" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Signal History</Link></li>
              <li><Link href="/calculator" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Calculator</Link></li>
              <li><Link href="/docs" className="text-market-mist hover:text-clear-signal transition-swift text-sm">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-clear-signal uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Privacy Policy</Link></li>
              <li><Link href="/risk-disclosure" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Risk Disclosure</Link></li>
              <li><Link href="/refunds" className="text-market-mist hover:text-clear-signal transition-swift text-sm">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgb(var(--color-border-subtle))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-distant-data">
              © {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-xs text-distant-data text-center md:text-right max-w-lg">
              Trading involves substantial risk. Past performance is not indicative of future results. 
              Only trade with capital you can afford to lose.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}