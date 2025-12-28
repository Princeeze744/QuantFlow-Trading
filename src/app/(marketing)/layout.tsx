import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quant Flow Trading | AI-Powered Trading Signals',
  description: 'Get AI-powered forex and synthetic trading signals every 4 hours. Verified track record, transparent results, and professional-grade tools for serious traders.',
  keywords: ['trading signals', 'forex signals', 'AI trading', 'synthetic indices', 'trading alerts'],
  openGraph: {
    title: 'Quant Flow Trading | AI-Powered Trading Signals',
    description: 'The confident signal in the noise of the markets. AI-powered trading signals with verified results.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Quant Flow Trading',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quant Flow Trading | AI-Powered Trading Signals',
    description: 'The confident signal in the noise of the markets.',
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}