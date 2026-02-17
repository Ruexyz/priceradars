# PriceRadars — TODO per CSS Google Approval

## Bloccanti (servono dati business)

### 1. Soglia 50 Merchant Unici per Paese
- [ ] Verificare che per IT, UK, US, DE, FR, ES ci siano ≥50 merchant unici (API `/api/merchants/search/?country=IT` restituisce 50 per IT)
- [ ] Upload lista merchant nel CSS Center di Google
- **Ref:** https://support.google.com/css-center/answer/7524491

### 2. Dati Business Reali
- [ ] Aggiornare indirizzo sede nelle pagine Contatti con via, CAP, città completi
- [ ] Aggiungere P.IVA di Rue Srl
- [ ] Verificare che email `support@priceradars.com` sia attiva
- [ ] Aggiungere numero di telefono (opzionale ma consigliato per CSS Center)

### 3. Google Merchant Center
- [ ] Rivendicare sito in Merchant Center (GSC già verificato via Cloudflare)

## Miglioramenti (non bloccanti)

### 4. Review Legale
- [ ] Privacy Policy e Terms sono bozze funzionali, servono review legale per GDPR

### 5. Cookie Banner
- [ ] Necessario se si aggiungono analytics o cookie non tecnici

---

## Stato Attuale

| Requisito CSS | Stato |
|---|---|
| Search + Compare | ✅ |
| Multi-merchant comparison | ✅ |
| 50 merchant per country | ✅ API conferma 50 per IT |
| Filtro prezzo | ✅ |
| Filtro brand | ✅ |
| Filtro disponibilità | ✅ |
| Filtro merchant/venditore | ✅ (facet dall'API) |
| Link a pagina acquisto | ✅ |
| Accessibile senza login | ✅ |
| Contact info sul sito | ✅ (serve indirizzo completo) |
| Business address | ⚠️ Serve indirizzo reale |
| Privacy Policy | ✅ (serve review legale) |
| Terms of Service | ✅ (serve review legale) |
| About page | ✅ |
| Lingua/valuta corretta | ✅ (5 lingue) |
| Multi-paese | ✅ (6 paesi) |
| Favicon/Icons | ✅ |
| OG Image | ✅ |
| Sitemap con hreflang | ✅ |
| Schema.org JSON-LD | ✅ |
