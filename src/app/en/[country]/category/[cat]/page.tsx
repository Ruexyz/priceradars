import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { CategoryPage } from '@/components/pages/category-page'
import { countries, type CountryCode } from '@/lib/countries'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

const categories: Record<string, { name: string; description: string }> = {
  smartphones: {
    name: 'Smartphones',
    description: 'Compare prices for iPhone, Samsung, Xiaomi and other smartphones.',
  },
  laptops: {
    name: 'Laptops',
    description: 'Find the best prices for MacBooks, Windows notebooks and Chromebooks.',
  },
  'tv-audio': {
    name: 'TV & Audio',
    description: 'Compare prices for Smart TVs, soundbars and headphones.',
  },
  appliances: {
    name: 'Appliances',
    description: 'Prices for washing machines, refrigerators and small appliances.',
  },
  gaming: {
    name: 'Gaming',
    description: 'Consoles, video games and gaming accessories at the best prices.',
  },
  cameras: {
    name: 'Cameras',
    description: 'Digital cameras, mirrorless and photography accessories.',
  },
}

interface ProductFilters {
  sort?: string
  minPrice?: string
  maxPrice?: string
  brand?: string | string[]
}

const getMockProducts = (category: string, countryCode: string, filters: ProductFilters = {}) => {
  const countryConfig = countries[countryCode as CountryCode]
  const currency = countryConfig?.currency || 'EUR'
  const priceMultiplier = currency === 'GBP' ? 0.85 : currency === 'USD' ? 1.1 : 1

  let products = [
    {
      id: '1',
      slug: 'iphone-15-pro-256gb',
      name: 'iPhone 15 Pro 256GB',
      brand: 'Apple',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=iPhone+15+Pro&font=inter',
      lowestPrice: Math.round(99900 * priceMultiplier),
      currency,
      offerCount: 8,
      inStock: true,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=Galaxy+S24&font=inter',
      lowestPrice: Math.round(119900 * priceMultiplier),
      currency,
      offerCount: 12,
      inStock: true,
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      slug: 'google-pixel-8-pro',
      name: 'Google Pixel 8 Pro',
      brand: 'Google',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=Pixel+8+Pro&font=inter',
      lowestPrice: Math.round(89900 * priceMultiplier),
      currency,
      offerCount: 6,
      inStock: true,
      createdAt: new Date('2023-10-12'),
    },
    {
      id: '4',
      slug: 'xiaomi-14-ultra',
      name: 'Xiaomi 14 Ultra',
      brand: 'Xiaomi',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=Xiaomi+14&font=inter',
      lowestPrice: Math.round(79900 * priceMultiplier),
      currency,
      offerCount: 10,
      inStock: true,
      createdAt: new Date('2024-02-25'),
    },
    {
      id: '5',
      slug: 'oneplus-12',
      name: 'OnePlus 12',
      brand: 'OnePlus',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=OnePlus+12&font=inter',
      lowestPrice: Math.round(69900 * priceMultiplier),
      currency,
      offerCount: 7,
      inStock: true,
      createdAt: new Date('2024-01-23'),
    },
    {
      id: '6',
      slug: 'nothing-phone-2',
      name: 'Nothing Phone (2)',
      brand: 'Nothing',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=Nothing+Phone+2&font=inter',
      lowestPrice: Math.round(54900 * priceMultiplier),
      currency,
      offerCount: 5,
      inStock: true,
      createdAt: new Date('2023-07-11'),
    },
  ]

  // Filter by price range
  if (filters.minPrice) {
    const minPrice = parseInt(filters.minPrice)
    products = products.filter(p => p.lowestPrice >= minPrice)
  }
  if (filters.maxPrice) {
    const maxPrice = parseInt(filters.maxPrice)
    products = products.filter(p => p.lowestPrice <= maxPrice)
  }

  // Filter by brand
  if (filters.brand) {
    const brands = Array.isArray(filters.brand) ? filters.brand : [filters.brand]
    products = products.filter(p => brands.includes(p.brand.toLowerCase()))
  }

  // Sort products
  switch (filters.sort) {
    case 'price_asc':
      products.sort((a, b) => a.lowestPrice - b.lowestPrice)
      break
    case 'price_desc':
      products.sort((a, b) => b.lowestPrice - a.lowestPrice)
      break
    case 'newest':
      products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case 'popular':
      products.sort((a, b) => b.offerCount - a.offerCount)
      break
    default:
      // relevance - keep default order
      break
  }

  return products
}

interface PageProps {
  params: Promise<{ country: string; cat: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, cat } = await params
  const category = categories[cat]

  if (!validCountries.includes(country) || !category) {
    return {}
  }

  const dictionary = await getDictionary('en')

  return {
    title: dictionary.seo.categoryTitle.replace('{category}', category.name),
    description: dictionary.seo.categoryDescription.replace('{category}', category.name),
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
  const products = getMockProducts(cat, country, {
    sort: search.sort,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    brand: search.brand,
  })
  const brands = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Oppo', 'Motorola', 'Nothing', 'Realme', 'Honor']

  // Category-specific filters
  const screenSizes = cat === 'smartphones' || cat === 'laptops' || cat === 'tv-audio' ? [
    { value: 'small', label: 'Up to 6.1"', count: 45 },
    { value: 'medium', label: '6.1" to 6.7"', count: 120 },
    { value: 'large', label: 'Over 6.7"', count: 35 },
  ] : undefined

  const storageOptions = cat === 'smartphones' || cat === 'laptops' ? [
    { value: '64gb', label: '64 GB', count: 12 },
    { value: '128gb', label: '128 GB', count: 58 },
    { value: '256gb', label: '256 GB', count: 89 },
    { value: '512gb', label: '512 GB', count: 45 },
    { value: '1tb', label: '1 TB', count: 23 },
  ] : undefined

  const colors = [
    { value: 'black', label: 'Black', count: 156 },
    { value: 'white', label: 'White', count: 98 },
    { value: 'blue', label: 'Blue', count: 67 },
    { value: 'silver', label: 'Silver', count: 54 },
    { value: 'gold', label: 'Gold', count: 32 },
    { value: 'purple', label: 'Purple', count: 28 },
    { value: 'green', label: 'Green', count: 21 },
    { value: 'red', label: 'Red', count: 15 },
  ]

  return (
    <CategoryPage
      category={{ slug: cat, ...category }}
      products={products}
      totalCount={products.length}
      brands={brands}
      currentFilters={{
        ...search,
      }}
      locale="en"
      country={country as CountryCode}
      dictionary={dictionary}
      screenSizes={screenSizes}
      storageOptions={storageOptions}
      colors={colors}
    />
  )
}
