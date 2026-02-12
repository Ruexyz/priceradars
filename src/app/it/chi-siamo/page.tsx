import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'Scopri PriceRadars: il comparatore di prezzi che ti aiuta a trovare le migliori offerte online.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Chi Siamo</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong>PriceRadars</strong> è un servizio di confronto prezzi online che aiuta i consumatori a trovare le migliori offerte
          per elettronica, elettrodomestici, gaming e molto altro. Confrontiamo i prezzi dai principali negozi online
          per garantirti il miglior affare disponibile.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">La nostra missione</h2>
        <p>
          Crediamo che ogni consumatore meriti di accedere facilmente al miglior prezzo disponibile.
          Il nostro motore di confronto analizza continuamente le offerte dei principali rivenditori online,
          permettendoti di risparmiare tempo e denaro su ogni acquisto.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Come funziona</h2>
        <p>
          PriceRadars aggrega le offerte da centinaia di negozi online in Italia, Regno Unito, Stati Uniti,
          Germania, Francia e Spagna. I prezzi vengono aggiornati regolarmente per garantire la massima accuratezza.
          Quando trovi l'offerta giusta, ti reindirizziamo direttamente al negozio dove puoi completare l'acquisto
          in tutta sicurezza.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Il nostro impegno</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Indipendenza:</strong> Non favoriamo nessun negozio. Mostriamo il prezzo reale.</li>
          <li><strong>Gratuità:</strong> Il servizio è completamente gratuito per gli utenti.</li>
          <li><strong>Trasparenza:</strong> Indichiamo sempre il venditore e il prezzo aggiornato.</li>
          <li><strong>Privacy:</strong> Non richiediamo registrazione e rispettiamo la tua privacy.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Contatti</h2>
        <p>
          PriceRadars è un servizio di Rue Srl.<br />
          Per domande o assistenza: <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
        </p>
      </div>
    </div>
  )
}
