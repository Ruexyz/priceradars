import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { ProductPage } from '@/components/pages/product-page'
import { RelatedProducts } from '@/components/product/related-products'
import { ProductGridSkeleton } from '@/components/ui/loading'
import { ProductJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { countries, getNativeLocale, type CountryCode } from '@/lib/countries'
import type { Locale } from '@/lib/i18n/config'
import { getProductDetail, extractUuidFromSlug } from '@/lib/api/price-ninja'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'
const validCountries = ['uk', 'us', 'de', 'fr', 'es']

interface PageProps {
  params: Promise<{ country: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, slug } = await params
  if (!validCountries.includes(country)) return {}

  const uuid = extractUuidFromSlug(slug)
  const product = await getProductDetail(uuid)
  if (!product) return {}

  const countryConfig = countries[country as CountryCode]
  const currency = countryConfig?.currency || 'EUR'
  const price = (product.lowestPrice / 100).toFixed(2)
  const sym = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€'
  const canonicalUrl = `${BASE_URL}/en/${country}/product/${slug}`
  const nativeLocale = getNativeLocale(country) as Locale
  const dictionary = await getDictionary(nativeLocale)

  return {
    title: dictionary.seo.productTitle.replace('{name}', product.name).replace('{price}', `${sym}${price}`),
    description: dictionary.seo.productDescription.replace('{name}', product.name).replace('{count}', String(product.offerCount || 1)).replace('{price}', `${sym}${price}`),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name} | Compare Prices from ${sym}${price}`,
      description: product.description || `Compare prices for ${product.name}.`,
      url: canonicalUrl,
      type: 'website',
      siteName: 'PriceRadars',
      images: product.image ? [{ url: product.image, width: 600, height: 600, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - from ${sym}${price}`,
      images: product.image ? [product.image] : [],
    },
  }
}

export default async function EnglishProductPage({ params }: PageProps) {
  const { country, slug } = await params
  if (!validCountries.includes(country)) notFound()

  const uuid = extractUuidFromSlug(slug)
  const nativeLocale = getNativeLocale(country) as Locale
  const [product, dictionary] = await Promise.all([
    getProductDetail(uuid),
    getDictionary(nativeLocale),
  ])
  if (!product) notFound()

  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.categories[0] || (product.condition === 'NEW' ? 'New' : 'Used'),
    categorySlug: 'all',
    image: product.image,
    images: product.images,
    description: product.description,
    specs: {} as Record<string, string>,
    lowestPrice: product.lowestPrice,
    currency: product.currency,
    offerCount: product.offerCount,
  }

  const offers = product.offers.map(o => ({
    id: o.id,
    merchantId: o.merchantDomain,
    merchantName: o.merchantName,
    price: o.price,
    currency: o.currency,
    url: o.deeplink,
    inStock: o.inStock,
    stockStatus: o.inStock ? 'in_stock' as const : 'out_of_stock' as const,
    updatedAt: new Date().toISOString(),
  }))

  if (offers.length === 0 && product.lowestPrice > 0) {
    offers.push({
      id: product.id,
      merchantId: '',
      merchantName: 'Store',
      price: product.lowestPrice,
      currency: product.currency,
      url: '',
      inStock: product.inStock,
      stockStatus: product.inStock ? 'in_stock' as const : 'out_of_stock' as const,
      updatedAt: new Date().toISOString(),
    })
  }

  if (product.originalPrice > product.lowestPrice) {
    productData.specs['Original Price'] = `€${(product.originalPrice / 100).toFixed(2)}`
  }
  if (product.condition) {
    productData.specs['Condition'] = product.condition === 'NEW' ? 'New' : product.condition
  }
  if (product.categories.length > 0) {
    productData.specs['Category'] = product.categories.join(' > ')
  }
  productData.specs['Available offers'] = String(product.offerCount)

  const priceHistory = product.priceHistory.length > 0
    ? product.priceHistory
    : [{ date: new Date().toISOString().split('T')[0], price: product.lowestPrice }]

  return (
    <>
      <ProductJsonLd
        product={{
          name: product.name,
          description: product.description || product.name,
          image: product.image,
          brand: product.brand,
        }}
        offers={offers.map(o => ({
          price: o.price,
          currency: o.currency,
          url: o.url,
          merchantName: o.merchantName,
          inStock: o.inStock,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/en/${country}` },
          { name: product.name, url: `${BASE_URL}/en/${country}/product/${slug}` },
        ]}
      />
      <FAQJsonLd
        questions={[
          { question: 'Is the price shown the final price?', answer: 'Yes, prices include VAT. Shipping costs are shown separately.' },
          { question: 'How can I be sure I\'m getting the best price?', answer: 'PriceRadars compares prices from dozens of verified stores. Click "View deal" to buy at the lowest price.' },
          { question: 'Does the purchase happen on PriceRadars?', answer: 'No, we redirect you to the official store where you buy directly with all guarantees.' },
          { question: 'Can I get a price drop alert?', answer: 'Yes! Use the "Price Alert" button to get notified when the price drops.' },
        ]}
      />

      <ProductPage
        product={productData}
        offers={offers}
        priceHistory={priceHistory}
        relatedProducts={[]}
        locale={nativeLocale}
        country={country as CountryCode}
        dictionary={dictionary}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Suspense fallback={<ProductGridSkeleton />}>
          <RelatedProducts
            productId={product.id}
            productName={product.name}
            locale={nativeLocale}
            country={country as CountryCode}
            dictionary={dictionary}
          />
        </Suspense>
      </div>
    </>
  )
}
