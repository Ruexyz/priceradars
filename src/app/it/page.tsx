import { getDictionary } from '@/lib/i18n'
import { HomePage } from '@/components/pages/home-page'

export default async function ItalianHomePage() {
  const dictionary = await getDictionary('it')

  return (
    <HomePage
      locale="it"
      country="it"
      dictionary={dictionary}
    />
  )
}
