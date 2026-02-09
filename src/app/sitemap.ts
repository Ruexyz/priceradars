import { MetadataRoute } from 'next'

const baseUrl = 'https://priceradars.com'

const countries = ['uk', 'us', 'de', 'fr', 'es']

const categories = [
  'smartphones',
  'laptops',
  'tv-audio',
  'appliances',
  'gaming',
  'cameras',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Italian pages
  entries.push({
    url: `${baseUrl}/it`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  })

  // Italian search
  entries.push({
    url: `${baseUrl}/it/cerca`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  })

  // Italian categories
  for (const cat of categories) {
    entries.push({
      url: `${baseUrl}/it/categoria/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  }

  // English country pages
  for (const country of countries) {
    entries.push({
      url: `${baseUrl}/en/${country}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })

    // Search
    entries.push({
      url: `${baseUrl}/en/${country}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    })

    // Categories
    for (const cat of categories) {
      entries.push({
        url: `${baseUrl}/en/${country}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      })
    }
  }

  // Note: Product URLs are dynamic and discovered via search/category pages.
  // In production, generate product sitemap from database.

  return entries
}
