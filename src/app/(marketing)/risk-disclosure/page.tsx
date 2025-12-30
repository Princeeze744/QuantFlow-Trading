import { Navbar } from '@/components/marketing/navbar'
import { Footer } from '@/components/marketing/footer'
import { AlertTriangle } from 'lucide-react'

export default function RiskDisclosurePage() {
  return (
    <main className="min-h-screen bg-market-depth">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Warning Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-bear-strike/10 border border-bear-strike/30">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-bear-strike flex-shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-bear-strike mb-2">High Risk Warning</h2>
              <p className="text-market-mist">
                Trading foreign exchange, commodities, and synthetic indices on margin carries a high level of risk and may not be suitable for all investors. You could lose more than your initial deposit.
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-clear-signal mb-4">
          Risk Disclosure Statement
        </h1>
        <p className="text-market-mist mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">1. General Risk Warning</h2>
            <p className="text-market-mist leading-relaxed">
              Trading in financial markets involves substantial risk of loss and is not suitable for every investor. The valuation of financial instruments such as currencies, commodities, and synthetic indices may fluctuate, and as a result, you may lose more than your original investment. Before using our trading signals, you should carefully consider your investment objectives, level of experience, and risk appetite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">2. No Guarantee of Profits</h2>
            <p className="text-market-mist leading-relaxed">
              Past performance is not indicative of future results. While our AI-powered trading signals have shown positive historical results, there is no guarantee that these results will continue in the future. Any win rate or profit statistics displayed on our platform are based on historical data and should not be considered as a promise or guarantee of future performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">3. Leverage Risk</h2>
            <p className="text-market-mist leading-relaxed">
              Trading on margin (leverage) can work against you as well as for you. Leverage amplifies both gains and losses. A relatively small market movement can have a proportionately larger impact on the funds you have deposited. You may sustain a total loss of your initial margin funds and any additional funds deposited with your broker.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">4. Market Volatility</h2>
            <p className="text-market-mist leading-relaxed">
              Financial markets can be highly volatile. Prices can change rapidly due to various factors including economic news, geopolitical events, natural disasters, and market sentiment. Stop-loss orders may not be executed at the exact price specified due to slippage, especially during periods of high volatility or low liquidity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">5. Synthetic Indices Risk</h2>
            <p className="text-market-mist leading-relaxed">
              Synthetic indices (Volatility Indices, Crash/Boom, Jump Indices, etc.) are simulated markets with their own unique characteristics. While they offer 24/7 trading and are not affected by real-world events, they can be highly volatile and unpredictable. The behavior of synthetic indices may differ significantly from traditional financial markets.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">6. Signal Execution Risk</h2>
            <p className="text-market-mist leading-relaxed">
              There may be delays between when a signal is generated and when you are able to execute the trade. Market conditions may change during this time, affecting the entry price, stop loss, or take profit levels. We are not responsible for any losses incurred due to delayed signal delivery or execution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">7. Technology Risk</h2>
            <p className="text-market-mist leading-relaxed">
              Our service relies on technology that may be subject to failures, delays, or interruptions. Internet connectivity issues, server outages, or software bugs could affect signal delivery. You should not rely solely on our service for time-sensitive trading decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">8. Personal Responsibility</h2>
            <p className="text-market-mist leading-relaxed">
              You are solely responsible for your trading decisions. Our signals are for informational and educational purposes only and should not be considered as personalized financial advice. You should conduct your own research and consult with a qualified financial advisor before making any investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">9. Capital at Risk</h2>
            <p className="text-market-mist leading-relaxed font-semibold">
              Only trade with money you can afford to lose. Never trade with funds needed for essential expenses such as rent, food, or medical care. Set aside a specific amount for trading that, if lost entirely, would not affect your standard of living.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">10. Seek Professional Advice</h2>
            <p className="text-market-mist leading-relaxed">
              If you are unsure whether trading is appropriate for you, please seek independent professional advice. A qualified financial advisor can help you understand the risks involved and whether trading aligns with your financial goals and circumstances.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-golden-edge/10 border border-golden-edge/30">
            <h2 className="text-xl font-semibold text-golden-edge mb-4">Acknowledgment</h2>
            <p className="text-market-mist leading-relaxed">
              By using Quant Flow Trading, you acknowledge that you have read, understood, and agree to this Risk Disclosure Statement. You confirm that you understand the risks involved in trading and that you are solely responsible for your trading decisions and their outcomes.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}