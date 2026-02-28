interface WebsiteJsonLdProps {
  name: string
  url: string
  searchUrl: string
}

export function WebsiteJsonLd({ name, url, searchUrl }: WebsiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${searchUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ProductJsonLdProps {
  /** Canonical URL of the product page (required for valid snippet and multi-country SEO). */
  productUrl: string
  /** Default currency when offer currency is missing (e.g. EUR, GBP). */
  defaultCurrency: string
  product: {
    name: string
    description?: string
    image?: string
    /** Multiple images improve Google Images and Shopping visibility. */
    images?: string[]
    brand?: string
    sku?: string
    gtin?: string
    /** Product category for Shopping (e.g. "Electronics > Smartphones"). */
    category?: string
    /** Schema.org itemCondition: NewCondition, UsedCondition, RefurbishedCondition. */
    itemCondition?: 'new' | 'used' | 'refurbished'
  }
  /** At least one offer recommended; if empty, productLowPrice/productCurrency used for AggregateOffer. */
  offers: Array<{
    price: number
    currency?: string
    url?: string
    merchantName?: string
    inStock?: boolean
  }>
  /** When offers[] is empty, use these for a single-price AggregateOffer. */
  productLowPrice?: number
  productCurrency?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export function ProductJsonLd({
  productUrl,
  defaultCurrency,
  product,
  offers,
  productLowPrice,
  productCurrency,
  aggregateRating,
}: ProductJsonLdProps) {
  const currency = productCurrency || defaultCurrency
  const sortedOffers = [...offers].sort((a, b) => a.price - b.price)
  const hasOffers = sortedOffers.length > 0
  const lowestPrice = hasOffers ? sortedOffers[0].price : (productLowPrice ?? 0)
  const highestPrice = hasOffers ? sortedOffers[sortedOffers.length - 1].price : lowestPrice
  const priceStr = (cents: number) => (cents / 100).toFixed(2)

  const imageList = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: (product.name && product.name.trim()) ? product.name.trim() : 'Product',
    url: productUrl,
    ...(product.description && { description: product.description }),
    ...(imageList.length > 0 && { image: imageList.length > 1 ? imageList : imageList[0] }),
    ...(product.category && { category: product.category }),
    ...(product.itemCondition && {
      itemCondition: `https://schema.org/${product.itemCondition === 'new' ? 'New' : product.itemCondition === 'refurbished' ? 'Refurbished' : 'Used'}Condition`,
    }),
    ...(product.brand && {
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
    }),
    ...(product.sku && { sku: product.sku }),
    ...(product.gtin && { gtin13: product.gtin }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
      },
    }),
    offers: {
      '@type': 'AggregateOffer',
      url: productUrl,
      lowPrice: priceStr(lowestPrice),
      highPrice: priceStr(highestPrice),
      priceCurrency: currency,
      offerCount: hasOffers ? offers.length : 1,
      ...(hasOffers && {
        offers: offers.map((offer) => ({
          '@type': 'Offer' as const,
          url: (offer.url && offer.url.trim()) ? offer.url : productUrl,
          price: priceStr(offer.price),
          priceCurrency: offer.currency || currency,
          ...(product.itemCondition && {
            itemCondition: `https://schema.org/${product.itemCondition === 'new' ? 'New' : product.itemCondition === 'refurbished' ? 'Refurbished' : 'Used'}Condition`,
          }),
          ...(offer.merchantName && {
            seller: {
              '@type': 'Organization' as const,
              name: offer.merchantName,
            },
          }),
          availability:
            offer.inStock === true
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
        })),
      }),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface OrganizationJsonLdProps {
  name: string
  url: string
  logo?: string
  contactEmail?: string
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  contactEmail,
}: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(contactEmail && {
      contactPoint: {
        '@type': 'ContactPoint',
        email: contactEmail,
        contactType: 'customer service',
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface FAQJsonLdProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
