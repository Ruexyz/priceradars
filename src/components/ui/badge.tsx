import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge/Pill component inspired by Parallel.ai
 * https://parallel.ai/
 * 
 * Clean, minimal badges for tags, labels, and status indicators
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        // Default - subtle gray
        default:
          'bg-gray-100 text-gray-700 hover:bg-gray-200',
        // Primary - orange accent
        primary:
          'bg-orange-100 text-orange-700 hover:bg-orange-200',
        // Secondary - darker
        secondary:
          'bg-gray-900 text-white',
        // Success - green
        success:
          'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
        // Warning - yellow
        warning:
          'bg-amber-100 text-amber-700 hover:bg-amber-200',
        // Destructive - red
        destructive:
          'bg-red-100 text-red-700 hover:bg-red-200',
        // Outline - border only
        outline:
          'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300',
        // Glass effect
        glass:
          'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-md',
        default: 'text-xs px-2.5 py-1 rounded-lg',
        lg: 'text-sm px-3 py-1.5 rounded-lg',
      },
      rounded: {
        default: '',
        full: '!rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, rounded, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
