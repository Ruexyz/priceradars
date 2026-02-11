import { MetadataRoute } from 'next'

const baseUrl = 'https://priceradars.com'

const countriesConfig = [
  { code: 'it', prefix: '/it', catPath: 'categoria' },
  { code: 'uk', prefix: '/en/uk', catPath: 'category' },
  { code: 'us', prefix: '/en/us', catPath: 'category' },
  { code: 'de', prefix: '/en/de', catPath: 'category' },
  { code: 'fr', prefix: '/en/fr', catPath: 'category' },
  { code: 'es', prefix: '/en/es', catPath: 'category' },
]

const categories = [
  'smartphones',
  'laptops',
  'tv-audio',
  'appliances',
  'gaming',
  'cameras',
]

// Map each URL to its hreflang alternates
function getAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}

  // Category pages: map the path across countries
  // Home and category pages have equivalent structure
  alternates['it'] = `${baseUrl}/it${path}`
  alternates['en-GB'] = `${baseUrl}/en/uk${path}`
  alternates['en-US'] = `${baseUrl}/en/us${path}`
  alternates['de'] = `${baseUrl}/en/de${path}`
  alternates['fr'] = `${baseUrl}/en/fr${path}`
  alternates['es'] = `${baseUrl}/en/es${path}`
  alternates['x-default'] = `${baseUrl}/en/uk${path}`

  return alternates
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Homepage for each country
  for (const c of countriesConfig) {
    entries.push({
      url: `${baseUrl}${c.prefix}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: getAlternates(''),
      },
    })
  }

  // Category pages for each country
  for (const cat of categories) {
    for (const c of countriesConfig) {
      const catPath = c.code === 'it' ? `/categoria/${cat}` : `/category/${cat}`

      entries.push({
        url: `${baseUrl}${c.prefix}${catPath}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
          languages: (() => {
            const alt: Record<string, string> = {}
            alt['it'] = `${baseUrl}/it/categoria/${cat}`
            alt['en-GB'] = `${baseUrl}/en/uk/category/${cat}`
            alt['en-US'] = `${baseUrl}/en/us/category/${cat}`
            alt['de'] = `${baseUrl}/en/de/category/${cat}`
            alt['fr'] = `${baseUrl}/en/fr/category/${cat}`
            alt['es'] = `${baseUrl}/en/es/category/${cat}`
            alt['x-default'] = `${baseUrl}/en/uk/category/${cat}`
            return alt
          })(),
        },
      })
    }
  }

  // Note: Product URLs are dynamic and discovered by Googlebot
  // via internal links from category and search result pages.

  return entries
}
