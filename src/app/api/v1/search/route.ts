import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Mock data for development - will be replaced with D1 queries
const mockProducts = [
  {
    id: 'prod_1',
    slug: 'iphone-15-pro-256gb',
    name: 'iPhone 15 Pro 256GB',
    brand: 'Apple',
    category: 'smartphones',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=iPhone+15',
    lowest_price: 99900,
    currency: 'EUR',
    offer_count: 8,
    in_stock: true,
  },
  {
    id: 'prod_2',
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+S24',
    lowest_price: 119900,
    currency: 'EUR',
    offer_count: 12,
    in_stock: true,
  },
  {
    id: 'prod_3',
    slug: 'macbook-air-m3',
    name: 'MacBook Air M3 13"',
    brand: 'Apple',
    category: 'laptops',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=MacBook+Air',
    lowest_price: 119900,
    currency: 'EUR',
    offer_count: 10,
    in_stock: true,
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  const query = searchParams.get('q') || ''
  const country = searchParams.get('country') || 'uk'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
  const sort = searchParams.get('sort') || 'relevance'
  const brand = searchParams.get('brand')
  const category = searchParams.get('category')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  // Filter products based on query
  let filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  // Apply brand filter
  if (brand) {
    filteredProducts = filteredProducts.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase()
    )
  }

  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  // Apply price filters
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.lowest_price >= parseInt(minPrice)
    )
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.lowest_price <= parseInt(maxPrice)
    )
  }

  // Sort
  if (sort === 'price_asc') {
    filteredProducts.sort((a, b) => a.lowest_price - b.lowest_price)
  } else if (sort === 'price_desc') {
    filteredProducts.sort((a, b) => b.lowest_price - a.lowest_price)
  }

  // Paginate
  const total = filteredProducts.length
  const offset = (page - 1) * limit
  const products = filteredProducts.slice(offset, offset + limit)

  return NextResponse.json({
    products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  })
}
