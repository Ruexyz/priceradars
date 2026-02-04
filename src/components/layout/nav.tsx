'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Smartphone,
  Laptop,
  Tv,
  Refrigerator,
  Gamepad2,
  Camera,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Locale, CountryCode } from '@/lib/countries'

interface NavProps {
  locale: Locale
  country: CountryCode
  mobile?: boolean
}

const categories = [
  { slug: 'smartphones', icon: Smartphone, labelEn: 'Smartphones', labelIt: 'Smartphone' },
  { slug: 'laptops', icon: Laptop, labelEn: 'Laptops', labelIt: 'Laptop' },
  { slug: 'tv-audio', icon: Tv, labelEn: 'TV & Audio', labelIt: 'TV & Audio' },
  { slug: 'appliances', icon: Refrigerator, labelEn: 'Appliances', labelIt: 'Elettrodomestici' },
  { slug: 'gaming', icon: Gamepad2, labelEn: 'Gaming', labelIt: 'Gaming' },
  { slug: 'cameras', icon: Camera, labelEn: 'Cameras', labelIt: 'Fotocamere' },
]

export function Nav({ locale, country, mobile = false }: NavProps) {
  const pathname = usePathname()

  const getCategoryUrl = (slug: string) => {
    if (locale === 'it') {
      return `/it/categoria/${slug}`
    }
    return `/en/${country}/category/${slug}`
  }

  const isActive = (slug: string) => {
    if (locale === 'it') {
      return pathname.includes(`/categoria/${slug}`)
    }
    return pathname.includes(`/category/${slug}`)
  }

  if (mobile) {
    return (
      <nav className="flex flex-col gap-1">
        {categories.map((category) => {
          const Icon = category.icon
          const label = locale === 'it' ? category.labelIt : category.labelEn
          const active = isActive(category.slug)

          return (
            <Link
              key={category.slug}
              href={getCategoryUrl(category.slug)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out',
                active
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon
        const label = locale === 'it' ? category.labelIt : category.labelEn
        const active = isActive(category.slug)

        return (
          <Link
            key={category.slug}
            href={getCategoryUrl(category.slug)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out',
              active
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
