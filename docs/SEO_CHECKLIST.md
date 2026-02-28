# SEO Checklist – PriceRadars

Checklist operativa per mantenere alto il posizionamento su Google (ricerca, Shopping, Immagini) e massimizzare le vendite da traffico organico.

**Importante:** tutte le modifiche SEO devono **preservare** i requisiti Google CSS (vedi sezione 9). Non rimuovere o alterare URL, pagine legali, contatti, lista merchant e URL di ricerca usati da CSS.

---

## 1. Snippet prodotto (Google Shopping / Rich Results)

- [ ] **JSON-LD Product** (`ProductJsonLd`): ogni pagina prodotto ha `name`, `url`, `offers` (AggregateOffer con `lowPrice`, `highPrice`, `priceCurrency`, `offerCount`).
- [ ] **Nome prodotto**: mai vuoto (fallback `"Product"` se mancante).
- [ ] **Immagini**: schema con array di URL (tutte le immagini prodotto) per Google Images e Shopping.
- [ ] **Condizione**: `itemCondition` (NewCondition / UsedCondition / RefurbishedCondition) su Product e Offer.
- [ ] **Categoria**: campo `category` valorizzato quando disponibile dall’API.
- [ ] **SKU**: `product.id` come `sku` per univocità.
- [ ] Dopo modifiche allo schema: in GSC → Shopping → Snippet prodotto → **Convalida** per le pagine interessate.

---

## 2. Metadati pagine prodotto

- [ ] **Title**: pattern tipo `{Nome} - Confronta Prezzi da €X | PriceRadars` (IT) / `{Name} - Compare Prices from £X | PriceRadars` (EN/paese).
- [ ] **Description**: descrizione unica con nome, prezzo, numero offerte; nessun duplicato tra prodotti.
- [ ] **Keywords**: nome, brand, categoria, “confronta prezzi” / “compare prices”, “prezzo più basso” / “best price”, “offerte” / “deals”, nuovo/usato.
- [ ] **Open Graph**: `og:image` 1200×630, `alt` descrittivo (`Nome - Brand | PriceRadars`).
- [ ] **Canonical**: URL canonico per locale/paese; hreflang su homepage/layout.
- [ ] **Meta prodotto** (opzionale): `product:price:amount`, `product:price:currency`, `product:availability` dove supportato.

---

## 3. Categorie

- [ ] **Titolo**: `{Categoria} | Confronta Prezzi | PriceRadars` (o equivalente per lingua).
- [ ] **Description**: specifica per categoria, con termini di ricerca rilevanti (marchi, tipologia prodotto).
- [ ] **Keywords**: nome categoria, “confronta prezzi”, “offerte”, termini tipici della categoria.
- [ ] **Canonical**: URL canonico per ogni variante lingua/paese (slug categoria localizzato).

---

## 4. Immagini (Google Images)

- [ ] **Schema**: Product con `image` come array di URL (tutte le immagini).
- [ ] **Alt text**: sempre valorizzato (nome prodotto sulla gallery; nome prodotto sulle card).
- [ ] **Title**: attributo `title` sull’immagine principale scheda prodotto.
- [ ] **OG/Twitter**: immagine prodotto in buona risoluzione; dimensioni 1200×630 per social.
- [ ] **next/image**: `sizes` e `priority` sulla hero; lazy load su thumb e liste.

---

## 5. Tecnico / Crawl

- [ ] **robots**: `max-image-preview: large`, `max-snippet: -1` (già in layout dove necessario).
- [ ] **Sitemap**: aggiornata con homepage, categorie, legal, merchant; hreflang dove applicabile.
- [ ] **SearchAction**: WebSite JSON-LD con `potentialAction` per la ricerca (query parameter).
- [ ] **Breadcrumb**: BreadcrumbList JSON-LD su pagine prodotto e categoria.
- [ ] **FAQ**: FAQPage JSON-LD su pagine prodotto (contenuto utile, non solo keyword).

