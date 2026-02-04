import { NextRequest, NextResponse } from 'next/server'

const mockCategories = [
  {
    id: 'cat_smartphones',
    slug: 'smartphones',
    name: 'Smartphones',
    product_count: 1250,
    subcategories: [
      { slug: 'smartphones/apple', name: 'Apple', product_count: 45 },
      { slug: 'smartphones/samsung', name: 'Samsung', product_count: 62 },
      { slug: 'smartphones/google', name: 'Google', product_count: 18 },
      { slug: 'smartphones/xiaomi', name: 'Xiaomi', product_count: 85 },
    ],
  },
  {
    id: 'cat_laptops',
    slug: 'laptops',
    name: 'Laptops',
    product_count: 890,
    subcategories: [
      { slug: 'laptops/macbook', name: 'MacBook', product_count: 25 },
      { slug: 'laptops/windows', name: 'Windows Laptops', product_count: 450 },
      { slug: 'laptops/chromebook', name: 'Chromebook', product_count: 65 },
    ],
  },
  {
    id: 'cat_tv-audio',
    slug: 'tv-audio',
    name: 'TV & Audio',
    product_count: 650,
    subcategories: [
      { slug: 'tv-audio/televisions', name: 'Televisions', product_count: 280 },
      { slug: 'tv-audio/soundbars', name: 'Soundbars', product_count: 120 },
      { slug: 'tv-audio/headphones', name: 'Headphones', product_count: 250 },
    ],
  },
  {
    id: 'cat_appliances',
    slug: 'appliances',
    name: 'Appliances',
    product_count: 1100,
    subcategories: [
      { slug: 'appliances/large', name: 'Large Appliances', product_count: 450 },
      { slug: 'appliances/small', name: 'Small Appliances', product_count: 650 },
    ],
  },
  {
    id: 'cat_gaming',
    slug: 'gaming',
    name: 'Gaming',
    product_count: 780,
    subcategories: [
      { slug: 'gaming/consoles', name: 'Consoles', product_count: 35 },
      { slug: 'gaming/games', name: 'Games', product_count: 520 },
      { slug: 'gaming/accessories', name: 'Accessories', product_count: 225 },
    ],
  },
  {
    id: 'cat_cameras',
    slug: 'cameras',
    name: 'Cameras',
    product_count: 420,
    subcategories: [
      { slug: 'cameras/mirrorless', name: 'Mirrorless', product_count: 85 },
      { slug: 'cameras/compact', name: 'Compact', product_count: 120 },
      { slug: 'cameras/accessories', name: 'Accessories', product_count: 215 },
    ],
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const country = searchParams.get('country') || 'uk'
  const parent = searchParams.get('parent')

  let categories = mockCategories

  if (parent) {
    const parentCategory = mockCategories.find((c) => c.slug === parent)
    if (parentCategory) {
      return NextResponse.json({
        categories: parentCategory.subcategories,
      })
    }
  }

  return NextResponse.json({
    categories,
  })
}
