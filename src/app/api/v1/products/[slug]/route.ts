import { NextRequest, NextResponse } from 'next/server'
import { getProductDetail, extractUuidFromSlug } from '@/lib/api/price-ninja'

export const runtime = 'edge'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params
  const uuid = extractUuidFromSlug(slug)

  const product = await getProductDetail(uuid)

  if (!product) {
    return NextResponse.json(
      { error: { code: 'not_found', message: 'Product not found', status: 404 } },
      { status: 404 }
    )
  }

  return NextResponse.json(product, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    },
  })
}
