import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  amount: number,
  currency: string,
  locale: string
): string {
  return new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100)
}

export function formatNumber(num: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB').format(num)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function generateProductUrl(
  slug: string,
  locale: string,
  country?: string
): string {
  if (locale === 'it') {
    return `/it/prodotto/${slug}`
  }
  return `/en/${country || 'uk'}/product/${slug}`
}

export function generateCategoryUrl(
  slug: string,
  locale: string,
  country?: string
): string {
  if (locale === 'it') {
    return `/it/categoria/${slug}`
  }
  return `/en/${country || 'uk'}/category/${slug}`
}

export function getCountryFromPath(pathname: string): string {
  const match = pathname.match(/^\/en\/([a-z]{2})\//)
  return match ? match[1] : 'uk'
}

export function getLocaleFromPath(pathname: string): string {
  if (pathname.startsWith('/it')) return 'it'
  return 'en'
}
