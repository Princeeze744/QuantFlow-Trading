import Link from 'next/link'
import { APP_CONFIG } from '@/lib/constants'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-market-depth flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgb(var(--color-profit-pulse)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-profit-pulse)) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[rgb(var(--color-profit-pulse))] opacity-20 blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[rgb(var(--color-data-stream))] opacity-10 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-profit-pulse flex items-center justify-center">
              <span className="text-white font-bold text-xl">QF</span>
            </div>
            <span className="text-2xl font-bold text-clear-signal">{APP_CONFIG.name}</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-clear-signal mb-6">
              The confident <span className="text-gradient-profit">signal</span> in the noise
            </h1>
            <p className="text-lg text-market-mist">
              Join thousands of traders receiving AI-powered signals every 4 hours. 
              Verified results. Transparent track record.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-3xl font-bold text-profit-pulse">78.5%</p>
              <p className="text-sm text-market-mist">Win Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-golden-edge">2,450+</p>
              <p className="text-sm text-market-mist">Pips/Month</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-data-stream">500+</p>
              <p className="text-sm text-market-mist">Traders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}