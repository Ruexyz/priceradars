# PriceRadars — TODO per CSS Google Approval

## Bloccanti (servono Saverio o dati business)

### 1. Soglia 50 Merchant Unici per Paese
- [ ] Serve API da Saverio: lista merchant con dominio per paese
- [ ] Verificare che per IT, UK, US, DE, FR, ES ci siano ≥50 merchant unici
- [ ] Upload lista merchant nel CSS Center di Google
- **Ref:** https://support.google.com/css-center/answer/7524491

### 2. Filtro per Merchant
- [ ] Serve API da Saverio: facet nella risposta di search (merchant list per query)
- [ ] Implementare filtro "Venditore" nella sidebar (search + category pages)
- **Ref:** https://support.google.com/css-center/answer/14233609

### 3. Dati Business Reali
- [ ] Aggiornare indirizzo sede in pagine Contatti con via, CAP, città completi
- [ ] Aggiungere P.IVA di Rue Srl
- [ ] Verificare che email `support@priceradars.com` sia attiva
- [ ] Aggiungere numero di telefono (opzionale ma consigliato per CSS Center)

### 4. Google Merchant Center
- [ ] Rivendicare sito in Merchant Center (GSC già verificato via Cloudflare)

## Miglioramenti (non bloccanti)

### 5. Review Legale
- [ ] Privacy Policy e Terms of Service sono bozze funzionali, servono review legale per GDPR
- [ ] Aggiornare dati Rue Srl (indirizzo, P.IVA) nelle pagine legali

### 6. Dettagli Offerta più Ricchi (dipende da API)
- [ ] Tempi di spedizione per merchant
- [ ] Metodi di pagamento per merchant
- [ ] Rating/recensioni

### 7. Cookie Banner
- [ ] Necessario se si aggiungono analytics o cookie non tecnici

---

## Stato Attuale

| Requisito CSS | Stato |
|---|---|
| Search + Compare | ✅ |
| Multi-merchant comparison | ✅ |
| 50 merchant per country | ❌ Serve API Saverio |
| Filtro prezzo | ✅ |
| Filtro brand | ✅ |
| Filtro disponibilità | ✅ |
| Filtro merchant | ❌ Serve API Saverio |
| Link a pagina acquisto | ✅ |
| Accessibile senza login | ✅ |
| Contact info sul sito | ✅ (serve indirizzo completo) |
| Business address | ⚠️ Serve indirizzo reale |
| Privacy Policy | ✅ (serve review legale) |
| Terms of Service | ✅ (serve review legale) |
| About page | ✅ |
| Lingua/valuta corretta | ✅ |
| Multi-paese | ✅ (6 paesi, 5 lingue) |
| Favicon/Icons | ✅ |
| OG Image | ✅ |
| Sitemap con hreflang | ✅ |
| Schema.org JSON-LD | ✅ |
