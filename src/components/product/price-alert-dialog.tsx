'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import type { Locale } from '@/lib/countries'

interface PriceAlertDialogProps {
  productName: string
  currentPrice: number
  currency: string
  locale: Locale
  dictionary: {
    priceDropAlert: string
    alertDescription: string
    setAlert: string
  }
}

export function PriceAlertDialog({
  productName,
  currentPrice,
  currency,
  locale,
  dictionary,
}: PriceAlertDialogProps) {
  const [targetPrice, setTargetPrice] = useState(
    Math.round(currentPrice * 0.9).toString()
  )
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement price alert API call
    console.log('Set price alert:', {
      productName,
      targetPrice: parseInt(targetPrice),
      email,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          {dictionary.priceDropAlert}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dictionary.priceDropAlert}</DialogTitle>
          <DialogDescription>
            {dictionary.alertDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                {locale === 'it' ? 'Prodotto' : 'Product'}
              </label>
              <p className="mt-1 text-sm text-gray-900">{productName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                {locale === 'it' ? 'Prezzo attuale' : 'Current price'}
              </label>
              <p className="mt-1 text-lg font-semibold text-orange-500">
                {formatPrice(currentPrice, currency, locale)}
              </p>
            </div>
            <div>
              <label
                htmlFor="targetPrice"
                className="text-sm font-medium text-gray-700"
              >
                {locale === 'it' ? 'Avvisami quando scende sotto' : 'Alert me when price drops below'}
              </label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'}
                </span>
                <Input
                  id="targetPrice"
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="pl-8"
                  min="0"
                  step="1"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={locale === 'it' ? 'Il tuo indirizzo email' : 'Your email address'}
                className="mt-1"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {locale === 'it' ? 'Annulla' : 'Cancel'}
            </Button>
            <Button type="submit">{dictionary.setAlert}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
