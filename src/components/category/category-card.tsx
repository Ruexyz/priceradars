import Link from 'next/link'
import {
  Smartphone,
  Laptop,
  Tv,
  Refrigerator,
  Gamepad2,
  Camera,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  smartphones: Smartphone,
  laptops: Laptop,
  'tv-audio': Tv,
  appliances: Refrigerator,
  gaming: Gamepad2,
  cameras: Camera,
}

interface CategoryCardProps {
  category: {
    slug: string
    name: string
    productCount?: number
  }
  href: string
  size?: 'default' | 'large'
}

export function CategoryCard({
  category,
  href,
  size = 'default',
}: CategoryCardProps) {
  const Icon = iconMap[category.slug] || Smartphone

  return (
    <Link href={href}>
      <div
        className={cn(
          'group flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 ease-in-out hover:border-orange-500 hover:shadow-lg',
          size === 'large' ? 'gap-4 p-8' : 'gap-3'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out group-hover:bg-orange-50 group-hover:text-orange-500',
            size === 'large' ? 'h-16 w-16' : 'h-12 w-12'
          )}
        >
          <Icon className={size === 'large' ? 'h-8 w-8' : 'h-6 w-6'} />
        </div>
        <div>
          <h3
            className={cn(
              'font-medium text-gray-900 transition-colors duration-300 ease-in-out group-hover:text-orange-500',
              size === 'large' ? 'text-lg' : 'text-sm'
            )}
          >
            {category.name}
          </h3>
          {category.productCount !== undefined && (
            <p className="mt-1 text-xs text-gray-500">
              {category.productCount.toLocaleString()} products
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
