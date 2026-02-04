import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['it', 'en']
const countries = ['it', 'uk', 'us', 'de', 'fr', 'es']
const englishCountries = ['uk', 'us', 'de', 'fr', 'es']

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

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split('/')
  if (segments[1] === 'it') return 'it'
  if (segments[1] === 'en') return 'en'
  return null
}

function detectCountry(request: NextRequest): string {
  // 1. Try Cloudflare geolocation header (production)
  const cfCountry = request.headers.get('cf-ipcountry')?.toLowerCase()
  if (cfCountry && countries.includes(cfCountry)) {
    return cfCountry
  }

  // 2. Try Vercel geolocation header
  const vercelCountry = request.headers.get('x-vercel-ip-country')?.toLowerCase()
  if (vercelCountry && countries.includes(vercelCountry)) {
    return vercelCountry
  }

  // 3. Fallback to Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
    
    for (const lang of languages) {
      if (languageToCountry[lang]) {
        return languageToCountry[lang]
      }
      // Try just the language code (e.g., 'it' from 'it-IT')
      const shortLang = lang.split('-')[0]
      if (languageToCountry[shortLang]) {
        return languageToCountry[shortLang]
      }
    }
  }

  // 4. Default to UK
  return 'uk'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes, static files, and special paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/llms')
  ) {
    return NextResponse.next()
  }

  // Check if path already has locale
  const locale = getLocaleFromPath(pathname)
  if (locale) {
    // For /en/ paths, check if country is specified
    if (locale === 'en') {
      const segments = pathname.split('/')
      const potentialCountry = segments[2]
      
      // If no country after /en/, redirect to detected country
      if (!potentialCountry || !englishCountries.includes(potentialCountry)) {
        const detectedCountry = detectCountry(request)
        const targetCountry = detectedCountry === 'it' ? 'uk' : detectedCountry
        const newPath = pathname.replace(/^\/en\/?/, `/en/${targetCountry}/`)
        return NextResponse.redirect(new URL(newPath, request.url))
      }
    }
    return NextResponse.next()
  }

  // No locale in path, redirect based on geolocation
  const detectedCountry = detectCountry(request)
  
  let redirectPath: string
  
  if (detectedCountry === 'it') {
    redirectPath = `/it${pathname === '/' ? '' : pathname}`
  } else {
    redirectPath = `/en/${detectedCountry}${pathname === '/' ? '' : pathname}`
  }

  return NextResponse.redirect(new URL(redirectPath, request.url))
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
