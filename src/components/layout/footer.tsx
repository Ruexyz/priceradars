import Link from 'next/link'
import { Bot } from 'lucide-react'
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
    { slug: 'smartphones', slugIt: 'smartphone', labelEn: 'Smartphones', labelIt: 'Smartphone' },
    { slug: 'laptops', slugIt: 'laptop', labelEn: 'Laptops', labelIt: 'Laptop' },
    { slug: 'tv-audio', slugIt: 'tv-audio', labelEn: 'TV & Audio', labelIt: 'TV & Audio' },
    { slug: 'appliances', slugIt: 'elettrodomestici', labelEn: 'Appliances', labelIt: 'Elettrodomestici' },
    { slug: 'gaming', slugIt: 'gaming', labelEn: 'Gaming', labelIt: 'Gaming' },
    { slug: 'cameras', slugIt: 'fotocamere', labelEn: 'Cameras', labelIt: 'Fotocamere' },
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
                    href={`${baseUrl}/${categoryPath}/${locale === 'it' ? category.slugIt : category.slug}`}
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

          {/* For AI/LLMs */}
          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
              <Bot className="h-4 w-4" />
              {locale === 'it' ? 'Per AI & LLM' : 'For AI & LLMs'}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/llms.txt"
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  llms.txt
                </a>
              </li>
              <li>
                <a
                  href="/llms-full.txt"
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  {locale === 'it' ? 'Documentazione completa' : 'Full Documentation'}
                </a>
              </li>
              <li>
                <a
                  href="/api/llms"
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  JSON API
                </a>
              </li>
              <li>
                <a
                  href="/llms-sitemap.txt"
                  className="text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:text-orange-500"
                >
                  {locale === 'it' ? 'Sitemap LLM' : 'LLM Sitemap'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Section - Full width below */}
        <div className="mt-8 flex flex-col items-center justify-center border-t border-gray-200 pt-8 md:flex-row md:justify-between">
          <Link 
            href={baseUrl} 
            className="flex items-center gap-2 transition-opacity duration-300 ease-in-out hover:opacity-80"
          >
            <Logo size={22} />
            <span className="text-lg font-bold text-gray-900">
              Price<span className="text-orange-500">Radars</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-gray-600 md:mt-0 md:max-w-xs md:text-right">
            {locale === 'it'
              ? 'Il miglior comparatore di prezzi per trovare le offerte online.'
              : 'The best price comparison engine to find deals online.'}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} PriceRadars. {dictionary.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
