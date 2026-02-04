export const countries = {
  it: {
    code: 'IT',
    locale: 'it',
    urlPrefix: 'it',
    currency: 'EUR',
    name: 'Italia',
    flag: '🇮🇹',
    hreflang: 'it',
    merchants: ['amazon-it', 'mediaworld', 'unieuro', 'ebay-it', 'eprice'],
  },
  uk: {
    code: 'GB',
    locale: 'en',
    urlPrefix: 'en/uk',
    currency: 'GBP',
    name: 'United Kingdom',
    flag: '🇬🇧',
    hreflang: 'en-GB',
    merchants: ['amazon-uk', 'currys', 'argos', 'john-lewis', 'ao'],
  },
  us: {
    code: 'US',
    locale: 'en',
    urlPrefix: 'en/us',
    currency: 'USD',
    name: 'United States',
    flag: '🇺🇸',
    hreflang: 'en-US',
    merchants: ['amazon-us', 'bestbuy', 'walmart', 'newegg', 'bh'],
  },
  de: {
    code: 'DE',
    locale: 'en',
    urlPrefix: 'en/de',
    currency: 'EUR',
    name: 'Germany',
    flag: '🇩🇪',
    hreflang: 'en-DE',
    merchants: ['amazon-de', 'mediamarkt-de', 'saturn', 'otto', 'cyberport'],
  },
  fr: {
    code: 'FR',
    locale: 'en',
    urlPrefix: 'en/fr',
    currency: 'EUR',
    name: 'France',
    flag: '🇫🇷',
    hreflang: 'en-FR',
    merchants: ['amazon-fr', 'fnac', 'darty', 'cdiscount', 'boulanger'],
  },
  es: {
    code: 'ES',
    locale: 'en',
    urlPrefix: 'en/es',
    currency: 'EUR',
    name: 'Spain',
    flag: '🇪🇸',
    hreflang: 'en-ES',
    merchants: ['amazon-es', 'pccomponentes', 'mediamarkt-es', 'elcorteingles'],
  },
} as const

export type CountryCode = keyof typeof countries
export type Country = (typeof countries)[CountryCode]

export const locales = ['it', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
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
