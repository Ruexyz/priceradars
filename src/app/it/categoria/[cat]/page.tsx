import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { CategoryPage } from '@/components/pages/category-page'

export const runtime = 'edge'

const categories: Record<string, { name: string; description: string }> = {
  smartphones: {
    name: 'Smartphone',
    description: 'Confronta prezzi per iPhone, Samsung, Xiaomi e altri smartphone.',
  },
  laptops: {
    name: 'Laptop',
    description: 'Trova i migliori prezzi per MacBook, notebook Windows e Chromebook.',
  },
  'tv-audio': {
    name: 'TV & Audio',
    description: 'Confronta prezzi per Smart TV, soundbar e cuffie.',
  },
  appliances: {
    name: 'Elettrodomestici',
    description: 'Prezzi per lavatrici, frigoriferi e piccoli elettrodomestici.',
  },
  gaming: {
    name: 'Gaming',
    description: 'Console, videogiochi e accessori gaming ai prezzi migliori.',
  },
  cameras: {
    name: 'Fotocamere',
    description: 'Fotocamere digitali, mirrorless e accessori fotografici.',
  },
}

interface ProductFilters {
  sort?: string
  minPrice?: string
  maxPrice?: string
  brand?: string | string[]
}

const getMockProducts = (category: string, filters: ProductFilters = {}) => {
  let products = [
    {
      id: '1',
      slug: 'iphone-15-pro-256gb',
      name: 'iPhone 15 Pro 256GB',
      brand: 'Apple',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=iPhone+15+Pro&font=inter',
      lowestPrice: 99900,
      currency: 'EUR',
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
      lowestPrice: 119900,
      currency: 'EUR',
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
      lowestPrice: 89900,
      currency: 'EUR',
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
      lowestPrice: 79900,
      currency: 'EUR',
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
      lowestPrice: 69900,
      currency: 'EUR',
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
      lowestPrice: 54900,
      currency: 'EUR',
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
  const products = getMockProducts(cat, {
    sort: search.sort,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    brand: search.brand,
  })
  const brands = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Oppo', 'Motorola', 'Nothing', 'Realme', 'Honor']

  // Category-specific filters
  const screenSizes = cat === 'smartphones' || cat === 'laptops' || cat === 'tv-audio' ? [
    { value: 'small', label: 'Fino a 6,1"', count: 45 },
    { value: 'medium', label: 'Da 6,1" a 6,7"', count: 120 },
    { value: 'large', label: 'Più di 6,7"', count: 35 },
  ] : undefined

  const storageOptions = cat === 'smartphones' || cat === 'laptops' ? [
    { value: '64gb', label: '64 GB', count: 12 },
    { value: '128gb', label: '128 GB', count: 58 },
    { value: '256gb', label: '256 GB', count: 89 },
    { value: '512gb', label: '512 GB', count: 45 },
    { value: '1tb', label: '1 TB', count: 23 },
  ] : undefined

  const colors = [
    { value: 'black', label: 'Nero', count: 156 },
    { value: 'white', label: 'Bianco', count: 98 },
    { value: 'blue', label: 'Blu', count: 67 },
    { value: 'silver', label: 'Argento', count: 54 },
    { value: 'gold', label: 'Oro', count: 32 },
    { value: 'purple', label: 'Viola', count: 28 },
    { value: 'green', label: 'Verde', count: 21 },
    { value: 'red', label: 'Rosso', count: 15 },
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
      locale="it"
      country="it"
      dictionary={dictionary}
      screenSizes={screenSizes}
      storageOptions={storageOptions}
      colors={colors}
    />
  )
}
