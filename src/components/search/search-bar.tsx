'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Locale, CountryCode } from '@/lib/countries'

interface SearchBarProps {
  locale: Locale
  country: CountryCode
  placeholder: string
  defaultValue?: string
  size?: 'default' | 'large'
  className?: string
}

export function SearchBar({
  locale,
  country,
  placeholder,
  defaultValue = '',
  size = 'default',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const searchUrl =
      locale === 'it'
        ? `/it/cerca?q=${encodeURIComponent(query)}`
        : `/en/${country}/search?q=${encodeURIComponent(query)}`

    router.push(searchUrl)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div
        className={cn(
          'relative flex items-center',
          size === 'large' ? 'h-14' : 'h-10'
        )}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search
            className={cn(
              'text-gray-400',
              size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
            )}
          />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'h-full w-full rounded-l-xl border border-r-0 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20',
            size === 'large' ? 'pl-12 pr-4 text-lg' : 'pl-10 pr-4 text-sm'
          )}
        />
        <Button
          type="submit"
          className={cn(
            'shrink-0 rounded-l-none rounded-r-xl',
            size === 'large' ? 'h-14 px-8 text-base' : 'h-10 px-4'
          )}
        >
          <Search className={size === 'large' ? 'mr-2 h-5 w-5' : 'h-4 w-4'} />
          <span className={size === 'large' ? 'inline' : 'sr-only'}>
            {locale === 'it' ? 'Cerca' : 'Search'}
          </span>
        </Button>
      </div>
    </form>
  )
}
