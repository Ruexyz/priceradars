/**
 * Price Ninja API Adapter
 * 
 * Server-side only - never expose the token to the client.
 * 
 * Two API families:
 * - /api/generic-products/  → Grouped products (for comparison)
 * - /api/products/          → Individual merchant offers (legacy, used by generic detail)
 * 
 * Uses React.cache() to deduplicate calls within the same request.
 */

import { cache } from 'react'

const API_BASE = 'https://www.price-ninja.online/api'
const API_TOKEN = '72e41012012ee1ed774153425cb962a45ddeae7a'

// ============================================================
// RAW API TYPES
// ============================================================

// --- Generic Products (grouped, for comparison) ---

interface RawGenericProduct {
  uuid: string
  merchant_name: string | null
  merchant_domain: string | null
  name: string
  description: string
  deeplink: string
  category_tree: string[]
  price: number              // EUR decimals
  original_price: number | null
  saving: number
  discount: number
  in_stock: boolean
  condition: string
  primary_image_url: string
  countries: string[]
  country: string
  brand_name: string
  _currency: string
  url: string
  products_api_url: string[]
  identifier_gtin: string | null
}

interface RawGenericProductDetail {
  uuid: string
  merchant_name: string | null
  merchant_domain: string | null
  product_name: string       // NB: "product_name" not "name"
  description: string
  deeplink: string
  category_tree: string[]
  price: number
  original_price: number | null
  price_history: { price: number; timestamp: number }[]
  in_stock: boolean
  condition: string
  primary_image_url: string
  all_product_images: string[]
  countries: string[]
  brand_name: string
  currency: string           // NB: "currency" not "_currency"
  url: string
  products_api_url: string[]
  related_products: RawMerchantOffer[]
}

interface RawMerchantOffer {
  uuid: string
  merchant_name: string
  merchant_domain: string
  name: string
  description: string
  description_short: string
  deeplink: string
  category_tree: string[]
  price: number
  original_price: number | null
  price_history: { price: number; timestamp: number }[]
  saving: number | null
  discount: number | null
  delivery_cost: number | null
  delivery_time: string | null
  in_stock: boolean
  condition: string
  primary_image_url: string
  all_product_images: string[]
  countries: string[]
  brand_name: string
  _currency: string
  url: string
  identifier_gtin: string | null
  identifier_ean: string | null
}

interface RawSearchResponse {
  count: number
  next: string | null
  previous: string | null
  results: RawGenericProduct[]
  facets?: {
    merchants?: { name: string; count: number; id: number }[]
    price?: { name: number; count: number; id: number }[]
  }
}

// ============================================================
// PRICERADARS NORMALIZED TYPES
// ============================================================

export interface NormalizedProduct {
  id: string
  slug: string
  name: string
  brand: string
  image: string
  lowestPrice: number       // in cents
  originalPrice: number     // in cents
  currency: string
  discount: number
  offerCount: number
  inStock: boolean
  description: string
  condition: string
  // For single-merchant products (legacy)
  merchantName: string
  merchantDomain: string
  deeplink: string
  deliveryCost: number | null
}

export interface MerchantOffer {
  id: string
  merchantName: string
  merchantDomain: string
  price: number             // in cents
  originalPrice: number     // in cents
  currency: string
  deeplink: string
  inStock: boolean
  condition: string
  saving: number            // in cents
  discount: number
  deliveryCost: number | null
  image: string
}

export interface PriceHistoryPoint {
  date: string              // YYYY-MM-DD
  price: number             // in cents
}

export interface ProductDetail {
  id: string
  slug: string
  name: string
  brand: string
  description: string
  image: string
  images: string[]
  categories: string[]
  lowestPrice: number
  originalPrice: number
  currency: string
  condition: string
  inStock: boolean
  offers: MerchantOffer[]
  priceHistory: PriceHistoryPoint[]
  offerCount: number
}

export interface FacetItem {
  name: string
  count: number
  id: number | string
}

export interface SearchResult {
  products: NormalizedProduct[]
  totalCount: number
  brands: string[]
  priceRange: { min: number; max: number }
  facets: {
    merchants: FacetItem[]
    price: FacetItem[]
  }
}

