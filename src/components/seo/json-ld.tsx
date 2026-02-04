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
  product: {
    name: string
    description: string
    image: string
    brand: string
    sku?: string
    gtin?: string
  }
  offers: Array<{
    price: number
    currency: string
    url: string
    merchantName: string
    inStock: boolean
  }>
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export function ProductJsonLd({
  product,
  offers,
  aggregateRating,
}: ProductJsonLdProps) {
  const sortedOffers = [...offers].sort((a, b) => a.price - b.price)
  const lowestPrice = sortedOffers[0]?.price || 0
  const highestPrice = sortedOffers[sortedOffers.length - 1]?.price || lowestPrice

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
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
      lowPrice: (lowestPrice / 100).toFixed(2),
      highPrice: (highestPrice / 100).toFixed(2),
      priceCurrency: offers[0]?.currency || 'EUR',
      offerCount: offers.length,
      offers: offers.map((offer) => ({
        '@type': 'Offer',
        url: offer.url,
        price: (offer.price / 100).toFixed(2),
        priceCurrency: offer.currency,
        seller: {
          '@type': 'Organization',
          name: offer.merchantName,
        },
        availability: offer.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      })),
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
