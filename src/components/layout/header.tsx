'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { SearchBarAdvanced } from '@/components/search/search-bar-advanced'
import { CountrySelector } from './country-selector'
import { Nav } from './nav'
import type { Locale, CountryCode } from '@/lib/countries'

interface HeaderProps {
  locale: Locale
  country: CountryCode
  dictionary: {
    search: string
    menu: string
  }
}

export function Header({ locale, country, dictionary }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const homeUrl = locale === 'it' ? '/it' : `/en/${country}`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={homeUrl}
            className="flex shrink-0 items-center gap-2 transition-opacity duration-300 ease-in-out hover:opacity-80"
          >
            <Logo size={36} />
            <span className="hidden text-xl font-bold text-gray-900 sm:block">
              Price<span className="text-orange-500">Radars</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 max-w-xl md:block">
            <SearchBarAdvanced
              locale={locale}
              country={country}
              placeholder={dictionary.search}
              size="default"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Country Selector */}
            <CountrySelector locale={locale} currentCountry={country} />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={dictionary.menu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="border-t border-gray-100 py-3 md:hidden">
          <SearchBarAdvanced
            locale={locale}
            country={country}
            placeholder={dictionary.search}
            size="default"
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Nav locale={locale} country={country} />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <Nav locale={locale} country={country} mobile />
          </div>
        </div>
      )}
    </header>
  )
}
