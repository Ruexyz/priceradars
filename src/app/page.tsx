import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { countries, type CountryCode } from '@/lib/countries'

export const runtime = 'edge'

const supportedCountries = ['it', 'uk', 'us', 'de', 'fr', 'es']

// Map language codes to countries
const languageToCountry: Record<string, string> = {
  'it': 'it',
  'it-it': 'it',
  'en-gb': 'uk',
  'en-uk': 'uk',
  'en-us': 'us',
  'en-au': 'uk',
  'en': 'uk',
  'de': 'de',
  'de-de': 'de',
  'de-at': 'de',
  'de-ch': 'de',
  'fr': 'fr',
  'fr-fr': 'fr',
  'fr-be': 'fr',
  'fr-ch': 'fr',
  'es': 'es',
  'es-es': 'es',
  'es-mx': 'us',
}

function detectCountry(headersList: Headers): string {
  // 1. Try Cloudflare geolocation header
  const cfCountry = headersList.get('cf-ipcountry')?.toLowerCase()
  if (cfCountry && supportedCountries.includes(cfCountry)) {
    return cfCountry
  }

  // 2. Try Vercel geolocation header
  const vercelCountry = headersList.get('x-vercel-ip-country')?.toLowerCase()
  if (vercelCountry && supportedCountries.includes(vercelCountry)) {
    return vercelCountry
  }

  // 3. Fallback to Accept-Language header
  const acceptLanguage = headersList.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
    
    for (const lang of languages) {
      if (languageToCountry[lang]) {
        return languageToCountry[lang]
      }
      const shortLang = lang.split('-')[0]
      if (languageToCountry[shortLang]) {
        return languageToCountry[shortLang]
      }
    }
  }

  // 4. Default to UK
  return 'uk'
}

export default async function RootPage() {
  const headersList = await headers()
  
  const detectedCountry = detectCountry(headersList)
  
  // Determine redirect based on detected country
  let targetPath: string
  
  if (detectedCountry === 'it') {
    targetPath = '/it'
  } else if (detectedCountry in countries) {
    const countryConfig = countries[detectedCountry as CountryCode]
    targetPath = `/${countryConfig.urlPrefix}`
  } else {
    targetPath = '/en/uk'
  }
  
  redirect(targetPath)
}
