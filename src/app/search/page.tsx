import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const runtime = 'edge'

const languageToCountry: Record<string, string> = {
  'it': 'it',
  'de': 'de',
  'fr': 'fr',
  'es': 'es',
  'en': 'uk',
}

export default async function SearchRedirect({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const search = await searchParams
  const query = search.q || ''
  
  // Detect country from headers
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const lang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase() || 'en'
  const country = languageToCountry[lang] || 'uk'
  
  // Redirect to localized search
  if (country === 'it') {
    redirect(`/it/cerca?q=${encodeURIComponent(query)}`)
  } else {
    redirect(`/en/${country}/search?q=${encodeURIComponent(query)}`)
  }
}
