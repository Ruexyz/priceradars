import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PriceRadars privacy policy. How we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: February 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Data Controller</h2>
          <p className="mt-2">The data controller is <strong>Rue Srl</strong>, based in Italy, reachable at <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Data Collected</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li><strong>Browsing data:</strong> IP address, browser type, pages visited, access time.</li>
            <li><strong>Technical cookies:</strong> necessary for site operation (language/country preferences).</li>
            <li><strong>Voluntarily provided data:</strong> email address, if provided for price alerts.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Purpose</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Providing the price comparison service.</li>
            <li>Sending price alert notifications (if requested).</li>
            <li>Anonymous statistical analysis to improve the service.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Data Sharing</h2>
          <p className="mt-2">PriceRadars does not sell or share personal data with third parties for commercial purposes. Data may be shared with technical service providers (hosting, analytics) bound by confidentiality agreements.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Cookies</h2>
          <p className="mt-2">The site uses only technical cookies necessary for operation. We do not use profiling cookies.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Your Rights (GDPR)</h2>
          <p className="mt-2">You have the right to access, rectify, delete, or port your data, and to withdraw consent at any time. Contact: <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a></p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. External Links</h2>
          <p className="mt-2">When you click an offer, you are redirected to the seller's website. PriceRadars is not responsible for the privacy policies of those sites.</p>
        </section>
      </div>
    </div>
  )
}
