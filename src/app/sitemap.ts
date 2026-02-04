import { MetadataRoute } from 'next'

const baseUrl = 'https://priceradars.com'

const locales = ['it']
const countries = ['uk', 'us', 'de', 'fr', 'es']

const categories = [
  'smartphones',
  'laptops',
  'tv-audio',
  'appliances',
  'gaming',
  'cameras',
]

// Mock products - in production this would come from the database
const products = [
  'iphone-15-pro-256gb',
  'samsung-galaxy-s24-ultra',
  'macbook-air-m3',
  'sony-wh-1000xm5',
  'playstation-5-slim',
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

  // Italian categories
  for (const cat of categories) {
    entries.push({
      url: `${baseUrl}/it/categoria/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  }

  // Italian products
  for (const product of products) {
    entries.push({
      url: `${baseUrl}/it/prodotto/${product}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
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

    // Categories
    for (const cat of categories) {
      entries.push({
        url: `${baseUrl}/en/${country}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      })
    }

    // Products
    for (const product of products) {
      entries.push({
        url: `${baseUrl}/en/${country}/product/${product}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
      })
    }
  }

  return entries
}
