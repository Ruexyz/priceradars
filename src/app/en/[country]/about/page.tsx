import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about PriceRadars: the price comparison engine that helps you find the best deals online.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">About Us</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong>PriceRadars</strong> is an online price comparison service that helps consumers find the best deals
          on electronics, appliances, gaming, and more. We compare prices from leading online stores
          to ensure you get the best deal available.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
        <p>
          We believe every consumer deserves easy access to the best price available.
          Our comparison engine continuously analyzes offers from leading online retailers,
          saving you time and money on every purchase.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
        <p>
          PriceRadars aggregates offers from hundreds of online stores across Italy, the UK, the US,
          Germany, France, and Spain. Prices are updated regularly for maximum accuracy.
          When you find the right deal, we redirect you directly to the store where you can complete
          your purchase securely.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Our Commitment</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Independence:</strong> We don't favor any store. We show the real price.</li>
          <li><strong>Free:</strong> The service is completely free for users.</li>
          <li><strong>Transparency:</strong> We always show the seller and the updated price.</li>
          <li><strong>Privacy:</strong> No registration required. We respect your privacy.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>
          PriceRadars is a service by Rue Srl.<br />
          For questions or support: <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
        </p>
      </div>
    </div>
  )
}
