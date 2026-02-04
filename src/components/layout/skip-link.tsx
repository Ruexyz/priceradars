'use client'

import { cn } from '@/lib/utils'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]',
        'bg-orange-500 text-white px-4 py-2 rounded-lg font-medium',
        'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      {children}
    </a>
  )
}

export function SkipLinks({ locale }: { locale: 'it' | 'en' }) {
  const labels = {
    it: {
      main: 'Vai al contenuto principale',
      search: 'Vai alla ricerca',
      navigation: 'Vai alla navigazione',
    },
    en: {
      main: 'Skip to main content',
      search: 'Skip to search',
      navigation: 'Skip to navigation',
    },
  }

  const t = labels[locale]

  return (
    <div className="skip-links">
      <SkipLink href="#main-content">{t.main}</SkipLink>
      <SkipLink href="#search-input">{t.search}</SkipLink>
      <SkipLink href="#main-navigation">{t.navigation}</SkipLink>
    </div>
  )
}
