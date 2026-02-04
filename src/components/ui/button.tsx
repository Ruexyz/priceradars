import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button variants inspired by Parallel.ai - minimal, elegant, modern
 * https://parallel.ai/
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none',
  {
    variants: {
      variant: {
        // Primary - solid orange with subtle hover
        default:
          'bg-orange-500 text-white rounded-full hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] focus-visible:ring-orange-500',
        // Secondary - subtle gray
        secondary:
          'bg-gray-900 text-white rounded-full hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/25 active:scale-[0.98] focus-visible:ring-gray-500',
        // Outline - clean border style (Parallel style)
        outline:
          'border border-gray-200 bg-white text-gray-900 rounded-full hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] focus-visible:ring-gray-500',
        // Ghost - no background
        ghost: 
          'text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500',
        // Link style
        link: 
          'text-orange-500 underline-offset-4 hover:underline hover:text-orange-600 focus-visible:ring-orange-500',
        // Destructive
        destructive: 
          'bg-red-500 text-white rounded-full hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98] focus-visible:ring-red-500',
        // Glass effect (modern)
        glass:
          'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-900 rounded-full hover:bg-white hover:border-gray-300 hover:shadow-lg active:scale-[0.98] focus-visible:ring-gray-500',
        // Gradient (premium feel)
        gradient:
          'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] focus-visible:ring-orange-500',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10 rounded-full',
        'icon-sm': 'h-8 w-8 rounded-full',
        'icon-lg': 'h-12 w-12 rounded-full',
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
