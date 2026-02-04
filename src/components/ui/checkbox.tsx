'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center gap-3 text-sm text-gray-700 transition-colors duration-300 ease-in-out hover:text-gray-900"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white transition-all duration-300 ease-in-out peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-2',
              className
            )}
          >
            <Check className="h-3 w-3 text-white opacity-0 transition-opacity duration-300 peer-checked:opacity-100" />
          </div>
        </div>
        {label && <span>{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
