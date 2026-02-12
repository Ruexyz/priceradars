import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PriceRadars terms and conditions of use.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: February 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Service Description</h2>
          <p className="mt-2">PriceRadars is a price comparison service operated by <strong>Rue Srl</strong>. The service allows users to search for products and compare prices from different online stores. PriceRadars does not sell products directly and does not handle commercial transactions.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Use of Service</h2>
          <p className="mt-2">Access to the service is free and does not require registration. By using PriceRadars, you agree to these terms of service.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Price Comparison</h2>
          <p className="mt-2">PriceRadars compares prices published by partner online stores. Prices are provided by third-party sources and updated regularly but may not reflect the exact price at the time of purchase. We recommend verifying the final price on the seller's website.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Redirection to Third-Party Sites</h2>
          <p className="mt-2">By clicking on an offer, you are redirected to the seller's website. The purchase takes place directly on the seller's site, which is responsible for product price, availability, shipping, returns, warranty, and customer support.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Limitation of Liability</h2>
          <p className="mt-2">PriceRadars provides the service "as is" without warranties of any kind. We do not guarantee the completeness, accuracy, or timeliness of price information.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Affiliate Disclosure</h2>
          <p className="mt-2">PriceRadars participates in affiliate programs with online stores on the site. When a user makes a purchase through a link on PriceRadars, we may receive a commission from the seller. This does not affect the price paid by the user.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Governing Law</h2>
          <p className="mt-2">These terms are governed by Italian law.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Contact</h2>
          <p className="mt-2">For questions about these terms: <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a></p>
        </section>
      </div>
    </div>
  )
}
