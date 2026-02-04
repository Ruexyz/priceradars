import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { ProductPage } from '@/components/pages/product-page'
import { countries } from '@/lib/countries'

// Mock product data - will be replaced with DB queries
const getProduct = async (slug: string) => {
  // Mock implementation
  return {
    id: '1',
    slug,
    name: 'iPhone 15 Pro 256GB',
    brand: 'Apple',
    category: 'Smartphone',
    categorySlug: 'smartphones',
    image: 'https://placehold.co/600x600/f5f5f5/171717?text=iPhone+15+Pro',
    images: [
      'https://placehold.co/600x600/f5f5f5/171717?text=iPhone+15+Pro',
      'https://placehold.co/600x600/f5f5f5/171717?text=iPhone+Back',
      'https://placehold.co/600x600/f5f5f5/171717?text=iPhone+Side',
    ],
    description:
      'iPhone 15 Pro con chip A17 Pro, design in titanio e Action Button. Il più avanzato iPhone mai realizzato.',
    specs: {
      Display: '6.1" Super Retina XDR',
      Processore: 'A17 Pro',
      Memoria: '256GB',
      Fotocamera: '48MP + 12MP + 12MP',
      Batteria: '3274 mAh',
      Sistema: 'iOS 17',
    },
    lowestPrice: 99900,
    currency: 'EUR',
    offerCount: 8,
  }
}

const getOffers = async (productId: string) => {
  return [
    {
      id: '1',
      merchantId: 'amazon-it',
      merchantName: 'Amazon.it',
      price: 99900,
      currency: 'EUR',
      url: 'https://amazon.it',
      inStock: true,
      stockStatus: 'in_stock' as const,
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      merchantId: 'mediaworld',
      merchantName: 'MediaWorld',
      price: 104900,
      currency: 'EUR',
      url: 'https://mediaworld.it',
      inStock: true,
      stockStatus: 'in_stock' as const,
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      merchantId: 'unieuro',
      merchantName: 'Unieuro',
      price: 97900,
      currency: 'EUR',
      url: 'https://unieuro.it',
      inStock: true,
      stockStatus: 'limited' as const,
      updatedAt: new Date().toISOString(),
    },
  ]
}

const getPriceHistory = async (productId: string) => {
  const today = new Date()
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (29 - i))
    return {
      date: date.toISOString().split('T')[0],
      price: 99900 + Math.floor(Math.random() * 10000) - 5000,
    }
  })
}

const getRelatedProducts = async (productId: string, currency: string) => {
  return [
    {
      id: '2',
      slug: 'iphone-15-pro-max',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      image: 'https://placehold.co/400x400/f5f5f5/171717?text=iPhone+Pro+Max',
      lowestPrice: 129900,
      currency,
      offerCount: 10,
    },
    {
      id: '3',
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+S24',
      lowestPrice: 119900,
      currency,
      offerCount: 12,
    },
  ]
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {}
  }

  const dictionary = await getDictionary('it')
  const price = (product.lowestPrice / 100).toFixed(2)

  return {
    title: dictionary.seo.productTitle
      .replace('{name}', product.name)
      .replace('{price}', `€${price}`),
    description: dictionary.seo.productDescription
      .replace('{name}', product.name)
      .replace('{count}', product.offerCount.toString())
      .replace('{price}', `€${price}`),
    openGraph: {
      title: `${product.name} | Confronta Prezzi da €${price}`,
      description: `Confronta prezzi per ${product.name} da ${product.offerCount} negozi.`,
      images: [{ url: product.image }],
    },
  }
}

export default async function ItalianProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const [dictionary, offers, priceHistory, relatedProducts] = await Promise.all([
    getDictionary('it'),
    getOffers(product.id),
    getPriceHistory(product.id),
    getRelatedProducts(product.id, product.currency),
  ])

  return (
    <ProductPage
      product={product}
      offers={offers}
      priceHistory={priceHistory}
      relatedProducts={relatedProducts}
      locale="it"
      country="it"
      dictionary={dictionary}
    />
  )
}
