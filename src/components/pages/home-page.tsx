import Link from 'next/link'
import { 
  ArrowRight, TrendingUp, Shield, Zap, Search,
  ShieldCheck, BarChart3, Bell, Globe, Store, CheckCircle2
} from 'lucide-react'
import { SearchBarAdvanced } from '@/components/search/search-bar-advanced'
import { CategoryCard } from '@/components/category/category-card'
import { Button } from '@/components/ui/button'
import { countries, type Locale, type CountryCode } from '@/lib/countries'
import type { Dictionary } from '@/lib/i18n'

interface HomePageProps {
  locale: Locale
  country: CountryCode
  dictionary: Dictionary
}

const categories = [
  { slug: 'smartphones', nameEn: 'Smartphones', nameIt: 'Smartphone', productCount: 1250 },
  { slug: 'laptops', nameEn: 'Laptops', nameIt: 'Laptop', productCount: 890 },
  { slug: 'tv-audio', nameEn: 'TV & Audio', nameIt: 'TV & Audio', productCount: 650 },
  { slug: 'appliances', nameEn: 'Appliances', nameIt: 'Elettrodomestici', productCount: 1100 },
  { slug: 'gaming', nameEn: 'Gaming', nameIt: 'Gaming', productCount: 780 },
  { slug: 'cameras', nameEn: 'Cameras', nameIt: 'Fotocamere', productCount: 420 },
]

const popularSearches = {
  it: ['iPhone 15', 'Samsung Galaxy S24', 'MacBook Air', 'PlayStation 5', 'AirPods Pro', 'TV OLED 65'],
  en: ['iPhone 15', 'Samsung Galaxy S24', 'MacBook Air', 'PlayStation 5', 'AirPods Pro', 'OLED TV 65'],
}

// Merchants per country for trust section
const merchantsByCountry: Record<string, string[]> = {
  it: ['Amazon.it', 'MediaWorld', 'Unieuro', 'eBay', 'ePrice'],
  uk: ['Amazon.co.uk', 'Currys', 'Argos', 'John Lewis', 'AO'],
  us: ['Amazon.com', 'Best Buy', 'Walmart', 'Newegg', 'B&H'],
  de: ['Amazon.de', 'MediaMarkt', 'Saturn', 'Otto', 'Cyberport'],
  fr: ['Amazon.fr', 'Fnac', 'Darty', 'Cdiscount', 'Boulanger'],
  es: ['Amazon.es', 'PcComponentes', 'MediaMarkt', 'El Corte Inglés'],
}

