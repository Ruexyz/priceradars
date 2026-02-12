import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { CategoryPage } from '@/components/pages/category-page'
import { searchProducts } from '@/lib/api/price-ninja'

export const runtime = 'edge'

const categories: Record<string, { name: string; description: string; searchTerm: string }> = {
  // Italian slugs
  smartphone: {
    name: 'Smartphone',
    description: 'Confronta prezzi per iPhone, Samsung, Xiaomi e altri smartphone.',
    searchTerm: 'smartphone cellulare',
  },
  laptop: {
    name: 'Laptop',
    description: 'Trova i migliori prezzi per MacBook, notebook Windows e Chromebook.',
    searchTerm: 'laptop notebook portatile',
  },
  'tv-audio': {
    name: 'TV & Audio',
    description: 'Confronta prezzi per Smart TV, soundbar e cuffie.',
    searchTerm: 'smart TV televisore',
  },
  elettrodomestici: {
    name: 'Elettrodomestici',
    description: 'Prezzi per lavatrici, frigoriferi e piccoli elettrodomestici.',
    searchTerm: 'lavatrice frigorifero forno',
  },
  gaming: {
    name: 'Gaming',
    description: 'Console, videogiochi e accessori gaming ai prezzi migliori.',
    searchTerm: 'playstation xbox nintendo console',
  },
  fotocamere: {
    name: 'Fotocamere',
    description: 'Fotocamere digitali, mirrorless e accessori fotografici.',
    searchTerm: 'fotocamera mirrorless reflex',
  },
  // English slug aliases (backward compatibility)
  smartphones: {
    name: 'Smartphone',
    description: 'Confronta prezzi per iPhone, Samsung, Xiaomi e altri smartphone.',
    searchTerm: 'smartphone cellulare',
  },
  laptops: {
    name: 'Laptop',
    description: 'Trova i migliori prezzi per MacBook, notebook Windows e Chromebook.',
    searchTerm: 'laptop notebook portatile',
  },
  appliances: {
    name: 'Elettrodomestici',
    description: 'Prezzi per lavatrici, frigoriferi e piccoli elettrodomestici.',
    searchTerm: 'lavatrice frigorifero forno',
  },
  cameras: {
    name: 'Fotocamere',
    description: 'Fotocamere digitali, mirrorless e accessori fotografici.',
    searchTerm: 'fotocamera mirrorless reflex',
  },
}

interface PageProps {
  params: Promise<{ cat: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

const BASE_URL = 'https://priceradars.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cat } = await params
  const category = categories[cat]
  if (!category) return {}

  const dictionary = await getDictionary('it')
  const title = dictionary.seo.categoryTitle.replace('{category}', category.name)
  const description = category.description
  const canonicalUrl = `${BASE_URL}/it/categoria/${cat}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'PriceRadars',
      locale: 'it_IT',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
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
