import Link from 'next/link'
import { Search, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. 
        It might have been moved or deleted.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/en/uk/search" className="gap-2">
            <Search className="h-4 w-4" />
            Search Products
          </Link>
        </Button>
      </div>
    </div>
  )
}
