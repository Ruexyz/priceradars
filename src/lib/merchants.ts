export interface Merchant {
  id: string
  name: string
  countryCode: string
  logoUrl?: string
  baseUrl: string
  affiliateProgram?: string
}

export const merchants: Record<string, Merchant> = {
  // Italy
  'amazon-it': {
    id: 'amazon-it',
    name: 'Amazon.it',
    countryCode: 'IT',
    baseUrl: 'https://www.amazon.it',
    affiliateProgram: 'amazon-associates',
  },
  'mediaworld': {
    id: 'mediaworld',
    name: 'MediaWorld',
    countryCode: 'IT',
    baseUrl: 'https://www.mediaworld.it',
  },
  'unieuro': {
    id: 'unieuro',
    name: 'Unieuro',
    countryCode: 'IT',
    baseUrl: 'https://www.unieuro.it',
  },
  'ebay-it': {
    id: 'ebay-it',
    name: 'eBay.it',
    countryCode: 'IT',
    baseUrl: 'https://www.ebay.it',
    affiliateProgram: 'ebay-partner',
  },
  'eprice': {
    id: 'eprice',
    name: 'ePrice',
    countryCode: 'IT',
    baseUrl: 'https://www.eprice.it',
  },

  // UK
  'amazon-uk': {
    id: 'amazon-uk',
    name: 'Amazon.co.uk',
    countryCode: 'GB',
    baseUrl: 'https://www.amazon.co.uk',
    affiliateProgram: 'amazon-associates',
  },
  'currys': {
    id: 'currys',
    name: 'Currys',
    countryCode: 'GB',
    baseUrl: 'https://www.currys.co.uk',
  },
  'argos': {
    id: 'argos',
    name: 'Argos',
    countryCode: 'GB',
    baseUrl: 'https://www.argos.co.uk',
  },
  'john-lewis': {
    id: 'john-lewis',
    name: 'John Lewis',
    countryCode: 'GB',
    baseUrl: 'https://www.johnlewis.com',
  },
  'ao': {
    id: 'ao',
    name: 'AO.com',
    countryCode: 'GB',
    baseUrl: 'https://ao.com',
  },

  // USA
  'amazon-us': {
    id: 'amazon-us',
    name: 'Amazon.com',
    countryCode: 'US',
    baseUrl: 'https://www.amazon.com',
    affiliateProgram: 'amazon-associates',
  },
  'bestbuy': {
    id: 'bestbuy',
    name: 'Best Buy',
    countryCode: 'US',
    baseUrl: 'https://www.bestbuy.com',
  },
  'walmart': {
    id: 'walmart',
    name: 'Walmart',
    countryCode: 'US',
    baseUrl: 'https://www.walmart.com',
  },
  'newegg': {
    id: 'newegg',
    name: 'Newegg',
    countryCode: 'US',
    baseUrl: 'https://www.newegg.com',
  },
  'bh': {
    id: 'bh',
    name: 'B&H Photo',
    countryCode: 'US',
    baseUrl: 'https://www.bhphotovideo.com',
  },

  // Germany
  'amazon-de': {
    id: 'amazon-de',
    name: 'Amazon.de',
    countryCode: 'DE',
    baseUrl: 'https://www.amazon.de',
    affiliateProgram: 'amazon-associates',
  },
  'mediamarkt-de': {
    id: 'mediamarkt-de',
    name: 'MediaMarkt',
    countryCode: 'DE',
    baseUrl: 'https://www.mediamarkt.de',
  },
  'saturn': {
    id: 'saturn',
    name: 'Saturn',
    countryCode: 'DE',
    baseUrl: 'https://www.saturn.de',
  },
  'otto': {
    id: 'otto',
    name: 'Otto',
    countryCode: 'DE',
    baseUrl: 'https://www.otto.de',
  },
  'cyberport': {
    id: 'cyberport',
    name: 'Cyberport',
    countryCode: 'DE',
    baseUrl: 'https://www.cyberport.de',
  },

  // France
  'amazon-fr': {
    id: 'amazon-fr',
    name: 'Amazon.fr',
    countryCode: 'FR',
    baseUrl: 'https://www.amazon.fr',
    affiliateProgram: 'amazon-associates',
  },
  'fnac': {
    id: 'fnac',
    name: 'Fnac',
    countryCode: 'FR',
    baseUrl: 'https://www.fnac.com',
  },
  'darty': {
    id: 'darty',
    name: 'Darty',
    countryCode: 'FR',
    baseUrl: 'https://www.darty.com',
  },
  'cdiscount': {
    id: 'cdiscount',
    name: 'Cdiscount',
    countryCode: 'FR',
    baseUrl: 'https://www.cdiscount.com',
  },
  'boulanger': {
    id: 'boulanger',
    name: 'Boulanger',
    countryCode: 'FR',
    baseUrl: 'https://www.boulanger.com',
  },

  // Spain
  'amazon-es': {
    id: 'amazon-es',
    name: 'Amazon.es',
    countryCode: 'ES',
    baseUrl: 'https://www.amazon.es',
    affiliateProgram: 'amazon-associates',
  },
  'pccomponentes': {
    id: 'pccomponentes',
    name: 'PcComponentes',
    countryCode: 'ES',
    baseUrl: 'https://www.pccomponentes.com',
  },
  'mediamarkt-es': {
    id: 'mediamarkt-es',
    name: 'MediaMarkt',
    countryCode: 'ES',
    baseUrl: 'https://www.mediamarkt.es',
  },
  'elcorteingles': {
    id: 'elcorteingles',
    name: 'El Corte Inglés',
    countryCode: 'ES',
    baseUrl: 'https://www.elcorteingles.es',
  },
}

export function getMerchantsByCountry(countryCode: string): Merchant[] {
  return Object.values(merchants).filter(
    (m) => m.countryCode === countryCode.toUpperCase()
  )
}

export function getMerchant(id: string): Merchant | undefined {
  return merchants[id]
}
