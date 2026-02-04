import type { Locale } from './config'

// Import the dictionary type from the JSON structure
import itDictionary from './dictionaries/it.json'

export type Dictionary = typeof itDictionary

const dictionaries = {
  it: () => import('./dictionaries/it.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