// ============================================================
// HELPERS
// ============================================================

const COUNTRY_MAP: Record<string, string> = {
  it: 'IT', uk: 'GB', us: 'US', de: 'DE', fr: 'FR', es: 'ES',
}

const LANGUAGE_MAP: Record<string, string> = {
  it: 'it', en: 'en',
}

/** Fetch with retry (1 retry on 5xx errors) */
async function fetchWithRetry(url: string, options: RequestInit, retries = 1): Promise<Response> {
  const response = await fetch(url, options)
  if (response.status >= 500 && retries > 0) {
    await new Promise(r => setTimeout(r, 500))
    return fetchWithRetry(url, options, retries - 1)
  }
  return response
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u').replace(/[ñ]/g, 'n')
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 80)
}

function extractBrand(name: string, brandName: string): string {
  if (brandName && brandName.trim()) return brandName.trim()
  
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
    if (nameLower.includes(brand.toLowerCase())) return brand
  }
  
  const firstWord = name.split(' ')[0]
  if (firstWord && firstWord[0] === firstWord[0].toUpperCase() && firstWord.length > 1) {
    return firstWord
  }
  return ''
}

function unixToDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString().split('T')[0]
}

function makeSlug(uuid: string, name: string): string {
  const readable = slugify(name)
  return readable ? `${uuid}--${readable}` : uuid
}

// ============================================================
// SEARCH (generic-products)
// ============================================================

export async function searchProducts(
  query: string,
  options: {
    country?: string
    locale?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    brand?: string | string[]
    inStock?: string
    merchantId?: string
  } = {}
): Promise<SearchResult> {
  const emptyResult: SearchResult = { products: [], totalCount: 0, brands: [], priceRange: { min: 0, max: 0 }, facets: { merchants: [], price: [] } }
  
  if (!query || query.trim().length < 2) {
    return emptyResult
  }

  const countryCode = COUNTRY_MAP[options.country || 'it'] || 'IT'
  const language = LANGUAGE_MAP[options.locale || 'it'] || 'it'
  let url = `${API_BASE}/generic-products/search/?country=${countryCode}&language=${language}&q=${encodeURIComponent(query.trim())}`
  
  // Pass merchant_id filter to API (server-side filtering)
  if (options.merchantId) {
    url += `&merchant_id=${encodeURIComponent(options.merchantId)}`
  }

  try {
    const response = await fetchWithRetry(url, {
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`Price Ninja search error: ${response.status}`)
      // Fallback to legacy products API
      return fallbackSearch(query, countryCode, language, options)
    }

    const data: RawSearchResponse = await response.json()
    
    // Normalize and deduplicate
    const seen = new Set<string>()
    let products: NormalizedProduct[] = data.results
      .map((raw): NormalizedProduct => ({
        id: raw.uuid,
        slug: makeSlug(raw.uuid, raw.name),
        name: raw.name,
        brand: extractBrand(raw.name, raw.brand_name),
        image: raw.primary_image_url || '',
        lowestPrice: Math.round(raw.price * 100),
        originalPrice: raw.original_price ? Math.round(raw.original_price * 100) : Math.round(raw.price * 100),
        currency: raw._currency || 'EUR',
        discount: raw.discount || 0,
        offerCount: raw.products_api_url?.length || 1,
        inStock: raw.in_stock,
        description: raw.description || '',
        condition: raw.condition || 'NEW',
        merchantName: raw.merchant_name || '',
        merchantDomain: raw.merchant_domain || '',
        deeplink: raw.deeplink || '',
        deliveryCost: null,
      }))
      .filter(p => {
        if (seen.has(p.id)) return false
        seen.add(p.id)
        return true
      })
    
    // Client-side filters
    if (options.brand) {
      const brands = Array.isArray(options.brand) ? options.brand : [options.brand]
      products = products.filter(p =>
        brands.some(b => p.brand.toLowerCase() === b.toLowerCase())
      )
    }
    if (options.minPrice) {
      const min = parseInt(options.minPrice)
      if (!isNaN(min)) products = products.filter(p => p.lowestPrice >= min)
    }
    if (options.maxPrice) {
      const max = parseInt(options.maxPrice)
      if (!isNaN(max)) products = products.filter(p => p.lowestPrice <= max)
    }
    if (options.inStock === 'true') {
      products = products.filter(p => p.inStock)
    }
    
    // Sort
    switch (options.sort) {
      case 'price_asc': products.sort((a, b) => a.lowestPrice - b.lowestPrice); break
      case 'price_desc': products.sort((a, b) => b.lowestPrice - a.lowestPrice); break
      case 'discount': products.sort((a, b) => b.discount - a.discount); break
    }
    
    const allBrands = [...new Set(
      data.results.map(r => extractBrand(r.name, r.brand_name)).filter(b => b.length > 0)
    )].sort()
    
    const prices = data.results.map(r => Math.round(r.price * 100))
    const priceRange = {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    }

    // Extract facets from API response
    const facets = {
      merchants: (data.facets?.merchants || []).map(f => ({ name: f.name, count: f.count, id: f.id })),
      price: (data.facets?.price || []).filter(f => f.count > 0).map(f => ({ name: `€${f.name}`, count: f.count, id: f.id })),
    }

    return { products, totalCount: products.length, brands: allBrands, priceRange, facets }
  } catch (error) {
    console.error('Price Ninja search error:', error)
    return emptyResult
  }
}

