import { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import { SearchPage } from '@/components/pages/search-page'

const getMockProducts = (query: string) => {
  if (!query) return []
  
  return [
    {
      id: '1',
      slug: 'iphone-15-pro-256gb',
      name: 'iPhone 15 Pro 256GB',
      brand: 'Apple',
      image: 'https://placehold.co/400x400/f5f5f5/171717?text=iPhone+15',
      lowestPrice: 99900,
      currency: 'EUR',
      offerCount: 8,
      inStock: true,
    },
    {
      id: '2',
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+S24',
      lowestPrice: 119900,
      currency: 'EUR',
      offerCount: 12,
      inStock: true,
    },
  ]
}

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
  const products = getMockProducts(query)
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
      locale="it"
      country="it"
      dictionary={dictionary}
    />
  )
}
