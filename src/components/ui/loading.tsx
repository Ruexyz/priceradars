'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-200 border-t-orange-500',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-lg bg-gray-200" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

export function FiltersSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 w-20 bg-gray-200 rounded" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3 border-t border-gray-200 pt-4">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function PriceTableSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}

export function SearchBarSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
  )
}

export function BreadcrumbSkeleton() {
  return (
    <div className="animate-pulse flex items-center gap-2">
      <div className="h-4 w-12 bg-gray-200 rounded" />
      <div className="h-4 w-4 bg-gray-200 rounded" />
      <div className="h-4 w-24 bg-gray-200 rounded" />
    </div>
  )
}
