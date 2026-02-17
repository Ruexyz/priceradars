import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PriceRadars privacy policy in accordance with the General Data Protection Regulation (GDPR).',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: 11 February 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">

        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Data Controller</h2>
          <p className="mt-2">
            The data controller is the legal entity operating the website priceradars.com (hereinafter
            "the Service"), reachable at{' '}
            <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Types of Data Collected</h2>

          <h3 className="mt-3 font-medium text-gray-800">2.1 Browsing Data</h3>
          <p className="mt-1">
            The IT systems operating the Service automatically collect certain data during normal operation,
            including: IP address, browser type and version, operating system, referring URL, pages visited,
            date and time of request. This data is used solely for anonymous statistical analysis and to
            ensure the Service functions correctly.
          </p>

          <h3 className="mt-3 font-medium text-gray-800">2.2 Technical Cookies</h3>
          <p className="mt-1">
            The Service uses only technical cookies necessary for operation (e.g., language and country
            preferences). No profiling cookies or third-party advertising cookies are used.
          </p>

          <h3 className="mt-3 font-medium text-gray-800">2.3 Voluntarily Provided Data</h3>
          <p className="mt-1">
            Sending an email to the contact address results in the acquisition of the sender's email address,
            necessary to respond to the request. If the price alert feature is activated in the future,
            the email address provided will be used exclusively for sending the requested notifications.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Purpose of Processing</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Providing the price comparison service.</li>
            <li>Handling contact requests.</li>
            <li>Aggregate and anonymous statistical analysis to improve the Service.</li>
            <li>Compliance with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Legal Basis</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li><strong>Browsing data and technical cookies:</strong> legitimate interest of the controller in the operation and security of the Service (Art. 6(1)(f) GDPR).</li>
            <li><strong>Contact emails:</strong> performance of pre-contractual measures at the request of the data subject (Art. 6(1)(b) GDPR).</li>
            <li><strong>Price alerts:</strong> consent of the user (Art. 6(1)(a) GDPR), revocable at any time.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Data Recipients</h2>
          <p className="mt-2">
            Personal data is not sold, transferred, or disclosed to third parties for commercial purposes.
            Data may be processed by:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Hosting and technical infrastructure providers, acting as data processors.</li>
            <li>Competent authorities, where required by law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Data Transfers</h2>
          <p className="mt-2">
            The Service is hosted on Cloudflare infrastructure with globally distributed servers.
            Any transfers of data to third countries are carried out on the basis of Standard Contractual
            Clauses approved by the European Commission or other adequate safeguards under the GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Retention Period</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Browsing data is deleted after statistical processing and in any case within 12 months.</li>
            <li>Contact data is retained for the time necessary to handle the request.</li>
            <li>Email addresses for price alerts are retained until consent is withdrawn.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Your Rights</h2>
          <p className="mt-2">
            Under Articles 15–22 of the GDPR, you have the right to:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Access your personal data and obtain a copy.</li>
            <li>Request rectification or updating.</li>
            <li>Request erasure ("right to be forgotten") where applicable.</li>
            <li>Restrict processing.</li>
            <li>Object to processing based on legitimate interest.</li>
            <li>Request data portability.</li>
            <li>Withdraw consent at any time, without affecting the lawfulness of processing carried out before withdrawal.</li>
            <li>Lodge a complaint with the competent supervisory authority.</li>
          </ul>
          <p className="mt-2">
            To exercise these rights:{' '}
            <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. External Websites</h2>
          <p className="mt-2">
            The Service contains links to third-party seller websites. When clicking on an offer, the user
            is redirected to the seller's site. PriceRadars is not responsible for the processing of personal
            data carried out by such sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">10. Changes to This Policy</h2>
          <p className="mt-2">
            This policy may be updated from time to time. Any changes will be published on this page
            with the updated date shown above.
          </p>
        </section>

      </div>
    </div>
  )
}
