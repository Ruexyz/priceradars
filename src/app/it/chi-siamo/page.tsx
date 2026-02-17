import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'PriceRadars è un comparatore di prezzi online che aiuta i consumatori a confrontare offerte da centinaia di negozi.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Chi Siamo</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong>PriceRadars</strong> è un servizio di confronto prezzi (Comparison Shopping Service) che opera
          in 6 mercati europei: Italia, Regno Unito, Germania, Francia, Spagna e Stati Uniti.
        </p>

        <p>
          Il nostro servizio aggrega e confronta le offerte pubblicate da centinaia di negozi online verificati,
          permettendo ai consumatori di identificare rapidamente il prezzo più conveniente per il prodotto che cercano.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Cosa facciamo</h2>
        <p>
          PriceRadars raccoglie, normalizza e presenta le offerte di prodotti elettronici, elettrodomestici,
          gaming, fotografia e altre categorie merceologiche. Per ogni prodotto, mostriamo le offerte di più
          venditori, con indicazione del prezzo, disponibilità e link diretto alla pagina di acquisto del venditore.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Come funziona</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>L'utente cerca un prodotto tramite la barra di ricerca o naviga le categorie.</li>
          <li>PriceRadars mostra i risultati con il prezzo più basso, la marca e il numero di offerte disponibili.</li>
          <li>Nella pagina di dettaglio, l'utente visualizza le offerte di tutti i venditori, con possibilità di filtrare e ordinare.</li>
          <li>Cliccando su un'offerta, l'utente viene reindirizzato al sito del venditore per completare l'acquisto.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Modello di business</h2>
        <p>
          PriceRadars è gratuito per i consumatori. Il servizio si sostiene tramite commissioni di affiliazione:
          quando un utente effettua un acquisto dopo essere stato reindirizzato da PriceRadars al sito di un venditore,
          PriceRadars può ricevere una commissione dal venditore. Questo modello non influisce sul prezzo pagato
          dall'utente né sull'ordine di presentazione delle offerte.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Indipendenza</h2>
        <p>
          Le offerte vengono ordinate per prezzo crescente come criterio predefinito. L'utente può modificare
          l'ordinamento per rilevanza, popolarità o prezzo decrescente. Nessun venditore può pagare per ottenere
          un posizionamento privilegiato nei risultati.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Contatti</h2>
        <p>
          Per informazioni, segnalazioni o assistenza:{' '}
          <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
        </p>
        <p>
          <Link href="/it/contatti" className="text-orange-600 hover:underline">Pagina contatti completa →</Link>
        </p>
      </div>
    </div>
  )
}
