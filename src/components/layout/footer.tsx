import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import type { Locale, CountryCode } from '@/lib/countries'

interface FooterProps {
  locale: Locale
  country: CountryCode
  dictionary: {
    about: string
    privacy: string
    terms: string
    contact: string
    allRightsReserved: string
    categories: string
    company: string
    support: string
  }
}

export function Footer({ locale, country, dictionary }: FooterProps) {
  const baseUrl = locale === 'it' ? '/it' : `/en/${country}`
  const categoryPath = locale === 'it' ? 'categoria' : 'category'

  const categories = [
    { slug: 'smartphones', labelEn: 'Smartphones', labelIt: 'Smartphone' },
    { slug: 'laptops', labelEn: 'Laptops', labelIt: 'Laptop' },
    { slug: 'tv-audio', labelEn: 'TV & Audio', labelIt: 'TV & Audio' },
    { slug: 'appliances', labelEn: 'Appliances', labelIt: 'Elettrodomestici' },
    { slug: 'gaming', labelEn: 'Gaming', labelIt: 'Gaming' },
    { slug: 'cameras', labelEn: 'Cameras', labelIt: 'Fotocamere' },
  ]

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {dictionary.categories}
            </h3>
            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`${baseUrl}/${categoryPath}/${category.slug}`}
                    className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                  >
                    {locale === 'it' ? category.labelIt : category.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {dictionary.company}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={`${baseUrl}/about`}
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  {dictionary.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`${baseUrl}/privacy`}
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  {dictionary.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`${baseUrl}/terms`}
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  {dictionary.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {dictionary.support}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={`${baseUrl}/contact`}
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  {dictionary.contact}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@priceradars.com"
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  support@priceradars.com
                </a>
              </li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <Link 
              href={baseUrl} 
              className="flex items-center gap-2 transition-opacity duration-300 ease-in-out hover:opacity-80"
            >
              <Logo size={36} />
              <span className="text-xl font-bold text-gray-900">
                Price<span className="text-orange-500">Radars</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              {locale === 'it'
                ? 'Il miglior comparatore di prezzi per trovare le offerte online.'
                : 'The best price comparison engine to find deals online.'}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} PriceRadars. {dictionary.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
