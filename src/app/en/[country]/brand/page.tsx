import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { landingPages } from '@/lib/seo/landing-pages'
import type { CountryCode } from '@/lib/countries'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'
const validCountries = ['uk', 'us', 'de', 'fr', 'es']

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params
  return {
    title: `Compare Prices by Brand | PriceRadars`,
    description: `Compare prices by brand: Apple, Samsung, Sony, LG, Dyson and more. Find the best deals in ${country.toUpperCase()}.`,
    alternates: { canonical: `${BASE_URL}/en/${country}/brand` },
  }
}

export default async function EnBrandHub({ params }: PageProps) {
  const { country } = await params
  if (!validCountries.includes(country)) notFound()

  const brands = (landingPages[country as CountryCode] || []).filter(p => p.type === 'brand')

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Compare Prices by Brand</h1>
      <p className="mt-3 text-gray-600">Select a brand to compare prices.</p>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map(b => (
          <li key={b.slug}>
            <Link
              href={`/en/${country}/brand/${b.slug}`}
              className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center font-semibold text-gray-900 shadow-sm hover:border-orange-400 hover:text-orange-600 transition-colors"
            >
              {b.brandName || b.slug}
            </Link>
          </li>
        ))}
        {brands.length === 0 && (
          <li className="col-span-4 py-12 text-center text-gray-400">Coming soon.</li>
        )}
      </ul>
    </main>
  )
}
