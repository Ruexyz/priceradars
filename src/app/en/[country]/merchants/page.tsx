import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Store, ExternalLink } from 'lucide-react'
import { getMerchants } from '@/lib/api/price-ninja'
import { countries, type CountryCode } from '@/lib/countries'

export const runtime = 'edge'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params
  const config = countries[country as CountryCode]
  if (!config) return {}

  return {
    title: `Partner Stores – ${config.name}`,
    description: `List of online stores compared by PriceRadars in ${config.name}.`,
  }
}

export default async function MerchantsPage({ params }: PageProps) {
  const { country } = await params

  if (!validCountries.includes(country)) {
    notFound()
  }

  const config = countries[country as CountryCode]
  const merchants = await getMerchants(country)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Partner Stores</h1>
        <p className="mt-3 text-gray-600">
          We compare prices from {merchants.length} online stores in {config.name} to find you the best deal.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {merchants.map((merchant) => (
          <div
            key={merchant.id}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-colors hover:border-gray-200"
          >
            {merchant.logoUrl ? (
              <img
                src={merchant.logoUrl}
                alt={merchant.name}
                className="h-10 w-10 shrink-0 rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Store className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900">{merchant.name}</p>
              {merchant.domain && (
                <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  {merchant.domain}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-gray-100 bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600">
          PriceRadars automatically compares prices from all these stores.
          Prices are updated regularly to ensure maximum accuracy.
        </p>
      </div>
    </div>
  )
}
