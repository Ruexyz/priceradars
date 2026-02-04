import { ProductCard } from './product-card'
import type { Locale, CountryCode } from '@/lib/countries'

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

interface ProductGridProps {
  products: Product[]
  locale: Locale
  country: CountryCode
  dictionary: {
    stores: string
    store: string
    from: string
    inStock: string
    outOfStock: string
  }
}

export function ProductGrid({
  products,
  locale,
  country,
  dictionary,
}: ProductGridProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          country={country}
          dictionary={dictionary}
        />
      ))}
    </div>
  )
}
