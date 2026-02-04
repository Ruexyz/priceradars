'use client'

import { useMemo } from 'react'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Locale } from '@/lib/countries'

interface PricePoint {
  date: string
  price: number
}

interface PriceChartProps {
  priceHistory: PricePoint[]
  currency: string
  locale: Locale
  dictionary: {
    priceHistory: string
    currentLowest: string
    averagePrice: string
    highestPrice: string
    priceChange: string
  }
}

export function PriceChart({
  priceHistory,
  currency,
  locale,
  dictionary,
}: PriceChartProps) {
  const stats = useMemo(() => {
    if (priceHistory.length === 0) {
      return null
    }

    const prices = priceHistory.map((p) => p.price)
    const current = prices[prices.length - 1]
    const lowest = Math.min(...prices)
    const highest = Math.max(...prices)
    const average = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    
    // Calculate change from 30 days ago (or earliest if less data)
    const oldPrice = prices[0]
    const changePercent = ((current - oldPrice) / oldPrice) * 100

    return {
      current,
      lowest,
      highest,
      average,
      changePercent,
    }
  }, [priceHistory])

  if (!stats) {
    return null
  }

  const { current, lowest, highest, average, changePercent } = stats

  // Simple SVG line chart
  const chartWidth = 600
  const chartHeight = 200
  const padding = 40

  const minPrice = lowest * 0.95
  const maxPrice = highest * 1.05
  const priceRange = maxPrice - minPrice

  const points = priceHistory.map((point, index) => {
    const x = padding + (index / (priceHistory.length - 1)) * (chartWidth - padding * 2)
    const y = chartHeight - padding - ((point.price - minPrice) / priceRange) * (chartHeight - padding * 2)
    return { x, y, price: point.price, date: point.date }
  })

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  // Area fill path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        {dictionary.priceHistory}
      </h3>

      {/* Stats Grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">{dictionary.currentLowest}</p>
          <p className="mt-1 text-lg font-bold text-orange-500">
            {formatPrice(current, currency, locale)}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">{dictionary.averagePrice}</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatPrice(average, currency, locale)}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">{dictionary.highestPrice}</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatPrice(highest, currency, locale)}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">{dictionary.priceChange}</p>
          <div className="mt-1 flex items-center gap-1">
            {changePercent < 0 ? (
              <TrendingDown className="h-4 w-4 text-green-500" />
            ) : changePercent > 0 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <Minus className="h-4 w-4 text-gray-500" />
            )}
            <span
              className={`text-lg font-semibold ${
                changePercent < 0
                  ? 'text-green-500'
                  : changePercent > 0
                  ? 'text-red-500'
                  : 'text-gray-500'
              }`}
            >
              {changePercent > 0 ? '+' : ''}
              {changePercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-48 w-full min-w-[400px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartHeight - padding - ratio * (chartHeight - padding * 2)
            const price = minPrice + ratio * priceRange
            return (
              <g key={ratio}>
                <line
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke="#e5e5e5"
                  strokeDasharray="4"
                />
                <text
                  x={padding - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-gray-400 text-[10px]"
                >
                  {formatPrice(Math.round(price), currency, locale)}
                </text>
              </g>
            )
          })}

          {/* Area fill */}
          <path d={areaD} fill="url(#gradient)" opacity="0.3" />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#FF6B00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#FF6B00"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer"
            >
              <title>
                {point.date}: {formatPrice(point.price, currency, locale)}
              </title>
            </circle>
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Date labels */}
      <div className="mt-2 flex justify-between px-10 text-xs text-gray-400">
        <span>{priceHistory[0]?.date}</span>
        <span>{priceHistory[priceHistory.length - 1]?.date}</span>
      </div>
    </div>
  )
}
