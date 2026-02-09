import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { countries, type CountryCode } from '@/lib/countries'
import { HomePage } from '@/components/pages/home-page'
import { WebsiteJsonLd, OrganizationJsonLd } from '@/components/seo/json-ld'

const validCountries = ['uk', 'us', 'de', 'fr', 'es']

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return validCountries.map((country) => ({ country }))
}

export default async function EnglishCountryHomePage({ params }: PageProps) {
  const { country } = await params

  if (!validCountries.includes(country)) {
    notFound()
  }

  const dictionary = await getDictionary('en')

  return (
    <>
      <WebsiteJsonLd
        name="PriceRadars"
        url={`https://priceradars.com/en/${country}`}
        searchUrl={`https://priceradars.com/en/${country}/search`}
      />
      <OrganizationJsonLd
        name="PriceRadars"
        url="https://priceradars.com"
        contactEmail="support@priceradars.com"
      />
      <HomePage
        locale="en"
        country={country as CountryCode}
        dictionary={dictionary}
      />
    </>
  )
}
