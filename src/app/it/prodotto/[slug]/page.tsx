import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { ProductPage } from '@/components/pages/product-page'
import { RelatedProducts } from '@/components/product/related-products'
import { ProductGridSkeleton } from '@/components/ui/loading'
import { ProductJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { getProductDetail, extractUuidFromSlug } from '@/lib/api/price-ninja'

export const runtime = 'edge'

const BASE_URL = 'https://priceradars.com'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const uuid = extractUuidFromSlug(slug)
  const product = await getProductDetail(uuid)

  if (!product) return {}

  const dictionary = await getDictionary('it')
  const price = (product.lowestPrice / 100).toFixed(2)
  const canonicalUrl = `${BASE_URL}/it/prodotto/${slug}`

  return {
    title: dictionary.seo.productTitle
      .replace('{name}', product.name)
      .replace('{price}', `€${price}`),
    description: dictionary.seo.productDescription
      .replace('{name}', product.name)
      .replace('{count}', String(product.offerCount || 1))
      .replace('{price}', `€${price}`),
    alternates: { canonical: canonicalUrl },
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
      images: product.image ? [product.image] : [],
    },
  }
}

export default async function ItalianProductPage({ params }: PageProps) {
  const { slug } = await params
  const uuid = extractUuidFromSlug(slug)
  
  const [product, dictionary] = await Promise.all([
    getProductDetail(uuid),
    getDictionary('it'),
  ])

  if (!product) notFound()

  // Map ProductDetail to ProductPage props
  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.categories[0] || (product.condition === 'NEW' ? 'Nuovo' : 'Usato'),
    categorySlug: 'all',
    image: product.image,
    images: product.images,
    description: product.description,
    specs: {} as Record<string, string>,
    lowestPrice: product.lowestPrice,
    currency: product.currency,
    offerCount: product.offerCount,
  }

  // Build offers for PriceTable
  const offers = product.offers.map(o => ({
    id: o.id,
    merchantId: o.merchantDomain,
    merchantName: o.merchantName,
    price: o.price,
    currency: o.currency,
    url: o.deeplink,
    inStock: o.inStock,
    stockStatus: o.inStock ? 'in_stock' as const : 'out_of_stock' as const,
    updatedAt: new Date().toISOString(),
  }))

  // Fallback: if no offers from generic-products, use product deeplink
  if (offers.length === 0 && product.lowestPrice > 0) {
    offers.push({
      id: product.id,
      merchantId: '',
      merchantName: 'Negozio',
      price: product.lowestPrice,
      currency: product.currency,
      url: '',
      inStock: product.inStock,
      stockStatus: product.inStock ? 'in_stock' as const : 'out_of_stock' as const,
      updatedAt: new Date().toISOString(),
    })
  }

  // Build specs
  if (product.originalPrice > product.lowestPrice) {
    productData.specs['Prezzo originale'] = `€${(product.originalPrice / 100).toFixed(2)}`
  }
  if (product.condition) {
    productData.specs['Condizione'] = product.condition === 'NEW' ? 'Nuovo' : product.condition
  }
  if (product.categories.length > 0) {
    productData.specs['Categoria'] = product.categories.join(' > ')
  }
  productData.specs['Offerte disponibili'] = String(product.offerCount)

  // Price history (real data from API)
  const priceHistory = product.priceHistory.length > 0
    ? product.priceHistory
    : [{ date: new Date().toISOString().split('T')[0], price: product.lowestPrice }]

  // Best offer for JSON-LD
  const bestOffer = offers.sort((a, b) => a.price - b.price)[0]

  return (
    <>
      <ProductJsonLd
        product={{
          name: product.name,
          description: product.description || product.name,
          image: product.image,
          brand: product.brand,
        }}
        offers={offers.map(o => ({
          price: o.price,
          currency: o.currency,
          url: o.url,
          merchantName: o.merchantName,
          inStock: o.inStock,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/it` },
          { name: product.name, url: `${BASE_URL}/it/prodotto/${slug}` },
        ]}
      />
      <FAQJsonLd
        questions={[
          { question: 'Il prezzo mostrato è quello finale?', answer: 'Sì, i prezzi mostrati includono IVA. Eventuali costi di spedizione sono indicati separatamente.' },
          { question: 'Come posso essere sicuro di ottenere il prezzo migliore?', answer: 'PriceRadars confronta i prezzi da decine di negozi online verificati. Ti basta cliccare su "Vai all\'offerta" per acquistare al prezzo più basso disponibile.' },
          { question: 'L\'acquisto avviene su PriceRadars?', answer: 'No, PriceRadars è un servizio di confronto prezzi. Cliccando sull\'offerta verrai reindirizzato al negozio online dove potrai acquistare direttamente.' },
          { question: 'Posso ricevere un avviso quando il prezzo scende?', answer: 'Sì! Usa il pulsante "Avvisami" per impostare un avviso di prezzo.' },
        ]}
      />

      <ProductPage
        product={productData}
        offers={offers}
        priceHistory={priceHistory}
        relatedProducts={[]}
        locale="it"
        country="it"
        dictionary={dictionary}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Suspense fallback={<ProductGridSkeleton />}>
          <RelatedProducts
            productId={product.id}
            productName={product.name}
            locale="it"
            country="it"
            dictionary={dictionary}
          />
        </Suspense>
      </div>
    </>
  )
}
