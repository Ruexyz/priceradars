import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sulla privacy di PriceRadars ai sensi del Regolamento UE 2016/679 (GDPR).',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Informativa sulla Privacy</h1>
      <p className="mt-2 text-sm text-gray-500">Ultimo aggiornamento: 11 febbraio 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">

        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Titolare del trattamento</h2>
          <p className="mt-2">
            Il titolare del trattamento dei dati personali è il soggetto giuridico che gestisce il sito web
            priceradars.com (di seguito "il Servizio"), raggiungibile all'indirizzo email{' '}
            <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Tipologie di dati raccolti</h2>

          <h3 className="mt-3 font-medium text-gray-800">2.1 Dati di navigazione</h3>
          <p className="mt-1">
            I sistemi informatici preposti al funzionamento del Servizio acquisiscono, nel corso del loro
            normale esercizio, alcuni dati la cui trasmissione è implicita nell'uso dei protocolli di
            comunicazione Internet. Si tratta di: indirizzo IP, tipo e versione del browser, sistema operativo,
            URL di provenienza, pagine visitate, data e ora della richiesta. Questi dati sono utilizzati
            esclusivamente per ricavare informazioni statistiche anonime sull'uso del Servizio e per controllarne
            il corretto funzionamento.
          </p>

          <h3 className="mt-3 font-medium text-gray-800">2.2 Cookie tecnici</h3>
          <p className="mt-1">
            Il Servizio utilizza esclusivamente cookie tecnici necessari al funzionamento (es. preferenze
            di lingua e paese). Non vengono utilizzati cookie di profilazione o di terze parti a fini
            pubblicitari. I cookie tecnici non richiedono il consenso dell'utente ai sensi dell'art. 122
            del Codice Privacy.
          </p>

          <h3 className="mt-3 font-medium text-gray-800">2.3 Dati forniti volontariamente</h3>
          <p className="mt-1">
            L'eventuale invio di email all'indirizzo di contatto comporta l'acquisizione dell'indirizzo
            email del mittente, necessario per rispondere alla richiesta. Se in futuro venisse attivata la
            funzionalità di avviso prezzo, l'indirizzo email fornito dall'utente verrà trattato esclusivamente
            per l'invio delle notifiche richieste.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Finalità del trattamento</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Erogazione del servizio di confronto prezzi.</li>
            <li>Gestione delle richieste di contatto.</li>
            <li>Analisi statistiche aggregate e anonime per il miglioramento del Servizio.</li>
            <li>Adempimento di obblighi previsti dalla legge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Base giuridica del trattamento</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li><strong>Dati di navigazione e cookie tecnici:</strong> legittimo interesse del titolare al funzionamento e alla sicurezza del Servizio (art. 6, par. 1, lett. f, GDPR).</li>
            <li><strong>Email di contatto:</strong> esecuzione di misure precontrattuali su richiesta dell'interessato (art. 6, par. 1, lett. b, GDPR).</li>
            <li><strong>Avvisi prezzo:</strong> consenso dell'utente (art. 6, par. 1, lett. a, GDPR), revocabile in qualsiasi momento.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Destinatari dei dati</h2>
          <p className="mt-2">
            I dati personali non vengono venduti, ceduti o comunicati a terzi per finalità commerciali.
            I dati possono essere trattati da:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Fornitori di servizi di hosting e infrastruttura tecnica, in qualità di responsabili del trattamento.</li>
            <li>Autorità competenti, nei casi previsti dalla legge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Trasferimento dei dati</h2>
          <p className="mt-2">
            Il Servizio è ospitato su infrastruttura Cloudflare, con server distribuiti globalmente.
            Eventuali trasferimenti di dati verso paesi terzi avvengono sulla base delle clausole
            contrattuali standard approvate dalla Commissione Europea o di altre garanzie adeguate
            previste dal GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Periodo di conservazione</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>I dati di navigazione vengono cancellati dopo l'elaborazione statistica e comunque entro 12 mesi.</li>
            <li>I dati di contatto vengono conservati per il tempo necessario a gestire la richiesta.</li>
            <li>Gli indirizzi email per avvisi prezzo vengono conservati fino alla revoca del consenso.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Diritti dell'interessato</h2>
          <p className="mt-2">
            Ai sensi degli articoli 15-22 del GDPR, l'interessato ha diritto di:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Accedere ai propri dati personali e ottenerne copia.</li>
            <li>Richiederne la rettifica o l'aggiornamento.</li>
            <li>Richiederne la cancellazione ("diritto all'oblio") nei casi previsti.</li>
            <li>Limitarne il trattamento.</li>
            <li>Opporsi al trattamento basato sul legittimo interesse.</li>
            <li>Richiedere la portabilità dei dati.</li>
            <li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prestato prima della revoca.</li>
            <li>Proporre reclamo all'autorità di controllo competente (Garante per la protezione dei dati personali).</li>
          </ul>
          <p className="mt-2">
            Per esercitare tali diritti:{' '}
            <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Siti esterni</h2>
          <p className="mt-2">
            Il Servizio contiene link verso siti web di venditori terzi. Cliccando su un'offerta, l'utente
            viene reindirizzato al sito del venditore. PriceRadars non è responsabile del trattamento dei
            dati personali effettuato da tali siti, le cui rispettive informative sulla privacy sono consultabili
            direttamente sui siti dei venditori.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">10. Modifiche alla presente informativa</h2>
          <p className="mt-2">
            La presente informativa può essere soggetta a modifiche. Eventuali aggiornamenti saranno
            pubblicati su questa pagina con indicazione della data di ultimo aggiornamento.
          </p>
        </section>

      </div>
    </div>
  )
}
