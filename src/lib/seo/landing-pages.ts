import type { Locale } from '@/lib/i18n/config'
import type { CountryCode } from '@/lib/countries'

export type LandingType = 'brand' | 'best-price' | 'under-x'

export interface LandingPage {
  slug: string
  type: LandingType
  country: CountryCode
  locale: Locale
  /** Search query passed to price-ninja API */
  searchTerm: string
  title: string
  h1: string
  description: string
  keywords: string
  intro: string
  faq: Array<{ question: string; answer: string }>
  /** Category canonical slug for breadcrumb and internal links */
  categorySlug: string
  categoryName: string
  /** Threshold label used in title for under-x type ("300€", "£500", etc.) */
  threshold?: string
  /** Brand name for brand type */
  brandName?: string
}

// ==============================================================
// ITALY – italiano – /it/brand/[slug], /it/miglior-prezzo/[slug], /it/offerte/[slug]
// ==============================================================
const itLandings: LandingPage[] = [
  // --- 5 BRAND ---
  {
    slug: 'apple',
    type: 'brand',
    country: 'it',
    locale: 'it',
    searchTerm: 'apple',
    title: 'Apple - Confronta Prezzi | PriceRadars',
    h1: 'Migliori Prezzi Prodotti Apple in Italia',
    description: 'Confronta i prezzi di iPhone, iPad, MacBook e AirPods su Amazon, MediaWorld, Unieuro e oltre 50 negozi online italiani. Risparmia sugli acquisti Apple.',
    keywords: 'apple prezzi, iphone prezzo, macbook offerte, airpods confronta prezzi, prodotti apple',
    intro: 'PriceRadars monitora i prezzi di tutti i prodotti Apple ogni ora, confrontando le offerte di decine di negozi online italiani. Trova il prezzo più basso su iPhone, iPad, MacBook, AirPods e Apple Watch senza perdere tempo.',
    faq: [
      { question: 'Dove trovo il prezzo più basso su prodotti Apple in Italia?', answer: 'PriceRadars confronta in tempo reale i prezzi di Amazon.it, MediaWorld, Unieuro, ePrice e altri negozi. Il prezzo più basso è sempre evidenziato in cima.' },
      { question: 'I prezzi Apple cambiano spesso?', answer: 'Sì, in occasione di saldi, Black Friday e promozioni stagionali i prezzi possono calare fino al 20-30%. Con PriceRadars puoi impostare un avviso di prezzo per non perdere le offerte.' },
      { question: 'Posso acquistare Apple ricondizionato?', answer: 'Sì, molti negozi offrono prodotti Apple certificati ricondizionati. Su PriceRadars puoi filtrare per condizione del prodotto.' },
    ],
    categorySlug: 'smartphone',
    categoryName: 'Smartphone',
    brandName: 'Apple',
  },
  {
    slug: 'samsung',
    type: 'brand',
    country: 'it',
    locale: 'it',
    searchTerm: 'samsung',
    title: 'Samsung - Confronta Prezzi | PriceRadars',
    h1: 'Migliori Prezzi Prodotti Samsung in Italia',
    description: 'Confronta prezzi di smartphone Samsung Galaxy, TV QLED, tablet e elettrodomestici Samsung su oltre 50 negozi italiani. Trova le migliori offerte Samsung.',
    keywords: 'samsung prezzi, samsung galaxy prezzo, tv samsung offerte, confronta prezzi samsung',
    intro: 'Dalla serie Galaxy agli schermi QLED, PriceRadars confronta ogni giorno i prezzi Samsung sui principali negozi online italiani. Scopri dove conviene acquistare.',
    faq: [
      { question: 'Dove trovo Samsung Galaxy al prezzo più basso?', answer: 'PriceRadars confronta Amazon.it, MediaWorld, Unieuro e altri per trovare il prezzo minimo su ogni modello Samsung.' },
      { question: 'Come faccio a sapere se un Samsung è in offerta?', answer: 'Imposta un avviso di prezzo su qualsiasi prodotto Samsung e riceverai una notifica quando il prezzo scende.' },
    ],
    categorySlug: 'smartphone',
    categoryName: 'Smartphone',
    brandName: 'Samsung',
  },
  {
    slug: 'sony',
    type: 'brand',
    country: 'it',
    locale: 'it',
    searchTerm: 'sony',
    title: 'Sony - Confronta Prezzi | PriceRadars',
    h1: 'Migliori Prezzi Prodotti Sony in Italia',
    description: 'Confronta prezzi TV Sony OLED/BRAVIA, PlayStation, cuffie WH-1000XM e fotocamere Sony Alpha su oltre 50 negozi online italiani.',
    keywords: 'sony prezzi, playstation prezzo, cuffie sony offerte, tv sony confronta prezzi',
    intro: 'TV OLED, cuffie top di gamma, fotocamere Alpha, PlayStation 5: PriceRadars trova il prezzo più basso su tutti i prodotti Sony ogni giorno.',
    faq: [
      { question: 'Dove compro Sony al miglior prezzo?', answer: 'Confrontiamo Amazon.it, MediaWorld, Unieuro e altri. Il prezzo più basso è sempre aggiornato.' },
      { question: 'Le cuffie Sony WH-1000XM5 sono in offerta?', answer: 'Usa la ricerca PriceRadars per confrontare il prezzo attuale delle WH-1000XM5 su tutti i negozi italiani.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    brandName: 'Sony',
  },
  {
    slug: 'lg',
    type: 'brand',
    country: 'it',
    locale: 'it',
    searchTerm: 'lg',
    title: 'LG - Confronta Prezzi | PriceRadars',
    h1: 'Migliori Prezzi Prodotti LG in Italia',
    description: 'Confronta prezzi TV LG OLED, lavatrici, frigoriferi e monitor LG su oltre 50 negozi online italiani. Trova le migliori offerte LG.',
    keywords: 'lg prezzi, tv lg oled offerte, lavatrice lg confronta prezzi, monitor lg',
    intro: 'Da TV OLED a lavatrici e frigoriferi, PriceRadars monitora i prezzi LG ogni ora su decine di negozi. Risparmia su ogni prodotto LG.',
    faq: [
      { question: 'Dove trovo TV LG OLED al prezzo più basso?', answer: 'PriceRadars confronta Amazon.it, MediaWorld, Unieuro e altri per ogni modello LG OLED.' },
      { question: 'Conviene comprare elettrodomestici LG online?', answer: 'Sì, i prezzi online sono spesso più bassi dei negozi fisici. Confrontali su PriceRadars.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    brandName: 'LG',
  },
  {
    slug: 'dyson',
    type: 'brand',
    country: 'it',
    locale: 'it',
    searchTerm: 'dyson',
    title: 'Dyson - Confronta Prezzi | PriceRadars',
    h1: 'Migliori Prezzi Dyson in Italia',
    description: 'Confronta prezzi aspirapolvere Dyson V-series, purificatori e asciugacapelli Dyson su oltre 50 negozi online italiani. Trova le migliori offerte Dyson.',
    keywords: 'dyson prezzi, dyson v15 offerte, aspirapolvere dyson confronta prezzi, purificatore dyson',
    intro: 'Dyson è tra i brand più cercati per il prezzo elevato. PriceRadars confronta ogni giorno le offerte Dyson per trovare lo sconto più conveniente in Italia.',
    faq: [
      { question: 'Dove compro Dyson V15 al miglior prezzo?', answer: 'PriceRadars confronta Amazon.it, MediaWorld, Unieuro e altri negozi autorizzati Dyson ogni ora.' },
    ],
    categorySlug: 'elettrodomestici',
    categoryName: 'Elettrodomestici',
    brandName: 'Dyson',
  },

  // --- 5 MIGLIOR PREZZO MODELLO ---
  {
    slug: 'iphone-16',
    type: 'best-price',
    country: 'it',
    locale: 'it',
    searchTerm: 'iphone 16',
    title: 'Miglior Prezzo iPhone 16 in Italia | PriceRadars',
    h1: 'iPhone 16 – Miglior Prezzo Oggi in Italia',
    description: 'Trova il miglior prezzo per iPhone 16 in Italia. Confrontiamo Amazon, MediaWorld, Unieuro e oltre 50 negozi online. Risparmia sull\'acquisto di iPhone 16.',
    keywords: 'miglior prezzo iphone 16, iphone 16 offerta, dove comprare iphone 16, iphone 16 prezzi italia',
    intro: 'Vuoi comprare iPhone 16 al prezzo più basso? PriceRadars aggiorna i prezzi ogni ora su decine di negozi italiani autorizzati. Confronta e risparmia.',
    faq: [
      { question: 'Qual è il prezzo minimo attuale di iPhone 16 in Italia?', answer: 'Il prezzo minimo aggiornato di iPhone 16 è mostrato in cima a questa pagina. Cambia ogni giorno, quindi conviene controllare regolarmente.' },
      { question: 'Dove conviene comprare iPhone 16?', answer: 'Amazon.it, MediaWorld e Unieuro sono i negozi più competitivi. PriceRadars confronta anche eBay, ePrice e altri.' },
      { question: 'Posso comprare iPhone 16 a rate?', answer: 'Molti negozi offrono opzioni di finanziamento. Clicca sull\'offerta per vedere i dettagli sul sito del negozio.' },
    ],
    categorySlug: 'smartphone',
    categoryName: 'Smartphone',
    brandName: 'Apple',
  },
  {
    slug: 'samsung-galaxy-s25',
    type: 'best-price',
    country: 'it',
    locale: 'it',
    searchTerm: 'samsung galaxy s25',
    title: 'Miglior Prezzo Samsung Galaxy S25 in Italia | PriceRadars',
    h1: 'Samsung Galaxy S25 – Miglior Prezzo Oggi in Italia',
    description: 'Confronta il prezzo di Samsung Galaxy S25 su Amazon, MediaWorld, Unieuro e oltre 50 negozi. Trova la migliore offerta Galaxy S25 in Italia.',
    keywords: 'miglior prezzo samsung galaxy s25, galaxy s25 offerta, dove comprare galaxy s25, galaxy s25 prezzi',
    intro: 'Samsung Galaxy S25 è il top di gamma del momento. PriceRadars confronta ogni ora i prezzi su tutti i principali negozi italiani per trovare lo sconto migliore.',
    faq: [
      { question: 'Dove trovo Galaxy S25 al prezzo più basso?', answer: 'Confrontiamo Amazon.it, MediaWorld, Unieuro, ePrice e altri. Il prezzo minimo è sempre in evidenza.' },
      { question: 'Galaxy S25 è disponibile in offerta?', answer: 'Imposta un avviso di prezzo su PriceRadars per ricevere una notifica quando il prezzo scende sotto la soglia che scegli.' },
    ],
    categorySlug: 'smartphone',
    categoryName: 'Smartphone',
    brandName: 'Samsung',
  },
  {
    slug: 'macbook-air-m3',
    type: 'best-price',
    country: 'it',
    locale: 'it',
    searchTerm: 'macbook air m3',
    title: 'Miglior Prezzo MacBook Air M3 in Italia | PriceRadars',
    h1: 'MacBook Air M3 – Miglior Prezzo Oggi in Italia',
    description: 'Trova il miglior prezzo per MacBook Air M3 in Italia. Confronta Amazon, MediaWorld e oltre 50 negozi online. Risparmia sul nuovo MacBook Air.',
    keywords: 'miglior prezzo macbook air m3, macbook air m3 offerta, dove comprare macbook, macbook prezzi italia',
    intro: 'MacBook Air M3 è uno dei laptop più cercati in Italia. PriceRadars controlla ogni ora i prezzi su Amazon.it, MediaWorld, Unieuro e altri per trovare l\'offerta migliore.',
    faq: [
      { question: 'Qual è il prezzo minimo di MacBook Air M3 in Italia?', answer: 'Il prezzo aggiornato in tempo reale è mostrato in cima. I prezzi variano tra negozi, quindi confrontare è fondamentale.' },
      { question: 'Conviene aspettare un\'offerta su MacBook Air?', answer: 'I MacBook raramente hanno grandi sconti, ma le promozioni esistono. Imposta un avviso di prezzo su PriceRadars.' },
    ],
    categorySlug: 'laptop',
    categoryName: 'Laptop',
    brandName: 'Apple',
  },
  {
    slug: 'sony-wh-1000xm5',
    type: 'best-price',
    country: 'it',
    locale: 'it',
    searchTerm: 'sony wh-1000xm5',
    title: 'Miglior Prezzo Sony WH-1000XM5 in Italia | PriceRadars',
    h1: 'Sony WH-1000XM5 – Miglior Prezzo Oggi in Italia',
    description: 'Trova il miglior prezzo per cuffie Sony WH-1000XM5 in Italia. Confronta Amazon, MediaWorld, Unieuro e oltre 50 negozi. Risparmia sulle migliori cuffie Sony.',
    keywords: 'miglior prezzo sony wh-1000xm5, cuffie sony offerta, dove comprare sony wh1000xm5, cuffie noise cancelling prezzi',
    intro: 'Le Sony WH-1000XM5 sono le cuffie con cancellazione del rumore più cercate in Italia. PriceRadars confronta ogni ora i prezzi su tutti i negozi per trovare l\'offerta migliore.',
    faq: [
      { question: 'Dove compro Sony WH-1000XM5 al miglior prezzo?', answer: 'Amazon.it, MediaWorld e Unieuro sono i più competitivi. PriceRadars li confronta in tempo reale.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    brandName: 'Sony',
  },
  {
    slug: 'playstation-5',
    type: 'best-price',
    country: 'it',
    locale: 'it',
    searchTerm: 'playstation 5',
    title: 'Miglior Prezzo PlayStation 5 in Italia | PriceRadars',
    h1: 'PlayStation 5 – Miglior Prezzo Oggi in Italia',
    description: 'Trova il miglior prezzo per PlayStation 5 in Italia. Confronta Amazon, MediaWorld, Unieuro e oltre 50 negozi. Risparmia su PS5.',
    keywords: 'miglior prezzo ps5, playstation 5 offerta, dove comprare ps5, ps5 prezzi italia',
    intro: 'PS5 è ancora una delle console più cercate. PriceRadars confronta ogni ora i prezzi su Amazon.it, MediaWorld, Unieuro e altri per trovare la migliore offerta.',
    faq: [
      { question: 'PS5 è disponibile in offerta?', answer: 'I prezzi PS5 cambiano spesso. Imposta un avviso su PriceRadars per ricevere una notifica quando il prezzo scende.' },
      { question: 'Dove trovo PS5 a meno?', answer: 'Amazon.it e MediaWorld sono spesso i più convenienti. PriceRadars li confronta in tempo reale.' },
    ],
    categorySlug: 'gaming',
    categoryName: 'Gaming',
    brandName: 'Sony',
  },

  // --- 5 OFFERTE SOTTO SOGLIA ---
  {
    slug: 'smartphone-sotto-300',
    type: 'under-x',
    country: 'it',
    locale: 'it',
    searchTerm: 'smartphone sotto 300',
    title: 'Migliori Smartphone sotto 300€ | PriceRadars',
    h1: 'Migliori Smartphone sotto 300€ in Italia',
    description: 'Trova i migliori smartphone sotto 300 euro in Italia. Confronta prezzi di Samsung, Xiaomi, Google e altri su Amazon, MediaWorld e oltre 50 negozi.',
    keywords: 'smartphone sotto 300 euro, miglior smartphone economico, offerte smartphone, smartphone prezzo basso',
    intro: 'Vuoi uno smartphone di qualità senza spendere una fortuna? PriceRadars seleziona le migliori offerte di smartphone sotto i 300 euro aggiornate in tempo reale da decine di negozi italiani.',
    faq: [
      { question: 'Qual è il miglior smartphone sotto 300 euro?', answer: 'Dipende dalle tue esigenze, ma Samsung Galaxy A55, Xiaomi 13 Lite e Google Pixel 7a sono tra i più apprezzati in questa fascia.' },
      { question: 'I prezzi sono aggiornati?', answer: 'Sì, PriceRadars aggiorna i prezzi ogni ora dai principali negozi online italiani.' },
    ],
    categorySlug: 'smartphone',
    categoryName: 'Smartphone',
    threshold: '300€',
  },
  {
    slug: 'laptop-sotto-700',
    type: 'under-x',
    country: 'it',
    locale: 'it',
    searchTerm: 'laptop sotto 700',
    title: 'Migliori Laptop sotto 700€ | PriceRadars',
    h1: 'Migliori Laptop sotto 700€ in Italia',
    description: 'I migliori laptop sotto 700 euro in Italia. Confronta Lenovo, HP, Asus e altri su Amazon, MediaWorld e oltre 50 negozi. Trova il notebook perfetto a meno.',
    keywords: 'laptop sotto 700 euro, miglior notebook economico, laptop offerte, notebook prezzi bassi',
    intro: 'Cerchi un laptop performante senza superare i 700 euro? PriceRadars confronta ogni ora le migliori offerte di notebook di Lenovo, HP, Asus, Acer e altri marchi su tutti i negozi italiani.',
    faq: [
      { question: 'Quale laptop comprare sotto 700 euro?', answer: 'In questa fascia troviamo ottimi modelli Lenovo IdeaPad, HP Pavilion, Asus VivoBook e Acer Aspire. PriceRadars aggiorna i prezzi ogni ora.' },
      { question: 'Vale la pena comprare un laptop sotto 700 euro?', answer: 'Assolutamente. Per uso quotidiano, studio e lavoro d\'ufficio i laptop in questa fascia offrono un ottimo rapporto qualità-prezzo.' },
    ],
    categorySlug: 'laptop',
    categoryName: 'Laptop',
    threshold: '700€',
  },
  {
    slug: 'tv-sotto-500',
    type: 'under-x',
    country: 'it',
    locale: 'it',
    searchTerm: 'smart tv sotto 500',
    title: 'Migliori Smart TV sotto 500€ | PriceRadars',
    h1: 'Migliori Smart TV sotto 500€ in Italia',
    description: 'Confronta prezzi Smart TV sotto 500 euro. Samsung, LG, Sony, Philips: trova la TV migliore al prezzo più basso su Amazon, MediaWorld e oltre 50 negozi.',
    keywords: 'smart tv sotto 500 euro, miglior tv economica, offerte tv, smart tv prezzi bassi',
    intro: 'Vuoi una Smart TV di qualità senza spendere troppo? PriceRadars confronta ogni ora i prezzi delle migliori Smart TV sotto i 500 euro su decine di negozi italiani.',
    faq: [
      { question: 'Quale Smart TV comprare sotto 500 euro?', answer: 'Samsung Crystal, LG NanoCell e Philips 4K sono ottimi in questa fascia. Confronta i prezzi aggiornati su PriceRadars.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    threshold: '500€',
  },
  {
    slug: 'cuffie-sotto-150',
    type: 'under-x',
    country: 'it',
    locale: 'it',
    searchTerm: 'cuffie sotto 150',
    title: 'Migliori Cuffie sotto 150€ | PriceRadars',
    h1: 'Migliori Cuffie sotto 150€ in Italia',
    description: 'I migliori auricolari e cuffie sotto 150 euro. Confronta Sony, Bose, Jabra, Samsung su Amazon, MediaWorld e oltre 50 negozi italiani.',
    keywords: 'cuffie sotto 150 euro, auricolari economici offerte, cuffie wireless prezzi, headphone economici',
    intro: 'Vuoi cuffie di qualità senza spendere una fortuna? PriceRadars seleziona ogni giorno le migliori offerte di cuffie sotto 150 euro su Amazon.it, MediaWorld e altri negozi.',
    faq: [
      { question: 'Quali cuffie comprare sotto 150 euro?', answer: 'Sony WH-CH720N, Jabra Evolve2 e Samsung Galaxy Buds sono tra i più apprezzati in questa fascia di prezzo.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    threshold: '150€',
  },
  {
    slug: 'lavatrice-sotto-400',
    type: 'under-x',
    country: 'it',
    locale: 'it',
    searchTerm: 'lavatrice sotto 400',
    title: 'Migliori Lavatrici sotto 400€ | PriceRadars',
    h1: 'Migliori Lavatrici sotto 400€ in Italia',
    description: 'Trova la migliore lavatrice sotto 400 euro in Italia. Confronta Bosch, Samsung, LG, Indesit su Amazon, MediaWorld e oltre 50 negozi.',
    keywords: 'lavatrice sotto 400 euro, miglior lavatrice economica, offerte lavatrici, lavatrice prezzi bassi',
    intro: 'Cerchi una lavatrice affidabile senza spendere troppo? PriceRadars confronta ogni ora i prezzi di Bosch, Samsung, LG, Indesit e altri brand su tutti i negozi italiani.',
    faq: [
      { question: 'Qual è la migliore lavatrice sotto 400 euro?', answer: 'Bosch Serie 2, Samsung WW70T4042EE e Indesit EWC 71252 W IT N sono tra le più apprezzate in questa fascia.' },
      { question: 'Dove comprare lavatrici online in Italia?', answer: 'Amazon.it, MediaWorld, Unieuro ed ePrice sono tra i più competitivi. PriceRadars li confronta in tempo reale.' },
    ],
    categorySlug: 'elettrodomestici',
    categoryName: 'Elettrodomestici',
    threshold: '400€',
  },
]

// ==============================================================
// GERMANY – tedesco – /en/de/brand/[slug], /en/de/best-price/[slug], /en/de/deals/[slug]
// ==============================================================
const deLandings: LandingPage[] = [
  // --- 5 BRAND ---
  {
    slug: 'apple',
    type: 'brand',
    country: 'de',
    locale: 'de',
    searchTerm: 'apple',
    title: 'Apple - Preisvergleich | PriceRadars',
    h1: 'Apple Produkte – Bester Preis in Deutschland',
    description: 'Preisvergleich für iPhone, MacBook, iPad und AirPods in Deutschland. Vergleiche über 50 Online-Shops wie Amazon.de, MediaMarkt und Saturn.',
    keywords: 'apple preisvergleich, iphone preis vergleichen, macbook angebote, günstig apple kaufen',
    intro: 'PriceRadars vergleicht stündlich die Preise aller Apple-Produkte in Deutschland. Finde den günstigsten Preis für iPhone, MacBook, iPad und AirPods in über 50 Shops.',
    faq: [
      { question: 'Wo kaufe ich Apple-Produkte am günstigsten?', answer: 'PriceRadars vergleicht Amazon.de, MediaMarkt, Saturn, Cyberport und weitere Shops in Echtzeit.' },
      { question: 'Ändern sich Apple-Preise häufig?', answer: 'Ja, besonders bei Black Friday und Saisonschlussverkäufen. Mit einem Preisalarm auf PriceRadars verpasst du keine Angebote.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Apple',
  },
  {
    slug: 'samsung',
    type: 'brand',
    country: 'de',
    locale: 'de',
    searchTerm: 'samsung',
    title: 'Samsung - Preisvergleich | PriceRadars',
    h1: 'Samsung Produkte – Bester Preis in Deutschland',
    description: 'Preisvergleich für Samsung Galaxy, QLED TV, Haushaltsgeräte und mehr in Deutschland. Vergleiche über 50 Online-Shops in Echtzeit.',
    keywords: 'samsung preisvergleich, samsung galaxy angebote, tv samsung günstig, samsung deutschland',
    intro: 'Von Galaxy-Smartphones über QLED-TVs bis zu Haushaltsgeräten: PriceRadars findet täglich den besten Samsung-Preis in Deutschland.',
    faq: [
      { question: 'Wo kaufe ich Samsung Galaxy günstig?', answer: 'PriceRadars vergleicht Amazon.de, MediaMarkt, Saturn und weitere Shops in Echtzeit.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Samsung',
  },
  {
    slug: 'bosch',
    type: 'brand',
    country: 'de',
    locale: 'de',
    searchTerm: 'bosch haushaltsgeraete',
    title: 'Bosch - Preisvergleich | PriceRadars',
    h1: 'Bosch Haushaltsgeräte – Bester Preis in Deutschland',
    description: 'Preisvergleich für Bosch Waschmaschinen, Kühlschränke, Geschirrspüler und weitere Haushaltsgeräte. Günstigste Preise aus über 50 deutschen Shops.',
    keywords: 'bosch preisvergleich, bosch waschmaschine günstig, bosch haushaltsgeräte angebote, bosch online',
    intro: 'Bosch Haushaltsgeräte sind gefragt. PriceRadars vergleicht täglich die Preise für Waschmaschinen, Kühlschränke und Geschirrspüler von Bosch in Deutschland.',
    faq: [
      { question: 'Wo kaufe ich Bosch-Geräte am günstigsten?', answer: 'Amazon.de, MediaMarkt und Otto sind oft am kompetitivsten. PriceRadars vergleicht alle in Echtzeit.' },
    ],
    categorySlug: 'haushaltsgeraete',
    categoryName: 'Haushaltsgeräte',
    brandName: 'Bosch',
  },
  {
    slug: 'lg',
    type: 'brand',
    country: 'de',
    locale: 'de',
    searchTerm: 'lg',
    title: 'LG - Preisvergleich | PriceRadars',
    h1: 'LG Produkte – Bester Preis in Deutschland',
    description: 'Preisvergleich für LG OLED TV, Waschmaschinen, Kühlschränke und Monitore in Deutschland. Vergleiche über 50 Online-Shops.',
    keywords: 'lg preisvergleich, lg oled angebote, lg haushaltsgeräte günstig, lg deutschland',
    intro: 'PriceRadars vergleicht stündlich die LG-Preise in Deutschland für OLED TVs, Waschmaschinen und Kühlschränke.',
    faq: [
      { question: 'Wo kaufe ich LG OLED günstig?', answer: 'Amazon.de, MediaMarkt und Saturn sind die kompetitivsten. PriceRadars vergleicht täglich.' },
    ],
    categorySlug: 'haushaltsgeraete',
    categoryName: 'Haushaltsgeräte',
    brandName: 'LG',
  },
  {
    slug: 'sony',
    type: 'brand',
    country: 'de',
    locale: 'de',
    searchTerm: 'sony',
    title: 'Sony - Preisvergleich | PriceRadars',
    h1: 'Sony Produkte – Bester Preis in Deutschland',
    description: 'Preisvergleich für Sony BRAVIA TV, PlayStation, WH-1000XM Kopfhörer und Alpha Kameras in Deutschland. Günstigste Preise aus über 50 Shops.',
    keywords: 'sony preisvergleich, playstation 5 günstig, sony kopfhörer angebote, sony kamera deutschland',
    intro: 'Ob PlayStation 5, BRAVIA OLED oder WH-1000XM5 Kopfhörer: PriceRadars findet stündlich den günstigsten Sony-Preis in Deutschland.',
    faq: [
      { question: 'Wo kaufe ich Sony günstig in Deutschland?', answer: 'Amazon.de, MediaMarkt, Saturn und Cyberport sind kompetitiv. PriceRadars vergleicht alle täglich.' },
    ],
    categorySlug: 'kameras',
    categoryName: 'Kameras',
    brandName: 'Sony',
  },

  // --- 5 BEST-PRICE MODELLO ---
  {
    slug: 'iphone-16',
    type: 'best-price',
    country: 'de',
    locale: 'de',
    searchTerm: 'iphone 16',
    title: 'iPhone 16 – Bester Preis in Deutschland | PriceRadars',
    h1: 'iPhone 16 – Günstigster Preis in Deutschland',
    description: 'Finde den besten Preis für iPhone 16 in Deutschland. Wir vergleichen Amazon.de, MediaMarkt, Saturn und über 50 Online-Shops stündlich.',
    keywords: 'iphone 16 bester preis, iphone 16 günstig kaufen, iphone 16 angebot, wo iphone 16 kaufen',
    intro: 'PriceRadars vergleicht stündlich die Preise für iPhone 16 in Deutschland. Finde das günstigste Angebot sofort.',
    faq: [
      { question: 'Wo kaufe ich iPhone 16 am günstigsten in Deutschland?', answer: 'Amazon.de, MediaMarkt und Saturn sind oft am kompetitivsten. PriceRadars vergleicht alle in Echtzeit.' },
      { question: 'Wie verfolge ich den iPhone 16 Preisverlauf?', answer: 'Mit dem Preisalarm auf PriceRadars wirst du benachrichtigt, wenn der Preis unter dein Wunschlimit fällt.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Apple',
  },
  {
    slug: 'samsung-galaxy-s25',
    type: 'best-price',
    country: 'de',
    locale: 'de',
    searchTerm: 'samsung galaxy s25',
    title: 'Samsung Galaxy S25 – Bester Preis in Deutschland | PriceRadars',
    h1: 'Samsung Galaxy S25 – Günstigster Preis in Deutschland',
    description: 'Bester Preis für Samsung Galaxy S25 in Deutschland. Vergleich von Amazon.de, MediaMarkt, Saturn und weiteren Shops.',
    keywords: 'galaxy s25 bester preis, samsung galaxy s25 günstig, wo galaxy s25 kaufen, galaxy s25 angebot',
    intro: 'Galaxy S25 ist Samsungs neuestes Flaggschiff. PriceRadars vergleicht stündlich die günstigsten Preise in Deutschland.',
    faq: [
      { question: 'Wo ist Galaxy S25 am günstigsten?', answer: 'Wir vergleichen Amazon.de, MediaMarkt, Saturn und weitere Shops in Echtzeit.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Samsung',
  },
  {
    slug: 'playstation-5',
    type: 'best-price',
    country: 'de',
    locale: 'de',
    searchTerm: 'playstation 5',
    title: 'PlayStation 5 – Bester Preis in Deutschland | PriceRadars',
    h1: 'PlayStation 5 – Günstigster Preis in Deutschland',
    description: 'Bester Preis für PS5 in Deutschland. Vergleich von Amazon.de, MediaMarkt, Saturn, Otto und weiteren Shops in Echtzeit.',
    keywords: 'ps5 bester preis, playstation 5 günstig kaufen, ps5 angebot, wo ps5 kaufen deutschland',
    intro: 'PriceRadars vergleicht täglich die PS5-Preise in Deutschland. Finde das günstigste Angebot sofort.',
    faq: [
      { question: 'Wo kaufe ich PS5 am günstigsten?', answer: 'Amazon.de, MediaMarkt und Saturn sind oft am kompetitivsten. PriceRadars vergleicht täglich.' },
    ],
    categorySlug: 'gaming',
    categoryName: 'Gaming',
    brandName: 'Sony',
  },
  {
    slug: 'bosch-waschmaschine',
    type: 'best-price',
    country: 'de',
    locale: 'de',
    searchTerm: 'bosch waschmaschine',
    title: 'Bosch Waschmaschine – Bester Preis in Deutschland | PriceRadars',
    h1: 'Bosch Waschmaschine – Günstigster Preis in Deutschland',
    description: 'Bester Preis für Bosch Waschmaschinen in Deutschland. Vergleich von Amazon.de, MediaMarkt, Saturn, Otto und anderen Shops.',
    keywords: 'bosch waschmaschine bester preis, bosch washing machine günstig, waschmaschine bosch angebot',
    intro: 'PriceRadars vergleicht täglich die Preise für Bosch Waschmaschinen in Deutschland. Finde das günstigste Modell.',
    faq: [
      { question: 'Welche Bosch Waschmaschine ist die günstigste?', answer: 'Das hängt von Kapazität und Features ab. PriceRadars zeigt die günstigsten Bosch-Modelle aller Shops.' },
    ],
    categorySlug: 'haushaltsgeraete',
    categoryName: 'Haushaltsgeräte',
    brandName: 'Bosch',
  },
  {
    slug: 'macbook-air-m3',
    type: 'best-price',
    country: 'de',
    locale: 'de',
    searchTerm: 'macbook air m3',
    title: 'MacBook Air M3 – Bester Preis in Deutschland | PriceRadars',
    h1: 'MacBook Air M3 – Günstigster Preis in Deutschland',
    description: 'Bester Preis für MacBook Air M3 in Deutschland. Vergleich von Amazon.de, MediaMarkt, Cyberport und weiteren Shops in Echtzeit.',
    keywords: 'macbook air m3 bester preis, macbook günstig kaufen, macbook air angebot deutschland',
    intro: 'PriceRadars vergleicht stündlich die Preise für MacBook Air M3 in Deutschland. Finde den günstigsten Preis sofort.',
    faq: [
      { question: 'Wo ist MacBook Air M3 am günstigsten in Deutschland?', answer: 'Amazon.de, Cyberport und MediaMarkt sind oft kompetitiv. PriceRadars vergleicht alle in Echtzeit.' },
    ],
    categorySlug: 'laptops',
    categoryName: 'Laptops',
    brandName: 'Apple',
  },

  // --- 5 DEALS UNTER X ---
  {
    slug: 'smartphones-unter-300',
    type: 'under-x',
    country: 'de',
    locale: 'de',
    searchTerm: 'smartphone unter 300',
    title: 'Beste Smartphones unter 300€ | PriceRadars',
    h1: 'Beste Smartphones unter 300€ in Deutschland',
    description: 'Die besten Smartphones unter 300 Euro in Deutschland. Vergleiche Samsung, Xiaomi, Google und andere auf Amazon.de, MediaMarkt und weiteren Shops.',
    keywords: 'smartphone unter 300 euro, günstiges smartphone, handy angebote, smartphone preisvergleich günstig',
    intro: 'Du suchst ein gutes Smartphone ohne viel Geld auszugeben? PriceRadars wählt täglich die besten Angebote unter 300€ aus über 50 deutschen Shops aus.',
    faq: [
      { question: 'Welches Smartphone unter 300 Euro ist das beste?', answer: 'Samsung Galaxy A55, Xiaomi 13 Lite und Google Pixel 7a sind in dieser Preisklasse sehr beliebt.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    threshold: '300€',
  },
  {
    slug: 'laptops-unter-700',
    type: 'under-x',
    country: 'de',
    locale: 'de',
    searchTerm: 'laptop unter 700',
    title: 'Beste Laptops unter 700€ | PriceRadars',
    h1: 'Beste Laptops unter 700€ in Deutschland',
    description: 'Die besten Laptops unter 700 Euro in Deutschland. Vergleiche Lenovo, HP, Asus und Acer auf Amazon.de, MediaMarkt und über 50 Shops.',
    keywords: 'laptop unter 700 euro, günstiger laptop, notebook angebote, laptop preisvergleich',
    intro: 'PriceRadars vergleicht täglich die besten Laptop-Angebote unter 700€ aus über 50 deutschen Shops.',
    faq: [
      { question: 'Welcher Laptop ist unter 700 Euro empfehlenswert?', answer: 'Lenovo IdeaPad, HP Pavilion, Asus VivoBook und Acer Aspire bieten in dieser Preisklasse ein gutes Preis-Leistungs-Verhältnis.' },
    ],
    categorySlug: 'laptops',
    categoryName: 'Laptops',
    threshold: '700€',
  },
  {
    slug: 'tv-unter-600',
    type: 'under-x',
    country: 'de',
    locale: 'de',
    searchTerm: 'smart tv unter 600',
    title: 'Beste Smart TVs unter 600€ | PriceRadars',
    h1: 'Beste Smart TVs unter 600€ in Deutschland',
    description: 'Die besten Smart TVs unter 600 Euro in Deutschland. Samsung, LG, Sony, Philips: Preisvergleich aus über 50 deutschen Shops.',
    keywords: 'smart tv unter 600 euro, günstiger fernseher, tv angebote, fernseher preisvergleich',
    intro: 'PriceRadars vergleicht täglich die günstigsten Smart TVs unter 600€ aus deutschen Online-Shops.',
    faq: [
      { question: 'Welchen Smart TV kaufe ich unter 600 Euro?', answer: 'Samsung Crystal UHD, LG NanoCell und Sony X80L bieten ein gutes Preis-Leistungs-Verhältnis in dieser Klasse.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    threshold: '600€',
  },
  {
    slug: 'waschmaschinen-unter-500',
    type: 'under-x',
    country: 'de',
    locale: 'de',
    searchTerm: 'waschmaschine unter 500',
    title: 'Beste Waschmaschinen unter 500€ | PriceRadars',
    h1: 'Beste Waschmaschinen unter 500€ in Deutschland',
    description: 'Die besten Waschmaschinen unter 500 Euro in Deutschland. Bosch, Samsung, Miele, LG: Preisvergleich aus über 50 deutschen Shops.',
    keywords: 'waschmaschine unter 500, günstige waschmaschine, haushaltsgeräte angebote, waschmaschine preisvergleich',
    intro: 'PriceRadars vergleicht täglich die günstigsten Waschmaschinen unter 500€ aus deutschen Online-Shops.',
    faq: [
      { question: 'Welche Waschmaschine unter 500 Euro ist empfehlenswert?', answer: 'Bosch Serie 4, Samsung WW80T4042EE und Indesit BWE 91496X sind beliebt in dieser Preisklasse.' },
    ],
    categorySlug: 'haushaltsgeraete',
    categoryName: 'Haushaltsgeräte',
    threshold: '500€',
  },
  {
    slug: 'kopfhörer-unter-150',
    type: 'under-x',
    country: 'de',
    locale: 'de',
    searchTerm: 'kopfhörer unter 150',
    title: 'Beste Kopfhörer unter 150€ | PriceRadars',
    h1: 'Beste Kopfhörer unter 150€ in Deutschland',
    description: 'Die besten Kopfhörer unter 150 Euro in Deutschland. Sony, Jabra, Samsung: Preisvergleich aus über 50 deutschen Online-Shops.',
    keywords: 'kopfhörer unter 150, günstiger kopfhörer, bluetooth headphones angebote, kopfhörer preisvergleich',
    intro: 'PriceRadars wählt täglich die besten Kopfhörer-Angebote unter 150€ aus über 50 deutschen Shops.',
    faq: [
      { question: 'Welche Kopfhörer kaufe ich unter 150 Euro?', answer: 'Sony WH-CH720N, Jabra Evolve2 30 und Samsung Galaxy Buds FE sind in dieser Preisklasse sehr beliebt.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    threshold: '150€',
  },
]

// ==============================================================
// UNITED KINGDOM – inglese – /en/uk/brand/[slug], /en/uk/best-price/[slug], /en/uk/deals/[slug]
// ==============================================================
const ukLandings: LandingPage[] = [
  // --- 5 BRAND ---
  {
    slug: 'apple',
    type: 'brand',
    country: 'uk',
    locale: 'en',
    searchTerm: 'apple',
    title: 'Apple - Compare Prices UK | PriceRadars',
    h1: 'Best Apple Prices in the UK',
    description: 'Compare prices for iPhone, MacBook, iPad and AirPods across Amazon UK, Currys, Argos and 50+ online stores. Find the best Apple deals in the UK.',
    keywords: 'apple uk prices, iphone best price uk, macbook deals uk, compare apple products',
    intro: 'PriceRadars compares Apple product prices every hour across the UK\'s biggest online retailers. Find the lowest price on iPhone, MacBook, iPad and AirPods instantly.',
    faq: [
      { question: 'Where can I buy Apple products cheapest in the UK?', answer: 'PriceRadars compares Amazon UK, Currys, Argos, John Lewis and AO in real time to find the lowest price.' },
      { question: 'Do Apple prices change often?', answer: 'Yes, especially during Black Friday, Amazon Prime Day and seasonal sales. Set a price alert on PriceRadars to never miss a deal.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Apple',
  },
  {
    slug: 'samsung',
    type: 'brand',
    country: 'uk',
    locale: 'en',
    searchTerm: 'samsung',
    title: 'Samsung - Compare Prices UK | PriceRadars',
    h1: 'Best Samsung Prices in the UK',
    description: 'Compare prices for Samsung Galaxy, QLED TVs, tablets and appliances across Amazon UK, Currys, Argos and 50+ UK stores.',
    keywords: 'samsung uk prices, samsung galaxy deals, compare samsung products uk, samsung best price',
    intro: 'PriceRadars tracks Samsung prices every hour across the UK\'s biggest retailers. Find the best deal on any Samsung product instantly.',
    faq: [
      { question: 'Where can I buy Samsung Galaxy cheapest in the UK?', answer: 'PriceRadars compares Amazon UK, Currys, Argos and more in real time.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Samsung',
  },
  {
    slug: 'sony',
    type: 'brand',
    country: 'uk',
    locale: 'en',
    searchTerm: 'sony',
    title: 'Sony - Compare Prices UK | PriceRadars',
    h1: 'Best Sony Prices in the UK',
    description: 'Compare prices for Sony BRAVIA TVs, PlayStation 5, WH-1000XM headphones and Alpha cameras across 50+ UK online stores.',
    keywords: 'sony uk prices, playstation 5 best price uk, sony headphones deals, compare sony products',
    intro: 'PriceRadars monitors Sony prices every hour in the UK. Whether it\'s PS5, BRAVIA or WH-1000XM5 headphones, find the best deal instantly.',
    faq: [
      { question: 'Where can I buy Sony products cheapest in the UK?', answer: 'We compare Amazon UK, Currys, Argos, John Lewis and AO in real time.' },
    ],
    categorySlug: 'cameras',
    categoryName: 'Cameras',
    brandName: 'Sony',
  },
  {
    slug: 'lg',
    type: 'brand',
    country: 'uk',
    locale: 'en',
    searchTerm: 'lg',
    title: 'LG - Compare Prices UK | PriceRadars',
    h1: 'Best LG Prices in the UK',
    description: 'Compare prices for LG OLED TVs, washing machines, refrigerators and monitors across Amazon UK, Currys and 50+ UK stores.',
    keywords: 'lg uk prices, lg oled tv deals uk, lg appliances cheapest, compare lg products',
    intro: 'From OLED TVs to washing machines, PriceRadars tracks LG prices every hour across the UK\'s biggest retailers.',
    faq: [
      { question: 'Where can I buy LG OLED cheapest in the UK?', answer: 'Amazon UK, Currys and AO are usually most competitive. PriceRadars compares them daily.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    brandName: 'LG',
  },
  {
    slug: 'dyson',
    type: 'brand',
    country: 'uk',
    locale: 'en',
    searchTerm: 'dyson',
    title: 'Dyson - Compare Prices UK | PriceRadars',
    h1: 'Best Dyson Prices in the UK',
    description: 'Compare prices for Dyson vacuums, purifiers and hair dryers across Amazon UK, Currys, Argos and 50+ UK stores. Find the best Dyson deal.',
    keywords: 'dyson uk prices, dyson v15 best price, compare dyson vacuum uk, dyson deals',
    intro: 'Dyson products are premium priced, which makes comparing offers essential. PriceRadars checks Dyson prices every hour across the UK\'s biggest retailers.',
    faq: [
      { question: 'Where is Dyson cheapest in the UK?', answer: 'Amazon UK, Currys and AO are often most competitive. PriceRadars compares all daily.' },
    ],
    categorySlug: 'appliances',
    categoryName: 'Appliances',
    brandName: 'Dyson',
  },

  // --- 5 BEST-PRICE MODELLO ---
  {
    slug: 'iphone-16',
    type: 'best-price',
    country: 'uk',
    locale: 'en',
    searchTerm: 'iphone 16',
    title: 'iPhone 16 – Best Price UK | PriceRadars',
    h1: 'iPhone 16 – Best Price in the UK Today',
    description: 'Find the best price for iPhone 16 in the UK. We compare Amazon UK, Currys, Argos, John Lewis and 50+ stores hourly. Get the lowest price on iPhone 16.',
    keywords: 'iphone 16 best price uk, iphone 16 cheapest uk, where to buy iphone 16 uk, iphone 16 deals',
    intro: 'PriceRadars compares iPhone 16 prices across the UK every hour. Find the cheapest verified retailer instantly.',
    faq: [
      { question: 'Where is iPhone 16 cheapest in the UK?', answer: 'Amazon UK, Currys and Argos are usually most competitive. PriceRadars compares all in real time.' },
      { question: 'Can I get iPhone 16 on finance in the UK?', answer: 'Many UK retailers offer 0% finance. Click through to any retailer to see their financing options.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Apple',
  },
  {
    slug: 'samsung-galaxy-s25',
    type: 'best-price',
    country: 'uk',
    locale: 'en',
    searchTerm: 'samsung galaxy s25',
    title: 'Samsung Galaxy S25 – Best Price UK | PriceRadars',
    h1: 'Samsung Galaxy S25 – Best Price in the UK Today',
    description: 'Find the best price for Samsung Galaxy S25 in the UK. Compare Amazon UK, Currys, Argos and 50+ stores updated hourly.',
    keywords: 'galaxy s25 best price uk, samsung galaxy s25 cheapest, where to buy galaxy s25 uk',
    intro: 'PriceRadars compares Samsung Galaxy S25 prices every hour across UK retailers. Find the cheapest offer instantly.',
    faq: [
      { question: 'Where is Galaxy S25 cheapest in the UK?', answer: 'We compare Amazon UK, Currys, Argos and John Lewis in real time.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    brandName: 'Samsung',
  },
  {
    slug: 'macbook-air-m3',
    type: 'best-price',
    country: 'uk',
    locale: 'en',
    searchTerm: 'macbook air m3',
    title: 'MacBook Air M3 – Best Price UK | PriceRadars',
    h1: 'MacBook Air M3 – Best Price in the UK Today',
    description: 'Find the best price for MacBook Air M3 in the UK. Compare Amazon UK, Currys, John Lewis and 50+ stores updated hourly.',
    keywords: 'macbook air m3 best price uk, macbook cheapest uk, where to buy macbook uk',
    intro: 'PriceRadars tracks MacBook Air M3 prices every hour across UK retailers to find you the lowest price.',
    faq: [
      { question: 'Where is MacBook Air M3 cheapest in the UK?', answer: 'Amazon UK, Currys and John Lewis are often most competitive. PriceRadars compares all hourly.' },
    ],
    categorySlug: 'laptops',
    categoryName: 'Laptops',
    brandName: 'Apple',
  },
  {
    slug: 'playstation-5',
    type: 'best-price',
    country: 'uk',
    locale: 'en',
    searchTerm: 'playstation 5',
    title: 'PlayStation 5 – Best Price UK | PriceRadars',
    h1: 'PlayStation 5 – Best Price in the UK Today',
    description: 'Find the best price for PS5 in the UK. Compare Amazon UK, Currys, Argos and 50+ stores hourly. Get the lowest price on PlayStation 5.',
    keywords: 'ps5 best price uk, playstation 5 cheapest uk, where to buy ps5 uk, ps5 deals',
    intro: 'PriceRadars compares PS5 prices every day across UK retailers. Find the cheapest console offer instantly.',
    faq: [
      { question: 'Where is PS5 cheapest in the UK?', answer: 'Amazon UK, Currys and Argos are usually the most competitive. PriceRadars compares all daily.' },
    ],
    categorySlug: 'gaming',
    categoryName: 'Gaming',
    brandName: 'Sony',
  },
  {
    slug: 'dyson-v15',
    type: 'best-price',
    country: 'uk',
    locale: 'en',
    searchTerm: 'dyson v15',
    title: 'Dyson V15 – Best Price UK | PriceRadars',
    h1: 'Dyson V15 – Best Price in the UK Today',
    description: 'Find the best price for Dyson V15 in the UK. Compare Amazon UK, Currys, AO and 50+ stores updated hourly.',
    keywords: 'dyson v15 best price uk, dyson v15 cheapest uk, where to buy dyson v15',
    intro: 'PriceRadars tracks Dyson V15 prices every hour across UK retailers to find you the lowest price instantly.',
    faq: [
      { question: 'Where is Dyson V15 cheapest in the UK?', answer: 'Amazon UK, Currys and AO are often most competitive. PriceRadars compares all daily.' },
    ],
    categorySlug: 'appliances',
    categoryName: 'Appliances',
    brandName: 'Dyson',
  },

  // --- 5 DEALS UNDER X ---
  {
    slug: 'smartphones-under-300',
    type: 'under-x',
    country: 'uk',
    locale: 'en',
    searchTerm: 'smartphone under 300',
    title: 'Best Smartphones under £300 UK | PriceRadars',
    h1: 'Best Smartphones under £300 in the UK',
    description: 'Find the best smartphones under £300 in the UK. Compare Samsung, Xiaomi, Google and more across Amazon UK, Currys, Argos and 50+ stores.',
    keywords: 'smartphone under 300 pounds, best cheap smartphone uk, budget phone deals, android under 300',
    intro: 'Want a quality smartphone without breaking the bank? PriceRadars selects the best phone deals under £300, updated every hour from UK retailers.',
    faq: [
      { question: 'What is the best smartphone under £300?', answer: 'Samsung Galaxy A55, Google Pixel 7a and Nothing Phone 2a are top picks in this price range.' },
      { question: 'Are prices updated in real time?', answer: 'Yes, PriceRadars updates prices every hour from major UK retailers.' },
    ],
    categorySlug: 'smartphones',
    categoryName: 'Smartphones',
    threshold: '£300',
  },
  {
    slug: 'laptops-under-600',
    type: 'under-x',
    country: 'uk',
    locale: 'en',
    searchTerm: 'laptop under 600',
    title: 'Best Laptops under £600 UK | PriceRadars',
    h1: 'Best Laptops under £600 in the UK',
    description: 'The best laptops under £600 in the UK. Compare Lenovo, HP, Asus and Acer on Amazon UK, Currys and 50+ stores.',
    keywords: 'laptop under 600 pounds, best cheap laptop uk, budget notebook deals, laptop under 600',
    intro: 'PriceRadars compares the best laptop deals under £600 every hour from UK retailers.',
    faq: [
      { question: 'What is the best laptop under £600 in the UK?', answer: 'Lenovo IdeaPad, HP Pavilion, Asus VivoBook and Acer Swift are all strong options in this range.' },
    ],
    categorySlug: 'laptops',
    categoryName: 'Laptops',
    threshold: '£600',
  },
  {
    slug: 'tvs-under-500',
    type: 'under-x',
    country: 'uk',
    locale: 'en',
    searchTerm: 'smart tv under 500',
    title: 'Best TVs under £500 UK | PriceRadars',
    h1: 'Best Smart TVs under £500 in the UK',
    description: 'Find the best Smart TVs under £500 in the UK. Compare Samsung, LG, Sony and Philips across Amazon UK, Currys, Argos and 50+ stores.',
    keywords: 'tv under 500 pounds, best cheap smart tv uk, budget tv deals, smart tv under 500',
    intro: 'PriceRadars compares the best Smart TV deals under £500 every hour from UK retailers.',
    faq: [
      { question: 'What is the best TV under £500?', answer: 'Samsung Crystal, LG NanoCell and Sony X80L are popular picks in this price range.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    threshold: '£500',
  },
  {
    slug: 'headphones-under-150',
    type: 'under-x',
    country: 'uk',
    locale: 'en',
    searchTerm: 'headphones under 150',
    title: 'Best Headphones under £150 UK | PriceRadars',
    h1: 'Best Headphones under £150 in the UK',
    description: 'Find the best headphones under £150 in the UK. Compare Sony, Jabra, Samsung and Bose on Amazon UK, Currys and 50+ stores.',
    keywords: 'headphones under 150 pounds, best cheap headphones uk, wireless earbuds deals, budget headphones',
    intro: 'PriceRadars tracks the best headphone deals under £150 from UK retailers, updated every hour.',
    faq: [
      { question: 'What are the best headphones under £150?', answer: 'Sony WH-CH720N, Jabra Evolve2 30 and Samsung Galaxy Buds2 Pro are top picks in this price range.' },
    ],
    categorySlug: 'tv-audio',
    categoryName: 'TV & Audio',
    threshold: '£150',
  },
  {
    slug: 'washing-machines-under-400',
    type: 'under-x',
    country: 'uk',
    locale: 'en',
    searchTerm: 'washing machine under 400',
    title: 'Best Washing Machines under £400 UK | PriceRadars',
    h1: 'Best Washing Machines under £400 in the UK',
    description: 'Find the best washing machines under £400 in the UK. Compare Bosch, Samsung, LG and Indesit on Amazon UK, Currys, AO and 50+ stores.',
    keywords: 'washing machine under 400 pounds, best cheap washing machine uk, budget appliances deals',
    intro: 'PriceRadars compares the best washing machine deals under £400 every day from UK retailers.',
    faq: [
      { question: 'What is the best washing machine under £400?', answer: 'Bosch Serie 2, Samsung WW70T4042EE and Indesit BWSE71253VW are popular choices in this price range.' },
    ],
    categorySlug: 'appliances',
    categoryName: 'Appliances',
    threshold: '£400',
  },
]

// ==============================================================
// AGGREGATED LOOKUP MAPS
// ==============================================================

/** All landing pages, indexed by country then type then slug for O(1) validation */
export const landingPages: Record<CountryCode, LandingPage[]> = {
  it: itLandings,
  de: deLandings,
  uk: ukLandings,
  us: [],
  fr: [],
  es: [],
}

/** Fast lookup: country → type → slug → LandingPage */
function buildLookup() {
  const map: Record<string, Record<string, Record<string, LandingPage>>> = {}
  for (const [country, pages] of Object.entries(landingPages)) {
    map[country] = {}
    for (const page of pages) {
      if (!map[country][page.type]) map[country][page.type] = {}
      map[country][page.type][page.slug] = page
    }
  }
  return map
}

export const landingLookup = buildLookup()

/**
 * Retrieve a landing page by country + type + slug.
 * Returns null if not in whitelist (triggers notFound() in route).
 */
export function getLandingPage(
  country: string,
  type: LandingType,
  slug: string
): LandingPage | null {
  return landingLookup[country]?.[type]?.[slug] ?? null
}

/** All sitemap-eligible landing pages (all 45 initial) */
export function getAllLandingPages(): LandingPage[] {
  return Object.values(landingPages).flat()
}