function getSeoContent(locale: Locale) {
  if (locale === 'it') {
    return {
      heroTitle: 'Confronta Prezzi Online',
      heroSubtitle: 'Trova le migliori offerte da oltre 50 negozi online in Italia. Cerca, confronta e risparmia su elettronica, elettrodomestici e molto altro.',
      popularLabel: 'Ricerche popolari:',
      categoriesTitle: 'Categorie Popolari',
      howTitle: 'Come funziona PriceRadars',
      howSubtitle: 'Trovare il miglior prezzo non è mai stato così semplice',
      step1Title: 'Cerca il prodotto',
      step1Text: 'Inserisci il nome del prodotto che stai cercando. Il nostro motore di ricerca analizza migliaia di offerte in tempo reale.',
      step2Title: 'Confronta i prezzi',
      step2Text: 'Visualizza i prezzi dallo stesso prodotto su diversi negozi online. Ordina per prezzo, popolarità o sconto.',
      step3Title: 'Risparmia sull\'acquisto',
      step3Text: 'Clicca sull\'offerta migliore e verrai reindirizzato al negozio ufficiale per completare l\'acquisto al miglior prezzo.',
      whyTitle: 'Perché scegliere PriceRadars?',
      why1Title: 'Prezzi verificati ogni ora',
      why1Text: 'I nostri algoritmi aggiornano i prezzi continuamente da fonti ufficiali, così hai sempre il dato più recente.',
      why2Title: 'Oltre 50 negozi confrontati',
      why2Text: 'Copriamo i principali rivenditori online italiani ed europei per garantirti la massima scelta.',
      why3Title: 'Avvisi di prezzo gratuiti',
      why3Text: 'Imposta un avviso e ricevi una notifica quando il prezzo del prodotto che desideri scende.',
      why4Title: '6 Paesi supportati',
      why4Text: 'Confronta prezzi in Italia, UK, USA, Germania, Francia e Spagna con un solo clic.',
      why5Title: '100% gratuito e indipendente',
      why5Text: 'PriceRadars è gratuito per gli utenti. Non favoriamo nessun negozio: mostriamo il prezzo reale.',
      why6Title: 'Acquisto sicuro',
      why6Text: 'Non processiamo pagamenti. Acquisti direttamente dal negozio ufficiale con tutte le garanzie.',
      ctaTitle: 'Non pagare mai di più',
      ctaText: 'Ogni giorno migliaia di utenti risparmiano sugli acquisti online grazie a PriceRadars. Cerca il prodotto che vuoi e scopri il prezzo più basso disponibile oggi.',
      ctaButton: 'Inizia a risparmiare',
      merchantsTitle: 'Confrontiamo i prezzi da',
      seoTitle: 'Il comparatore di prezzi che ti fa risparmiare davvero',
      seoText1: 'PriceRadars è il motore di confronto prezzi che analizza le offerte dei principali negozi online italiani. Che tu stia cercando uno smartphone, un laptop, una TV o un elettrodomestico, il nostro sistema confronta automaticamente i prezzi per trovare l\'offerta migliore.',
      seoText2: 'A differenza dei normali motori di ricerca, PriceRadars è specializzato esclusivamente nel confronto prezzi. Aggiorniamo i dati ogni ora e ti mostriamo esattamente quanto puoi risparmiare su ogni prodotto. Il servizio è completamente gratuito: ti basta cercare, confrontare e cliccare sull\'offerta per essere reindirizzato al negozio dove completare l\'acquisto.',
    }
  }
  return {
    heroTitle: 'Compare Prices Online',
    heroSubtitle: 'Find the best deals from 50+ online stores across 6 countries. Search, compare, and save on electronics, appliances, and more.',
    popularLabel: 'Popular:',
    categoriesTitle: 'Popular Categories',
    howTitle: 'How PriceRadars Works',
    howSubtitle: 'Finding the best price has never been easier',
    step1Title: 'Search for a product',
    step1Text: 'Type the product you\'re looking for. Our search engine analyzes thousands of offers in real time.',
    step2Title: 'Compare prices',
    step2Text: 'View prices for the same product across different online stores. Sort by price, popularity, or discount.',
    step3Title: 'Save on your purchase',
    step3Text: 'Click the best offer and you\'ll be redirected to the official store to complete your purchase at the best price.',
    whyTitle: 'Why choose PriceRadars?',
    why1Title: 'Prices verified every hour',
    why1Text: 'Our algorithms continuously update prices from official sources so you always have the most accurate data.',
    why2Title: '50+ stores compared',
    why2Text: 'We cover the leading online retailers across Europe and the US to ensure maximum choice.',
    why3Title: 'Free price alerts',
    why3Text: 'Set an alert and get notified when the price of the product you want drops.',
    why4Title: '6 countries supported',
    why4Text: 'Compare prices in Italy, UK, USA, Germany, France, and Spain with a single click.',
    why5Title: '100% free and independent',
    why5Text: 'PriceRadars is free for users. We don\'t favor any store: we show the real price.',
    why6Title: 'Secure purchases',
    why6Text: 'We don\'t process payments. You buy directly from the official store with all guarantees.',
    ctaTitle: 'Never overpay again',
    ctaText: 'Every day thousands of users save on online purchases with PriceRadars. Search for any product and discover the lowest price available today.',
    ctaButton: 'Start saving',
    merchantsTitle: 'We compare prices from',
    seoTitle: 'The price comparison engine that actually saves you money',
    seoText1: 'PriceRadars is the price comparison engine that analyzes offers from leading online stores. Whether you\'re looking for a smartphone, laptop, TV, or appliance, our system automatically compares prices to find the best deal.',
    seoText2: 'Unlike regular search engines, PriceRadars specializes exclusively in price comparison. We update data hourly and show you exactly how much you can save on every product. The service is completely free: just search, compare, and click the offer to be redirected to the store where you can complete your purchase.',
  }
}

