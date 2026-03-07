import { Metadata } from 'next'
import Link from 'next/link'
import { landingPages } from '@/lib/seo/landing-pages'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'

export const metadata: Metadata = {
  title: 'Offerte Prodotti Sotto Soglia | PriceRadars',
  description: 'Le migliori offerte: smartphone sotto 300€, laptop sotto 700€, TV sotto 500€ e altro. Trova i migliori prodotti nella tua fascia di prezzo.',
  alternates: { canonical: `${BASE_URL}/it/offerte` },
}

export default function ItOffertaHub() {
  const offers = landingPages.it.filter(p => p.type === 'under-x')
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Offerte per Fascia di Prezzo</h1>
      <p className="mt-3 text-gray-600">Trova i migliori prodotti nella tua fascia di prezzo in Italia.</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map(o => (
          <li key={o.slug}>
            <Link
              href={`/it/offerte/${o.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
            >
              <span className="text-sm font-semibold text-orange-600">{o.threshold}</span>
              <p className="mt-1 font-medium text-gray-900">{o.h1}</p>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{o.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
