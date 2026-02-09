import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/api/price-ninja'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  const query = searchParams.get('q') || ''
  const country = searchParams.get('country') || 'it'
  const locale = searchParams.get('locale') || 'it'
  const sort = searchParams.get('sort') || 'relevance'
  const brand = searchParams.get('brand')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  const result = await searchProducts(query, {
    country,
    locale,
    sort,
    brand: brand || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
  })

  return NextResponse.json({
    products: result.products,
    totalCount: result.totalCount,
    brands: result.brands,
    priceRange: result.priceRange,
  }, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    },
  })
}
