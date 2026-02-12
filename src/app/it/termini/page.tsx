import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termini di Servizio',
  description: 'Termini e condizioni di utilizzo del servizio PriceRadars.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Termini di Servizio</h1>
      <p className="mt-2 text-sm text-gray-500">Ultimo aggiornamento: Febbraio 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Descrizione del servizio</h2>
          <p className="mt-2">
            PriceRadars è un servizio di confronto prezzi online gestito da <strong>Rue Srl</strong>.
            Il servizio consente agli utenti di cercare prodotti e confrontare i prezzi offerti da diversi negozi online.
            PriceRadars non vende prodotti direttamente e non gestisce transazioni commerciali.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Utilizzo del servizio</h2>
          <p className="mt-2">
            L'accesso al servizio è gratuito e non richiede registrazione.
            Utilizzando PriceRadars, l'utente accetta i presenti termini di servizio.
            L'utente si impegna a utilizzare il servizio in modo lecito e conforme alla normativa vigente.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Natura del confronto prezzi</h2>
          <p className="mt-2">
            PriceRadars confronta i prezzi pubblicati dai negozi online partner. I prezzi mostrati sono forniti
            da fonti terze e vengono aggiornati regolarmente, ma potrebbero non riflettere il prezzo esatto
            al momento dell'acquisto. Raccomandiamo di verificare sempre il prezzo finale sul sito del venditore
            prima di completare l'acquisto.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Reindirizzamento a siti terzi</h2>
          <p className="mt-2">
            Cliccando su un'offerta, l'utente viene reindirizzato al sito web del venditore.
            L'acquisto avviene direttamente sul sito del venditore, che è responsabile di:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Prezzo e disponibilità del prodotto.</li>
            <li>Spedizione e consegna.</li>
            <li>Resi e rimborsi.</li>
            <li>Garanzia del prodotto.</li>
            <li>Assistenza post-vendita.</li>
          </ul>
          <p className="mt-2">
            PriceRadars non è responsabile per le condizioni di vendita, i prodotti o i servizi offerti dai venditori terzi.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Limitazione di responsabilità</h2>
          <p className="mt-2">
            PriceRadars fornisce il servizio "così com'è" senza garanzie di alcun tipo.
            Non garantiamo la completezza, l'accuratezza o la tempestività delle informazioni sui prezzi.
            PriceRadars non sarà responsabile per eventuali danni derivanti dall'utilizzo del servizio
            o dall'acquisto di prodotti tramite i link presenti sul sito.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Proprietà intellettuale</h2>
          <p className="mt-2">
            Il design, il codice, il logo e i contenuti originali di PriceRadars sono di proprietà di Rue Srl.
            Le immagini dei prodotti e le descrizioni sono di proprietà dei rispettivi venditori e vengono
            mostrate a scopo informativo per il confronto prezzi.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Affiliazione commerciale</h2>
          <p className="mt-2">
            PriceRadars partecipa a programmi di affiliazione con i negozi online presenti sul sito.
            Quando un utente effettua un acquisto tramite un link presente su PriceRadars, potremmo
            ricevere una commissione dal venditore. Questo non influisce sul prezzo pagato dall'utente
            e non condiziona l'ordine di presentazione delle offerte.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Modifiche ai termini</h2>
          <p className="mt-2">
            Ci riserviamo il diritto di modificare i presenti termini in qualsiasi momento.
            Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
            L'uso continuato del servizio dopo le modifiche implica l'accettazione dei nuovi termini.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Legge applicabile</h2>
          <p className="mt-2">
            I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente
            il foro del luogo di sede legale di Rue Srl.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">10. Contatti</h2>
          <p className="mt-2">
            Per domande relative ai presenti termini, contattare:{' '}
            <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}
