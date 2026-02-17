import { Metadata } from 'next'
import { Mail, MapPin, Clock } from 'lucide-react'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact PriceRadars for support, questions, or feedback.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
      <p className="mt-4 text-gray-600">
        Have questions, suggestions, or need help? Reach out to us through one of the channels below.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <h2 className="font-semibold text-gray-900">Email</h2>
            <a href="mailto:support@priceradars.com" className="mt-1 text-sm text-orange-600 hover:underline">
              support@priceradars.com
            </a>
            <p className="mt-1 text-xs text-gray-500">We respond within 24 business hours</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <h2 className="font-semibold text-gray-900">Office</h2>
            <p className="mt-1 text-sm text-gray-600">
              PriceRadars.com<br />
              Company Register: 03984661201
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <h2 className="font-semibold text-gray-900">Support Hours</h2>
            <p className="mt-1 text-sm text-gray-600">
              Monday – Friday: 9:00 AM – 6:00 PM CET<br />
              Saturday & Sunday: closed
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-gray-100 bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Important Information</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          PriceRadars is a price comparison service. We do not sell products directly and do not process payments.
          For questions about orders, shipping, or returns, please contact the store where you made your purchase.
        </p>
      </div>
    </div>
  )
}
