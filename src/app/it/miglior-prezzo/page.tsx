import { Metadata } from 'next'
import Link from 'next/link'
import { landingPages } from '@/lib/seo/landing-pages'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'

export const metadata: Metadata = {
  title: 'Miglior Prezzo Oggi | PriceRadars',
  description: 'Trova il miglior prezzo per i prodotti più cercati in Italia: iPhone 16, MacBook Air M3, Samsung Galaxy S25, PlayStation 5 e altro.',
  alternates: { canonical: `${BASE_URL}/it/miglior-prezzo` },
}

export default function ItMigliorPrezzoHub() {
  const pages = landingPages.it.filter(p => p.type === 'best-price')
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Miglior Prezzo Oggi in Italia</h1>
      <p className="mt-3 text-gray-600">I prezzi più bassi sui prodotti più cercati, aggiornati ogni ora.</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map(p => (
          <li key={p.slug}>
            <Link
              href={`/it/miglior-prezzo/${p.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
            >
              {p.brandName && (
                <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">{p.brandName}</span>
              )}
              <p className="mt-1 font-medium text-gray-900">{p.h1}</p>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{p.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
