'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  step?: number
  className?: string
}

export function Slider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className,
}: SliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const currentValueRef = React.useRef(value)

  // Keep ref in sync with value prop
  React.useEffect(() => {
    currentValueRef.current = value
  }, [value])

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100

  const handleMouseDown = (index: 0 | 1) => (e: React.MouseEvent) => {
    e.preventDefault()
    const track = trackRef.current
    if (!track) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = track.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const rawValue = min + percent * (max - min)
      const newValue = Math.round(rawValue / step) * step

      const newValues: [number, number] = [...currentValueRef.current] as [number, number]
      newValues[index] = newValue

      // Ensure min <= max
      if (index === 0 && newValue > currentValueRef.current[1]) {
        newValues[0] = currentValueRef.current[1]
      } else if (index === 1 && newValue < currentValueRef.current[0]) {
        newValues[1] = currentValueRef.current[0]
      }

      // Clamp values to range
      newValues[0] = Math.max(min, Math.min(max, newValues[0]))
      newValues[1] = Math.max(min, Math.min(max, newValues[1]))

      currentValueRef.current = newValues
      // Update in real-time
      onChange(newValues)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Touch support
  const handleTouchStart = (index: 0 | 1) => (e: React.TouchEvent) => {
    e.preventDefault()
    const track = trackRef.current
    if (!track) return

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const rect = track.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
      const rawValue = min + percent * (max - min)
      const newValue = Math.round(rawValue / step) * step

      const newValues: [number, number] = [...currentValueRef.current] as [number, number]
      newValues[index] = newValue

      if (index === 0 && newValue > currentValueRef.current[1]) {
        newValues[0] = currentValueRef.current[1]
      } else if (index === 1 && newValue < currentValueRef.current[0]) {
        newValues[1] = currentValueRef.current[0]
      }

      newValues[0] = Math.max(min, Math.min(max, newValues[0]))
      newValues[1] = Math.max(min, Math.min(max, newValues[1]))

      currentValueRef.current = newValues
      onChange(newValues)
    }

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }

  const leftPercent = getPercent(value[0])
  const rightPercent = getPercent(value[1])

  return (
    <div className={cn('relative py-4', className)}>
      <div
        ref={trackRef}
        className="relative h-1 w-full rounded-full bg-gray-200"
      >
        {/* Active track */}
        <div
          className="absolute h-full rounded-full bg-orange-500 transition-none"
          style={{
            left: `${leftPercent}%`,
            width: `${rightPercent - leftPercent}%`,
          }}
        />

        {/* Left handle */}
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-orange-500 bg-white shadow-md transition-transform duration-150 hover:scale-110 active:scale-110"
          style={{ left: `${leftPercent}%` }}
          onMouseDown={handleMouseDown(0)}
          onTouchStart={handleTouchStart(0)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value[0]}
          tabIndex={0}
        />

        {/* Right handle */}
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-orange-500 bg-white shadow-md transition-transform duration-150 hover:scale-110 active:scale-110"
          style={{ left: `${rightPercent}%` }}
          onMouseDown={handleMouseDown(1)}
          onTouchStart={handleTouchStart(1)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value[1]}
          tabIndex={0}
        />
      </div>
    </div>
  )
}
