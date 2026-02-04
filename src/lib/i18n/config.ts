export const locales = ['it', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
