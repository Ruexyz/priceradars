import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/product/product-grid'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { countries, type Locale, type CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'
import type { LandingPage, LandingType } from '@/lib/seo/landing-pages'

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  image: string
  lowestPrice: number
  currency: string
  offerCount: number
  inStock: boolean
}

interface LandingPageComponentProps {
  landing: LandingPage
  products: Product[]
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
  canonicalUrl: string
  homeUrl: string
  categoryUrl: string
}

function getTypeLabel(type: LandingType, locale: Locale): string {
  const labels: Record<LandingType, Record<string, string>> = {
    brand: { it: 'Brand', en: 'Brand', de: 'Marke', fr: 'Marque', es: 'Marca' },
    'best-price': { it: 'Miglior Prezzo', en: 'Best Price', de: 'Bester Preis', fr: 'Meilleur Prix', es: 'Mejor Precio' },
    'under-x': { it: 'Offerte', en: 'Deals', de: 'Angebote', fr: 'Bons Plans', es: 'Ofertas' },
  }
  return labels[type][locale] || labels[type]['en']
}

function getTypeUrl(type: LandingType, locale: Locale, country: CountryCode): string {
  const base = locale === 'it' ? '/it' : `/en/${country}`
  if (type === 'brand') return `${base}/${locale === 'it' ? 'brand' : 'brand'}`
  if (type === 'best-price') return `${base}/${locale === 'it' ? 'miglior-prezzo' : 'best-price'}`
  return `${base}/${locale === 'it' ? 'offerte' : 'deals'}`
}

export function LandingPageComponent({
  landing,
  products,
  locale,
  country,
  dictionary,
  canonicalUrl,
  homeUrl,
  categoryUrl,
}: LandingPageComponentProps) {
  const countryConfig = countries[country]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: locale === 'it' ? 'Home' : 'Home', url: homeUrl },
          {
            name: getTypeLabel(landing.type, locale),
            url: getTypeUrl(landing.type, locale, country),
          },
          { name: landing.h1, url: canonicalUrl },
        ]}
      />
      {landing.faq.length > 0 && <FAQJsonLd questions={landing.faq} />}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb UI */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href={homeUrl} className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={getTypeUrl(landing.type, locale, country)}
            className="hover:text-orange-500 transition-colors"
          >
            {getTypeLabel(landing.type, locale)}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{landing.brandName || landing.threshold || landing.categoryName}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{landing.h1}</h1>
          <p className="mt-3 text-base text-gray-600 max-w-2xl">{landing.intro}</p>
        </div>

        {/* Internal links: category + type hub */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href={categoryUrl}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 hover:border-orange-400 hover:text-orange-600 transition-colors"
          >
            {landing.categoryName}
          </Link>
          <Link
            href={getTypeUrl(landing.type, locale, country)}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 hover:border-orange-400 hover:text-orange-600 transition-colors"
          >
            {getTypeLabel(landing.type, locale)}
          </Link>
          {landing.brandName && (
            <span className="inline-flex items-center rounded-full bg-orange-50 border border-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {landing.brandName}
            </span>
          )}
          {landing.threshold && (
            <span className="inline-flex items-center rounded-full bg-orange-50 border border-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {landing.threshold}
            </span>
          )}
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <section aria-label={landing.h1}>
            <ProductGrid
              products={products}
              locale={locale}
              country={country}
              dictionary={{
                stores: dictionary.common.stores,
                store: dictionary.common.store,
                from: dictionary.common.from,
                inStock: dictionary.common.inStock,
                outOfStock: dictionary.common.outOfStock,
              }}
            />
          </section>
        ) : (
          <p className="py-12 text-center text-gray-500">
            {locale === 'de'
              ? 'Keine Produkte gefunden. Bitte versuche es später erneut.'
              : locale === 'it'
              ? 'Nessun prodotto trovato. Riprova più tardi.'
              : 'No products found. Please try again later.'}
          </p>
        )}

        {/* FAQ Section */}
        {landing.faq.length > 0 && (
          <section className="mt-12 border-t border-gray-100 pt-8" aria-label="FAQ">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              {locale === 'de' ? 'Häufig gestellte Fragen' : locale === 'it' ? 'Domande frequenti' : 'Frequently Asked Questions'}
            </h2>
            <dl className="space-y-4">
              {landing.faq.map((item, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4">
                  <dt className="font-medium text-gray-900">{item.question}</dt>
                  <dd className="mt-1 text-sm text-gray-600">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* SEO internal linking footer */}
        <section className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-xs text-gray-400">
            {locale === 'de'
              ? `Alle Preise werden stündlich aus über 50 ${countryConfig.name}-Online-Shops aktualisiert. PriceRadars ist ein kostenloser Preisvergleichsdienst.`
              : locale === 'it'
              ? `Prezzi aggiornati ogni ora da oltre 50 negozi online. PriceRadars è un servizio gratuito di confronto prezzi.`
              : `All prices are updated hourly from 50+ online retailers in ${countryConfig.name}. PriceRadars is a free price comparison service.`}
          </p>
        </section>
      </main>
    </>
  )
}
