/**
 * Accessibility utilities
 * Helpers for maintaining WCAG 2.1 AA compliance
 */

/**
 * Generate unique IDs for form elements
 */
let idCounter = 0
export function generateId(prefix: string = 'pr'): string {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

/**
 * Trap focus within an element (for modals, dialogs)
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable?.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable?.focus()
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown)
  firstFocusable?.focus()

  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Format price for screen readers
 */
export function formatPriceForScreenReader(
  price: number,
  currency: string,
  locale: string
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })
  return formatter.format(price / 100)
}

/**
 * Generate aria-label for product card
 */
export function getProductCardAriaLabel(product: {
  name: string
  brand: string
  price: number
  currency: string
  offerCount: number
}, locale: string): string {
  const priceText = formatPriceForScreenReader(product.price, product.currency, locale)
  const storeText = product.offerCount === 1 ? 'store' : 'stores'
  
  return `${product.name} by ${product.brand}. From ${priceText}. Available at ${product.offerCount} ${storeText}.`
}

/**
 * Skip link target IDs
 */
export const skipLinkTargets = {
  main: 'main-content',
  navigation: 'main-navigation',
  search: 'search-input',
  footer: 'footer',
} as const
