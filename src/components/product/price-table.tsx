import { ExternalLink, Check, AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { Locale } from '@/lib/countries'

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

interface PriceTableProps {
  offers: Offer[]
  locale: Locale
  dictionary: {
    goToStore: string
    inStock: string
    outOfStock: string
    limitedStock: string
    lastUpdated: string
  }
}

export function PriceTable({ offers, locale, dictionary }: PriceTableProps) {
  const sortedOffers = [...offers].sort((a, b) => {
    // In stock items first
    if (a.inStock && !b.inStock) return -1
    if (!a.inStock && b.inStock) return 1
    // Then by price
    return a.price - b.price
  })

  const lowestPrice = sortedOffers.find((o) => o.inStock)?.price || sortedOffers[0]?.price

  const getStockBadge = (offer: Offer) => {
    if (!offer.inStock || offer.stockStatus === 'out_of_stock') {
      return (
        <Badge variant="destructive" className="gap-1">
          <X className="h-3 w-3" />
          {dictionary.outOfStock}
        </Badge>
      )
    }
    if (offer.stockStatus === 'limited') {
      return (
        <Badge variant="warning" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          {dictionary.limitedStock}
        </Badge>
      )
    }
    return (
      <Badge variant="success" className="gap-1">
        <Check className="h-3 w-3" />
        {dictionary.inStock}
      </Badge>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                {locale === 'it' ? 'Negozio' : 'Store'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                {locale === 'it' ? 'Prezzo' : 'Price'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                {locale === 'it' ? 'Disponibilità' : 'Availability'}
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                {locale === 'it' ? 'Azione' : 'Action'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedOffers.map((offer, index) => {
              const isLowest = offer.price === lowestPrice && offer.inStock
              return (
                <tr
                  key={offer.id}
                  className={`transition-all duration-300 ease-in-out hover:bg-gray-50 ${
                    !offer.inStock ? 'opacity-60' : ''
                  }`}
                >
                  {/* Store */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {offer.merchantLogo ? (
                        <img
                          src={offer.merchantLogo}
                          alt={offer.merchantName}
                          className="h-8 w-8 rounded object-contain"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-600">
                          {offer.merchantName.charAt(0)}
                        </div>
                      )}
                      <span className="font-medium text-gray-900">
                        {offer.merchantName}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-bold ${
                          isLowest ? 'text-orange-500' : 'text-gray-900'
                        }`}
                      >
                        {formatPrice(offer.price, offer.currency, locale)}
                      </span>
                      {isLowest && index === 0 && (
                        <Badge variant="default" className="text-xs">
                          {locale === 'it' ? 'Migliore' : 'Best'}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Availability */}
                  <td className="px-4 py-4">{getStockBadge(offer)}</td>

                  {/* Action */}
                  <td className="px-4 py-4 text-right">
                    <Button
                      asChild
                      variant={offer.inStock ? 'default' : 'secondary'}
                      size="sm"
                      disabled={!offer.inStock}
                    >
                      <a
                        href={offer.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="gap-2"
                      >
                        {dictionary.goToStore}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Last updated */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500">
        {dictionary.lastUpdated}: {new Date().toLocaleString(locale === 'it' ? 'it-IT' : 'en-GB')}
      </div>
    </div>
  )
}