/** Fallback to legacy /api/products/search/ when generic-products fails */
async function fallbackSearch(
  query: string,
  countryCode: string,
  language: string,
  options: { sort?: string; minPrice?: string; maxPrice?: string; brand?: string | string[] }
): Promise<SearchResult> {
  try {
    const url = `${API_BASE}/products/search/?country=${countryCode}&language=${language}&q=${encodeURIComponent(query)}`
    const response = await fetch(url, {
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Accept': 'application/json',
      },
    })
    if (!response.ok) return { products: [], totalCount: 0, brands: [], priceRange: { min: 0, max: 0 }, facets: { merchants: [], price: [] } }

    const data = await response.json()
    const seen = new Set<string>()
    let products: NormalizedProduct[] = (data.results || [])
      .map((raw: any): NormalizedProduct => ({
        id: raw.uuid,
        slug: makeSlug(raw.uuid, raw.name),
        name: raw.name,
        brand: extractBrand(raw.name, raw.brand_name || ''),
        image: raw.primary_image_url || '',
        lowestPrice: Math.round((raw.price || 0) * 100),
        originalPrice: Math.round((raw.original_price || raw.price || 0) * 100),
        currency: raw._currency || 'EUR',
        discount: raw.discount || 0,
        offerCount: 1,
        inStock: raw.in_stock ?? true,
        description: raw.description_short || raw.description || '',
        condition: raw.condition || 'NEW',
        merchantName: raw.merchant_name || '',
        merchantDomain: raw.merchant_domain || '',
        deeplink: raw.deeplink || '',
        deliveryCost: raw.delivery_cost ?? null,
      }))
      .filter((p: NormalizedProduct) => {
        if (seen.has(p.id)) return false
        seen.add(p.id)
        return true
      })

    if (options.brand) {
      const brands = Array.isArray(options.brand) ? options.brand : [options.brand]
      products = products.filter(p => brands.some(b => p.brand.toLowerCase() === b.toLowerCase()))
    }
    if (options.minPrice) { const min = parseInt(options.minPrice); if (!isNaN(min)) products = products.filter(p => p.lowestPrice >= min) }
    if (options.maxPrice) { const max = parseInt(options.maxPrice); if (!isNaN(max)) products = products.filter(p => p.lowestPrice <= max) }
    if (options.sort === 'price_asc') products.sort((a, b) => a.lowestPrice - b.lowestPrice)
    if (options.sort === 'price_desc') products.sort((a, b) => b.lowestPrice - a.lowestPrice)

    const allBrands = [...new Set(products.map(p => p.brand).filter(b => b.length > 0))].sort()
    const prices = products.map(p => p.lowestPrice)

    return {
      products,
      totalCount: products.length,
      brands: allBrands,
      priceRange: { min: prices.length ? Math.min(...prices) : 0, max: prices.length ? Math.max(...prices) : 0 },
      facets: { merchants: [], price: [] },
    }
  } catch {
    return { products: [], totalCount: 0, brands: [], priceRange: { min: 0, max: 0 }, facets: { merchants: [], price: [] } }
  }
}

