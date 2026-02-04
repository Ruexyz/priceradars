'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import type { Locale, CountryCode } from '@/lib/countries'

interface FilterSection {
  id: string
  title: string
  type: 'checkbox' | 'price' | 'link'
  options?: Array<{
    value: string
    label: string
    count?: number
  }>
  expandable?: boolean
  defaultExpanded?: boolean
}

interface AdvancedFiltersProps {
  locale: Locale
  country: CountryCode
  currency: string
  filters: FilterSection[]
  currentFilters: Record<string, string | string[] | undefined>
  priceRange: { min: number; max: number }
  dictionary: {
    filters: string
    clearFilters: string
    seeMore: string
    seeLess: string
    applyFilters: string
  }
}

export function AdvancedFilters({
  locale,
  country,
  currency,
  filters,
  currentFilters,
  priceRange,
  dictionary,
}: AdvancedFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(filters.filter((f) => f.defaultExpanded !== false).map((f) => f.id))
  )
  const [showMoreSections, setShowMoreSections] = useState<Set<string>>(new Set())
  const [priceValue, setPriceValue] = useState<[number, number]>([
    parseInt(currentFilters.minPrice as string) || priceRange.min,
    parseInt(currentFilters.maxPrice as string) || priceRange.max,
  ])

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedSections(newExpanded)
  }

  const toggleShowMore = (id: string) => {
    const newShowMore = new Set(showMoreSections)
    if (newShowMore.has(id)) {
      newShowMore.delete(id)
    } else {
      newShowMore.add(id)
    }
    setShowMoreSections(newShowMore)
  }

  const updateFilter = (key: string, value: string | null, isMulti = false) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (isMulti) {
      const currentValues = params.getAll(key)
      if (value && !currentValues.includes(value)) {
        params.append(key, value)
      } else if (value) {
        const newParams = new URLSearchParams()
        searchParams.forEach((v, k) => {
          if (k !== key || v !== value) {
            newParams.append(k, v)
          }
        })
        router.push(`?${newParams.toString()}`)
        return
      }
    } else {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    }
    
    router.push(`?${params.toString()}`)
  }

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (priceValue[0] > priceRange.min) {
      params.set('minPrice', priceValue[0].toString())
    } else {
      params.delete('minPrice')
    }
    if (priceValue[1] < priceRange.max) {
      params.set('maxPrice', priceValue[1].toString())
    } else {
      params.delete('maxPrice')
    }
    router.push(`?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    const q = searchParams.get('q')
    if (q) params.set('q', q)
    router.push(`?${params.toString()}`)
  }

  const isChecked = (filterId: string, value: string): boolean => {
    const filterValue = currentFilters[filterId]
    if (Array.isArray(filterValue)) {
      return filterValue.includes(value)
    }
    return filterValue === value
  }

  const hasActiveFilters = Object.keys(currentFilters).some(
    (key) => key !== 'q' && key !== 'sort'
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{dictionary.filters}</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-orange-500 transition-colors duration-300 ease-in-out hover:text-orange-600"
          >
            {dictionary.clearFilters}
          </button>
        )}
      </div>

      {/* Filter Sections */}
      {filters.map((section) => (
        <div key={section.id} className="border-t border-gray-200 pt-4">
          {/* Section Header */}
          <button
            onClick={() => toggleSection(section.id)}
            className="flex w-full items-center justify-between text-left"
          >
            <h4 className="text-sm font-semibold text-gray-900">{section.title}</h4>
            {expandedSections.has(section.id) ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {/* Section Content */}
          {expandedSections.has(section.id) && (
            <div className="mt-3">
              {/* Price Range Filter */}
              {section.type === 'price' && (
                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(priceValue[0], currency, locale)} –{' '}
                    {formatPrice(priceValue[1], currency, locale)}
                    {priceValue[1] >= priceRange.max && ' e più'}
                  </div>
                  <Slider
                    min={priceRange.min}
                    max={priceRange.max}
                    value={priceValue}
                    onChange={setPriceValue}
                    step={100}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={applyPriceFilter}
                    className="w-full"
                  >
                    {dictionary.applyFilters}
                  </Button>

                  {/* Quick price ranges */}
                  <div className="space-y-2 pt-2">
                    {[
                      { label: locale === 'it' ? '0–50 EUR' : '0–50', min: 0, max: 5000 },
                      { label: locale === 'it' ? '50–100 EUR' : '50–100', min: 5000, max: 10000 },
                      { label: locale === 'it' ? '100–200 EUR' : '100–200', min: 10000, max: 20000 },
                      { label: locale === 'it' ? '200–500 EUR' : '200–500', min: 20000, max: 50000 },
                      { label: locale === 'it' ? 'Più di 500 EUR' : 'Over 500', min: 50000, max: priceRange.max },
                    ].map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          setPriceValue([range.min, range.max])
                          const params = new URLSearchParams(searchParams.toString())
                          params.set('minPrice', range.min.toString())
                          if (range.max < priceRange.max) {
                            params.set('maxPrice', range.max.toString())
                          } else {
                            params.delete('maxPrice')
                          }
                          router.push(`?${params.toString()}`)
                        }}
                        className="block text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Checkbox Filter */}
              {section.type === 'checkbox' && section.options && (
                <div className="space-y-3">
                  {(showMoreSections.has(section.id)
                    ? section.options
                    : section.options.slice(0, 7)
                  ).map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-700 transition-colors duration-300 ease-in-out hover:text-gray-900"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isChecked(section.id, option.value)}
                          onChange={() =>
                            updateFilter(section.id, option.value, true)
                          }
                          className="peer sr-only"
                        />
                        <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white transition-all duration-300 ease-in-out peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-2">
                          <svg
                            className="h-3 w-3 text-white opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <span>{option.label}</span>
                      {option.count !== undefined && (
                        <span className="text-gray-400">({option.count})</span>
                      )}
                    </label>
                  ))}

                  {/* See more / See less */}
                  {section.expandable && section.options.length > 7 && (
                    <button
                      onClick={() => toggleShowMore(section.id)}
                      className="flex items-center gap-1 text-sm text-orange-500 transition-colors duration-300 ease-in-out hover:text-orange-600"
                    >
                      {showMoreSections.has(section.id) ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          {dictionary.seeLess}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          {dictionary.seeMore}
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Link Filter */}
              {section.type === 'link' && section.options && (
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter(section.id, option.value)}
                      className={cn(
                        'block text-sm transition-colors duration-300 ease-in-out',
                        currentFilters[section.id] === option.value
                          ? 'font-medium text-orange-500'
                          : 'text-gray-600 hover:text-orange-500'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
