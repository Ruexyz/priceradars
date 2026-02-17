import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termini di Servizio',
  description: 'Termini e condizioni di utilizzo del servizio di confronto prezzi PriceRadars.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Termini e Condizioni di Utilizzo</h1>
      <p className="mt-2 text-sm text-gray-500">Ultimo aggiornamento: 11 febbraio 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">

        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Oggetto del servizio</h2>
          <p className="mt-2">
            PriceRadars (di seguito "il Servizio") è un servizio di confronto prezzi online che permette
            agli utenti di cercare prodotti e confrontare le offerte pubblicate da negozi online terzi.
            Il Servizio non vende prodotti, non gestisce ordini e non processa pagamenti.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Accesso e utilizzo</h2>
          <p className="mt-2">
            L'accesso al Servizio è gratuito e non richiede registrazione. Utilizzando il Servizio,
            l'utente accetta i presenti termini. L'utente si impegna a utilizzare il Servizio
            esclusivamente per finalità lecite e conformi alla normativa vigente. È vietato l'uso
            automatizzato del Servizio (scraping, bot) senza autorizzazione scritta.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Informazioni sui prezzi</h2>
          <p className="mt-2">
            I prezzi e le informazioni sulle offerte mostrate nel Servizio sono forniti da fonti terze
            (negozi online e aggregatori di dati) e vengono aggiornati periodicamente. Nonostante
            l'impegno per garantire l'accuratezza dei dati, PriceRadars non garantisce che i prezzi
            mostrati corrispondano esattamente al prezzo applicato dal venditore al momento dell'acquisto.
          </p>
          <p className="mt-2">
            L'utente è tenuto a verificare il prezzo finale, le condizioni di vendita e la disponibilità
            del prodotto direttamente sul sito del venditore prima di completare l'acquisto.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Reindirizzamento a siti terzi</h2>
          <p className="mt-2">
            Cliccando su un'offerta, l'utente viene reindirizzato al sito web del venditore.
            L'eventuale rapporto contrattuale di acquisto si instaura esclusivamente tra l'utente
            e il venditore. PriceRadars non è parte di tale rapporto e non è responsabile per:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Prezzo finale, disponibilità e caratteristiche del prodotto.</li>
            <li>Spedizione, consegna e tempi di recapito.</li>
            <li>Politiche di reso, rimborso e garanzia del venditore.</li>
            <li>Servizio clienti e assistenza post-vendita.</li>
            <li>Trattamento dei dati personali da parte del venditore.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Affiliazione commerciale</h2>
          <p className="mt-2">
            PriceRadars partecipa a programmi di affiliazione con alcuni venditori presenti sul sito.
            Quando un utente effettua un acquisto dopo essere stato reindirizzato tramite il Servizio,
            PriceRadars può ricevere una commissione dal venditore. Tale commissione non comporta
            costi aggiuntivi per l'utente e non influenza l'ordine di presentazione delle offerte,
            che è determinato da criteri oggettivi (prezzo, rilevanza, disponibilità).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Limitazione di responsabilità</h2>
          <p className="mt-2">
            Il Servizio è fornito "così com'è" (as is) e "come disponibile" (as available).
            PriceRadars non rilascia garanzie di alcun tipo, esplicite o implicite, riguardo alla
            completezza, accuratezza, affidabilità, idoneità o disponibilità del Servizio o delle
            informazioni in esso contenute.
          </p>
          <p className="mt-2">
            Nei limiti consentiti dalla legge, PriceRadars non sarà responsabile per danni diretti,
            indiretti, incidentali, consequenziali o punitivi derivanti dall'utilizzo o
            dall'impossibilità di utilizzo del Servizio, o dall'acquisto di prodotti tramite
            link presenti sul sito.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Proprietà intellettuale</h2>
          <p className="mt-2">
            Il design, il logo, il codice sorgente e i contenuti originali del Servizio sono di
            proprietà del gestore del Servizio e sono protetti dalla normativa sul diritto d'autore.
            Le immagini, i nomi e le descrizioni dei prodotti sono di proprietà dei rispettivi
            titolari e vengono utilizzati esclusivamente a scopo informativo per il confronto prezzi.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Disponibilità del servizio</h2>
          <p className="mt-2">
            PriceRadars si riserva il diritto di modificare, sospendere o interrompere il Servizio
            in qualsiasi momento, senza preavviso, per motivi tecnici, di manutenzione o di altro tipo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Modifiche ai termini</h2>
          <p className="mt-2">
            I presenti termini possono essere aggiornati periodicamente. Le modifiche entrano in vigore
            dalla data di pubblicazione su questa pagina. L'uso continuato del Servizio dopo la
            pubblicazione delle modifiche costituisce accettazione dei nuovi termini.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">10. Legge applicabile e foro competente</h2>
          <p className="mt-2">
            I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia
            derivante dall'interpretazione o dall'esecuzione dei presenti termini, sarà competente
            il foro del luogo di residenza o domicilio del consumatore, se situato nel territorio
            italiano, ai sensi dell'art. 66-bis del Codice del Consumo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">11. Contatti</h2>
          <p className="mt-2">
            Per domande relative ai presenti termini:{' '}
            <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
          </p>
        </section>

      </div>
    </div>
  )
}
