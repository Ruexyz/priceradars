'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Toggle Group component inspired by Parallel.ai's Human/Machine toggle
 * https://parallel.ai/
 * 
 * A pill-shaped toggle between two or more options
 */

interface ToggleOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface ToggleGroupProps {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

export function ToggleGroup({
  options,
  value,
  onChange,
  className,
  size = 'default',
}: ToggleGroupProps) {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    default: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-gray-200 bg-white p-1',
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            // Base
            'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150',
            sizeClasses[size],
            // Active/Inactive states
            value === option.value
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:text-gray-900'
          )}
        >
          {option.icon && (
            <span className="flex items-center">{option.icon}</span>
          )}
          <span className="uppercase tracking-wide">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

/**
 * Simple binary toggle switch (On/Off style)
 */
interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  className,
  size = 'default',
}: ToggleSwitchProps) {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    default: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
  }

  const s = sizes[size]

  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
          s.track,
          checked ? 'bg-orange-500' : 'bg-gray-200'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0 transition-transform duration-200',
            s.thumb,
            'absolute top-0.5 left-0.5',
            checked && s.translate
          )}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-gray-900">{label}</span>
      )}
    </label>
  )
}

/**
 * Segmented control (iOS style / Parallel benchmark tabs style)
 */
interface SegmentedControlProps {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  fullWidth?: boolean
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
  fullWidth = false,
}: SegmentedControlProps) {
  const activeIndex = options.findIndex((o) => o.value === value)

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-lg bg-gray-100 p-1',
        fullWidth && 'w-full',
        className
      )}
      role="radiogroup"
    >
      {/* Animated background indicator */}
      <div
        className="absolute top-1 bottom-1 rounded-md bg-white shadow-sm transition-all duration-200"
        style={{
          width: `calc(${100 / options.length}% - 4px)`,
          left: `calc(${(activeIndex * 100) / options.length}% + 2px)`,
        }}
      />
      
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            // Base
            'relative z-10 flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150',
            // Active/Inactive states
            value === option.value
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {option.icon && (
            <span className="flex items-center">{option.icon}</span>
          )}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  )
}
