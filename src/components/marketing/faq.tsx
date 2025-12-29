'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const faqs = [
  {
    question: 'How do the trading signals work?',
    answer: 'Our AI analyzes market trends, price action, and key levels to generate high-probability trade setups. Each signal includes entry price, stop loss, and take profit levels with a 1:3 risk-reward ratio. Signals are delivered every 4 hours like clockwork.',
    category: 'signals'
  },
  {
    question: 'What markets do you cover?',
    answer: 'We cover major Forex pairs (EUR/USD, GBP/USD, etc.), Gold (XAU/USD), and select Volatility/Synthetic indices. Our AI is optimized for these markets to ensure the highest accuracy.',
    category: 'signals'
  },
  {
    question: 'How are signals delivered?',
    answer: "Signals are delivered instantly through our web dashboard, email notifications, and Telegram alerts (Pro & VIP plans). You'll never miss an opportunity with our multi-channel delivery system.",
    category: 'signals'
  },
  {
    question: 'What is your win rate?',
    answer: 'Our verified track record shows a 78.5% win rate across all signals. Every signal is publicly logged with timestamps - we believe in complete transparency. You can view our full performance history in the dashboard.',
    category: 'performance'
  },
  {
    question: 'Can beginners use this service?',
    answer: 'Absolutely! Our signals come with detailed analysis explaining the reasoning behind each trade. Plus, our Trading Academy (included with Pro plans) teaches you the fundamentals so you understand WHY signals work, not just copy them blindly.',
    category: 'general'
  },
  {
    question: "What's the difference between plans?",
    answer: 'Free tier gets delayed signals (4-6 hours). Basic gets real-time signals + email alerts. Pro adds Telegram alerts, position calculator, and community access. VIP includes 1-on-1 coaching, early signal access, and direct analyst contact.',
    category: 'pricing'
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: "Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with the service for any reason, contact us within 30 days for a full refund. No questions asked.",
    category: 'pricing'
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from your account settings. There are no long-term contracts or cancellation fees. Your access continues until the end of your billing period.',
    category: 'pricing'
  },
]

const categories = [
  { key: 'all', label: 'All Questions' },
  { key: 'signals', label: 'Signals' },
  { key: 'performance', label: 'Performance' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'general', label: 'General' },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  return (
    <section id="faq" ref={ref} className="py-20 lg:py-32 bg-market-depth relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[rgba(var(--color-data-stream),0.03)] rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[rgba(var(--color-profit-pulse),0.03)] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-14"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(var(--color-data-stream),0.1)] text-data-stream text-sm font-semibold mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-clear-signal mb-6 leading-tight">
            Frequently asked{' '}
            <span className="text-gradient-profit">questions</span>
          </h2>
          <p className="text-lg text-market-mist max-w-2xl mx-auto">
            Everything you need to know about our trading signals service.
          </p>
        </motion.div>

        {/* Category Filter - Mobile Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 -mx-4 px-4"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key)
                  setOpenIndex(0)
                }}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  activeCategory === cat.key
                    ? "bg-profit-pulse text-white"
                    : "bg-panel-edge text-market-mist hover:text-clear-signal"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={`${activeCategory}-${index}`}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-[rgba(var(--color-profit-pulse),0.1)] to-[rgba(var(--color-profit-pulse),0.02)] border border-[rgba(var(--color-profit-pulse),0.2)] text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[rgba(var(--color-profit-pulse),0.15)] flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-7 h-7 text-profit-pulse" />
          </div>
          <h3 className="text-xl font-bold text-clear-signal mb-2">Still have questions?</h3>
          <p className="text-market-mist mb-6 max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="mailto:trade2uwin@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-profit-pulse text-white font-semibold hover:opacity-90 transition-all active-scale"
            >
              Contact Support
            </Link>
            <a
              href="https://t.me/quantflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-panel-edge text-clear-signal font-semibold hover:bg-[rgb(var(--color-border-subtle))] transition-all active-scale"
            >
              Join Telegram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ 
  faq, 
  isOpen, 
  onToggle,
  index 
}: { 
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen 
          ? "bg-chart-canvas border-[rgba(var(--color-profit-pulse),0.3)] shadow-lg shadow-[rgba(var(--color-profit-pulse),0.05)]"
          : "bg-chart-canvas border-[rgb(var(--color-border-subtle))] hover:border-[rgba(var(--color-border-subtle),1.5)]"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
      >
        <span className={cn(
          "font-semibold transition-colors",
          isOpen ? "text-profit-pulse" : "text-clear-signal"
        )}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
            isOpen 
              ? "bg-[rgba(var(--color-profit-pulse),0.15)] text-profit-pulse" 
              : "bg-panel-edge text-market-mist"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 lg:px-6 pb-5 lg:pb-6">
              <div className="pt-2 border-t border-[rgb(var(--color-border-subtle))]">
                <p className="text-market-mist leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}