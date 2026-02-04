import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button variants inspired by Parallel.ai
 * https://parallel.ai/
 * 
 * Features:
 * - Sharp, rigid borders (not fully rounded)
 * - Clean black/white/orange color scheme
 * - Subtle hover states
 * - Optional keyboard shortcut display
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide uppercase transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none',
  {
    variants: {
      variant: {
        // Primary - solid orange (Parallel style)
        default:
          'bg-orange-500 text-white rounded-md border border-orange-500 hover:bg-orange-600 hover:border-orange-600 active:scale-[0.98] focus-visible:ring-orange-500',
        // Secondary - solid black
        secondary:
          'bg-gray-900 text-white rounded-md border border-gray-900 hover:bg-black active:scale-[0.98] focus-visible:ring-gray-500',
        // Outline - black border (Parallel style)
        outline:
          'border border-gray-900 bg-white text-gray-900 rounded-md hover:bg-gray-900 hover:text-white active:scale-[0.98] focus-visible:ring-gray-500',
        // Outline Light - gray border
        'outline-light':
          'border border-gray-300 bg-white text-gray-700 rounded-md hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98] focus-visible:ring-gray-500',
        // Ghost - no background
        ghost: 
          'text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500',
        // Link style
        link: 
          'text-orange-500 underline-offset-4 hover:underline hover:text-orange-600 focus-visible:ring-orange-500 normal-case tracking-normal',
        // Destructive
        destructive: 
          'bg-red-600 text-white rounded-md border border-red-600 hover:bg-red-700 hover:border-red-700 active:scale-[0.98] focus-visible:ring-red-500',
        // White - for dark backgrounds
        white:
          'bg-white text-gray-900 rounded-md border border-white hover:bg-gray-100 active:scale-[0.98] focus-visible:ring-white',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-11 px-6 text-sm',
        xl: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
