import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { CategoryPage } from '@/components/pages/category-page'
import { searchProducts } from '@/lib/api/price-ninja'

export const runtime = 'edge'

const categories: Record<string, { name: string; description: string; searchTerm: string }> = {
  smartphones: {
    name: 'Smartphone',
    description: 'Confronta prezzi per iPhone, Samsung, Xiaomi e altri smartphone.',
    searchTerm: 'smartphone',
  },
  laptops: {
    name: 'Laptop',
    description: 'Trova i migliori prezzi per MacBook, notebook Windows e Chromebook.',
    searchTerm: 'laptop notebook',
  },
  'tv-audio': {
    name: 'TV & Audio',
    description: 'Confronta prezzi per Smart TV, soundbar e cuffie.',
    searchTerm: 'TV televisore',
  },
  appliances: {
    name: 'Elettrodomestici',
    description: 'Prezzi per lavatrici, frigoriferi e piccoli elettrodomestici.',
    searchTerm: 'elettrodomestico',
  },
  gaming: {
    name: 'Gaming',
    description: 'Console, videogiochi e accessori gaming ai prezzi migliori.',
    searchTerm: 'console gaming',
  },
  cameras: {
    name: 'Fotocamere',
    description: 'Fotocamere digitali, mirrorless e accessori fotografici.',
    searchTerm: 'fotocamera digitale',
  },
}

interface PageProps {
  params: Promise<{ cat: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cat } = await params
  const category = categories[cat]

  if (!category) {
    return {}
  }

  const dictionary = await getDictionary('it')

  return {
    title: dictionary.seo.categoryTitle.replace('{category}', category.name),
    description: dictionary.seo.categoryDescription.replace('{category}', category.name),
  }
}

export default async function ItalianCategoryPage({ params, searchParams }: PageProps) {
  const { cat } = await params
  const search = await searchParams
  const category = categories[cat]

  if (!category) {
    notFound()
  }

  const dictionary = await getDictionary('it')
  
  // Fetch real products from price-ninja
  const result = await searchProducts(category.searchTerm, {
    country: 'it',
    locale: 'it',
    sort: search.sort,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    brand: search.brand,
  })

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
    <CategoryPage
      category={{ slug: cat, ...category }}
      products={products}
      totalCount={result.totalCount}
      brands={result.brands}
      currentFilters={{
        ...search,
      }}
      locale="it"
      country="it"
      dictionary={dictionary}
    />
  )
}
