import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { searchProducts } from '@/lib/api/price-ninja'
import { getLandingPage } from '@/lib/seo/landing-pages'
import { LandingPageComponent } from '@/components/pages/landing-page'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const landing = getLandingPage('it', 'brand', slug)
  if (!landing) return {}

  const canonicalUrl = `${BASE_URL}/it/brand/${slug}`
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
      locale: 'it_IT',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: landing.title }],
    },
    twitter: { card: 'summary_large_image', title: landing.title, description: landing.description },
  }
}

export default async function ItBrandPage({ params }: PageProps) {
  const { slug } = await params
  const landing = getLandingPage('it', 'brand', slug)
  if (!landing) notFound()

  const [result, dictionary] = await Promise.all([
    searchProducts(landing.searchTerm, { country: 'it', locale: 'it' }),
    getDictionary('it'),
  ])

  const categoryPath = landing.categorySlug.includes('-') || ['laptop', 'gaming', 'fotocamere', 'smartphone'].includes(landing.categorySlug)
    ? landing.categorySlug
    : landing.categorySlug

  return (
    <LandingPageComponent
      landing={landing}
      products={result.products.slice(0, 20).map(p => ({
        id: p.id, slug: p.slug, name: p.name, brand: p.brand,
        image: p.image, lowestPrice: p.lowestPrice, currency: p.currency,
        offerCount: p.offerCount, inStock: p.inStock,
      }))}
      locale="it"
      country="it"
      dictionary={dictionary}
      canonicalUrl={`${BASE_URL}/it/brand/${slug}`}
      homeUrl="/it"
      categoryUrl={`/it/categoria/${landing.categorySlug}`}
    />
  )
}
