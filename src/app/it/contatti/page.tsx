import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta PriceRadars per assistenza, domande o feedback. Siamo qui per aiutarti.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Contatti</h1>
      <p className="mt-4 text-gray-600">
        Hai domande, suggerimenti o bisogno di assistenza? Contattaci tramite uno dei canali qui sotto.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <h2 className="font-semibold text-gray-900">Email</h2>
            <a href="mailto:support@priceradars.com" className="mt-1 text-sm text-orange-600 hover:underline">
              support@priceradars.com
            </a>
            <p className="mt-1 text-xs text-gray-500">Rispondiamo entro 24 ore lavorative</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <h2 className="font-semibold text-gray-900">Sede</h2>
            <p className="mt-1 text-sm text-gray-600">
              PriceRadars.com<br />
              Company Register: 03984661201
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-5">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <h2 className="font-semibold text-gray-900">Orari supporto</h2>
            <p className="mt-1 text-sm text-gray-600">
              Lunedì – Venerdì: 9:00 – 18:00 CET<br />
              Sabato e Domenica: chiuso
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-gray-100 bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Informazioni importanti</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          PriceRadars è un servizio di confronto prezzi. Non vendiamo prodotti direttamente e non processiamo pagamenti.
          Per domande relative a ordini, spedizioni o resi, contatta direttamente il negozio presso il quale hai effettuato l'acquisto.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Per segnalazioni di prezzi errati o problemi tecnici sul sito, scrivi a{' '}
          <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>.
        </p>
      </div>
    </div>
  )
}
