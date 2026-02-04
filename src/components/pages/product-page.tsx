import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Share2, Heart } from 'lucide-react'
import { PriceTable } from '@/components/product/price-table'
import { PriceChart } from '@/components/product/price-chart'
import { PriceAlertDialog } from '@/components/product/price-alert-dialog'
import { ProductGrid } from '@/components/product/product-grid'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatPrice } from '@/lib/utils'
import { countries, type Locale, type CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  categorySlug: string
  image: string
  images: string[]
  description: string
  specs: Record<string, string>
  lowestPrice: number
  currency: string
  offerCount: number
}

interface Offer {
  id: string
  merchantId: string
  merchantName: string
  merchantLogo?: string
  price: number
  currency: string
  url: string
  inStock: boolean
  stockStatus?: 'in_stock' | 'limited' | 'out_of_stock'
  updatedAt: string
}

interface PricePoint {
  date: string
  price: number
}

interface RelatedProduct {
  id: string
  slug: string
  name: string
  brand: string
  image: string
  lowestPrice: number
  currency: string
  offerCount: number
}

interface ProductPageProps {
  product: Product
  offers: Offer[]
  priceHistory: PricePoint[]
  relatedProducts: RelatedProduct[]
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
}

export function ProductPage({
  product,
  offers,
  priceHistory,
  relatedProducts,
  locale,
  country,
  dictionary,
}: ProductPageProps) {
  const countryConfig = countries[country]
  const categoryUrl =
    locale === 'it'
      ? `/it/categoria/${product.categorySlug}`
      : `/en/${country}/category/${product.categorySlug}`

  const homeUrl = locale === 'it' ? '/it' : `/en/${country}`

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href={homeUrl} className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li>
              <Link href={categoryUrl} className="text-gray-500 hover:text-gray-700">
                {product.category}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Header */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  {product.brand}
                </p>
                <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500">
                  {dictionary.common.lowestPrice}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-orange-500">
                  {formatPrice(product.lowestPrice, product.currency, locale)}
                </span>
                <Badge variant="secondary">
                  {product.offerCount}{' '}
                  {product.offerCount === 1
                    ? dictionary.common.store
                    : dictionary.common.stores}
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={offers[0]?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {dictionary.product.viewDeal}
                  </a>
                </Button>
                <PriceAlertDialog
                  productName={product.name}
                  currentPrice={product.lowestPrice}
                  currency={product.currency}
                  locale={locale}
                  dictionary={{
                    priceDropAlert: dictionary.product.priceDropAlert,
                    alertDescription: dictionary.product.alertDescription,
                    setAlert: dictionary.common.setAlert,
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="prices">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="prices">
                {dictionary.product.comparePrices}
              </TabsTrigger>
              <TabsTrigger value="history">
                {dictionary.product.priceHistory}
              </TabsTrigger>
              <TabsTrigger value="specs">
                {dictionary.product.specifications}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prices" className="mt-6">
              <PriceTable
                offers={offers}
                locale={locale}
                dictionary={{
                  goToStore: dictionary.common.goToStore,
                  inStock: dictionary.common.inStock,
                  outOfStock: dictionary.common.outOfStock,
                  limitedStock: dictionary.common.limitedStock,
                  lastUpdated: dictionary.product.lastUpdated,
                }}
              />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <PriceChart
                priceHistory={priceHistory}
                currency={product.currency}
                locale={locale}
                dictionary={{
                  priceHistory: dictionary.product.priceHistory,
                  currentLowest: dictionary.product.currentLowest,
                  averagePrice: dictionary.product.averagePrice,
                  highestPrice: dictionary.product.highestPrice,
                  priceChange: dictionary.product.priceChange,
                }}
              />
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="rounded-xl border border-gray-200 bg-white">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-500">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              {dictionary.product.relatedProducts}
            </h2>
            <div className="mt-6">
              <ProductGrid
                products={relatedProducts.map((p) => ({
                  ...p,
                  inStock: true,
                }))}
                locale={locale}
                country={country}
                dictionary={{
                  stores: dictionary.common.stores,
                  store: dictionary.common.store,
                  from: dictionary.common.from,
                  inStock: dictionary.common.inStock,
                  outOfStock: dictionary.common.outOfStock,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
