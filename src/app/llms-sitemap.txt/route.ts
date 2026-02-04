import { NextResponse } from 'next/server'

export const runtime = 'edge'

/**
 * Simple text sitemap for LLMs
 * GET /llms-sitemap.txt
 */
export async function GET() {
  const baseUrl = 'https://priceradars.com'
  
  const countries = [
    { code: 'it', locale: 'it', prefix: '/it' },
    { code: 'uk', locale: 'en', prefix: '/en/uk' },
    { code: 'us', locale: 'en', prefix: '/en/us' },
    { code: 'de', locale: 'en', prefix: '/en/de' },
    { code: 'fr', locale: 'en', prefix: '/en/fr' },
    { code: 'es', locale: 'en', prefix: '/en/es' },
  ]
  
  const categories = [
    'smartphones',
    'laptops', 
    'tv-audio',
    'appliances',
    'gaming',
    'cameras',
  ]

  const lines: string[] = [
    '# PriceRadars - LLM Sitemap',
    '# Price comparison website for electronics and appliances',
    '# Last updated: ' + new Date().toISOString(),
    '',
    '## Main Pages',
    '',
  ]

  // Home pages
  for (const country of countries) {
    lines.push(`${baseUrl}${country.prefix} - Home (${country.code.toUpperCase()})`)
  }

  lines.push('')
  lines.push('## Category Pages')
  lines.push('')

  // Category pages
  for (const country of countries) {
    const categoryPath = country.locale === 'it' ? 'categoria' : 'category'
    for (const cat of categories) {
      lines.push(`${baseUrl}${country.prefix}/${categoryPath}/${cat}`)
    }
  }

  lines.push('')
  lines.push('## Search Pages')
  lines.push('')

  // Search pages
  for (const country of countries) {
    const searchPath = country.locale === 'it' ? 'cerca' : 'search'
    lines.push(`${baseUrl}${country.prefix}/${searchPath}?q={query}`)
  }

  lines.push('')
  lines.push('## Product Pages')
  lines.push('')
  lines.push('# Product pages follow this pattern:')

  for (const country of countries) {
    const productPath = country.locale === 'it' ? 'prodotto' : 'product'
    lines.push(`${baseUrl}${country.prefix}/${productPath}/{product-slug}`)
  }

  lines.push('')
  lines.push('## API Endpoints')
  lines.push('')
  lines.push(`${baseUrl}/api/v1/search?q={query} - Search products`)
  lines.push(`${baseUrl}/api/v1/products/{slug} - Get product details`)
  lines.push(`${baseUrl}/api/v1/products/{slug}/history - Get price history`)
  lines.push(`${baseUrl}/api/v1/categories - List categories`)
  lines.push(`${baseUrl}/api/llms - Structured site data for LLMs (JSON)`)

  lines.push('')
  lines.push('## Documentation')
  lines.push('')
  lines.push(`${baseUrl}/llms.txt - LLM documentation (summary)`)
  lines.push(`${baseUrl}/llms-full.txt - LLM documentation (detailed)`)
  lines.push(`${baseUrl}/docs/api.md - API documentation`)

  const content = lines.join('\n')

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
