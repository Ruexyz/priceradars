import { MetadataRoute } from 'next'

const baseUrl = 'https://priceradars.com'

// Country config with localized category slugs
const countriesConfig = [
  { code: 'it', prefix: '/it', catPath: 'categoria', hreflang: 'it', catSlugs: {
    smartphones: 'smartphone', laptops: 'laptop', 'tv-audio': 'tv-audio',
    appliances: 'elettrodomestici', gaming: 'gaming', cameras: 'fotocamere',
  }},
  { code: 'uk', prefix: '/en/uk', catPath: 'category', hreflang: 'en-GB', catSlugs: {
    smartphones: 'smartphones', laptops: 'laptops', 'tv-audio': 'tv-audio',
    appliances: 'appliances', gaming: 'gaming', cameras: 'cameras',
  }},
  { code: 'us', prefix: '/en/us', catPath: 'category', hreflang: 'en-US', catSlugs: {
    smartphones: 'smartphones', laptops: 'laptops', 'tv-audio': 'tv-audio',
    appliances: 'appliances', gaming: 'gaming', cameras: 'cameras',
  }},
  { code: 'de', prefix: '/en/de', catPath: 'category', hreflang: 'de', catSlugs: {
    smartphones: 'smartphones', laptops: 'laptops', 'tv-audio': 'tv-audio',
    appliances: 'haushaltsgeraete', gaming: 'gaming', cameras: 'kameras',
  }},
  { code: 'fr', prefix: '/en/fr', catPath: 'category', hreflang: 'fr', catSlugs: {
    smartphones: 'smartphones', laptops: 'ordinateurs', 'tv-audio': 'tv-audio',
    appliances: 'electromenager', gaming: 'gaming', cameras: 'appareils-photo',
  }},
  { code: 'es', prefix: '/en/es', catPath: 'category', hreflang: 'es', catSlugs: {
    smartphones: 'smartphones', laptops: 'portatiles', 'tv-audio': 'tv-audio',
    appliances: 'electrodomesticos', gaming: 'gaming', cameras: 'camaras',
  }},
]

const categoryKeys = ['smartphones', 'laptops', 'tv-audio', 'appliances', 'gaming', 'cameras'] as const

function hreflangAlternates(pathFn: (c: typeof countriesConfig[0]) => string): Record<string, string> {
  const alt: Record<string, string> = {}
  for (const c of countriesConfig) {
    alt[c.hreflang] = `${baseUrl}${pathFn(c)}`
  }
  alt['x-default'] = `${baseUrl}${pathFn(countriesConfig[1])}` // UK as default
  return alt
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // === HOMEPAGES ===
  for (const c of countriesConfig) {
    entries.push({
      url: `${baseUrl}${c.prefix}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: hreflangAlternates(cc => cc.prefix),
      },
    })
  }

  // === CATEGORY PAGES (localized slugs) ===
  for (const catKey of categoryKeys) {
    for (const c of countriesConfig) {
      const localSlug = c.catSlugs[catKey]
      entries.push({
        url: `${baseUrl}${c.prefix}/${c.catPath}/${localSlug}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
          languages: hreflangAlternates(cc => `${cc.prefix}/${cc.catPath}/${cc.catSlugs[catKey]}`),
        },
      })
    }
  }

  // === LEGAL PAGES ===
  // About
  entries.push({ url: `${baseUrl}/it/chi-siamo`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 })
  for (const c of countriesConfig.filter(c => c.code !== 'it')) {
    entries.push({ url: `${baseUrl}${c.prefix}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 })
  }

  // Privacy
  entries.push({ url: `${baseUrl}/it/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 })
  for (const c of countriesConfig.filter(c => c.code !== 'it')) {
    entries.push({ url: `${baseUrl}${c.prefix}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 })
  }

  // Terms
  entries.push({ url: `${baseUrl}/it/termini`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 })
  for (const c of countriesConfig.filter(c => c.code !== 'it')) {
    entries.push({ url: `${baseUrl}${c.prefix}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 })
  }

  // Contact
  entries.push({ url: `${baseUrl}/it/contatti`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 })
  for (const c of countriesConfig.filter(c => c.code !== 'it')) {
    entries.push({ url: `${baseUrl}${c.prefix}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 })
  }

  // === MERCHANT PAGES ===
  entries.push({ url: `${baseUrl}/it/negozi`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 })
  for (const c of countriesConfig.filter(c => c.code !== 'it')) {
    entries.push({ url: `${baseUrl}${c.prefix}/merchants`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 })
  }

  return entries
}
