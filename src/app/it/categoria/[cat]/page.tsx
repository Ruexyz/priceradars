import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { CategoryPage } from '@/components/pages/category-page'
import { searchProducts } from '@/lib/api/price-ninja'

export const runtime = 'edge'

const categories: Record<string, { name: string; description: string; searchTerm: string; keywords: string }> = {
  smartphone: {
    name: 'Smartphone',
    description: 'Confronta prezzi per iPhone, Samsung, Xiaomi e altri smartphone. Trova le migliori offerte dai principali negozi online e risparmia.',
    searchTerm: 'smartphone cellulare',
    keywords: 'smartphone, iPhone, Samsung, Xiaomi, confronta prezzi smartphone, offerte cellulari, prezzo più basso',
  },
  laptop: {
    name: 'Laptop',
    description: 'Trova i migliori prezzi per MacBook, notebook Windows e Chromebook. Confronta offerte da decine di store e acquista al prezzo più basso.',
    searchTerm: 'laptop notebook portatile',
    keywords: 'laptop, notebook, MacBook, Chromebook, confronta prezzi portatili, offerte computer',
  },
  'tv-audio': {
    name: 'TV & Audio',
    description: 'Confronta prezzi per Smart TV, soundbar, cuffie e impianti audio. Offerte da Amazon, MediaWorld, Euronics e altri negozi.',
    searchTerm: 'smart TV televisore',
    keywords: 'Smart TV, televisore, soundbar, cuffie, confronta prezzi TV e audio',
  },
  elettrodomestici: {
    name: 'Elettrodomestici',
    description: 'Prezzi per lavatrici, frigoriferi, forni e piccoli elettrodomestici. Confronta e trova l\'offerta migliore per la tua casa.',
    searchTerm: 'lavatrice frigorifero forno',
    keywords: 'elettrodomestici, lavatrice, frigorifero, forno, confronta prezzi, offerte casa',
  },
  gaming: {
    name: 'Gaming',
    description: 'Console PlayStation, Xbox, Nintendo Switch, videogiochi e accessori gaming ai prezzi migliori. Confronta offerte e risparmia.',
    searchTerm: 'playstation xbox nintendo console',
    keywords: 'gaming, PlayStation, Xbox, Nintendo, console, videogiochi, confronta prezzi',
  },
  fotocamere: {
    name: 'Fotocamere',
    description: 'Fotocamere digitali, mirrorless, reflex e accessori fotografici. Confronta prezzi e trova le migliori offerte online.',
    searchTerm: 'fotocamera mirrorless reflex',
    keywords: 'fotocamera, mirrorless, reflex, fotografia, confronta prezzi fotocamere',
  },
  smartphones: {
    name: 'Smartphone',
    description: 'Confronta prezzi per iPhone, Samsung, Xiaomi e altri smartphone. Trova le migliori offerte dai principali negozi online e risparmia.',
    searchTerm: 'smartphone cellulare',
    keywords: 'smartphone, iPhone, Samsung, Xiaomi, confronta prezzi smartphone, offerte cellulari, prezzo più basso',
  },
  laptops: {
    name: 'Laptop',
    description: 'Trova i migliori prezzi per MacBook, notebook Windows e Chromebook. Confronta offerte da decine di store e acquista al prezzo più basso.',
    searchTerm: 'laptop notebook portatile',
    keywords: 'laptop, notebook, MacBook, Chromebook, confronta prezzi portatili, offerte computer',
  },
  appliances: {
    name: 'Elettrodomestici',
    description: 'Prezzi per lavatrici, frigoriferi, forni e piccoli elettrodomestici. Confronta e trova l\'offerta migliore per la tua casa.',
    searchTerm: 'lavatrice frigorifero forno',
    keywords: 'elettrodomestici, lavatrice, frigorifero, forno, confronta prezzi, offerte casa',
  },
  cameras: {
    name: 'Fotocamere',
    description: 'Fotocamere digitali, mirrorless, reflex e accessori fotografici. Confronta prezzi e trova le migliori offerte online.',
    searchTerm: 'fotocamera mirrorless reflex',
    keywords: 'fotocamera, mirrorless, reflex, fotografia, confronta prezzi fotocamere',
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
    keywords: category.keywords,
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
      card: 'summary_large_image',
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
    merchantId: search.merchantId,
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
      merchants={result.facets.merchants}
      currentFilters={{
        ...search,
      }}
      locale="it"
      country="it"
      dictionary={dictionary}
    />
  )
}
