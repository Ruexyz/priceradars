import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { CategoryPage } from '@/components/pages/category-page'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { searchProducts } from '@/lib/api/price-ninja'
import { getNativeLocale, type CountryCode } from '@/lib/countries'

const BASE_URL = 'https://priceradars.com'

export const runtime = 'edge'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

const categories: Record<string, { name: string; description: string; searchTerm: string; keywords: string }> = {
  smartphones: {
    name: 'Smartphones',
    description: 'Compare prices for iPhone, Samsung, Xiaomi and other smartphones. Find the best deals from leading online stores and save.',
    searchTerm: 'smartphone mobile phone',
    keywords: 'smartphone, iPhone, Samsung, compare prices, best deals, mobile phone',
  },
  laptops: {
    name: 'Laptops',
    description: 'Find the best prices for MacBooks, Windows notebooks and Chromebooks. Compare offers from dozens of stores and buy at the lowest price.',
    searchTerm: 'laptop notebook computer',
    keywords: 'laptop, notebook, MacBook, Chromebook, compare prices, computer deals',
  },
  'tv-audio': {
    name: 'TV & Audio',
    description: 'Compare prices for Smart TVs, soundbars and headphones. Deals from Amazon, Curry\'s and other retailers.',
    searchTerm: 'smart TV television',
    keywords: 'Smart TV, television, soundbar, headphones, compare prices TV',
  },
  appliances: {
    name: 'Appliances',
    description: 'Prices for washing machines, refrigerators and small appliances. Compare and find the best offer for your home.',
    searchTerm: 'washing machine refrigerator oven',
    keywords: 'appliances, washing machine, refrigerator, oven, compare prices, home deals',
  },
  gaming: {
    name: 'Gaming',
    description: 'PlayStation, Xbox, Nintendo Switch, video games and gaming accessories at the best prices. Compare deals and save.',
    searchTerm: 'playstation xbox nintendo console',
    keywords: 'gaming, PlayStation, Xbox, Nintendo, console, video games, compare prices',
  },
  cameras: {
    name: 'Cameras',
    description: 'Digital cameras, mirrorless and photography accessories. Compare prices and find the best deals online.',
    searchTerm: 'camera mirrorless DSLR',
    keywords: 'camera, mirrorless, DSLR, photography, compare prices cameras',
  },
  haushaltsgeraete: {
    name: 'Haushaltsgeräte',
    description: 'Preisvergleich für Waschmaschinen, Kühlschränke und Haushaltsgeräte. Die besten Angebote aus über 50 Shops.',
    searchTerm: 'Waschmaschine Kühlschrank Backofen',
    keywords: 'Haushaltsgeräte, Waschmaschine, Kühlschrank, Preisvergleich, Angebote',
  },
  kameras: {
    name: 'Kameras',
    description: 'Preisvergleich für Digitalkameras, Spiegellose und Zubehör. Beste Preise finden.',
    searchTerm: 'Kamera spiegellos DSLR',
    keywords: 'Kamera, Spiegelreflex, Preisvergleich, Fotografie',
  },
  ordinateurs: {
    name: 'Ordinateurs',
    description: 'Comparez les prix des MacBook, notebooks et Chromebooks. Trouvez la meilleure offre parmi des dizaines de boutiques.',
    searchTerm: 'ordinateur portable laptop',
    keywords: 'ordinateur, portable, MacBook, comparateur de prix',
  },
  electromenager: {
    name: 'Électroménager',
    description: 'Comparez les prix des lave-linge, réfrigérateurs et fours. Meilleures offres pour la maison.',
    searchTerm: 'lave-linge réfrigérateur four',
    keywords: 'électroménager, lave-linge, réfrigérateur, comparateur de prix',
  },
  'appareils-photo': {
    name: 'Appareils Photo',
    description: 'Comparez les prix des appareils photo numériques et hybrides. Trouvez les meilleures offres.',
    searchTerm: 'appareil photo hybride reflex',
    keywords: 'appareil photo, hybride, reflex, comparateur de prix',
  },
  portatiles: {
    name: 'Portátiles',
    description: 'Compara precios de MacBooks, portátiles y Chromebooks. Encuentra la mejor oferta en más de 50 tiendas.',
    searchTerm: 'portátil laptop ordenador',
    keywords: 'portátil, laptop, MacBook, comparador de precios',
  },
  electrodomesticos: {
    name: 'Electrodomésticos',
    description: 'Compara precios de lavadoras, neveras y hornos. Mejores ofertas para tu hogar.',
    searchTerm: 'lavadora nevera horno',
    keywords: 'electrodomésticos, lavadora, nevera, comparador de precios',
  },
  camaras: {
    name: 'Cámaras',
    description: 'Compara precios de cámaras digitales y accesorios. Encuentra las mejores ofertas.',
    searchTerm: 'cámara mirrorless réflex',
    keywords: 'cámara, mirrorless, réflex, comparador de precios',
  },
}

interface PageProps {
  params: Promise<{ country: string; cat: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, cat } = await params
  const category = categories[cat]

  if (!validCountries.includes(country) || !category) return {}

  const nativeLocale = getNativeLocale(country) as Locale
  const dictionary = await getDictionary(nativeLocale)
  const title = dictionary.seo.categoryTitle.replace('{category}', category.name)
  const description = category.description
  const canonicalUrl = `${BASE_URL}/en/${country}/category/${cat}`

  return {
    title,
    description,
    keywords: category.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'PriceRadars',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: `${category.name} | PriceRadars` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function EnglishCategoryPage({ params, searchParams }: PageProps) {
  const { country, cat } = await params
  const search = await searchParams

  if (!validCountries.includes(country)) {
    notFound()
  }

  const category = categories[cat]
  if (!category) {
    notFound()
  }

  const nativeLocale = getNativeLocale(country) as Locale
  const dictionary = await getDictionary(nativeLocale)
  
  // Fetch real products from price-ninja
  const result = await searchProducts(category.searchTerm, {
    country,
    locale: nativeLocale,
    sort: search.sort,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    brand: search.brand,
    merchantId: search.merchantId,
  })

  const products = result.products.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    image: p.image,
    lowestPrice: p.lowestPrice,
    currency: p.currency,
    offerCount: p.offerCount,
    inStock: p.inStock,
  }))

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/en/${country}` },
          { name: category.name, url: `${BASE_URL}/en/${country}/category/${cat}` },
        ]}
      />
      <CategoryPage
        category={{ slug: cat, ...category }}
        products={products}
        totalCount={result.totalCount}
        brands={result.brands}
        merchants={result.facets.merchants}
        currentFilters={{
          ...search,
        }}
        locale={nativeLocale}
        country={country as CountryCode}
        dictionary={dictionary}
      />
    </>
  )
}
