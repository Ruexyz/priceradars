import type { Locale } from './config'

// Import the dictionary type from the JSON structure
import itDictionary from './dictionaries/it.json'

export type Dictionary = typeof itDictionary

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  it: () => import('./dictionaries/it.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] || dictionaries.en
  return loader()
}
