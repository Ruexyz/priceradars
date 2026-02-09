import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/api/price-ninja'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.trim() || ''
  const locale = searchParams.get('locale') || 'it'
  const country = searchParams.get('country') || 'it'
  const limit = Math.min(parseInt(searchParams.get('limit') || '8'), 20)
  
  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }
  
  try {
    // Fetch real products from price-ninja
    const result = await searchProducts(query, {
      country,
      locale,
    })
    
    // Convert to suggestion format
    const productSuggestions = result.products.slice(0, limit).map(p => ({
      type: 'product' as const,
      text: p.name,
      slug: p.id, // Use UUID as slug for product detail
      image: p.image,
      price: p.lowestPrice,
      currency: p.currency,
    }))
    
    // Extract brand suggestions
    const brandSuggestions = result.brands
      .filter(b => b.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(b => ({
        type: 'brand' as const,
        text: b,
      }))
    
    const suggestions = [...productSuggestions, ...brandSuggestions]
    
    return NextResponse.json(
      { suggestions },
      {
        headers: {
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        },
      }
    )
  } catch {
    return NextResponse.json({ suggestions: [] })
  }
}
