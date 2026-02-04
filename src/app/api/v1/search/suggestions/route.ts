import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Mock product database for suggestions
const allProducts = [
  // Smartphones
  { id: '1', name: 'iPhone 15 Pro 256GB', brand: 'Apple', category: 'smartphone', slug: 'iphone-15-pro-256gb', price: 99900 },
  { id: '2', name: 'iPhone 15 128GB', brand: 'Apple', category: 'smartphone', slug: 'iphone-15-128gb', price: 79900 },
  { id: '3', name: 'iPhone 14 Pro Max', brand: 'Apple', category: 'smartphone', slug: 'iphone-14-pro-max', price: 109900 },
  { id: '4', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'smartphone', slug: 'samsung-galaxy-s24-ultra', price: 119900 },
  { id: '5', name: 'Samsung Galaxy S24', brand: 'Samsung', category: 'smartphone', slug: 'samsung-galaxy-s24', price: 69900 },
  { id: '6', name: 'Samsung Galaxy Z Fold 5', brand: 'Samsung', category: 'smartphone', slug: 'samsung-galaxy-z-fold-5', price: 159900 },
  { id: '7', name: 'Google Pixel 8 Pro', brand: 'Google', category: 'smartphone', slug: 'google-pixel-8-pro', price: 89900 },
  { id: '8', name: 'Google Pixel 8', brand: 'Google', category: 'smartphone', slug: 'google-pixel-8', price: 69900 },
  { id: '9', name: 'Xiaomi 14 Ultra', brand: 'Xiaomi', category: 'smartphone', slug: 'xiaomi-14-ultra', price: 109900 },
  // Laptops
  { id: '10', name: 'MacBook Air M3 13"', brand: 'Apple', category: 'laptop', slug: 'macbook-air-m3-13', price: 119900 },
  { id: '11', name: 'MacBook Pro M3 14"', brand: 'Apple', category: 'laptop', slug: 'macbook-pro-m3-14', price: 179900 },
  { id: '12', name: 'MacBook Pro M3 Max 16"', brand: 'Apple', category: 'laptop', slug: 'macbook-pro-m3-max-16', price: 349900 },
  { id: '13', name: 'Dell XPS 15', brand: 'Dell', category: 'laptop', slug: 'dell-xps-15', price: 149900 },
  { id: '14', name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', category: 'laptop', slug: 'lenovo-thinkpad-x1-carbon', price: 159900 },
  // TV
  { id: '15', name: 'Samsung QLED 65" Q80C', brand: 'Samsung', category: 'tv', slug: 'samsung-qled-65-q80c', price: 99900 },
  { id: '16', name: 'LG OLED 55" C3', brand: 'LG', category: 'tv', slug: 'lg-oled-55-c3', price: 119900 },
  { id: '17', name: 'Sony Bravia XR 65" A80L', brand: 'Sony', category: 'tv', slug: 'sony-bravia-xr-65-a80l', price: 179900 },
  // Audio
  { id: '18', name: 'Apple AirPods Pro 2', brand: 'Apple', category: 'audio', slug: 'apple-airpods-pro-2', price: 24900 },
  { id: '19', name: 'Apple AirPods Max', brand: 'Apple', category: 'audio', slug: 'apple-airpods-max', price: 57900 },
  { id: '20', name: 'Sony WH-1000XM5', brand: 'Sony', category: 'audio', slug: 'sony-wh-1000xm5', price: 32900 },
  { id: '21', name: 'Bose QuietComfort Ultra', brand: 'Bose', category: 'audio', slug: 'bose-quietcomfort-ultra', price: 39900 },
  // Gaming
  { id: '22', name: 'PlayStation 5 Slim', brand: 'Sony', category: 'gaming', slug: 'playstation-5-slim', price: 44900 },
  { id: '23', name: 'Xbox Series X', brand: 'Microsoft', category: 'gaming', slug: 'xbox-series-x', price: 47900 },
  { id: '24', name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'gaming', slug: 'nintendo-switch-oled', price: 34900 },
  // Tablets
  { id: '25', name: 'iPad Pro 12.9" M2', brand: 'Apple', category: 'tablet', slug: 'ipad-pro-12-9-m2', price: 139900 },
  { id: '26', name: 'iPad Air M2', brand: 'Apple', category: 'tablet', slug: 'ipad-air-m2', price: 69900 },
  { id: '27', name: 'Samsung Galaxy Tab S9 Ultra', brand: 'Samsung', category: 'tablet', slug: 'samsung-galaxy-tab-s9-ultra', price: 119900 },
]

// Categories
const categories: Record<string, { it: string; en: string; slug: string }[]> = {
  all: [
    { it: 'Smartphone', en: 'Smartphones', slug: 'smartphone' },
    { it: 'Laptop', en: 'Laptops', slug: 'laptop' },
    { it: 'TV', en: 'TVs', slug: 'tv' },
    { it: 'Audio', en: 'Audio', slug: 'audio' },
    { it: 'Gaming', en: 'Gaming', slug: 'gaming' },
    { it: 'Tablet', en: 'Tablets', slug: 'tablet' },
  ],
}

// Brands
const brands = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Sony', 'Microsoft', 'LG', 'Dell', 'Lenovo', 'Bose', 'Nintendo']

/**
 * Fuzzy match score (simplified Levenshtein-based)
 */
function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  
  // Exact match
  if (t === q) return 100
  
  // Starts with
  if (t.startsWith(q)) return 90 + (q.length / t.length) * 10
  
  // Contains
  if (t.includes(q)) return 70 + (q.length / t.length) * 20
  
  // Word boundary match
  const words = t.split(/\s+/)
  for (const word of words) {
    if (word.startsWith(q)) return 80 + (q.length / word.length) * 10
  }
  
  // Fuzzy match (allow 1-2 typos for longer queries)
  if (q.length >= 3) {
    const maxDistance = q.length <= 4 ? 1 : 2
    let matches = 0
    let lastIndex = -1
    
    for (const char of q) {
      const index = t.indexOf(char, lastIndex + 1)
      if (index > lastIndex) {
        matches++
        lastIndex = index
      }
    }
    
    const matchRatio = matches / q.length
    if (matchRatio >= (q.length - maxDistance) / q.length) {
      return 50 + matchRatio * 30
    }
  }
  
  return 0
}

