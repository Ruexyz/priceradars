import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { countries, type CountryCode } from '@/lib/countries'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return validCountries.map((country) => ({ country }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const countryConfig = countries[country as CountryCode]

  if (!countryConfig) {
    return {}
  }

  return {
    title: {
      default: `PriceRadars ${countryConfig.name} - Compare Prices Online`,
      template: `%s | PriceRadars ${countryConfig.name}`,
    },
    description: `Find the lowest prices for electronics, appliances, and more. Compare prices from 50+ online stores in ${countryConfig.name}.`,
  }
}

export default async function EnglishCountryLayout({
  children,
  params,
}: LayoutProps) {
  const { country } = await params

  if (!validCountries.includes(country)) {
    notFound()
  }

  const dictionary = await getDictionary('en')

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        locale="en"
        country={country as CountryCode}
        dictionary={dictionary.header}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale="en"
        country={country as CountryCode}
        dictionary={dictionary.footer}
      />
    </div>
  )
}
