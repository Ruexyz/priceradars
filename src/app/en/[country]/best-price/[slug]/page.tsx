import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { countries, getNativeLocale, type CountryCode } from '@/lib/countries'
import { searchProducts } from '@/lib/api/price-ninja'
import { getLandingPage } from '@/lib/seo/landing-pages'
import { LandingPageComponent } from '@/components/pages/landing-page'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'
const validCountries = ['uk', 'us', 'de', 'fr', 'es']

interface PageProps {
  params: Promise<{ country: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, slug } = await params
  if (!validCountries.includes(country)) return {}

  const landing = getLandingPage(country, 'best-price', slug)
  if (!landing) return {}

  const canonicalUrl = `${BASE_URL}/en/${country}/best-price/${slug}`
  return {
    title: landing.title,
    description: landing.description,
    keywords: landing.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: landing.title,
      description: landing.description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'PriceRadars',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: landing.title }],
    },
    twitter: { card: 'summary_large_image', title: landing.title, description: landing.description },
  }
}

export default async function EnBestPricePage({ params }: PageProps) {
  const { country, slug } = await params
  if (!validCountries.includes(country)) notFound()

  const landing = getLandingPage(country, 'best-price', slug)
  if (!landing) notFound()

  const nativeLocale = getNativeLocale(country) as Locale

  const [result, dictionary] = await Promise.all([
    searchProducts(landing.searchTerm, { country, locale: nativeLocale }),
    getDictionary(nativeLocale),
  ])

  return (
    <LandingPageComponent
      landing={landing}
      products={result.products.slice(0, 20).map(p => ({
        id: p.id, slug: p.slug, name: p.name, brand: p.brand,
        image: p.image, lowestPrice: p.lowestPrice, currency: p.currency,
        offerCount: p.offerCount, inStock: p.inStock,
      }))}
      locale={nativeLocale}
      country={country as CountryCode}
      dictionary={dictionary}
      canonicalUrl={`${BASE_URL}/en/${country}/best-price/${slug}`}
      homeUrl={`/en/${country}`}
      categoryUrl={`/en/${country}/category/${landing.categorySlug}`}
    />
  )
}
