'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { countries, type Locale, type CountryCode } from '@/lib/countries'

interface CountrySelectorProps {
  locale: Locale
  currentCountry: CountryCode
}

export function CountrySelector({ locale, currentCountry }: CountrySelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleCountryChange = (newCountry: string) => {
    const countryConfig = countries[newCountry as CountryCode]
    if (!countryConfig) return

    let newPath: string

    if (newCountry === 'it') {
      // Switch to Italian
      if (locale === 'it') {
        // Already in Italian, do nothing
        return
      }
      // Convert English path to Italian
      newPath = pathname
        .replace(/^\/en\/[a-z]{2}/, '/it')
        .replace('/product/', '/prodotto/')
        .replace('/category/', '/categoria/')
        .replace('/search', '/cerca')
    } else {
      // Switch to English country
      if (locale === 'it') {
        // Convert Italian path to English
        newPath = pathname
          .replace(/^\/it/, `/en/${newCountry}`)
          .replace('/prodotto/', '/product/')
          .replace('/categoria/', '/category/')
          .replace('/cerca', '/search')
      } else {
        // Just change the country in the path
        newPath = pathname.replace(/^\/en\/[a-z]{2}/, `/en/${newCountry}`)
      }
    }

    router.push(newPath)
  }

  const currentConfig = countries[currentCountry]

  return (
    <Select value={currentCountry} onValueChange={handleCountryChange}>
      <SelectTrigger className="w-auto gap-2 border-0 bg-transparent px-2 hover:bg-gray-100">
        <Globe className="h-4 w-4 text-gray-500" />
        <SelectValue>
          <span className="hidden sm:inline">{currentConfig.flag} {currentConfig.name}</span>
          <span className="sm:hidden">{currentConfig.flag}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(countries).map(([code, config]) => (
          <SelectItem key={code} value={code}>
            <span className="flex items-center gap-2">
              <span>{config.flag}</span>
              <span>{config.name}</span>
              <span className="text-gray-400">({config.currency})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
