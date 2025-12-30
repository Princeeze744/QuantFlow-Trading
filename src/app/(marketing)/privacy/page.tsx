import { Navbar } from '@/components/marketing/navbar'
import { Footer } from '@/components/marketing/footer'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-market-depth">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-clear-signal mb-4">
          Privacy Policy
        </h1>
        <p className="text-market-mist mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">1. Information We Collect</h2>
            <p className="text-market-mist leading-relaxed mb-4">We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside text-market-mist space-y-2">
              <li>Name and email address when you create an account</li>
              <li>Payment information when you subscribe to a paid plan</li>
              <li>Communication data when you contact our support</li>
              <li>Usage data including signals viewed and features used</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">2. How We Use Your Information</h2>
            <p className="text-market-mist leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-market-mist space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Send you trading signals and notifications</li>
              <li>Respond to your comments, questions, and support requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">3. Information Sharing</h2>
            <p className="text-market-mist leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances: with your consent, to comply with legal obligations, to protect our rights, or with service providers who assist in operating our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">4. Data Security</h2>
            <p className="text-market-mist leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, secure authentication systems, and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">5. Cookies and Tracking</h2>
            <p className="text-market-mist leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our Service may not function properly without cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">6. Data Retention</h2>
            <p className="text-market-mist leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide you services. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">7. Your Rights</h2>
            <p className="text-market-mist leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-market-mist space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">8. Third-Party Services</h2>
            <p className="text-market-mist leading-relaxed">
              Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">9. Changes to This Policy</h2>
            <p className="text-market-mist leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-clear-signal mb-4">10. Contact Us</h2>
            <p className="text-market-mist leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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