import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { ProductPage } from '@/components/pages/product-page'
import { countries, type CountryCode } from '@/lib/countries'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

// Mock product data - will be replaced with DB queries
const getProduct = async (slug: string, countryCode: string) => {
  const countryConfig = countries[countryCode as CountryCode]
  const currency = countryConfig?.currency || 'EUR'

  return {
    id: '1',
    slug,
    name: 'iPhone 15 Pro 256GB',
    brand: 'Apple',
    category: 'Smartphones',
    categorySlug: 'smartphones',
    image: 'https://placehold.co/600x600/f9fafb/FF6B00?text=iPhone+15+Pro&font=inter',
    images: [
      'https://placehold.co/600x600/f9fafb/FF6B00?text=iPhone+15+Pro&font=inter',
      'https://placehold.co/600x600/f9fafb/FF6B00?text=Back&font=inter',
      'https://placehold.co/600x600/f9fafb/FF6B00?text=Side&font=inter',
    ],
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
    lowestPrice: currency === 'GBP' ? 89900 : currency === 'USD' ? 99900 : 99900,
    currency,
    offerCount: 8,
  }
}

const getOffers = async (productId: string, countryCode: string) => {
  const countryConfig = countries[countryCode as CountryCode]
  const currency = countryConfig?.currency || 'EUR'
  const merchants = countryConfig?.merchants || []

  const merchantNames: Record<string, string> = {
    'amazon-uk': 'Amazon.co.uk',
    'amazon-us': 'Amazon.com',
    'amazon-de': 'Amazon.de',
    'amazon-fr': 'Amazon.fr',
    'amazon-es': 'Amazon.es',
    currys: 'Currys',
    argos: 'Argos',
    bestbuy: 'Best Buy',
    walmart: 'Walmart',
  }

  return merchants.slice(0, 3).map((merchantId, i) => ({
    id: `${i + 1}`,
    merchantId,
    merchantName: merchantNames[merchantId] || merchantId,
    price: (currency === 'GBP' ? 89900 : currency === 'USD' ? 99900 : 99900) + i * 5000,
    currency,
    url: `https://${merchantId.replace('-', '.')}.com`,
    inStock: true,
    stockStatus: 'in_stock' as const,
    updatedAt: new Date().toISOString(),
  }))
}

const getPriceHistory = async (productId: string, currency: string) => {
  const basePrice = currency === 'GBP' ? 89900 : currency === 'USD' ? 99900 : 99900
  const today = new Date()
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (29 - i))
    return {
      date: date.toISOString().split('T')[0],
      price: basePrice + Math.floor(Math.random() * 10000) - 5000,
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
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=iPhone+Pro+Max&font=inter',
      lowestPrice: currency === 'GBP' ? 109900 : currency === 'USD' ? 119900 : 129900,
      currency,
      offerCount: 10,
    },
    {
      id: '3',
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      image: 'https://placehold.co/400x400/f9fafb/FF6B00?text=Galaxy+S24&font=inter',
      lowestPrice: currency === 'GBP' ? 99900 : currency === 'USD' ? 109900 : 119900,
      currency,
      offerCount: 12,
    },
  ]
}

interface PageProps {
  params: Promise<{ country: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, slug } = await params

  if (!validCountries.includes(country)) {
    return {}
  }

  const product = await getProduct(slug, country)
  const dictionary = await getDictionary('en')
  const currencySymbol = product.currency === 'GBP' ? '£' : product.currency === 'USD' ? '$' : '€'
  const price = (product.lowestPrice / 100).toFixed(2)

  return {
    title: dictionary.seo.productTitle
      .replace('{name}', product.name)
      .replace('{price}', `${currencySymbol}${price}`),
    description: dictionary.seo.productDescription
      .replace('{name}', product.name)
      .replace('{count}', product.offerCount.toString())
      .replace('{price}', `${currencySymbol}${price}`),
    openGraph: {
      title: `${product.name} | Compare Prices from ${currencySymbol}${price}`,
      description: `Compare prices for ${product.name} from ${product.offerCount} stores.`,
      images: [{ url: product.image }],
    },
  }
}

export default async function EnglishProductPage({ params }: PageProps) {
  const { country, slug } = await params

  if (!validCountries.includes(country)) {
    notFound()
  }

  const product = await getProduct(slug, country)

  if (!product) {
    notFound()
  }

  const [dictionary, offers, priceHistory, relatedProducts] = await Promise.all([
    getDictionary('en'),
    getOffers(product.id, country),
    getPriceHistory(product.id, product.currency),
    getRelatedProducts(product.id, product.currency),
  ])

  return (
    <ProductPage
      product={product}
      offers={offers}
      priceHistory={priceHistory}
      relatedProducts={relatedProducts}
      locale="en"
      country={country as CountryCode}
      dictionary={dictionary}
    />
  )
}
