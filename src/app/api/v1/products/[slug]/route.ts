import { NextRequest, NextResponse } from 'next/server'

// Mock data for development
const mockProduct = {
  id: 'prod_1',
  slug: 'iphone-15-pro-256gb',
  name: 'iPhone 15 Pro 256GB',
  brand: 'Apple',
  category: 'smartphones',
  description:
    'iPhone 15 Pro with A17 Pro chip, titanium design, and Action Button. The most advanced iPhone ever.',
  specs: {
    Display: '6.1" Super Retina XDR',
    Processor: 'A17 Pro',
    Storage: '256GB',
    Camera: '48MP + 12MP + 12MP',
    Battery: '3274 mAh',
    OS: 'iOS 17',
  },
  image: 'https://placehold.co/600x600/f5f5f5/171717?text=iPhone+15+Pro',
  images: [
    'https://placehold.co/600x600/f5f5f5/171717?text=iPhone+15+Pro',
    'https://placehold.co/600x600/f5f5f5/171717?text=iPhone+Back',
  ],
  gtin: '194253939054',
  lowest_price: 99900,
  currency: 'EUR',
  offers: [
    {
      id: 'offer_1',
      merchant_id: 'amazon-it',
      merchant_name: 'Amazon.it',
      price: 99900,
      currency: 'EUR',
      url: 'https://amazon.it/dp/...',
      in_stock: true,
      stock_status: 'in_stock',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'offer_2',
      merchant_id: 'mediaworld',
      merchant_name: 'MediaWorld',
      price: 104900,
      currency: 'EUR',
      url: 'https://mediaworld.it/...',
      in_stock: true,
      stock_status: 'in_stock',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'offer_3',
      merchant_id: 'unieuro',
      merchant_name: 'Unieuro',
      price: 97900,
      currency: 'EUR',
      url: 'https://unieuro.it/...',
      in_stock: true,
      stock_status: 'limited',
      updated_at: new Date().toISOString(),
    },
  ],
}

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params
  const searchParams = request.nextUrl.searchParams
  const country = searchParams.get('country') || 'uk'

  // In production, fetch from D1 database
  if (slug !== mockProduct.slug) {
    return NextResponse.json(
      { error: { code: 'not_found', message: 'Product not found', status: 404 } },
      { status: 404 }
    )
  }

  return NextResponse.json(mockProduct)
}
