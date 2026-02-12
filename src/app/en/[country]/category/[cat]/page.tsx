import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { CategoryPage } from '@/components/pages/category-page'
import { searchProducts } from '@/lib/api/price-ninja'
import { getNativeLocale, type CountryCode } from '@/lib/countries'

export const runtime = 'edge'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

const categories: Record<string, { name: string; description: string; searchTerm: string }> = {
  // English slugs
  smartphones: { name: 'Smartphones', description: 'Compare prices for iPhone, Samsung, Xiaomi and other smartphones.', searchTerm: 'smartphone mobile phone' },
  laptops: { name: 'Laptops', description: 'Find the best prices for MacBooks, Windows notebooks and Chromebooks.', searchTerm: 'laptop notebook computer' },
  'tv-audio': { name: 'TV & Audio', description: 'Compare prices for Smart TVs, soundbars and headphones.', searchTerm: 'smart TV television' },
  appliances: { name: 'Appliances', description: 'Prices for washing machines, refrigerators and small appliances.', searchTerm: 'washing machine refrigerator oven' },
  gaming: { name: 'Gaming', description: 'Consoles, video games and gaming accessories at the best prices.', searchTerm: 'playstation xbox nintendo console' },
  cameras: { name: 'Cameras', description: 'Digital cameras, mirrorless and photography accessories.', searchTerm: 'camera mirrorless DSLR' },
  // German slug aliases
  haushaltsgeraete: { name: 'Haushaltsgeräte', description: 'Preisvergleich für Waschmaschinen, Kühlschränke und Haushaltsgeräte.', searchTerm: 'Waschmaschine Kühlschrank Backofen' },
  kameras: { name: 'Kameras', description: 'Preisvergleich für Digitalkameras, Spiegellose und Zubehör.', searchTerm: 'Kamera spiegellos DSLR' },
  // French slug aliases
  ordinateurs: { name: 'Ordinateurs', description: 'Comparez les prix des MacBook, notebooks et Chromebooks.', searchTerm: 'ordinateur portable laptop' },
  electromenager: { name: 'Électroménager', description: 'Comparez les prix des lave-linge, réfrigérateurs et fours.', searchTerm: 'lave-linge réfrigérateur four' },
  'appareils-photo': { name: 'Appareils Photo', description: 'Comparez les prix des appareils photo numériques et hybrides.', searchTerm: 'appareil photo hybride reflex' },
  // Spanish slug aliases
  portatiles: { name: 'Portátiles', description: 'Compara precios de MacBooks, portátiles y Chromebooks.', searchTerm: 'portátil laptop ordenador' },
  electrodomesticos: { name: 'Electrodomésticos', description: 'Compara precios de lavadoras, neveras y hornos.', searchTerm: 'lavadora nevera horno' },
  camaras: { name: 'Cámaras', description: 'Compara precios de cámaras digitales y accesorios.', searchTerm: 'cámara mirrorless réflex' },
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
  const canonicalUrl = `https://priceradars.com/en/${country}/category/${cat}`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'PriceRadars',
    },
    twitter: {
      card: 'summary',
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
    <CategoryPage
      category={{ slug: cat, ...category }}
      products={products}
      totalCount={result.totalCount}
      brands={result.brands}
      currentFilters={{
        ...search,
      }}
      locale={nativeLocale}
      country={country as CountryCode}
      dictionary={dictionary}
    />
  )
}
