'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SortSelectProps {
  currentSort: string
  dictionary: {
    sortBy: string
    sortOptions: {
      relevance: string
      priceLow: string
      priceHigh: string
      newest: string
      popular: string
    }
  }
}

export function SortSelect({ currentSort, dictionary }: SortSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">{dictionary.sortBy}:</span>
      <Select value={currentSort || 'relevance'} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">{dictionary.sortOptions.relevance}</SelectItem>
          <SelectItem value="price_asc">{dictionary.sortOptions.priceLow}</SelectItem>
          <SelectItem value="price_desc">{dictionary.sortOptions.priceHigh}</SelectItem>
          <SelectItem value="newest">{dictionary.sortOptions.newest}</SelectItem>
          <SelectItem value="popular">{dictionary.sortOptions.popular}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
