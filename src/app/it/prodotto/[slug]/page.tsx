import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { ProductPage } from '@/components/pages/product-page'
import { ProductJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { getProductDetail, searchProducts, extractUuidFromSlug } from '@/lib/api/price-ninja'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const uuid = extractUuidFromSlug(slug)
  const product = await getProductDetail(uuid)

  if (!product) {
    return {}
  }

  const dictionary = await getDictionary('it')
  const price = (product.lowestPrice / 100).toFixed(2)
  const canonicalUrl = `${BASE_URL}/it/prodotto/${slug}`

  return {
    title: dictionary.seo.productTitle
      .replace('{name}', product.name)
      .replace('{price}', `€${price}`),
    description: dictionary.seo.productDescription
      .replace('{name}', product.name)
      .replace('{count}', '1')
      .replace('{price}', `€${price}`),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Confronta Prezzi da €${price}`,
      description: product.description || `Confronta prezzi per ${product.name}.`,
      url: canonicalUrl,
      type: 'website',
      siteName: 'PriceRadars',
      locale: 'it_IT',
      images: product.image ? [{ url: product.image, width: 600, height: 600, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - da €${price}`,
      description: product.description || `Confronta prezzi per ${product.name}.`,
      images: product.image ? [product.image] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ItalianProductPage({ params }: PageProps) {
  const { slug } = await params
  const uuid = extractUuidFromSlug(slug)
  const product = await getProductDetail(uuid)

  if (!product) {
    notFound()
  }

  const dictionary = await getDictionary('it')

  // Build product data for ProductPage component
  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand || '',
    category: product.condition === 'NEW' ? 'Nuovo' : 'Usato',
    categorySlug: 'all',
    image: product.image || 'https://placehold.co/600x600/f5f5f5/999999?text=No+Image',
    images: product.image ? [product.image] : [],
    description: product.description || product.name,
    specs: {} as Record<string, string>,
    lowestPrice: product.lowestPrice,
    currency: product.currency,
    offerCount: 1,
  }

  // Build offer from product data
  const offers = [
    {
      id: product.id,
      merchantId: product.merchantDomain,
      merchantName: product.merchantName,
      price: product.lowestPrice,
      currency: product.currency,
      url: product.deeplink,
      inStock: product.inStock,
      stockStatus: product.inStock ? 'in_stock' as const : 'out_of_stock' as const,
      updatedAt: new Date().toISOString(),
    },
  ]

  // If there's an original price, show discount info
  if (product.originalPrice > product.lowestPrice) {
    productData.specs['Prezzo originale'] = `€${(product.originalPrice / 100).toFixed(2)}`
    productData.specs['Sconto'] = `${product.discount.toFixed(0)}%`
  }

  if (product.condition) {
    productData.specs['Condizione'] = product.condition === 'NEW' ? 'Nuovo' : product.condition
  }

  if (product.deliveryCost !== null) {
    productData.specs['Spedizione'] = product.deliveryCost > 0 
      ? `€${product.deliveryCost.toFixed(2)}` 
      : 'Gratuita'
  }

  productData.specs['Venditore'] = product.merchantName
  productData.specs['Sito'] = product.merchantDomain

  // Mock price history (single data point since we don't have historical data)
  const today = new Date()
  const priceHistory = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    return {
      date: date.toISOString().split('T')[0],
      price: product.lowestPrice,
    }
  })

  // Search for related products by extracting key terms from the name
  const searchTerms = product.name.split(' ').slice(0, 2).join(' ')
  const relatedResult = await searchProducts(searchTerms, {
    country: 'it',
    locale: 'it',
  })

  const relatedProducts = relatedResult.products
    .filter(p => p.id !== product.id) // Exclude current product
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      image: p.image,
      lowestPrice: p.lowestPrice,
      currency: p.currency,
      offerCount: 1,
    }))

  return (
    <>
      {/* Schema.org JSON-LD for SEO */}
      <ProductJsonLd
        product={{
          name: product.name,
          description: product.description || product.name,
          image: product.image,
          brand: product.brand || '',
        }}
        offers={[{
          price: product.lowestPrice,
          currency: product.currency,
          url: product.deeplink,
          merchantName: product.merchantName,
          inStock: product.inStock,
        }]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/it` },
          { name: product.name, url: `${BASE_URL}/it/prodotto/${slug}` },
        ]}
      />
      <FAQJsonLd
        questions={[
          { question: 'Il prezzo mostrato è quello finale?', answer: 'Sì, i prezzi mostrati includono IVA. Eventuali costi di spedizione sono indicati separatamente. Il prezzo viene verificato e aggiornato regolarmente.' },
          { question: 'Come posso essere sicuro di ottenere il prezzo migliore?', answer: 'PriceRadars confronta i prezzi da decine di negozi online verificati. Ti basta cliccare su "Vai all\'offerta" per acquistare al prezzo più basso disponibile.' },
          { question: 'L\'acquisto avviene su PriceRadars?', answer: 'No, PriceRadars è un servizio di confronto prezzi. Cliccando sull\'offerta verrai reindirizzato al negozio online dove potrai acquistare direttamente, con tutte le garanzie del venditore.' },
          { question: 'Posso ricevere un avviso quando il prezzo scende?', answer: 'Sì! Usa il pulsante "Avvisami" per impostare un avviso di prezzo. Riceverai una notifica non appena il prezzo scende sotto la soglia che hai indicato.' },
        ]}
      />

      <ProductPage
        product={productData}
        offers={offers}
        priceHistory={priceHistory}
        relatedProducts={relatedProducts}
        locale="it"
        country="it"
        dictionary={dictionary}
      />
    </>
  )
}
