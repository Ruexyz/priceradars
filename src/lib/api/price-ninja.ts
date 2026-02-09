/**
 * Price Ninja API Adapter
 * 
 * Server-side only - never expose the token to the client.
 * Transforms price-ninja responses into PriceRadars format.
 */

const API_BASE = 'https://www.price-ninja.online/api'
const API_TOKEN = '72e41012012ee1ed774153425cb962a45ddeae7a'

// --- Raw API types (what price-ninja returns) ---

interface PriceNinjaProduct {
  uuid: string
  merchant_name: string
  merchant_domain: string
  name: string
  description: string
  description_short: string
  deeplink: string
  category_tree: string[]
  price: number           // EUR decimals (42.54)
  original_price: number
  saving: number
  discount: number        // percentage (25.0)
  delivery_cost: number | null
  delivery_time: string | null
  in_stock: boolean
  condition: string       // "NEW", etc.
  primary_image_url: string
  countries: Record<string, string>
  brand_name: string
  _currency: string
  url: string
  identifier_gtin: string | null
  identifier_ean: string | null
}

interface PriceNinjaSearchResponse {
  count: number
  next: string | null
  previous: string | null
  results: PriceNinjaProduct[]
}

interface PriceNinjaProductDetail extends PriceNinjaProduct {
  specs?: Record<string, string>
  images?: string[]
}

// --- PriceRadars normalized types ---

export interface NormalizedProduct {
  id: string
  slug: string
  name: string
  brand: string
  image: string
  lowestPrice: number    // in cents (4254)
  originalPrice: number  // in cents
  currency: string
  discount: number       // percentage
  offerCount: number
  inStock: boolean
  merchantName: string
  merchantDomain: string
  deeplink: string
  description: string
  condition: string
  deliveryCost: number | null
}

export interface SearchResult {
  products: NormalizedProduct[]
  totalCount: number
  brands: string[]
  priceRange: { min: number; max: number }
}

// --- Country code mapping ---

const COUNTRY_MAP: Record<string, string> = {
  it: 'IT',
  uk: 'GB',
  us: 'US',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
}

const LANGUAGE_MAP: Record<string, string> = {
  it: 'it',
  en: 'en',
}

// --- Helpers ---

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function extractBrand(name: string, brandName: string): string {
  if (brandName && brandName.trim()) return brandName.trim()
  
  // Try to extract brand from the product name
  const knownBrands = [
    'Apple', 'Samsung', 'Sony', 'LG', 'Google', 'Xiaomi', 'Huawei', 'OnePlus',
    'Dell', 'Lenovo', 'HP', 'Asus', 'Acer', 'MSI', 'Microsoft', 'Nintendo',
    'Bose', 'JBL', 'Sennheiser', 'Dyson', 'Bosch', 'Philips', 'Panasonic',
    'Canon', 'Nikon', 'GoPro', 'DJI', 'Logitech', 'Razer', 'Corsair',
    'Cardo', 'Sena', 'Midland', 'Interphone', 'Motorola', 'Kenwood',
    'Garmin', 'TomTom', 'Fitbit', 'Polar', 'Suunto', 'Amazfit',
  ]
  
  const nameLower = name.toLowerCase()
  for (const brand of knownBrands) {
    if (nameLower.includes(brand.toLowerCase())) {
      return brand
    }
  }
  
  // Fallback: use first word as brand if it looks capitalized
  const firstWord = name.split(' ')[0]
  if (firstWord && firstWord[0] === firstWord[0].toUpperCase() && firstWord.length > 1) {
    return firstWord
  }
  
  return ''
}

function normalizeProduct(raw: PriceNinjaProduct): NormalizedProduct {
  // Use UUID as slug for reliable product detail lookup
  // The readable slug is appended for SEO: /prodotto/{uuid}--{readable-name}
  const readableSlug = slugify(raw.name)
  return {
    id: raw.uuid,
    slug: readableSlug ? `${raw.uuid}--${readableSlug}` : raw.uuid,
    name: raw.name,
    brand: extractBrand(raw.name, raw.brand_name),
    image: raw.primary_image_url || '',
    lowestPrice: Math.round(raw.price * 100),
    originalPrice: Math.round(raw.original_price * 100),
    currency: raw._currency || 'EUR',
    discount: raw.discount || 0,
    offerCount: 1,
    inStock: raw.in_stock,
    merchantName: raw.merchant_name,
    merchantDomain: raw.merchant_domain,
    deeplink: raw.deeplink,
    description: raw.description_short || raw.description || '',
    condition: raw.condition || 'NEW',
    deliveryCost: raw.delivery_cost,
  }
}

