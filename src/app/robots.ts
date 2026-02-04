import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://priceradars.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/search?*sort=',
          '/cerca?*sort=',
          '/*?affiliate=',
          '/_next/',
        ],
      },
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
