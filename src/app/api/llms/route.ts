import { NextResponse } from 'next/server'

export const runtime = 'edge'

/**
 * API endpoint for LLMs to get structured site data
 * GET /api/llms
 */
export async function GET() {
  const siteData = {
    name: 'PriceRadars',
    description: 'Price comparison engine for electronics and appliances across 50+ online stores in 6 countries',
    url: 'https://priceradars.com',
    version: '1.0.0',
    
    // Supported locales and countries
    localization: {
      locales: ['it', 'en', 'de', 'fr', 'es'],
      countries: [
        { code: 'it', name: 'Italy', locale: 'it', nativeLanguage: 'Italian', currency: 'EUR', url: '/it' },
        { code: 'uk', name: 'United Kingdom', locale: 'en', nativeLanguage: 'English', currency: 'GBP', url: '/en/uk' },
        { code: 'us', name: 'United States', locale: 'en', nativeLanguage: 'English', currency: 'USD', url: '/en/us' },
        { code: 'de', name: 'Germany', locale: 'de', nativeLanguage: 'German', currency: 'EUR', url: '/en/de' },
        { code: 'fr', name: 'France', locale: 'fr', nativeLanguage: 'French', currency: 'EUR', url: '/en/fr' },
        { code: 'es', name: 'Spain', locale: 'es', nativeLanguage: 'Spanish', currency: 'EUR', url: '/en/es' },
      ],
      note: 'Each country is served in its native language. UI, metadata, and SEO content are fully localized.',
    },
    
    // Available categories
    categories: [
      { slug: 'smartphones', name: 'Smartphones', productCount: 1250 },
      { slug: 'laptops', name: 'Laptops', productCount: 890 },
      { slug: 'tv-audio', name: 'TV & Audio', productCount: 650 },
      { slug: 'appliances', name: 'Appliances', productCount: 1100 },
      { slug: 'gaming', name: 'Gaming', productCount: 780 },
      { slug: 'cameras', name: 'Cameras', productCount: 420 },
    ],
    
    // API endpoints
    api: {
      search: {
        endpoint: '/api/v1/search',
        method: 'GET',
        parameters: {
          q: 'Search query (required)',
          country: 'Country code (optional)',
          limit: 'Max results (optional, default 20)',
        },
      },
      product: {
        endpoint: '/api/v1/products/{slug}',
        method: 'GET',
        description: 'Get product details and offers',
      },
      priceHistory: {
        endpoint: '/api/v1/products/{slug}/history',
        method: 'GET',
        description: 'Get price history for a product',
      },
      categories: {
        endpoint: '/api/v1/categories',
        method: 'GET',
        description: 'List all categories',
      },
    },
    
    // URL patterns
    urlPatterns: {
      home: {
        it: '/it',
        en: '/en/{country}',
      },
      category: {
        it: '/it/categoria/{slug}',
        en: '/en/{country}/category/{slug}',
      },
      product: {
        it: '/it/prodotto/{slug}',
        en: '/en/{country}/product/{slug}',
      },
      search: {
        it: '/it/cerca?q={query}',
        en: '/en/{country}/search?q={query}',
      },
    },
    
    // Schema.org types used
    schemaTypes: [
      'WebSite',
      'Product',
      'AggregateOffer',
      'BreadcrumbList',
      'Organization',
    ],
    
    // Contact
    contact: {
      email: 'support@priceradars.com',
      website: 'https://priceradars.com',
    },
    
    // Last updated
    lastUpdated: new Date().toISOString(),
  }

  return NextResponse.json(siteData, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json',
    },
  })
}
