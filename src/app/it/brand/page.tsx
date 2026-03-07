import { Metadata } from 'next'
import Link from 'next/link'
import { landingPages } from '@/lib/seo/landing-pages'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'

export const metadata: Metadata = {
  title: 'Brand | Confronta Prezzi per Marca | PriceRadars',
  description: 'Confronta prezzi per marca: Apple, Samsung, Sony, LG, Dyson e altri. Trova le migliori offerte su tutti i prodotti del tuo brand preferito.',
  alternates: { canonical: `${BASE_URL}/it/brand` },
}

export default function ItBrandHub() {
  const brands = landingPages.it.filter(p => p.type === 'brand')
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Confronta Prezzi per Brand</h1>
      <p className="mt-3 text-gray-600">Seleziona un brand per vedere le migliori offerte in Italia.</p>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map(b => (
          <li key={b.slug}>
            <Link
              href={`/it/brand/${b.slug}`}
              className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center font-semibold text-gray-900 shadow-sm hover:border-orange-400 hover:text-orange-600 transition-colors"
            >
              {b.brandName || b.slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
