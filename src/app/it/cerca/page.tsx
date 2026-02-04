import { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import { SearchPage } from '@/components/pages/search-page'

export const runtime = 'edge'

// Database di prodotti mock per la ricerca
const allProducts = [
  // Smartphones
  {
    id: '1',
    slug: 'iphone-15-pro-256gb',
    name: 'iPhone 15 Pro 256GB',
    brand: 'Apple',
    category: 'smartphone',
    image: 'https://placehold.co/400x400/FF6B00/ffffff?text=iPhone+15+Pro',
    lowestPrice: 99900,
    currency: 'EUR',
    offerCount: 8,
    inStock: true,
  },
  {
    id: '2',
    slug: 'iphone-15-128gb',
    name: 'iPhone 15 128GB',
    brand: 'Apple',
    category: 'smartphone',
    image: 'https://placehold.co/400x400/FF6B00/ffffff?text=iPhone+15',
    lowestPrice: 79900,
    currency: 'EUR',
    offerCount: 12,
    inStock: true,
  },
  {
    id: '3',
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    brand: 'Samsung',
    category: 'smartphone',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+S24+Ultra',
    lowestPrice: 119900,
    currency: 'EUR',
    offerCount: 15,
    inStock: true,
  },
  {
    id: '4',
    slug: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24 128GB',
    brand: 'Samsung',
    category: 'smartphone',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+S24',
    lowestPrice: 69900,
    currency: 'EUR',
    offerCount: 10,
    inStock: true,
  },
  {
    id: '5',
    slug: 'google-pixel-8-pro',
    name: 'Google Pixel 8 Pro 256GB',
    brand: 'Google',
    category: 'smartphone',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Pixel+8+Pro',
    lowestPrice: 89900,
    currency: 'EUR',
    offerCount: 6,
    inStock: true,
  },
  {
    id: '6',
    slug: 'xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra 512GB',
    brand: 'Xiaomi',
    category: 'smartphone',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Xiaomi+14+Ultra',
    lowestPrice: 109900,
    currency: 'EUR',
    offerCount: 5,
    inStock: true,
  },
  // Laptops
  {
    id: '7',
    slug: 'macbook-air-m3-13',
    name: 'MacBook Air M3 13" 256GB',
    brand: 'Apple',
    category: 'laptop',
    image: 'https://placehold.co/400x400/FF6B00/ffffff?text=MacBook+Air+M3',
    lowestPrice: 119900,
    currency: 'EUR',
    offerCount: 8,
    inStock: true,
  },
  {
    id: '8',
    slug: 'macbook-pro-m3-14',
    name: 'MacBook Pro M3 14" 512GB',
    brand: 'Apple',
    category: 'laptop',
    image: 'https://placehold.co/400x400/FF6B00/ffffff?text=MacBook+Pro+M3',
    lowestPrice: 179900,
    currency: 'EUR',
    offerCount: 6,
    inStock: true,
  },
  {
    id: '9',
    slug: 'dell-xps-15',
    name: 'Dell XPS 15 Intel Core i7 512GB',
    brand: 'Dell',
    category: 'laptop',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Dell+XPS+15',
    lowestPrice: 149900,
    currency: 'EUR',
    offerCount: 7,
    inStock: true,
  },
  {
    id: '10',
    slug: 'lenovo-thinkpad-x1-carbon',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    brand: 'Lenovo',
    category: 'laptop',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=ThinkPad+X1',
    lowestPrice: 159900,
    currency: 'EUR',
    offerCount: 5,
    inStock: true,
  },
  // TV
  {
    id: '11',
    slug: 'samsung-qled-65-q80c',
    name: 'Samsung QLED 65" Q80C 4K',
    brand: 'Samsung',
    category: 'tv',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Samsung+TV+65',
    lowestPrice: 99900,
    currency: 'EUR',
    offerCount: 9,
    inStock: true,
  },
  {
    id: '12',
    slug: 'lg-oled-55-c3',
    name: 'LG OLED 55" C3 4K',
    brand: 'LG',
    category: 'tv',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=LG+OLED+55',
    lowestPrice: 119900,
    currency: 'EUR',
    offerCount: 11,
    inStock: true,
  },
  {
    id: '13',
    slug: 'sony-bravia-xr-65-a80l',
    name: 'Sony Bravia XR 65" A80L OLED',
    brand: 'Sony',
    category: 'tv',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Sony+Bravia+65',
    lowestPrice: 179900,
    currency: 'EUR',
    offerCount: 4,
    inStock: true,
  },
  // Audio
  {
    id: '14',
    slug: 'apple-airpods-pro-2',
    name: 'Apple AirPods Pro 2',
    brand: 'Apple',
    category: 'audio',
    image: 'https://placehold.co/400x400/FF6B00/ffffff?text=AirPods+Pro+2',
    lowestPrice: 24900,
    currency: 'EUR',
    offerCount: 14,
    inStock: true,
  },
  {
    id: '15',
    slug: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Cuffie Wireless',
    brand: 'Sony',
    category: 'audio',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Sony+WH-1000XM5',
    lowestPrice: 32900,
    currency: 'EUR',
    offerCount: 10,
    inStock: true,
  },
  {
    id: '16',
    slug: 'bose-quietcomfort-ultra',
    name: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    category: 'audio',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Bose+QC+Ultra',
    lowestPrice: 39900,
    currency: 'EUR',
    offerCount: 6,
    inStock: true,
  },
  // Tablets
  {
    id: '17',
    slug: 'ipad-pro-12-9-m2',
    name: 'iPad Pro 12.9" M2 256GB',
    brand: 'Apple',
    category: 'tablet',
    image: 'https://placehold.co/400x400/FF6B00/ffffff?text=iPad+Pro+12.9',
    lowestPrice: 139900,
    currency: 'EUR',
    offerCount: 7,
    inStock: true,
  },
  {
    id: '18',
    slug: 'samsung-galaxy-tab-s9-ultra',
    name: 'Samsung Galaxy Tab S9 Ultra 256GB',
    brand: 'Samsung',
    category: 'tablet',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+Tab+S9',
    lowestPrice: 119900,
    currency: 'EUR',
    offerCount: 5,
    inStock: true,
  },
  // Gaming
  {
    id: '19',
    slug: 'playstation-5-slim',
    name: 'PlayStation 5 Slim Digital Edition',
    brand: 'Sony',
    category: 'gaming',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=PS5+Slim',
    lowestPrice: 44900,
    currency: 'EUR',
    offerCount: 12,
    inStock: true,
  },
  {
    id: '20',
    slug: 'xbox-series-x',
    name: 'Xbox Series X 1TB',
    brand: 'Microsoft',
    category: 'gaming',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Xbox+Series+X',
    lowestPrice: 47900,
    currency: 'EUR',
    offerCount: 8,
    inStock: true,
  },
]

interface SearchFilters {
  sort?: string
  minPrice?: string
  maxPrice?: string
  brand?: string | string[]
}

const getMockProducts = (query: string, filters: SearchFilters = {}) => {
  if (!query) return []
  
  const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 1)
  
  // Filtra per query di ricerca
  let results = allProducts.filter(product => {
    const searchableText = `${product.name} ${product.brand} ${product.category}`.toLowerCase()
    return searchTerms.some(term => searchableText.includes(term))
  })
  
  // Filtra per brand
  if (filters.brand) {
    const brands = Array.isArray(filters.brand) ? filters.brand : [filters.brand]
    results = results.filter(p => 
      brands.some(b => p.brand.toLowerCase() === b.toLowerCase())
    )
  }
  
  // Filtra per prezzo minimo
  if (filters.minPrice) {
    const min = parseInt(filters.minPrice)
    results = results.filter(p => p.lowestPrice >= min)
  }
  
  // Filtra per prezzo massimo
  if (filters.maxPrice) {
    const max = parseInt(filters.maxPrice)
    results = results.filter(p => p.lowestPrice <= max)
  }
  
  // Ordina i risultati
  switch (filters.sort) {
    case 'price_asc':
      results.sort((a, b) => a.lowestPrice - b.lowestPrice)
      break
    case 'price_desc':
      results.sort((a, b) => b.lowestPrice - a.lowestPrice)
      break
    case 'popular':
      results.sort((a, b) => b.offerCount - a.offerCount)
      break
    case 'newest':
    default:
      // Per "relevance" o "newest", ordina per numero di match
      results.sort((a, b) => {
        const aMatches = searchTerms.filter(t => 
          `${a.name} ${a.brand}`.toLowerCase().includes(t)
        ).length
        const bMatches = searchTerms.filter(t => 
          `${b.name} ${b.brand}`.toLowerCase().includes(t)
        ).length
        return bMatches - aMatches
      })
  }
  
  return results
}

// Estrai tutti i brand unici dai prodotti
const getAllBrands = () => {
  return [...new Set(allProducts.map(p => p.brand))].sort()
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
  
  const products = getMockProducts(query, {
    sort: search.sort,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    brand: search.brand,
  })
  
  const brands = getAllBrands()

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
