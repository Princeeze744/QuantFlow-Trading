import { Navbar } from '@/components/marketing/navbar'
import { Footer } from '@/components/marketing/footer'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-market-depth">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-clear-signal mb-4">
          Terms of Service
        </h1>
        <p className="text-market-mist mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">1. Acceptance of Terms</h2>
            <p className="text-market-mist leading-relaxed">
              By accessing and using Quant Flow Trading ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">2. Description of Service</h2>
            <p className="text-market-mist leading-relaxed">
              Quant Flow Trading provides AI-powered trading signals for educational and informational purposes. Our signals include entry prices, stop loss levels, and take profit targets for various financial instruments including forex pairs, commodities, and synthetic indices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">3. No Financial Advice</h2>
            <p className="text-market-mist leading-relaxed">
              The trading signals and information provided by Quant Flow Trading do not constitute financial advice, investment advice, trading advice, or any other sort of advice. You should not treat any of the content as such. We do not recommend that any financial instrument should be bought, sold, or held by you. Trading decisions should be made based on your own research and judgment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">4. Risk Acknowledgment</h2>
            <p className="text-market-mist leading-relaxed">
              Trading foreign exchange, commodities, and synthetic indices carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. You could sustain a loss of some or all of your initial investment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">5. Subscription and Payments</h2>
            <p className="text-market-mist leading-relaxed">
              Some features of our Service require a paid subscription. By subscribing, you agree to pay the applicable fees. Subscriptions automatically renew unless cancelled before the renewal date. Refunds are available within 30 days of purchase if you are not satisfied with the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">6. User Accounts</h2>
            <p className="text-market-mist leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">7. Prohibited Activities</h2>
            <p className="text-market-mist leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-market-mist space-y-2">
              <li>Share your account credentials with others</li>
              <li>Redistribute or resell our trading signals</li>
              <li>Use automated systems to scrape or collect data from our Service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the Service for any illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">8. Limitation of Liability</h2>
            <p className="text-market-mist leading-relaxed">
              In no event shall Quant Flow Trading be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your use of the Service or any trading decisions made based on our signals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">9. Changes to Terms</h2>
            <p className="text-market-mist leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">10. Contact</h2>
            <p className="text-market-mist leading-relaxed">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:trade2uwin@gmail.com" className="text-profit-pulse hover:underline">
                trade2uwin@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}