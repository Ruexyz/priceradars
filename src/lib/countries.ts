import type { Locale } from './i18n/config'

// Re-export Locale so components can import from '@/lib/countries'
export type { Locale } from './i18n/config'

export const countries = {
  it: {
    code: 'IT',
    locale: 'it' as Locale,
    nativeLocale: 'it' as Locale,  // Lingua nativa per SEO/UI
    urlPrefix: 'it',
    currency: 'EUR',
    name: 'Italia',
    flag: '🇮🇹',
    hreflang: 'it',
    htmlLang: 'it',
    merchants: ['amazon-it', 'mediaworld', 'unieuro', 'ebay-it', 'eprice'],
  },
  uk: {
    code: 'GB',
    locale: 'en' as Locale,
    nativeLocale: 'en' as Locale,
    urlPrefix: 'en/uk',
    currency: 'GBP',
    name: 'United Kingdom',
    flag: '🇬🇧',
    hreflang: 'en-GB',
    htmlLang: 'en',
    merchants: ['amazon-uk', 'currys', 'argos', 'john-lewis', 'ao'],
  },
  us: {
    code: 'US',
    locale: 'en' as Locale,
    nativeLocale: 'en' as Locale,
    urlPrefix: 'en/us',
    currency: 'USD',
    name: 'United States',
    flag: '🇺🇸',
    hreflang: 'en-US',
    htmlLang: 'en',
    merchants: ['amazon-us', 'bestbuy', 'walmart', 'newegg', 'bh'],
  },
  de: {
    code: 'DE',
    locale: 'en' as Locale,
    nativeLocale: 'de' as Locale,
    urlPrefix: 'en/de',
    currency: 'EUR',
    name: 'Deutschland',
    flag: '🇩🇪',
    hreflang: 'de',
    htmlLang: 'de',
    merchants: ['amazon-de', 'mediamarkt-de', 'saturn', 'otto', 'cyberport'],
  },
  fr: {
    code: 'FR',
    locale: 'en' as Locale,
    nativeLocale: 'fr' as Locale,
    urlPrefix: 'en/fr',
    currency: 'EUR',
    name: 'France',
    flag: '🇫🇷',
    hreflang: 'fr',
    htmlLang: 'fr',
    merchants: ['amazon-fr', 'fnac', 'darty', 'cdiscount', 'boulanger'],
  },
  es: {
    code: 'ES',
    locale: 'en' as Locale,
    nativeLocale: 'es' as Locale,
    urlPrefix: 'en/es',
    currency: 'EUR',
    name: 'España',
    flag: '🇪🇸',
    hreflang: 'es',
    htmlLang: 'es',
    merchants: ['amazon-es', 'pccomponentes', 'mediamarkt-es', 'elcorteingles'],
  },
} as const

export type CountryCode = keyof typeof countries
export type Country = (typeof countries)[CountryCode]

export const defaultCountry: CountryCode = 'uk'

export function getCountryConfig(countryCode: string): Country {
  return countries[countryCode as CountryCode] || countries.uk
}

export function getCountriesForLocale(locale: Locale): CountryCode[] {
  return Object.entries(countries)
    .filter(([_, config]) => config.locale === locale)
    .map(([code]) => code as CountryCode)
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    GBP: '£',
    USD: '$',
  }
  return symbols[currency] || currency
}

/**
 * Get the native locale for a country (for SEO and native UI)
 */
export function getNativeLocale(countryCode: string): string {
  const config = countries[countryCode as CountryCode]
  return config?.nativeLocale || 'en'
}
