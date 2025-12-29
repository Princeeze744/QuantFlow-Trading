import { Navbar } from '@/components/marketing/navbar'
import { Hero } from '@/components/marketing/hero'
import { StatsBanner } from '@/components/marketing/stats-banner'
import { Features } from '@/components/marketing/features'
import { Pricing } from '@/components/marketing/pricing'
import { Testimonials } from '@/components/marketing/testimonials'
import { FAQ } from '@/components/marketing/faq'
import { CTA } from '@/components/marketing/cta'
import { Footer } from '@/components/marketing/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-market-depth">
      <Navbar />
      <Hero />
      <StatsBanner />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}