interface Suggestion {
  type: 'product' | 'category' | 'brand' | 'trending'
  text: string
  slug?: string
  image?: string
  price?: number
  score: number
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.trim() || ''
  const locale = searchParams.get('locale') || 'en'
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20)
  
  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }
  
  const suggestions: Suggestion[] = []
  
  // Search products
  allProducts.forEach(product => {
    const nameScore = fuzzyScore(query, product.name)
    const brandScore = fuzzyScore(query, product.brand) * 0.8
    const categoryScore = fuzzyScore(query, product.category) * 0.6
    
    const maxScore = Math.max(nameScore, brandScore, categoryScore)
    
    if (maxScore >= 50) {
      suggestions.push({
        type: 'product',
        text: product.name,
        slug: product.slug,
        image: `https://placehold.co/80x80/f5f5f5/171717?text=${encodeURIComponent(product.name.split(' ')[0])}`,
        price: product.price,
        score: maxScore,
      })
    }
  })
  
  // Search categories
  categories.all.forEach(category => {
    const categoryName = locale === 'it' ? category.it : category.en
    const score = fuzzyScore(query, categoryName)
    
    if (score >= 60) {
      suggestions.push({
        type: 'category',
        text: categoryName,
        slug: category.slug,
        score: score * 0.9, // Slightly lower priority than products
      })
    }
  })
  
  // Search brands
  brands.forEach(brand => {
    const score = fuzzyScore(query, brand)
    
    if (score >= 70) {
      suggestions.push({
        type: 'brand',
        text: brand,
        score: score * 0.85,
      })
    }
  })
  
  // Sort by score and limit
  const sortedSuggestions = suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...rest }) => rest) // Remove score from response
  
  return NextResponse.json(
    { suggestions: sortedSuggestions },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    }
  )
}
