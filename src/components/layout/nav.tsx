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
  { slug: 'smartphones', slugs: { it: 'smartphone', en: 'smartphones', de: 'smartphones', fr: 'smartphones', es: 'smartphones' }, icon: Smartphone, labels: { it: 'Smartphone', en: 'Smartphones', de: 'Smartphones', fr: 'Smartphones', es: 'Smartphones' } },
  { slug: 'laptops', slugs: { it: 'laptop', en: 'laptops', de: 'laptops', fr: 'ordinateurs', es: 'portatiles' }, icon: Laptop, labels: { it: 'Laptop', en: 'Laptops', de: 'Laptops', fr: 'Ordinateurs', es: 'Portátiles' } },
  { slug: 'tv-audio', slugs: { it: 'tv-audio', en: 'tv-audio', de: 'tv-audio', fr: 'tv-audio', es: 'tv-audio' }, icon: Tv, labels: { it: 'TV & Audio', en: 'TV & Audio', de: 'TV & Audio', fr: 'TV & Audio', es: 'TV & Audio' } },
  { slug: 'appliances', slugs: { it: 'elettrodomestici', en: 'appliances', de: 'haushaltsgeraete', fr: 'electromenager', es: 'electrodomesticos' }, icon: Refrigerator, labels: { it: 'Elettrodomestici', en: 'Appliances', de: 'Haushaltsgeräte', fr: 'Électroménager', es: 'Electrodomésticos' } },
  { slug: 'gaming', slugs: { it: 'gaming', en: 'gaming', de: 'gaming', fr: 'gaming', es: 'gaming' }, icon: Gamepad2, labels: { it: 'Gaming', en: 'Gaming', de: 'Gaming', fr: 'Gaming', es: 'Gaming' } },
  { slug: 'cameras', slugs: { it: 'fotocamere', en: 'cameras', de: 'kameras', fr: 'appareils-photo', es: 'camaras' }, icon: Camera, labels: { it: 'Fotocamere', en: 'Cameras', de: 'Kameras', fr: 'Appareils Photo', es: 'Cámaras' } },
]

export function Nav({ locale, country, mobile = false }: NavProps) {
  const pathname = usePathname()

  const getLocalSlug = (slugs: Record<string, string>) => {
    return slugs[locale as keyof typeof slugs] || slugs.en
  }

  const getCategoryUrl = (slugs: Record<string, string>) => {
    const localSlug = getLocalSlug(slugs)
    if (locale === 'it') {
      return `/it/categoria/${localSlug}`
    }
    return `/en/${country}/category/${localSlug}`
  }

  const isActive = (slugs: Record<string, string>) => {
    const localSlug = getLocalSlug(slugs)
    return pathname.includes(`/categoria/${localSlug}`) || pathname.includes(`/category/${localSlug}`)
  }

  if (mobile) {
    return (
      <nav className="flex flex-col gap-1">
        {categories.map((category) => {
          const Icon = category.icon
          const label = category.labels[locale as keyof typeof category.labels] || category.labels.en
          const active = isActive(category.slugs)

          return (
            <Link
              key={category.slug}
              href={getCategoryUrl(category.slugs)}
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
        const label = category.labels[locale as keyof typeof category.labels] || category.labels.en
        const active = isActive(category.slugs)

        return (
          <Link
            key={category.slug}
            href={getCategoryUrl(category.slugs)}
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