---

## 6. Contenuti e conversioni

- [ ] Testi “Come funziona” e “Perché PriceRadars” in homepage (localizzati).
- [ ] Trust signal in scheda prodotto (prezzi verificati, negozi, ecc.).
- [ ] CTA chiari: “Vai all’offerta” / “View deal”, “Avvisami” / “Price alert”.
- [ ] Link interni: categorie → prodotti; ricerca → prodotti; correlati in scheda prodotto.

---

## 7. Multi-paese / i18n

- [ ] **Canonical** per ogni variante (IT, EN/UK, EN/US, DE, FR, ES).
- [ ] **hreflang**: alternates in layout e in sitemap; `x-default` coerente.
- [ ] **Slug categoria** localizzati (es. elettrodomestici, haushaltsgeraete, electromenager).
- [ ] **Valuta** corretta per paese (EUR, GBP, USD) in schema e UI.

---

## 8. Controlli periodici (es. mensile)

- [ ] GSC: errori Snippet prodotto, copertura indicizzazione, Core Web Vitals.
- [ ] GSC: report “Sitemap” e “Pagina di destinazione” per pagine prodotto/categoria.
- [ ] Test rich results: [Google Rich Results Test](https://search.google.com/test/rich-results) su 2–3 URL prodotto e 1 categoria.
- [ ] Verifica che titoli/description non siano duplicati in blocco (penalizzazioni).

---

## 9. Google CSS – da non rompere

Requisiti obbligatori per il programma Comparison Shopping Service. **Non modificare/rimuovere** senza aver verificato con il team CSS.

- [ ] **URL ricerca con `{query}`**  
  `https://priceradars.com/search?q={query}` deve restare attivo: la pagina `/search` reindirizza alla ricerca localizzata (es. `/it/cerca?q=...` o `/en/uk/search?q=...`) **senza** interstitial o pop-up. Il risultato deve essere direttamente la pagina con prodotti pertinenti.

- [ ] **Pagina contatti** (IT e EN per paese)  
  - IT: `/it/contatti` con URL sito, email, telefono con prefisso internazionale, **indirizzo fisico** (es. Via Enrico Mattei 106, Bologna BO, Italy).  
  - EN: `/en/{country}/contact` con gli stessi dati per ogni paese.

- [ ] **Pagina Chi siamo / About**  
  - IT: `/it/chi-siamo` (redirect da `/it/about`).  
  - EN: `/en/{country}/about`.

- [ ] **Privacy e Termini**  
  - IT: `/it/privacy`, `/it/termini` (redirect da `/it/terms`).  
  - EN: `/en/{country}/privacy`, `/en/{country}/terms`.

- [ ] **Lista merchant**  
  - IT: `/it/negozi`.  
  - EN: `/en/{country}/merchants`.  
  Contenuto: elenco dei negozi confrontati (richiesto da CSS).

- [ ] **Footer**  
  - Link a Chi siamo, Privacy, Termini, Contatti, Negozi/Partner Stores.  
  - **VAT / Company Register**: 03984661201 (obbligatorio in footer).

- [ ] **Verifica sito**  
  - Meta `google-site-verification` in layout (Search Console).  
  - Indirizzo aziendale visibile in pagina contatti (e dove richiesto).

- [ ] **Middleware**  
  - `/search` non deve essere intercettato dal middleware in modo che restituisca 404 o che cambi l’URL prima di arrivare a `src/app/search/page.tsx`. Se il middleware reindirizza per lingua/paese, `/search` deve essere in elenco “skip” o gestito in modo che la richiesta arrivi alla pagina search.

---

## Riferimenti

- [Schema.org Product](https://schema.org/Product)
- [Google Merchant Center / CSS](https://support.google.com/merchants/) (per feed e annunci)
- [Google Search Central – Structured data](https://developers.google.com/search/docs/appearance/structured-data)
