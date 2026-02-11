import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { CategoryPage } from '@/components/pages/category-page'
import { searchProducts } from '@/lib/api/price-ninja'
import { type CountryCode } from '@/lib/countries'

export const runtime = 'edge'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

const categories: Record<string, { name: string; description: string; searchTerm: string }> = {
  smartphones: {
    name: 'Smartphones',
    description: 'Compare prices for iPhone, Samsung, Xiaomi and other smartphones.',
    searchTerm: 'smartphone',
  },
  laptops: {
    name: 'Laptops',
    description: 'Find the best prices for MacBooks, Windows notebooks and Chromebooks.',
    searchTerm: 'laptop notebook',
  },
  'tv-audio': {
    name: 'TV & Audio',
    description: 'Compare prices for Smart TVs, soundbars and headphones.',
    searchTerm: 'TV television',
  },
  appliances: {
    name: 'Appliances',
    description: 'Prices for washing machines, refrigerators and small appliances.',
    searchTerm: 'appliance',
  },
  gaming: {
    name: 'Gaming',
    description: 'Consoles, video games and gaming accessories at the best prices.',
    searchTerm: 'console gaming',
  },
  cameras: {
    name: 'Cameras',
    description: 'Digital cameras, mirrorless and photography accessories.',
    searchTerm: 'camera digital',
  },
}

interface PageProps {
  params: Promise<{ country: string; cat: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, cat } = await params
  const category = categories[cat]

  if (!validCountries.includes(country) || !category) return {}

  const dictionary = await getDictionary('en')
  const title = dictionary.seo.categoryTitle.replace('{category}', category.name)
  const description = category.description
  const canonicalUrl = `https://priceradars.com/en/${country}/category/${cat}`

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
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function EnglishCategoryPage({ params, searchParams }: PageProps) {
  const { country, cat } = await params
  const search = await searchParams

  if (!validCountries.includes(country)) {
    notFound()
  }

  const category = categories[cat]
  if (!category) {
    notFound()
  }

  const dictionary = await getDictionary('en')
  
  // Fetch real products from price-ninja
  const result = await searchProducts(category.searchTerm, {
    country,
    locale: 'en',
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
      locale="en"
      country={country as CountryCode}
      dictionary={dictionary}
    />
  )
}
