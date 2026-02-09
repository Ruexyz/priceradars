import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { ProductPage } from '@/components/pages/product-page'
import { RelatedProducts } from '@/components/product/related-products'
import { ProductGridSkeleton } from '@/components/ui/loading'
import { ProductJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { countries, type CountryCode } from '@/lib/countries'
import { getProductDetail, extractUuidFromSlug } from '@/lib/api/price-ninja'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'
const validCountries = ['uk', 'us', 'de', 'fr', 'es']

interface PageProps {
  params: Promise<{ country: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, slug } = await params

  if (!validCountries.includes(country)) {
    return {}
  }

  const uuid = extractUuidFromSlug(slug)
  const product = await getProductDetail(uuid)

  if (!product) {
    return {}
  }

  const countryConfig = countries[country as CountryCode]
  const currency = countryConfig?.currency || 'EUR'
  const price = (product.lowestPrice / 100).toFixed(2)
  const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€'
  const canonicalUrl = `${BASE_URL}/en/${country}/product/${slug}`

  const dictionary = await getDictionary('en')

  return {
    title: dictionary.seo.productTitle
      .replace('{name}', product.name)
      .replace('{price}', `${currencySymbol}${price}`),
    description: dictionary.seo.productDescription
      .replace('{name}', product.name)
      .replace('{count}', '1')
      .replace('{price}', `${currencySymbol}${price}`),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Compare Prices from ${currencySymbol}${price}`,
      description: product.description || `Compare prices for ${product.name}.`,
      url: canonicalUrl,
      type: 'website',
      siteName: 'PriceRadars',
      images: product.image ? [{ url: product.image, width: 600, height: 600, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - from ${currencySymbol}${price}`,
      description: product.description || `Compare prices for ${product.name}.`,
      images: product.image ? [product.image] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function EnglishProductPage({ params }: PageProps) {
  const { country, slug } = await params

  if (!validCountries.includes(country)) {
    notFound()
  }

  const uuid = extractUuidFromSlug(slug)

  const [product, dictionary] = await Promise.all([
    getProductDetail(uuid),
    getDictionary('en'),
  ])

  if (!product) {
    notFound()
  }

  // Build product data for ProductPage component
  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand || '',
    category: product.condition === 'NEW' ? 'New' : 'Used',
    categorySlug: 'all',
    image: product.image || '',
    images: product.image ? [product.image] : [],
    description: product.description || product.name,
    specs: {} as Record<string, string>,
    lowestPrice: product.lowestPrice,
    currency: product.currency,
    offerCount: 1,
  }

  const offers = [
    {
      id: product.id,
      merchantId: product.merchantDomain,
      merchantName: product.merchantName,
      price: product.lowestPrice,
      currency: product.currency,
      url: product.deeplink,
      inStock: product.inStock,
      stockStatus: product.inStock ? 'in_stock' as const : 'out_of_stock' as const,
      updatedAt: new Date().toISOString(),
    },
  ]

  if (product.originalPrice > product.lowestPrice) {
    productData.specs['Original Price'] = `€${(product.originalPrice / 100).toFixed(2)}`
    productData.specs['Discount'] = `${product.discount.toFixed(0)}%`
  }

  if (product.condition) {
    productData.specs['Condition'] = product.condition === 'NEW' ? 'New' : product.condition
  }

  if (product.deliveryCost !== null) {
    productData.specs['Shipping'] = product.deliveryCost > 0 
      ? `€${product.deliveryCost.toFixed(2)}` 
      : 'Free'
  }

  productData.specs['Seller'] = product.merchantName
  productData.specs['Website'] = product.merchantDomain

  const today = new Date()
  const priceHistory = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    return {
      date: date.toISOString().split('T')[0],
      price: product.lowestPrice,
    }
  })

  return (
    <>
      <ProductJsonLd
        product={{
          name: product.name,
          description: product.description || product.name,
          image: product.image,
          brand: product.brand || '',
        }}
        offers={[{
          price: product.lowestPrice,
          currency: product.currency,
          url: product.deeplink,
          merchantName: product.merchantName,
          inStock: product.inStock,
        }]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/en/${country}` },
          { name: product.name, url: `${BASE_URL}/en/${country}/product/${slug}` },
        ]}
      />
      <FAQJsonLd
        questions={[
          { question: 'Is the price shown the final price?', answer: 'Yes, the prices shown include VAT. Any shipping costs are shown separately. Prices are verified and updated regularly.' },
          { question: 'How can I be sure I\'m getting the best price?', answer: 'PriceRadars compares prices from dozens of verified online stores. Simply click "View deal" to buy at the lowest price available.' },
          { question: 'Does the purchase happen on PriceRadars?', answer: 'No, PriceRadars is a price comparison service. Clicking an offer redirects you to the online store where you can buy directly, with all the seller\'s guarantees.' },
          { question: 'Can I get an alert when the price drops?', answer: 'Yes! Use the "Price Alert" button to set a price alert. You\'ll be notified as soon as the price drops below your target.' },
        ]}
      />

      <ProductPage
        product={productData}
        offers={offers}
        priceHistory={priceHistory}
        relatedProducts={[]}
        locale="en"
        country={country as CountryCode}
        dictionary={dictionary}
      />

      {/* Related products load async - doesn't block page render */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Suspense fallback={<ProductGridSkeleton />}>
          <RelatedProducts
            productId={product.id}
            productName={product.name}
            locale="en"
            country={country as CountryCode}
            dictionary={dictionary}
          />
        </Suspense>
      </div>
    </>
  )
}
