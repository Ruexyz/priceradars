import Link from 'next/link'
import { ChevronRight, SearchX } from 'lucide-react'
import { ProductGrid } from '@/components/product/product-grid'
import { SearchFilters } from '@/components/search/search-filters'
import { SearchBarAdvanced } from '@/components/search/search-bar-advanced'
import type { Locale, CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  image: string
  lowestPrice: number
  currency: string
  offerCount: number
  inStock: boolean
}

interface SearchPageProps {
  query: string
  products: Product[]
  totalCount: number
  brands: string[]
  currentFilters: {
    minPrice?: string
    maxPrice?: string
    brand?: string
    sort?: string
  }
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
}

export function SearchPage({
  query,
  products,
  totalCount,
  brands,
  currentFilters,
  locale,
  country,
  dictionary,
}: SearchPageProps) {
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
            <li className="text-gray-900">{dictionary.search.title}</li>
          </ol>
        </div>
      </nav>

      {/* Header with Search */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <SearchBarAdvanced
              locale={locale}
              country={country}
              placeholder={dictionary.common.search}
              defaultValue={query}
              size="large"
              autoFocus
            />
          </div>
          {query && (
            <div className="mt-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {dictionary.search.resultsFor.replace('{query}', query)}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {dictionary.category.showingResults.replace(
                  '{count}',
                  totalCount.toString()
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <SearchFilters
                locale={locale}
                country={country}
                brands={brands}
                currentFilters={currentFilters}
                dictionary={{
                  filters: dictionary.category.filters,
                  priceRange: dictionary.category.priceRange,
                  brand: dictionary.category.brand,
                  sortBy: dictionary.category.sortBy,
                  clearFilters: dictionary.category.clearFilters,
                  sortOptions: dictionary.category.sortOptions,
                }}
              />
            </aside>

            {/* Products Grid */}
            <div className="mt-8 lg:col-span-3 lg:mt-0">
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
        ) : (
          <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-12 text-center">
            <SearchX className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {dictionary.search.noResults.replace('{query}', query)}
            </h2>
            <p className="mt-2 text-gray-500">{dictionary.search.tryDifferent}</p>
          </div>
        )}
      </div>
    </div>
  )
}