// ============================================================
// PRODUCT DETAIL (generic-products/{uuid}) - with merchant offers
// ============================================================

export const getProductDetail = cache(async (uuid: string): Promise<ProductDetail | null> => {
  try {
    const response = await fetchWithRetry(`${API_BASE}/generic-products/${uuid}`, {
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) return null

    const raw: RawGenericProductDetail = await response.json()
    
    const name = raw.product_name || ''
    const currency = raw.currency || 'EUR'
    
    // Build merchant offers from related_products
    const offers: MerchantOffer[] = (raw.related_products || []).map(rp => ({
      id: rp.uuid,
      merchantName: rp.merchant_name || 'Unknown',
      merchantDomain: rp.merchant_domain || '',
      price: Math.round(rp.price * 100),
      originalPrice: rp.original_price ? Math.round(rp.original_price * 100) : Math.round(rp.price * 100),
      currency: rp._currency || currency,
      deeplink: rp.deeplink || '',
      inStock: rp.in_stock,
      condition: rp.condition || 'NEW',
      saving: rp.saving ? Math.round(rp.saving * 100) : 0,
      discount: rp.discount || 0,
      deliveryCost: rp.delivery_cost,
      image: rp.primary_image_url || '',
    }))
    
    // Build price history from raw timestamps
    const priceHistory: PriceHistoryPoint[] = (raw.price_history || [])
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(ph => ({
        date: unixToDate(ph.timestamp),
        price: Math.round(ph.price * 100),
      }))
    
    // Also merge price history from merchant offers for richer data
    const allMerchantHistory = (raw.related_products || []).flatMap(rp =>
      (rp.price_history || []).map(ph => ({
        date: unixToDate(ph.timestamp),
        price: Math.round(ph.price * 100),
      }))
    )
    
    // Merge and deduplicate price history, keep lowest price per date
    const historyMap = new Map<string, number>()
    ;[...priceHistory, ...allMerchantHistory].forEach(ph => {
      const existing = historyMap.get(ph.date)
      if (!existing || ph.price < existing) {
        historyMap.set(ph.date, ph.price)
      }
    })
    const mergedHistory = Array.from(historyMap.entries())
      .map(([date, price]) => ({ date, price }))
      .sort((a, b) => a.date.localeCompare(b.date))
    
    // Collect all images
    const images = raw.all_product_images?.length > 0
      ? raw.all_product_images
      : raw.primary_image_url
        ? [raw.primary_image_url]
        : []
    
    // Find lowest price across all offers
    const lowestOffer = offers.length > 0
      ? offers.reduce((min, o) => o.price < min.price ? o : min, offers[0])
      : null

    return {
      id: raw.uuid,
      slug: makeSlug(raw.uuid, name),
      name,
      brand: extractBrand(name, raw.brand_name),
      description: raw.description || '',
      image: raw.primary_image_url || '',
      images,
      categories: raw.category_tree || [],
      lowestPrice: lowestOffer ? lowestOffer.price : Math.round(raw.price * 100),
      originalPrice: raw.original_price ? Math.round(raw.original_price * 100) : Math.round(raw.price * 100),
      currency,
      condition: raw.condition || 'NEW',
      inStock: raw.in_stock,
      offers,
      priceHistory: mergedHistory,
      offerCount: offers.length,
    }
  } catch (error) {
    console.error('Price Ninja detail error:', error)
    return null
  }
})

// ============================================================
// HELPERS (exported)
// ============================================================

export function extractUuidFromSlug(slug: string): string {
  const uuidRegex = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i
  const match = slug.match(uuidRegex)
  return match ? match[1] : slug
}
