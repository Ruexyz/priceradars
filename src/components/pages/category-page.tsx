import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/product/product-grid'
import { AdvancedFilters } from '@/components/search/advanced-filters'
import { SortSelect } from '@/components/search/sort-select'
import { countries, type Locale, type CountryCode } from '@/lib/countries'
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

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface MerchantFacet {
  name: string
  count: number
  id: number | string
}

interface CategoryPageProps {
  category: {
    slug: string
    name: string
    description?: string
  }
  products: Product[]
  totalCount: number
  brands: string[]
  merchants?: MerchantFacet[]
  currentFilters: Record<string, string | string[] | undefined>
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
  screenSizes?: FilterOption[]
  resolutions?: FilterOption[]
  storageOptions?: FilterOption[]
  ramOptions?: FilterOption[]
  colors?: FilterOption[]
}

export function CategoryPage({
  category,
  products,
  totalCount,
  brands,
  merchants = [],
  currentFilters,
  locale,
  country,
  dictionary,
  screenSizes,
  resolutions,
  storageOptions,
  ramOptions,
  colors,
}: CategoryPageProps) {
  const homeUrl = locale === 'it' ? '/it' : `/en/${country}`
  const countryConfig = countries[country]
  const currency = countryConfig?.currency || 'EUR'

  // Build filter sections dynamically based on category
  const filterSections = [
    {
      id: 'availability',
      title: dictionary.category.availability,
      type: 'checkbox' as const,
      options: [
        { value: 'in_stock', label: dictionary.category.inStockOnly },
      ],
      defaultExpanded: true,
    },
    {
      id: 'price',
      title: dictionary.category.priceRange,
      type: 'price' as const,
      defaultExpanded: true,
    },
    {
      id: 'offers',
      title: dictionary.category.offers,
      type: 'link' as const,
      options: [
        { value: 'today', label: dictionary.category.todayDeals },
        { value: 'all', label: dictionary.category.allSavings },
      ],
      defaultExpanded: true,
    },
    {
      id: 'brand',
      title: dictionary.category.brand,
      type: 'checkbox' as const,
      options: brands.map((brand) => ({ value: brand.toLowerCase(), label: brand })),
      expandable: true,
      defaultExpanded: true,
    },
    ...(merchants.length > 0 ? [{
      id: 'merchantId',
      title: locale === 'it' ? 'Venditore' : locale === 'de' ? 'Händler' : locale === 'fr' ? 'Vendeur' : locale === 'es' ? 'Vendedor' : 'Seller',
      type: 'checkbox' as const,
      options: merchants.map(m => ({ value: String(m.id), label: `${m.name} (${m.count})` })),
      expandable: true,
      defaultExpanded: false,
    }] : []),
    ...(screenSizes ? [{
      id: 'screenSize',
      title: dictionary.category.screenSize,
      type: 'checkbox' as const,
      options: screenSizes,
      expandable: true,
      defaultExpanded: false,
    }] : []),
    ...(resolutions ? [{
      id: 'resolution',
      title: dictionary.category.resolution,
      type: 'checkbox' as const,
      options: resolutions,
      expandable: true,
      defaultExpanded: false,
    }] : []),
    ...(storageOptions ? [{
      id: 'storage',
      title: dictionary.category.storage,
      type: 'checkbox' as const,
      options: storageOptions,
      expandable: true,
      defaultExpanded: false,
    }] : []),
    ...(ramOptions ? [{
      id: 'ram',
      title: dictionary.category.ram,
      type: 'checkbox' as const,
      options: ramOptions,
      expandable: true,
      defaultExpanded: false,
    }] : []),
    ...(colors ? [{
      id: 'color',
      title: dictionary.category.color,
      type: 'checkbox' as const,
      options: colors,
      expandable: true,
      defaultExpanded: false,
    }] : []),
    {
      id: 'condition',
      title: dictionary.category.condition,
      type: 'checkbox' as const,
      options: [
        { value: 'new', label: dictionary.category.new },
        { value: 'refurbished', label: dictionary.category.refurbished },
        { value: 'used', label: dictionary.category.used },
      ],
      defaultExpanded: false,
    },
  ]

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link 
                href={homeUrl} 
                className="text-gray-500 transition-colors duration-300 ease-in-out hover:text-gray-700"
              >
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li className="text-gray-900">{category.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              {category.description && (
                <p className="mt-2 text-gray-600">{category.description}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                {dictionary.category.showingResults.replace(
                  '{count}',
                  totalCount.toString()
                )}
              </p>
            </div>
            {/* Sort - Mobile & Desktop */}
            <SortSelect
              currentSort={(currentFilters.sort as string) || 'relevance'}
              dictionary={{
                sortBy: dictionary.category.sortBy,
                sortOptions: dictionary.category.sortOptions,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <AdvancedFilters
                locale={locale}
                country={country}
                currency={currency}
                filters={filterSections}
                currentFilters={currentFilters}
                priceRange={{ min: 0, max: 500000 }}
                dictionary={{
                  filters: dictionary.category.filters,
                  clearFilters: dictionary.category.clearFilters,
                  seeMore: dictionary.category.seeMore,
                  seeLess: dictionary.category.seeLess,
                  applyFilters: dictionary.category.applyFilters,
                }}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
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
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <p className="text-gray-500">{dictionary.category.noProducts}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
