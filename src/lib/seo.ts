import type { Metadata } from 'next'
import { countries, type Locale, type CountryCode } from './countries'

const BASE_URL = 'https://priceradars.com'

interface GenerateMetadataOptions {
  title: string
  description: string
  locale: Locale
  country: CountryCode
  path?: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

/**
 * Generate fully optimized metadata for any page
 */
export function generatePageMetadata({
  title,
  description,
  locale,
  country,
  path = '',
  image = '/og-image.png',
  type = 'website',
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const countryConfig = countries[country]
  const fullUrl = `${BASE_URL}${countryConfig.urlPrefix}${path}`
  const ogLocale = locale === 'it' ? 'it_IT' : `en_${country.toUpperCase()}`

  // Generate hreflang alternates
  const alternates: Record<string, string> = {}
  Object.entries(countries).forEach(([code, config]) => {
    alternates[config.hreflang] = `${BASE_URL}/${config.urlPrefix}${path}`
  })

  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'PriceRadars',
      locale: ogLocale,
      type,
      images: [
        {
          url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${BASE_URL}${image}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}

interface ProductMetadataOptions {
  name: string
  description: string
  brand: string
  price: number
  currency: string
  image: string
  locale: Locale
  country: CountryCode
  slug: string
  inStock?: boolean
  rating?: number
  reviewCount?: number
}

/**
 * Generate optimized metadata for product pages
 */
export function generateProductMetadata({
  name,
  description,
  brand,
  price,
  currency,
  image,
  locale,
  country,
  slug,
  inStock = true,
}: ProductMetadataOptions): Metadata {
  const productPath = locale === 'it' ? `/prodotto/${slug}` : `/product/${slug}`
  const title =
    locale === 'it'
      ? `${name} - Confronta Prezzi | PriceRadars`
      : `${name} - Compare Prices | PriceRadars`

  return generatePageMetadata({
    title,
    description: description || `Compare prices for ${name} by ${brand}. Find the best deals across 50+ online stores.`,
    locale,
    country,
    path: productPath,
    image,
    type: 'website', // OpenGraph doesn't support 'product', use JSON-LD for product schema
  })
}

interface CategoryMetadataOptions {
  name: string
  description?: string
  locale: Locale
  country: CountryCode
  slug: string
  productCount?: number
}

/**
 * Generate optimized metadata for category pages
 */
export function generateCategoryMetadata({
  name,
  description,
  locale,
  country,
  slug,
  productCount,
}: CategoryMetadataOptions): Metadata {
  const categoryPath = locale === 'it' ? `/categoria/${slug}` : `/category/${slug}`
  const title =
    locale === 'it'
      ? `${name} - Confronta Prezzi | PriceRadars`
      : `${name} - Compare Prices | PriceRadars`

  const desc =
    description ||
    (locale === 'it'
      ? `Confronta prezzi per ${name}. Trova le migliori offerte su oltre 50 negozi online.`
      : `Compare prices for ${name}. Find the best deals across 50+ online stores.`)

  return generatePageMetadata({
    title,
    description: desc,
    locale,
    country,
    path: categoryPath,
  })
}

/**
 * Generate hreflang tags for a specific path
 */
export function generateHreflangTags(path: string = ''): Array<{ rel: string; hrefLang: string; href: string }> {
  const tags: Array<{ rel: string; hrefLang: string; href: string }> = []

  Object.entries(countries).forEach(([code, config]) => {
    tags.push({
      rel: 'alternate',
      hrefLang: config.hreflang,
      href: `${BASE_URL}/${config.urlPrefix}${path}`,
    })
  })

  // Add x-default
  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${BASE_URL}/en/uk${path}`,
  })

  return tags
}

/**
 * Format price for display and SEO
 */
export function formatSEOPrice(price: number, currency: string): string {
  // Price is stored in cents
  return (price / 100).toFixed(2)
}
