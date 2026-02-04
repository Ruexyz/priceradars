import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { SearchPage } from '@/components/pages/search-page'
import { countries, type CountryCode } from '@/lib/countries'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

const getMockProducts = (query: string, countryCode: string) => {
  if (!query) return []
  
  const countryConfig = countries[countryCode as CountryCode]
  const currency = countryConfig?.currency || 'EUR'
  const priceMultiplier = currency === 'GBP' ? 0.85 : currency === 'USD' ? 1.1 : 1

  return [
    {
      id: '1',
      slug: 'iphone-15-pro-256gb',
      name: 'iPhone 15 Pro 256GB',
      brand: 'Apple',
      image: 'https://placehold.co/400x400/f5f5f5/171717?text=iPhone+15',
      lowestPrice: Math.round(99900 * priceMultiplier),
      currency,
      offerCount: 8,
      inStock: true,
    },
    {
      id: '2',
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+S24',
      lowestPrice: Math.round(119900 * priceMultiplier),
      currency,
      offerCount: 12,
      inStock: true,
    },
  ]
}

interface PageProps {
  params: Promise<{ country: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { country } = await params
  const search = await searchParams
  const query = search.q || ''

  if (!validCountries.includes(country)) {
    return {}
  }

  const dictionary = await getDictionary('en')

  return {
    title: query
      ? `${dictionary.search.resultsFor.replace('{query}', query)} | PriceRadars`
      : dictionary.search.title,
  }
}

export default async function EnglishSearchPage({ params, searchParams }: PageProps) {
  const { country } = await params
  const search = await searchParams

  if (!validCountries.includes(country)) {
    notFound()
  }

  const query = search.q || ''
  const dictionary = await getDictionary('en')
  const products = getMockProducts(query, country)
  const brands = ['Apple', 'Samsung', 'Google', 'Xiaomi']

  return (
    <SearchPage
      query={query}
      products={products}
      totalCount={products.length}
      brands={brands}
      currentFilters={{
        minPrice: search.minPrice,
        maxPrice: search.maxPrice,
        brand: search.brand,
        sort: search.sort,
      }}
      locale="en"
      country={country as CountryCode}
      dictionary={dictionary}
    />
  )
}
