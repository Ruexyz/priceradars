import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n'
import { countries, type CountryCode } from '@/lib/countries'
import { HomePage } from '@/components/pages/home-page'

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
    <HomePage
      locale="en"
      country={country as CountryCode}
      dictionary={dictionary}
    />
  )
}
