import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { SearchPage } from '@/components/pages/search-page'
import { searchProducts } from '@/lib/api/price-ninja'
import { type CountryCode } from '@/lib/countries'

export const runtime = 'edge'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

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
  
  // Fetch real products from price-ninja API
  const result = await searchProducts(query, {
    country,
    locale: 'en',
    sort: search.sort,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    brand: search.brand,
  })
  
  // Map to SearchPage expected format
  const products = result.products.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    image: p.image,
    lowestPrice: p.lowestPrice,
    currency: p.currency,
    offerCount: p.offerCount,
    inStock: p.inStock,
  }))

  return (
    <SearchPage
      query={query}
      products={products}
      totalCount={result.totalCount}
      brands={result.brands}
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
