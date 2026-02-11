import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { countries, getNativeLocale, type CountryCode } from '@/lib/countries'
import type { Locale } from '@/lib/i18n/config'
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
  if (!countryConfig) return {}

  // Use native locale for SEO metadata
  const nativeLocale = getNativeLocale(country) as Locale
  const dictionary = await getDictionary(nativeLocale)

  return {
    title: {
      default: dictionary.seo.homeTitle,
      template: `%s | PriceRadars ${countryConfig.name}`,
    },
    description: dictionary.seo.homeDescription,
  }
}

export default async function CountryLayout({
  children,
  params,
}: LayoutProps) {
  const { country } = await params

  if (!validCountries.includes(country)) {
    notFound()
  }

  // Use native locale for UI (de for Germany, fr for France, es for Spain)
  const nativeLocale = getNativeLocale(country) as Locale
  const dictionary = await getDictionary(nativeLocale)

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        locale={nativeLocale}
        country={country as CountryCode}
        dictionary={dictionary.header}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale={nativeLocale}
        country={country as CountryCode}
        dictionary={dictionary.footer}
      />
    </div>
  )
}
