'use client'

import { useState } from 'react'
import { Header } from './header'
import { Sidebar } from './sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    email: string
    full_name?: string | null
    avatar_url?: string | null
    subscription_tier?: string
  }
  isAdmin?: boolean
}

export function DashboardLayout({ children, user, isAdmin = false }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-market-depth flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        subscriptionTier={user?.subscription_tier}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          user={user}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>

        <footer className="px-4 lg:px-6 py-4 border-t border-[rgb(var(--color-border-subtle))]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-distant-data">
            <p>© 2025 Quant Flow Trading. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/terms" className="hover:text-market-mist transition-swift">Terms</a>
              <a href="/privacy" className="hover:text-market-mist transition-swift">Privacy</a>
              <a href="/contact" className="hover:text-market-mist transition-swift">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}