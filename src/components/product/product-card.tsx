import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice, generateProductUrl } from '@/lib/utils'
import type { Locale, CountryCode } from '@/lib/countries'

interface ProductCardProps {
  product: {
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

export function ProductCard({
  product,
  locale,
  country,
  dictionary,
}: ProductCardProps) {
  const productUrl = generateProductUrl(product.slug, locale, country)
  const formattedPrice = formatPrice(product.lowestPrice, product.currency, locale)
  const storeText =
    product.offerCount === 1 ? dictionary.store : dictionary.stores

  return (
    <Link href={productUrl}>
      <Card className="group flex h-full flex-col overflow-hidden hover:shadow-lg">
        <CardContent className="flex flex-1 flex-col p-0">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 transition-transform group-hover:scale-105"
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <Badge variant="secondary">{dictionary.outOfStock}</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            {/* Brand */}
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {product.brand}
            </p>

            {/* Name - fixed height for 2 lines */}
            <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-900 transition-colors duration-300 ease-in-out group-hover:text-orange-500">
              {product.name}
            </h3>

            {/* Spacer to push price to bottom */}
            <div className="flex-1" />

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-gray-500">{dictionary.from}</span>
              <span className="text-lg font-bold text-orange-500">
                {formattedPrice}
              </span>
            </div>

            {/* Store count */}
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <ExternalLink className="h-3 w-3" />
              <span>
                {product.offerCount} {storeText}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
