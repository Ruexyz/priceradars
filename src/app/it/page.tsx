import { getDictionary } from '@/lib/i18n'
import { HomePage } from '@/components/pages/home-page'
import { WebsiteJsonLd, OrganizationJsonLd } from '@/components/seo/json-ld'

export default async function ItalianHomePage() {
  const dictionary = await getDictionary('it')

  return (
    <>
      <WebsiteJsonLd
        name="PriceRadars"
        url="https://priceradars.com/it"
        searchUrl="https://priceradars.com/it/cerca"
      />
      <OrganizationJsonLd
        name="PriceRadars"
        url="https://priceradars.com"
        contactEmail="support@priceradars.com"
      />
      <HomePage
        locale="it"
        country="it"
        dictionary={dictionary}
      />
    </>
  )
}
