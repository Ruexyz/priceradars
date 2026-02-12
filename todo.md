# PriceRadars — TODO per CSS Google Approval

## Bloccanti (richiesti per CSS program)

### 1. Soglia 50 Merchant Unici per Paese
- [ ] Serve API da Saverio: lista merchant con dominio per paese
- [ ] Verificare che per IT, UK, US, DE, FR, ES ci siano ≥50 merchant unici
- [ ] Upload lista merchant nel CSS Center di Google
- **Ref:** https://support.google.com/css-center/answer/7524491 → "at least 50 distinct merchant domains"

### 2. Filtro per Merchant (richiesto come dimensione aggiuntiva)
- [ ] Serve API da Saverio: facet/filtri nella risposta di search (merchant list per query)
- [ ] Implementare filtro "Venditore" nella sidebar filtri (search + category pages)
- [ ] Google richiede: "filter by price AND at least one other dimension (e.g., merchant)"
- **Ref:** https://support.google.com/css-center/answer/14233609 → "Filtering and sorting"

### 3. Dati Business Reali
- [ ] Aggiornare indirizzo sede in `/it/contatti` e `/en/[country]/contact` con indirizzo completo (via, CAP, città)
- [ ] Aggiungere P.IVA/Company Registration Number se richiesto
- [ ] Verificare che email `support@priceradars.com` sia attiva e funzionante
- [ ] Aggiungere numero di telefono se disponibile (opzionale ma consigliato per CSS Center)

### 4. Google Search Console
- [ ] Aggiungere codice verifica GSC nel file `src/app/layout.tsx` (linea commentata con TODO)
- [ ] Verificare dominio in GSC
- [ ] Verificare/rivendicare sito in Merchant Center

## Miglioramenti Importanti

### 5. Filtri Avanzati con Facet dall'API
- [ ] Serve API da Saverio: facet nella search response (brand, merchant, price ranges, availability)
- [ ] I filtri attuali funzionano client-side sui risultati; con i facet dall'API sarebbero più precisi
- [ ] Aggiungere filtro "Disponibilità" (in stock / out of stock)
- [ ] Aggiungere filtro "Merchant/Venditore"

### 6. Dettagli Offerta più Ricchi
- [ ] Tempi di spedizione (se disponibili nell'API)
- [ ] Costi di spedizione per merchant (parzialmente presente, dipende da API)
- [ ] Metodi di pagamento per merchant (se disponibile)
- [ ] Rating/recensioni (se disponibile)

### 7. Pagine Legali — Review Legale
- [ ] Le pagine Privacy Policy e Terms of Service sono bozze funzionali
- [ ] Servono review da parte di un legale per conformità GDPR completa
- [ ] Aggiornare i dati di Rue Srl (indirizzo completo, P.IVA, ecc.)

### 8. Favicon PNG
- [ ] Creare `favicon.ico` (attualmente solo `icon.svg`)
- [ ] Creare `apple-touch-icon.png` (180x180)
- [ ] Creare icone per `/public/icons/` referenziate in `manifest.json`
- [ ] Creare `og-image.png` (1200x630) — attualmente solo SVG

## Cosmetici / Nice-to-Have

### 9. Contenuto Homepage
- [ ] I product count nelle categorie sono placeholder (1250, 890, ecc.) — aggiornare con dati reali quando disponibili

### 10. Pagine Legali Localizzate
- [ ] Privacy e Terms attualmente solo in IT e EN
- [ ] Servirebbero versioni in DE, FR, ES per compliance locale (o almeno redirect alla versione EN)

### 11. Cookie Banner
- [ ] Attualmente non presente — necessario per compliance GDPR se si aggiungono analytics/cookie non tecnici

---

## Stato Attuale

| Requisito CSS | Stato |
|---|---|
| Search + Compare | ✅ |
| Multi-merchant comparison | ✅ |
| 50 merchant per country | ❌ Da verificare |
| Filtro prezzo | ✅ |
| Filtro brand | ✅ |
| Filtro merchant | ❌ Serve API facet |
| Link a pagina acquisto | ✅ |
| Accessibile senza login | ✅ |
| Contact info sul sito | ✅ |
| Business address | ⚠️ Da completare |
| Privacy Policy | ✅ |
| Terms of Service | ✅ |
| Lingua/valuta corretta | ✅ |
| Multi-paese | ✅ (6 paesi, 5 lingue) |
