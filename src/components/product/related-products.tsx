import { searchProducts } from '@/lib/api/price-ninja'
import { ProductGrid } from '@/components/product/product-grid'
import { SortSelect } from '@/components/search/sort-select'
import type { Locale, CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'

interface RelatedProductsProps {
  productId: string
  productName: string
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
}

export async function RelatedProducts({
  productId,
  productName,
  locale,
  country,
  dictionary,
}: RelatedProductsProps) {
  const searchTerms = productName.split(' ').slice(0, 2).join(' ')
  
  const result = await searchProducts(searchTerms, {
    country,
    locale,
  })

  const relatedProducts = result.products
    .filter(p => p.id !== productId)
    .slice(0, 12)
    .map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      image: p.image,
      lowestPrice: p.lowestPrice,
      currency: p.currency,
      offerCount: 1,
      inStock: true,
    }))

  if (relatedProducts.length === 0) return null

  return (
    <section className="mt-16" aria-label={dictionary.product.relatedProducts}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {dictionary.product.relatedProducts}
        </h2>
        <SortSelect
          currentSort="relevance"
          dictionary={{
            sortBy: dictionary.category.sortBy,
            sortOptions: dictionary.category.sortOptions,
          }}
        />
      </div>
      <div className="mt-6">
        <ProductGrid
          products={relatedProducts}
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
    </section>
  )
}
