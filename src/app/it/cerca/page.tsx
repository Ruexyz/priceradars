import { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import { SearchPage } from '@/components/pages/search-page'
import { searchProducts } from '@/lib/api/price-ninja'

export const runtime = 'edge'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const search = await searchParams
  const query = search.q || ''
  const dictionary = await getDictionary('it')

  return {
    title: query
      ? `${dictionary.search.resultsFor.replace('{query}', query)} | PriceRadars`
      : dictionary.search.title,
  }
}

export default async function ItalianSearchPage({ searchParams }: PageProps) {
  const search = await searchParams
  const query = search.q || ''
  const dictionary = await getDictionary('it')
  
  // Fetch real products from price-ninja API
  const result = await searchProducts(query, {
    country: 'it',
    locale: 'it',
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
      locale="it"
      country="it"
      dictionary={dictionary}
    />
  )
}