// --- API functions ---

/**
 * Search products via price-ninja API
 */
export async function searchProducts(
  query: string,
  options: {
    country?: string
    locale?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    brand?: string | string[]
  } = {}
): Promise<SearchResult> {
  if (!query || query.trim().length < 2) {
    return { products: [], totalCount: 0, brands: [], priceRange: { min: 0, max: 0 } }
  }

  const countryCode = COUNTRY_MAP[options.country || 'it'] || 'IT'
  const language = LANGUAGE_MAP[options.locale || 'it'] || 'it'

  const url = `${API_BASE}/products/search/?country=${countryCode}&language=${language}&q=${encodeURIComponent(query.trim())}`

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error(`Price Ninja API error: ${response.status} ${response.statusText}`)
      return { products: [], totalCount: 0, brands: [], priceRange: { min: 0, max: 0 } }
    }

    const data: PriceNinjaSearchResponse = await response.json()
    
    // Normalize and deduplicate products by UUID
    const seen = new Set<string>()
    let products = data.results.map(normalizeProduct).filter(p => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })
    
    // Apply client-side filters
    
    // Filter by brand
    if (options.brand) {
      const brands = Array.isArray(options.brand) ? options.brand : [options.brand]
      products = products.filter(p =>
        brands.some(b => p.brand.toLowerCase() === b.toLowerCase())
      )
    }
    
    // Filter by min price (in cents)
    if (options.minPrice) {
      const min = parseInt(options.minPrice)
      if (!isNaN(min)) {
        products = products.filter(p => p.lowestPrice >= min)
      }
    }
    
    // Filter by max price (in cents)
    if (options.maxPrice) {
      const max = parseInt(options.maxPrice)
      if (!isNaN(max)) {
        products = products.filter(p => p.lowestPrice <= max)
      }
    }
    
    // Sort
    switch (options.sort) {
      case 'price_asc':
        products.sort((a, b) => a.lowestPrice - b.lowestPrice)
        break
      case 'price_desc':
        products.sort((a, b) => b.lowestPrice - a.lowestPrice)
        break
      case 'discount':
        products.sort((a, b) => b.discount - a.discount)
        break
      case 'popular':
      case 'relevance':
      default:
        // Keep API order (relevance)
        break
    }
    
    // Extract unique brands
    const allBrands = [...new Set(
      data.results
        .map(r => extractBrand(r.name, r.brand_name))
        .filter(b => b.length > 0)
    )].sort()
    
    // Calculate price range (from all results before filtering)
    const prices = data.results.map(r => Math.round(r.price * 100))
    const priceRange = {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    }

    return {
      products,
      totalCount: products.length,
      brands: allBrands,
      priceRange,
    }
  } catch (error) {
    console.error('Price Ninja API fetch error:', error)
    return { products: [], totalCount: 0, brands: [], priceRange: { min: 0, max: 0 } }
  }
}

/**
 * Extract UUID from a slug like "645ba3a2-7fc8-55ad-91e4-1aee05115f97--readable-name"
 */
export function extractUuidFromSlug(slug: string): string {
  // UUID format: 8-4-4-4-12 hex chars
  const uuidRegex = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i
  const match = slug.match(uuidRegex)
  return match ? match[1] : slug
}

/**
 * Get product details by UUID
 */
export async function getProductDetail(uuid: string): Promise<NormalizedProduct | null> {
  try {
    const response = await fetch(`${API_BASE}/products/${uuid}`, {
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Accept': 'application/json',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    })

    if (!response.ok) return null

    const raw: PriceNinjaProductDetail = await response.json()
    return normalizeProduct(raw)
  } catch {
    return null
  }
}
