'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  alt: string
  badge?: React.ReactNode
}

export function ImageGallery({ images, alt, badge }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const currentImage = images[selectedIndex] || images[0] || ''

  if (!currentImage) return null

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square max-w-sm mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <Image
          src={currentImage}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 50vw, 384px"
          className="object-contain p-6"
          priority
        />
        {badge && (
          <div className="absolute left-4 top-4">
            {badge}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all duration-150',
                selectedIndex === i
                  ? 'border-orange-500 ring-1 ring-orange-500/20'
                  : 'border-gray-200 hover:border-gray-300'
              )}
              aria-label={`${alt} - ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} - ${i + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
