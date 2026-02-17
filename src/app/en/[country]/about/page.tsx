import { Metadata } from 'next'
import Link from 'next/link'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'PriceRadars is a Comparison Shopping Service that helps consumers compare offers from hundreds of online stores.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">About Us</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong>PriceRadars</strong> is a Comparison Shopping Service (CSS) operating across 6 markets:
          Italy, the United Kingdom, the United States, Germany, France, and Spain.
        </p>

        <p>
          Our service aggregates and compares offers published by hundreds of verified online stores,
          allowing consumers to quickly identify the best available price for the product they are looking for.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">What We Do</h2>
        <p>
          PriceRadars collects, normalises, and presents product offers across electronics, appliances,
          gaming, photography, and other categories. For each product, we display offers from multiple
          sellers, including price, availability, and a direct link to the seller's purchase page.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Users search for a product via the search bar or browse categories.</li>
          <li>PriceRadars displays results with the lowest price, brand, and number of available offers.</li>
          <li>On the product detail page, users see offers from all sellers, with options to filter and sort.</li>
          <li>Clicking an offer redirects the user to the seller's website to complete the purchase.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Business Model</h2>
        <p>
          PriceRadars is free for consumers. The service is sustained through affiliate commissions:
          when a user makes a purchase after being redirected from PriceRadars to a seller's website,
          PriceRadars may receive a commission from the seller. This model does not affect the price
          paid by the user and does not influence the order in which offers are presented.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Independence</h2>
        <p>
          Offers are sorted by ascending price as the default criterion. Users can change the sorting
          to relevance, popularity, or descending price. No seller can pay for a privileged position
          in search results.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>
          For information, reports, or support:{' '}
          <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
        </p>
        <p>
          <Link href="contact" className="text-orange-600 hover:underline">Full contact page →</Link>
        </p>
      </div>
    </div>
  )
}
