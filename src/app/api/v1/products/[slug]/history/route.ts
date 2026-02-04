import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params
  const searchParams = request.nextUrl.searchParams
  const country = searchParams.get('country') || 'uk'
  const days = Math.min(parseInt(searchParams.get('days') || '30'), 365)

  // Generate mock price history
  const today = new Date()
  const history = Array.from({ length: days }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (days - 1 - i))
    
    const basePrice = 99900
    const randomVariation = Math.floor(Math.random() * 10000) - 5000
    const lowestPrice = basePrice + randomVariation
    const avgVariation = Math.floor(Math.random() * 5000)
    
    return {
      date: date.toISOString().split('T')[0],
      lowest_price: lowestPrice,
      average_price: lowestPrice + avgVariation,
      highest_price: lowestPrice + avgVariation + 5000,
      offer_count: Math.floor(Math.random() * 5) + 5,
    }
  })

  return NextResponse.json({
    product_id: `prod_${slug}`,
    product_slug: slug,
    country,
    currency: 'EUR',
    history,
  })
}
