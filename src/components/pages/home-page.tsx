import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Zap, Search } from 'lucide-react'
import { SearchBarAdvanced } from '@/components/search/search-bar-advanced'
import { CategoryCard } from '@/components/category/category-card'
import { Button } from '@/components/ui/button'
import { countries, type Locale, type CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'

interface HomePageProps {
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
}

const categories = [
  { slug: 'smartphones', nameEn: 'Smartphones', nameIt: 'Smartphone', productCount: 1250 },
  { slug: 'laptops', nameEn: 'Laptops', nameIt: 'Laptop', productCount: 890 },
  { slug: 'tv-audio', nameEn: 'TV & Audio', nameIt: 'TV & Audio', productCount: 650 },
  { slug: 'appliances', nameEn: 'Appliances', nameIt: 'Elettrodomestici', productCount: 1100 },
  { slug: 'gaming', nameEn: 'Gaming', nameIt: 'Gaming', productCount: 780 },
  { slug: 'cameras', nameEn: 'Cameras', nameIt: 'Fotocamere', productCount: 420 },
]

// Popular search terms to help users start
const popularSearches = {
  it: ['iPhone', 'Samsung Galaxy', 'MacBook', 'PlayStation', 'AirPods', 'TV 65 pollici'],
  en: ['iPhone', 'Samsung Galaxy', 'MacBook', 'PlayStation', 'AirPods', '65 inch TV'],
}

export function HomePage({ locale, country, dictionary }: HomePageProps) {
  const getCategoryUrl = (slug: string) => {
    if (locale === 'it') {
      return `/it/categoria/${slug}`
    }
    return `/en/${country}/category/${slug}`
  }

  const getSearchUrl = (query: string) => {
    if (locale === 'it') {
      return `/it/cerca?q=${encodeURIComponent(query)}`
    }
    return `/en/${country}/search?q=${encodeURIComponent(query)}`
  }

  const searches = popularSearches[locale] || popularSearches.en

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
            <SearchBarAdvanced
              locale={locale}
              country={country}
              placeholder={dictionary.home.searchPlaceholder}
              size="large"
            />
          </div>

          {/* Popular searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-gray-500">
              {locale === 'it' ? 'Ricerche popolari:' : 'Popular:'}
            </span>
            {searches.map((term) => (
              <Link
                key={term}
                href={getSearchUrl(term)}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                <Search className="h-3 w-3" />
                {term}
              </Link>
            ))}
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
              ? 'Cerca qualsiasi prodotto e confronta i prezzi dai migliori negozi online. Risparmia tempo e denaro con PriceRadars.'
              : 'Search for any product and compare prices from the best online stores. Save time and money with PriceRadars.'}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={getSearchUrl('')}>
                {locale === 'it' ? 'Inizia a cercare' : 'Start searching'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
