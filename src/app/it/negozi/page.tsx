import { Metadata } from 'next'
import { Store, ExternalLink } from 'lucide-react'
import { getMerchants } from '@/lib/api/price-ninja'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Negozi Partner',
  description: 'Elenco dei negozi online confrontati da PriceRadars in Italia. Confrontiamo i prezzi dai principali rivenditori.',
}

export default async function MerchantsPage() {
  const merchants = await getMerchants('it')

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Negozi Partner</h1>
        <p className="mt-3 text-gray-600">
          Confrontiamo i prezzi da {merchants.length} negozi online in Italia per trovare l'offerta migliore per te.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {merchants.map((merchant) => (
          <div
            key={merchant.id}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-colors hover:border-gray-200"
          >
            {merchant.logoUrl ? (
              <img
                src={merchant.logoUrl}
                alt={merchant.name}
                className="h-10 w-10 shrink-0 rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Store className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900">{merchant.name}</p>
              {merchant.domain && (
                <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  {merchant.domain}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-gray-100 bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600">
          PriceRadars confronta automaticamente i prezzi da tutti questi negozi.
          I prezzi vengono aggiornati regolarmente per garantire la massima accuratezza.
        </p>
      </div>
    </div>
  )
}
