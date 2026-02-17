import { Metadata } from 'next'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PriceRadars terms and conditions of use for the price comparison service.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions of Use</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: 11 February 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">

        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Service Description</h2>
          <p className="mt-2">
            PriceRadars (hereinafter "the Service") is an online price comparison service that allows
            users to search for products and compare offers published by third-party online stores.
            The Service does not sell products, does not process orders, and does not handle payments.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Access and Use</h2>
          <p className="mt-2">
            Access to the Service is free and does not require registration. By using the Service,
            the user accepts these terms. The user agrees to use the Service exclusively for lawful
            purposes in accordance with applicable law. Automated use of the Service (scraping, bots)
            is prohibited without written authorisation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Price Information</h2>
          <p className="mt-2">
            Prices and offer information displayed in the Service are provided by third-party sources
            (online stores and data aggregators) and are updated periodically. Despite our efforts to
            ensure accuracy, PriceRadars does not guarantee that the prices shown correspond exactly
            to the price charged by the seller at the time of purchase.
          </p>
          <p className="mt-2">
            Users are advised to verify the final price, terms of sale, and product availability
            directly on the seller's website before completing a purchase.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Redirection to Third-Party Sites</h2>
          <p className="mt-2">
            By clicking on an offer, the user is redirected to the seller's website. Any contractual
            purchase relationship is established exclusively between the user and the seller.
            PriceRadars is not a party to such relationship and is not responsible for:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Final price, availability, and product specifications.</li>
            <li>Shipping, delivery, and dispatch times.</li>
            <li>Return, refund, and warranty policies of the seller.</li>
            <li>Customer service and after-sales support.</li>
            <li>Processing of personal data by the seller.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Affiliate Disclosure</h2>
          <p className="mt-2">
            PriceRadars participates in affiliate programmes with some sellers featured on the site.
            When a user makes a purchase after being redirected through the Service, PriceRadars may
            receive a commission from the seller. This commission does not result in additional costs
            for the user and does not influence the order in which offers are presented, which is
            determined by objective criteria (price, relevance, availability).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Limitation of Liability</h2>
          <p className="mt-2">
            The Service is provided "as is" and "as available". PriceRadars makes no warranties of any
            kind, express or implied, regarding the completeness, accuracy, reliability, suitability,
            or availability of the Service or the information contained therein.
          </p>
          <p className="mt-2">
            To the fullest extent permitted by law, PriceRadars shall not be liable for any direct,
            indirect, incidental, consequential, or punitive damages arising from the use or inability
            to use the Service, or from purchasing products through links on the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Intellectual Property</h2>
          <p className="mt-2">
            The design, logo, source code, and original content of the Service are owned by the Service
            operator and are protected by copyright law. Product images, names, and descriptions are the
            property of their respective owners and are used solely for informational purposes in the
            context of price comparison.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Service Availability</h2>
          <p className="mt-2">
            PriceRadars reserves the right to modify, suspend, or discontinue the Service at any time,
            without notice, for technical, maintenance, or other reasons.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Changes to Terms</h2>
          <p className="mt-2">
            These terms may be updated periodically. Changes take effect from the date of publication
            on this page. Continued use of the Service after publication of changes constitutes
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">10. Governing Law</h2>
          <p className="mt-2">
            These terms are governed by Italian law. For any dispute arising from the interpretation
            or execution of these terms, the competent court shall be determined in accordance with
            applicable consumer protection regulations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">11. Contact</h2>
          <p className="mt-2">
            For questions about these terms:{' '}
            <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
          </p>
        </section>

      </div>
    </div>
  )
}
