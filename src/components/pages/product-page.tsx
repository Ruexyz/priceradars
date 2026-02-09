import Image from 'next/image'
import Link from 'next/link'
import { 
  ChevronRight, Share2, Heart, ShieldCheck, TrendingDown, 
  Clock, ExternalLink, Tag, Truck, CheckCircle2, AlertCircle,
  ArrowRight
} from 'lucide-react'
import { PriceTable } from '@/components/product/price-table'
import { PriceChart } from '@/components/product/price-chart'
import { PriceAlertDialog } from '@/components/product/price-alert-dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatPrice } from '@/lib/utils'
import { countries, type Locale, type CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  categorySlug: string
  image: string
  images: string[]
  description: string
  specs: Record<string, string>
  lowestPrice: number
  currency: string
  offerCount: number
}

interface Offer {
  id: string
  merchantId: string
  merchantName: string
  merchantLogo?: string
  price: number
  currency: string
  url: string
  inStock: boolean
  stockStatus?: 'in_stock' | 'limited' | 'out_of_stock'
  updatedAt: string
}

interface PricePoint {
  date: string
  price: number
}

interface RelatedProduct {
  id: string
  slug: string
  name: string
  brand: string
  image: string
  lowestPrice: number
  currency: string
  offerCount: number
}

interface ProductPageProps {
  product: Product
  offers: Offer[]
  priceHistory: PricePoint[]
  relatedProducts: RelatedProduct[]
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
}

// --- Localized content helpers ---

function getSeoContent(locale: Locale) {
  if (locale === 'it') {
    return {
      whyCompare: 'Perché confrontare i prezzi?',
      whyCompareText: 'I prezzi dello stesso prodotto possono variare fino al 40% tra negozi diversi. PriceRadars confronta automaticamente le offerte per assicurarti il miglior prezzo disponibile.',
      saveMoney: 'Risparmia fino al',
      onThisProduct: 'su questo prodotto',
      verifiedPrices: 'Prezzi verificati',
      verifiedPricesText: 'Aggiornati ogni ora da fonti ufficiali',
      freeService: 'Servizio gratuito',
      freeServiceText: 'Confronta prezzi senza costi nascosti',
      priceAlerts: 'Avvisi di prezzo',
      priceAlertsText: 'Ricevi notifiche quando il prezzo scende',
      secureRedirect: 'Reindirizzamento sicuro',
      secureRedirectText: 'Acquisti direttamente dal negozio ufficiale',
      buyingGuideTitle: 'Guida all\'acquisto',
      buyingGuideIntro: 'Stai cercando il miglior prezzo per',
      buyingGuideText: 'Su PriceRadars confrontiamo le offerte dai principali negozi online per trovare il prezzo più basso. Clicca su "Vai all\'offerta" per essere reindirizzato direttamente al negozio dove potrai completare l\'acquisto in sicurezza.',
      howItWorks: 'Come funziona',
      step1: 'Confronta',
      step1Text: 'Verifica i prezzi da tutti i negozi in un unica pagina',
      step2: 'Scegli',
      step2Text: 'Seleziona l\'offerta con il prezzo migliore',
      step3: 'Acquista',
      step3Text: 'Verrai reindirizzato al negozio ufficiale per completare l\'acquisto',
      faqTitle: 'Domande frequenti',
      faq1Q: 'Il prezzo mostrato è quello finale?',
      faq1A: 'Sì, i prezzi mostrati includono IVA. Eventuali costi di spedizione sono indicati separatamente. Il prezzo viene verificato e aggiornato regolarmente.',
      faq2Q: 'Come posso essere sicuro di ottenere il prezzo migliore?',
      faq2A: 'PriceRadars confronta i prezzi da decine di negozi online verificati. Ti basta cliccare su "Vai all\'offerta" per acquistare al prezzo più basso disponibile.',
      faq3Q: 'L\'acquisto avviene su PriceRadars?',
      faq3A: 'No, PriceRadars è un servizio di confronto prezzi. Cliccando sull\'offerta verrai reindirizzato al negozio online dove potrai acquistare direttamente, con tutte le garanzie del venditore.',
      faq4Q: 'Posso ricevere un avviso quando il prezzo scende?',
      faq4A: 'Sì! Usa il pulsante "Avvisami" per impostare un avviso di prezzo. Riceverai una notifica non appena il prezzo scende sotto la soglia che hai indicato.',
      available: 'Disponibile',
      unavailable: 'Non disponibile',
      condition: 'Condizione',
      conditionNew: 'Nuovo',
      shipping: 'Spedizione',
      viewDealCta: 'Vai all\'offerta',
      priceSummaryLabel: 'Miglior prezzo trovato',
    }
  }
  return {
    whyCompare: 'Why compare prices?',
    whyCompareText: 'Prices for the same product can vary up to 40% across different stores. PriceRadars automatically compares offers to ensure you get the best price available.',
    saveMoney: 'Save up to',
    onThisProduct: 'on this product',
    verifiedPrices: 'Verified prices',
    verifiedPricesText: 'Updated hourly from official sources',
    freeService: 'Free service',
    freeServiceText: 'Compare prices with no hidden costs',
    priceAlerts: 'Price alerts',
    priceAlertsText: 'Get notified when the price drops',
    secureRedirect: 'Secure redirect',
    secureRedirectText: 'Buy directly from the official store',
    buyingGuideTitle: 'Buying guide',
    buyingGuideIntro: 'Looking for the best price on',
    buyingGuideText: 'PriceRadars compares offers from leading online stores to find the lowest price. Click "View deal" to be redirected directly to the store where you can complete your purchase securely.',
    howItWorks: 'How it works',
    step1: 'Compare',
    step1Text: 'Check prices from all stores on one page',
    step2: 'Choose',
    step2Text: 'Select the offer with the best price',
    step3: 'Buy',
    step3Text: 'You\'ll be redirected to the official store to complete your purchase',
    faqTitle: 'Frequently asked questions',
    faq1Q: 'Is the price shown the final price?',
    faq1A: 'Yes, the prices shown include VAT. Any shipping costs are shown separately. Prices are verified and updated regularly.',
    faq2Q: 'How can I be sure I\'m getting the best price?',
    faq2A: 'PriceRadars compares prices from dozens of verified online stores. Simply click "View deal" to buy at the lowest price available.',
    faq3Q: 'Does the purchase happen on PriceRadars?',
    faq3A: 'No, PriceRadars is a price comparison service. Clicking an offer redirects you to the online store where you can buy directly, with all the seller\'s guarantees.',
    faq4Q: 'Can I get an alert when the price drops?',
    faq4A: 'Yes! Use the "Price Alert" button to set a price alert. You\'ll be notified as soon as the price drops below your target.',
    available: 'Available',
    unavailable: 'Unavailable',
    condition: 'Condition',
    conditionNew: 'New',
    shipping: 'Shipping',
    viewDealCta: 'View deal',
    priceSummaryLabel: 'Best price found',
  }
}

