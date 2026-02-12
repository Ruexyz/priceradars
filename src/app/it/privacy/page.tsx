import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sulla privacy di PriceRadars. Come raccogliamo, utilizziamo e proteggiamo i tuoi dati.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Ultimo aggiornamento: Febbraio 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Titolare del trattamento</h2>
          <p className="mt-2">
            Il titolare del trattamento dei dati è <strong>Rue Srl</strong>, con sede in Italia,
            raggiungibile all'indirizzo email <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Dati raccolti</h2>
          <p className="mt-2">PriceRadars raccoglie le seguenti tipologie di dati:</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, orario di accesso. Questi dati vengono raccolti automaticamente tramite i sistemi informatici del sito.</li>
            <li><strong>Cookie tecnici:</strong> necessari al funzionamento del sito (preferenze lingua/paese).</li>
            <li><strong>Dati forniti volontariamente:</strong> indirizzo email, se fornito per gli avvisi di prezzo.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Finalità del trattamento</h2>
          <p className="mt-2">I dati personali sono trattati per le seguenti finalità:</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Erogazione del servizio di confronto prezzi.</li>
            <li>Invio di notifiche di avviso prezzo (se richiesto dall'utente).</li>
            <li>Analisi statistiche anonime per migliorare il servizio.</li>
            <li>Adempimento di obblighi di legge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Base giuridica</h2>
          <p className="mt-2">
            Il trattamento dei dati di navigazione è basato sul legittimo interesse del titolare.
            Il trattamento dell'indirizzo email per gli avvisi è basato sul consenso dell'utente.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Condivisione dei dati</h2>
          <p className="mt-2">
            PriceRadars non vende né condivide i dati personali degli utenti con terze parti a fini commerciali.
            I dati possono essere condivisi con:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Fornitori di servizi tecnici (hosting, analytics) vincolati da accordi di riservatezza.</li>
            <li>Autorità competenti, se richiesto dalla legge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Cookie</h2>
          <p className="mt-2">
            Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento.
            Non utilizziamo cookie di profilazione. I cookie tecnici non richiedono il consenso dell'utente.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Conservazione dei dati</h2>
          <p className="mt-2">
            I dati di navigazione vengono conservati per un massimo di 12 mesi.
            Gli indirizzi email per gli avvisi di prezzo vengono conservati fino alla cancellazione da parte dell'utente.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Diritti dell'utente</h2>
          <p className="mt-2">
            In conformità al GDPR (Regolamento UE 2016/679), l'utente ha diritto di:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Accedere ai propri dati personali.</li>
            <li>Richiederne la rettifica o la cancellazione.</li>
            <li>Opporsi al trattamento.</li>
            <li>Richiedere la portabilità dei dati.</li>
            <li>Revocare il consenso in qualsiasi momento.</li>
          </ul>
          <p className="mt-2">
            Per esercitare questi diritti, contattare: <a href="mailto:support@priceradars.com" className="text-orange-600 hover:underline">support@priceradars.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Reindirizzamento a siti esterni</h2>
          <p className="mt-2">
            Quando clicchi su un'offerta, verrai reindirizzato al sito del venditore. PriceRadars non è responsabile
            delle politiche sulla privacy di tali siti. Ti consigliamo di leggere le rispettive informative.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">10. Modifiche</h2>
          <p className="mt-2">
            Questa informativa può essere aggiornata periodicamente. La data dell'ultimo aggiornamento è indicata in cima alla pagina.
          </p>
        </section>
      </div>
    </div>
  )
}
