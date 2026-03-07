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
    title: `Best Deals by Price Range | PriceRadars`,
    description: `Best products by price: smartphones under £300, laptops under £600, TVs under £500 and more. Find the best deals.`,
    alternates: { canonical: `${BASE_URL}/en/${country}/deals` },
  }
}

export default async function EnDealsHub({ params }: PageProps) {
  const { country } = await params
  if (!validCountries.includes(country)) notFound()

  const pages = (landingPages[country as CountryCode] || []).filter(p => p.type === 'under-x')

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Best Deals by Price Range</h1>
      <p className="mt-3 text-gray-600">Find the best products in your budget. Prices updated every hour.</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map(p => (
          <li key={p.slug}>
            <Link
              href={`/en/${country}/deals/${p.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-orange-400 hover:shadow-md transition-all"
            >
              <span className="text-sm font-semibold text-orange-600">{p.threshold}</span>
              <p className="mt-1 font-medium text-gray-900">{p.h1}</p>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{p.description}</p>
            </Link>
          </li>
        ))}
        {pages.length === 0 && (
          <li className="col-span-3 py-12 text-center text-gray-400">Coming soon.</li>
        )}
      </ul>
    </main>
  )
}