export function ProductPage({
  product,
  offers,
  priceHistory,
  relatedProducts,
  locale,
  country,
  dictionary,
}: ProductPageProps) {
  const countryConfig = countries[country]
  const categoryUrl =
    locale === 'it'
      ? `/it/categoria/${product.categorySlug}`
      : `/en/${country}/category/${product.categorySlug}`

  const homeUrl = locale === 'it' ? '/it' : `/en/${country}`
  const seo = getSeoContent(locale)

  // Calculate savings if there's a discount in specs
  const discountSpec = product.specs['Sconto'] || product.specs['Discount']
  const hasDiscount = discountSpec && parseInt(discountSpec) > 0

  // Best offer
  const bestOffer = offers.sort((a, b) => a.price - b.price)[0]

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-gray-50" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href={homeUrl} className="text-gray-500 transition-colors hover:text-gray-700">
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
            <li>
              <Link href={categoryUrl} className="text-gray-500 transition-colors hover:text-gray-700">
                {product.category}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
            <li className="truncate text-gray-900" aria-current="page">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square max-w-sm mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 50vw, 384px"
                className="object-contain p-6"
                priority
              />
              {hasDiscount && (
                <div className="absolute left-4 top-4">
                  <Badge variant="primary" rounded="full" size="lg">
                    <Tag className="h-3.5 w-3.5" />
                    -{discountSpec}
                  </Badge>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                {product.brand && (
                  <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                    {product.brand}
                  </p>
                )}
                <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" aria-label="Save">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Availability + Condition badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {bestOffer?.inStock ? (
                <Badge variant="success" rounded="full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {seo.available}
                </Badge>
              ) : (
                <Badge variant="destructive" rounded="full">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {seo.unavailable}
                </Badge>
              )}
              {product.specs['Condizione'] || product.specs['Condition'] ? (
                <Badge variant="outline" rounded="full">
                  {product.specs['Condizione'] || product.specs['Condition']}
                </Badge>
              ) : null}
              {(product.specs['Spedizione'] || product.specs['Shipping']) && (
                <Badge variant="outline" rounded="full">
                  <Truck className="h-3.5 w-3.5" />
                  {product.specs['Spedizione'] || product.specs['Shipping']}
                </Badge>
              )}
            </div>

            {/* Price Summary - Main CTA */}
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {seo.priceSummaryLabel}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-orange-600">
                  {formatPrice(product.lowestPrice, product.currency, locale)}
                </span>
                {/* Original price strikethrough */}
                {(product.specs['Prezzo originale'] || product.specs['Original Price']) && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.specs['Prezzo originale'] || product.specs['Original Price']}
                  </span>
                )}
              </div>

              {hasDiscount && (
                <p className="mt-1 text-sm font-medium text-orange-700">
                  {seo.saveMoney} {discountSpec} {seo.onThisProduct}
                </p>
              )}

              {bestOffer?.merchantName && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {locale === 'it' ? 'Venduto da' : 'Sold by'} <strong>{bestOffer.merchantName}</strong>
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a
                    href={bestOffer?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {seo.viewDealCta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <PriceAlertDialog
                  productName={product.name}
                  currentPrice={product.lowestPrice}
                  currency={product.currency}
                  locale={locale}
                  dictionary={{
                    priceDropAlert: dictionary.product.priceDropAlert,
                    alertDescription: dictionary.product.alertDescription,
                    setAlert: dictionary.common.setAlert,
                  }}
                />
              </div>
            </div>

            {/* Trust Signals - compact on mobile */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 px-2.5 py-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
                <p className="text-xs font-medium text-gray-700">{seo.verifiedPrices}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 px-2.5 py-2">
                <TrendingDown className="h-4 w-4 shrink-0 text-orange-500" />
                <p className="text-xs font-medium text-gray-700">{seo.priceAlerts}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 px-2.5 py-2">
                <Clock className="h-4 w-4 shrink-0 text-blue-500" />
                <p className="text-xs font-medium text-gray-700">{seo.freeService}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 px-2.5 py-2">
                <ExternalLink className="h-4 w-4 shrink-0 text-purple-500" />
                <p className="text-xs font-medium text-gray-700">{seo.secureRedirect}</p>
              </div>
            </div>

            {/* Description */}
            {product.description && product.description !== product.name && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 sm:mt-12">
          <Tabs defaultValue="prices">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="prices">
                {dictionary.product.comparePrices}
              </TabsTrigger>
              <TabsTrigger value="history">
                {dictionary.product.priceHistory}
              </TabsTrigger>
              <TabsTrigger value="specs">
                {dictionary.product.specifications}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prices" className="mt-6">
              <PriceTable
                offers={offers}
                locale={locale}
                dictionary={{
                  goToStore: dictionary.common.goToStore,
                  inStock: dictionary.common.inStock,
                  outOfStock: dictionary.common.outOfStock,
                  limitedStock: dictionary.common.limitedStock,
                  lastUpdated: dictionary.product.lastUpdated,
                }}
              />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <PriceChart
                priceHistory={priceHistory}
                currency={product.currency}
                locale={locale}
                dictionary={{
                  priceHistory: dictionary.product.priceHistory,
                  currentLowest: dictionary.product.currentLowest,
                  averagePrice: dictionary.product.averagePrice,
                  highestPrice: dictionary.product.highestPrice,
                  priceChange: dictionary.product.priceChange,
                }}
              />
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="rounded-xl border border-gray-100 bg-white">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-3 text-xs sm:text-sm font-medium text-gray-500 sm:px-6">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-900 sm:px-6">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* SEO Content: How it works - compact on mobile */}
        <section className="mt-10 sm:mt-16" aria-label={seo.howItWorks}>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{seo.howItWorks}</h2>
          <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-6 sm:grid-cols-3">
            {[
              { n: '1', title: seo.step1, text: seo.step1Text },
              { n: '2', title: seo.step2, text: seo.step2Text },
              { n: '3', title: seo.step3, text: seo.step3Text },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4 sm:flex-col sm:items-center sm:text-center sm:rounded-2xl sm:p-6">
                <div className="flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <span className="text-sm sm:text-xl font-bold">{step.n}</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content: Buying guide - compact on mobile */}
        <section className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-8" aria-label={seo.buyingGuideTitle}>
          <h2 className="text-base sm:text-xl font-bold text-gray-900">{seo.buyingGuideTitle}: {product.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            {seo.buyingGuideIntro} <strong>{product.name}</strong>
            {product.brand ? ` ${locale === 'it' ? 'di' : 'by'} ${product.brand}` : ''}? {seo.buyingGuideText}
          </p>
          <div className="mt-4">
            <Button asChild size="sm">
              <a
                href={bestOffer?.url || '#'}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {seo.viewDealCta} — {formatPrice(product.lowestPrice, product.currency, locale)}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* SEO Content: FAQ - compact on mobile */}
        <section className="mt-8 sm:mt-12" aria-label={seo.faqTitle}>
          <h2 className="text-base sm:text-xl font-bold text-gray-900">{seo.faqTitle}</h2>
          <div className="mt-3 sm:mt-6 divide-y divide-gray-100 rounded-xl sm:rounded-2xl border border-gray-100 bg-white">
            {[
              { q: seo.faq1Q, a: seo.faq1A },
              { q: seo.faq2Q, a: seo.faq2A },
              { q: seo.faq3Q, a: seo.faq3A },
              { q: seo.faq4Q, a: seo.faq4A },
            ].map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 hover:bg-gray-50">
                  {faq.q}
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 pb-3 sm:px-6 sm:pb-4 text-xs sm:text-sm leading-relaxed text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Products - rendered externally via Suspense for faster page load */}
      </div>
    </div>
  )
}
