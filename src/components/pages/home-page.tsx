import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'
import { SearchBar } from '@/components/search/search-bar'
import { ProductGrid } from '@/components/product/product-grid'
import { CategoryCard } from '@/components/category/category-card'
import { Button } from '@/components/ui/button'
import { countries, type Locale, type CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'

interface HomePageProps {
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
}

// Mock data - will be replaced with real data from API
const getMockProducts = (currency: string) => [
  {
    id: '1',
    slug: 'iphone-15-pro-256gb',
    name: 'iPhone 15 Pro 256GB',
    brand: 'Apple',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=iPhone+15+Pro',
    lowestPrice: 99900,
    currency,
    offerCount: 8,
    inStock: true,
  },
  {
    id: '2',
    slug: 'macbook-air-m3',
    name: 'MacBook Air M3 13"',
    brand: 'Apple',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=MacBook+Air',
    lowestPrice: 119900,
    currency,
    offerCount: 12,
    inStock: true,
  },
  {
    id: '3',
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Galaxy+S24',
    lowestPrice: 129900,
    currency,
    offerCount: 15,
    inStock: true,
  },
  {
    id: '4',
    slug: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=Sony+XM5',
    lowestPrice: 32900,
    currency,
    offerCount: 10,
    inStock: true,
  },
  {
    id: '5',
    slug: 'playstation-5-slim',
    name: 'PlayStation 5 Slim',
    brand: 'Sony',
    image: 'https://placehold.co/400x400/f5f5f5/171717?text=PS5+Slim',
    lowestPrice: 49900,
    currency,
    offerCount: 6,
    inStock: false,
  },
]

const categories = [
  { slug: 'smartphones', nameEn: 'Smartphones', nameIt: 'Smartphone', productCount: 1250 },
  { slug: 'laptops', nameEn: 'Laptops', nameIt: 'Laptop', productCount: 890 },
  { slug: 'tv-audio', nameEn: 'TV & Audio', nameIt: 'TV & Audio', productCount: 650 },
  { slug: 'appliances', nameEn: 'Appliances', nameIt: 'Elettrodomestici', productCount: 1100 },
  { slug: 'gaming', nameEn: 'Gaming', nameIt: 'Gaming', productCount: 780 },
  { slug: 'cameras', nameEn: 'Cameras', nameIt: 'Fotocamere', productCount: 420 },
]

export function HomePage({ locale, country, dictionary }: HomePageProps) {
  const countryConfig = countries[country]
  const currency = countryConfig?.currency || 'EUR'
  const products = getMockProducts(currency)

  const getCategoryUrl = (slug: string) => {
    if (locale === 'it') {
      return `/it/categoria/${slug}`
    }
    return `/en/${country}/category/${slug}`
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {dictionary.home.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {dictionary.home.subtitle}
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar
              locale={locale}
              country={country}
              placeholder={dictionary.home.searchPlaceholder}
              size="large"
            />
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span>{dictionary.home.trustedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-500" />
              <span>{locale === 'it' ? 'Prezzi verificati' : 'Verified prices'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span>{locale === 'it' ? 'Aggiornato ogni ora' : 'Updated hourly'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {dictionary.home.popularCategories}
            </h2>
            <Link
              href={getCategoryUrl('all')}
              className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              {dictionary.common.seeAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={{
                  slug: category.slug,
                  name: locale === 'it' ? category.nameIt : category.nameEn,
                  productCount: category.productCount,
                }}
                href={getCategoryUrl(category.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {dictionary.home.trendingProducts}
            </h2>
            <Link
              href={getCategoryUrl('trending')}
              className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              {dictionary.common.seeAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6">
            <ProductGrid
              products={products}
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
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {locale === 'it'
              ? 'Non perdere mai una buona offerta'
              : 'Never miss a great deal'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {locale === 'it'
              ? 'Imposta avvisi di prezzo per i prodotti che ti interessano e ricevi notifiche quando il prezzo scende.'
              : 'Set price alerts for products you\'re interested in and get notified when the price drops.'}
          </p>
          <div className="mt-8">
            <Button size="lg">
              {locale === 'it' ? 'Inizia ora' : 'Get started'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
