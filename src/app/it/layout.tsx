import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: {
    default: 'PriceRadars Italia - Confronta Prezzi Online',
    template: '%s | PriceRadars Italia',
  },
  description:
    'Trova il prezzo più basso per elettronica, elettrodomestici e altro. Confronta prezzi dai principali negozi online italiani.',
}

export default async function ItalianLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dictionary = await getDictionary('it')

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        locale="it"
        country="it"
        dictionary={dictionary.header}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale="it"
        country="it"
        dictionary={dictionary.footer}
      />
    </div>
  )
}