export function HomePage({ locale, country, dictionary }: HomePageProps) {
  const seo = getSeoContent(locale)
  const merchants = merchantsByCountry[country] || merchantsByCountry.it

  const getCategoryUrl = (slug: string) => {
    if (locale === 'it') {
      return `/it/categoria/${slug}`
    }
    return `/en/${country}/category/${slug}`
  }

  const getSearchUrl = (query: string) => {
    if (locale === 'it') {
      return `/it/cerca?q=${encodeURIComponent(query)}`
    }
    return `/en/${country}/search?q=${encodeURIComponent(query)}`
  }

  const searches = popularSearches[locale] || popularSearches.en

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {seo.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {seo.heroSubtitle}
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBarAdvanced
              locale={locale}
              country={country}
              placeholder={dictionary.home.searchPlaceholder}
              size="large"
            />
          </div>

          {/* Popular searches - internal links for SEO */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-gray-500">{seo.popularLabel}</span>
            {searches.map((term) => (
              <Link
                key={term}
                href={getSearchUrl(term)}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                <Search className="h-3 w-3" />
                {term}
              </Link>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span>{dictionary.home.trustedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-500" />
              <span>{locale === 'it' ? 'Prezzi verificati' : 'Verified prices'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span>{locale === 'it' ? 'Aggiornato ogni ora' : 'Updated hourly'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - internal links for crawling */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {seo.categoriesTitle}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={{
                  slug: category.slug,
                  name: locale === 'it' ? category.nameIt : category.nameEn,
                  productCount: category.productCount,
                }}
                href={getCategoryUrl(category.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - SEO content + user education */}
      <section className="border-y border-gray-100 bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">{seo.howTitle}</h2>
            <p className="mt-2 text-gray-600">{seo.howSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{seo.step1Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{seo.step1Text}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{seo.step2Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{seo.step2Text}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{seo.step3Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{seo.step3Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why PriceRadars - keyword-rich SEO section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">{seo.whyTitle}</h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: seo.why1Title, text: seo.why1Text, color: 'text-green-600 bg-green-100' },
              { icon: Store, title: seo.why2Title, text: seo.why2Text, color: 'text-blue-600 bg-blue-100' },
              { icon: Bell, title: seo.why3Title, text: seo.why3Text, color: 'text-orange-600 bg-orange-100' },
              { icon: Globe, title: seo.why4Title, text: seo.why4Text, color: 'text-purple-600 bg-purple-100' },
              { icon: Shield, title: seo.why5Title, text: seo.why5Text, color: 'text-gray-600 bg-gray-100' },
              { icon: CheckCircle2, title: seo.why6Title, text: seo.why6Text, color: 'text-emerald-600 bg-emerald-100' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-gray-100 p-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Merchants - trust + SEO anchor text */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
            {seo.merchantsTitle}
          </h3>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {merchants.map((name) => (
              <span key={name} className="text-lg font-semibold text-gray-400">
                {name}
              </span>
            ))}
            <span className="text-lg font-semibold text-gray-400">+{locale === 'it' ? 'altri' : 'more'}</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">{seo.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">{seo.ctaText}</p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={locale === 'it' ? '/it/cerca' : `/en/${country}/search`}>
                {seo.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Long-form Content - hidden visually elegant, crawlable by Google */}
      <section className="border-t border-gray-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">{seo.seoTitle}</h2>
          <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
            <p>{seo.seoText1}</p>
            <p>{seo.seoText2}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
