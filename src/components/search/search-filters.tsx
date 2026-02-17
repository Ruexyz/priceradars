'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Locale, CountryCode } from '@/lib/countries'

interface MerchantFacet {
  name: string
  count: number
  id: number | string
}

interface SearchFiltersProps {
  locale: Locale
  country: CountryCode
  brands: string[]
  merchants?: MerchantFacet[]
  currentFilters: {
    minPrice?: string
    maxPrice?: string
    brand?: string
    sort?: string
    inStock?: string
    merchantId?: string
  }
  dictionary: {
    filters: string
    priceRange: string
    brand: string
    sortBy: string
    clearFilters: string
    sortOptions: {
      relevance: string
      priceLow: string
      priceHigh: string
      newest: string
      popular: string
    }
  }
}

export function SearchFilters({
  locale,
  country,
  brands,
  merchants = [],
  currentFilters,
  dictionary,
}: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    const q = searchParams.get('q')
    if (q) params.set('q', q)
    router.push(`?${params.toString()}`)
  }

  const hasFilters =
    currentFilters.minPrice ||
    currentFilters.maxPrice ||
    currentFilters.brand ||
    currentFilters.sort ||
    currentFilters.inStock ||
    currentFilters.merchantId

  return (
    <div className="space-y-4">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          {dictionary.filters}
        </Button>
        {hasFilters && (
          <Button variant="ghost" onClick={clearAllFilters} className="gap-2">
            <X className="h-4 w-4" />
            {dictionary.clearFilters}
          </Button>
        )}
      </div>

      {/* Filters */}
      <div
        className={`space-y-4 ${showFilters ? 'block' : 'hidden'} lg:block`}
      >
        {/* Availability */}
        <div>
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={currentFilters.inStock === 'true'}
              onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : null)}
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {locale === 'it' ? 'Solo disponibili' : locale === 'de' ? 'Nur verfügbare' : locale === 'fr' ? 'En stock uniquement' : locale === 'es' ? 'Solo disponibles' : 'In stock only'}
            </span>
          </label>
        </div>

        {/* Sort */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {dictionary.sortBy}
          </label>
          <Select
            value={currentFilters.sort || 'relevance'}
            onValueChange={(value) => updateFilter('sort', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">
                {dictionary.sortOptions.relevance}
              </SelectItem>
              <SelectItem value="price_asc">
                {dictionary.sortOptions.priceLow}
              </SelectItem>
              <SelectItem value="price_desc">
                {dictionary.sortOptions.priceHigh}
              </SelectItem>
              <SelectItem value="newest">
                {dictionary.sortOptions.newest}
              </SelectItem>
              <SelectItem value="popular">
                {dictionary.sortOptions.popular}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {dictionary.priceRange}
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={currentFilters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value || null)}
              className="w-full"
            />
            <span className="text-gray-400">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={currentFilters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value || null)}
              className="w-full"
            />
          </div>
        </div>

        {/* Brand */}
        {brands.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {dictionary.brand}
            </label>
            <Select
              value={currentFilters.brand || 'all'}
              onValueChange={(value) =>
                updateFilter('brand', value === 'all' ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {locale === 'it' ? 'Tutte le marche' : 'All brands'}
                </SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Merchant */}
        {merchants.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {locale === 'it' ? 'Venditore' : locale === 'de' ? 'Händler' : locale === 'fr' ? 'Vendeur' : locale === 'es' ? 'Vendedor' : 'Seller'}
            </label>
            <Select
              value={currentFilters.merchantId || 'all'}
              onValueChange={(value) =>
                updateFilter('merchantId', value === 'all' ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {locale === 'it' ? 'Tutti i venditori' : locale === 'de' ? 'Alle Händler' : locale === 'fr' ? 'Tous les vendeurs' : locale === 'es' ? 'Todos los vendedores' : 'All sellers'}
                </SelectItem>
                {merchants.map((m) => (
                  <SelectItem key={String(m.id)} value={String(m.id)}>
                    {m.name} ({m.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Clear filters - Desktop */}
        {hasFilters && (
          <div className="hidden lg:block">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full gap-2"
            >
              <X className="h-4 w-4" />
              {dictionary.clearFilters}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
