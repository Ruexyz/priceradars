'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, 
  Clock, 
  TrendingUp, 
  X, 
  Mic, 
  MicOff,
  Package,
  Tag,
  Building2,
  Loader2,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { useSearch, type SearchSuggestion } from '@/lib/search/use-search'
import type { Locale, CountryCode } from '@/lib/countries'

interface SearchBarAdvancedProps {
  locale: Locale
  country: CountryCode
  placeholder: string
  defaultValue?: string
  size?: 'default' | 'large'
  className?: string
  autoFocus?: boolean
}

// Voice search hook
function useVoiceSearch(
  onResult: (text: string) => void,
  locale: string
) {
  const [isListening, setIsListening] = React.useState(false)
  const [isSupported, setIsSupported] = React.useState(false)
  const recognitionRef = React.useRef<SpeechRecognition | null>(null)
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = locale === 'it' ? 'it-IT' : 'en-US'
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        onResult(transcript)
        setIsListening(false)
      }
      
      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
    
    return () => {
      recognitionRef.current?.abort()
    }
  }, [locale, onResult])
  
  const startListening = React.useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch {
        // Already started
      }
    }
  }, [isListening])
  
  const stopListening = React.useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [isListening])
  
  return { isListening, isSupported, startListening, stopListening }
}

// Suggestion icon component
function SuggestionIcon({ type }: { type: SearchSuggestion['type'] }) {
  switch (type) {
    case 'recent':
      return <Clock className="h-4 w-4 text-gray-400" />
    case 'trending':
      return <TrendingUp className="h-4 w-4 text-orange-500" />
    case 'product':
      return <Package className="h-4 w-4 text-gray-400" />
    case 'category':
      return <Tag className="h-4 w-4 text-gray-400" />
    case 'brand':
      return <Building2 className="h-4 w-4 text-gray-400" />
    default:
      return <Search className="h-4 w-4 text-gray-400" />
  }
}

// Highlight matching text
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query || query.length < 2) {
    return <span>{text}</span>
  }
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-orange-100 text-orange-700 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

export function SearchBarAdvanced({
  locale,
  country,
  placeholder,
  defaultValue = '',
  size = 'default',
  className,
  autoFocus = false,
}: SearchBarAdvancedProps) {
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const formRef = React.useRef<HTMLFormElement>(null)
  
  const navigateToSearch = React.useCallback((searchQuery: string) => {
    const searchUrl = locale === 'it'
      ? `/it/cerca?q=${encodeURIComponent(searchQuery)}`
      : `/en/${country}/search?q=${encodeURIComponent(searchQuery)}`
    router.push(searchUrl)
  }, [locale, country, router])
  
  const {
    query,
    setQuery,
    suggestions,
    isLoading,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    recentSearches,
    clearRecentSearches,
    removeRecentSearch,
    handleKeyDown,
    handleSubmit,
  } = useSearch({
    locale,
    country,
    onSearch: navigateToSearch,
  })
  
  // Voice search
  const { isListening, isSupported: voiceSupported, startListening, stopListening } = useVoiceSearch(
    (text) => {
      setQuery(text)
      navigateToSearch(text)
    },
    locale
  )
  
  // Set default value
  React.useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue)
    }
  }, [defaultValue, setQuery])
  
  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text)
    setIsOpen(false)
    
    if (suggestion.type === 'product' && suggestion.slug) {
      // Navigate directly to product
      const productUrl = locale === 'it'
        ? `/it/prodotto/${suggestion.slug}`
        : `/en/${country}/product/${suggestion.slug}`
      router.push(productUrl)
    } else if (suggestion.type === 'category' && suggestion.slug) {
      // Navigate to category
      const categoryUrl = locale === 'it'
        ? `/it/categoria/${suggestion.slug}`
        : `/en/${country}/category/${suggestion.slug}`
      router.push(categoryUrl)
    } else {
      navigateToSearch(suggestion.text)
    }
  }
  
  // Labels for accessibility
  const labels = {
    it: {
      search: 'Cerca',
      clearSearch: 'Cancella ricerca',
      voiceSearch: 'Ricerca vocale',
      stopVoiceSearch: 'Ferma ricerca vocale',
      recentSearches: 'Ricerche recenti',
      trendingSearches: 'Di tendenza',
      clearRecent: 'Cancella cronologia',
      removeFromHistory: 'Rimuovi dalla cronologia',
      viewProduct: 'Vai al prodotto',
      searchFor: 'Cerca',
    },
    en: {
      search: 'Search',
      clearSearch: 'Clear search',
      voiceSearch: 'Voice search',
      stopVoiceSearch: 'Stop voice search',
      recentSearches: 'Recent searches',
      trendingSearches: 'Trending',
      clearRecent: 'Clear history',
      removeFromHistory: 'Remove from history',
      viewProduct: 'View product',
      searchFor: 'Search for',
    },
  }
  
  const t = labels[locale as keyof typeof labels] || labels.en
  
  // Group suggestions by type
  const groupedSuggestions = React.useMemo(() => {
    const groups: Record<string, SearchSuggestion[]> = {
      recent: [],
      trending: [],
      product: [],
      category: [],
      brand: [],
    }
    
    suggestions.forEach(s => {
      if (groups[s.type]) {
        groups[s.type].push(s)
      }
    })
    
    return groups
  }, [suggestions])
  
  const hasRecentSearches = groupedSuggestions.recent.length > 0
  const hasTrendingSearches = groupedSuggestions.trending.length > 0
  const hasProducts = groupedSuggestions.product.length > 0
  const hasCategories = groupedSuggestions.category.length > 0 || groupedSuggestions.brand.length > 0
  
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn('relative w-full', className)}
      role="search"
    >
      <div
        className={cn(
          'relative flex items-center',
          size === 'large' ? 'h-14' : 'h-10'
        )}
      >
        {/* Search icon / Loading spinner */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          {isLoading ? (
            <Loader2 
              className={cn(
                'animate-spin text-orange-500',
                size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
              )} 
            />
          ) : (
            <Search
              className={cn(
                'text-gray-400',
                size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
              )}
            />
          )}
        </div>
        
        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label={t.search}
          aria-haspopup="listbox"
          className={cn(
            'h-full w-full border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500',
            'focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20',
            'transition-all duration-200',
            size === 'large' 
              ? 'rounded-xl pl-12 pr-28 text-lg' 
              : 'rounded-lg pl-10 pr-24 text-sm',
            isListening && 'border-orange-500 ring-2 ring-orange-500/20'
          )}
        />
        
        {/* Right side buttons */}
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label={t.clearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {/* Voice search button */}
          {voiceSupported && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={cn(
                'rounded-full p-1.5 transition-colors',
                isListening 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              )}
              aria-label={isListening ? t.stopVoiceSearch : t.voiceSearch}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 animate-pulse" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          )}
          
          {/* Submit button */}
          <Button
            type="submit"
            size={size === 'large' ? 'default' : 'sm'}
            className="shrink-0"
          >
            <Search className={size === 'large' ? 'mr-2 h-4 w-4' : 'h-4 w-4'} />
            <span className={size === 'large' ? 'inline' : 'sr-only'}>
              {t.search}
            </span>
          </Button>
        </div>
      </div>
      
      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          className={cn(
            'absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl',
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
        >
          {/* Recent Searches */}
          {hasRecentSearches && (
            <div className="border-b border-gray-100 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {t.recentSearches}
                </span>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="text-xs text-orange-600 transition-colors hover:text-orange-700"
                >
                  {t.clearRecent}
                </button>
              </div>
              <div className="space-y-1">
                {groupedSuggestions.recent.map((suggestion, index) => {
                  const globalIndex = index
                  return (
                    <div
                      key={`recent-${suggestion.text}`}
                      id={`suggestion-${globalIndex}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(suggestion)}
                      tabIndex={0}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                        selectedIndex === globalIndex
                          ? 'bg-orange-50 text-orange-700'
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <SuggestionIcon type="recent" />
                      <span className="flex-1 text-sm">
                        <HighlightMatch text={suggestion.text} query={query} />
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeRecentSearch(suggestion.text)
                        }}
                        className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                        aria-label={t.removeFromHistory}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* Trending Searches */}
          {hasTrendingSearches && (
            <div className="border-b border-gray-100 p-3">
              <div className="mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {t.trendingSearches}
                </span>
              </div>
              <div className="space-y-1">
                {groupedSuggestions.trending.map((suggestion, index) => {
                  const globalIndex = groupedSuggestions.recent.length + index
                  return (
                    <div
                      key={`trending-${suggestion.text}`}
                      id={`suggestion-${globalIndex}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(suggestion)}
                      tabIndex={0}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                        selectedIndex === globalIndex
                          ? 'bg-orange-50 text-orange-700'
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <SuggestionIcon type="trending" />
                      <span className="flex-1 text-sm font-medium">
                        {suggestion.text}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-300" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* Product Suggestions */}
          {hasProducts && (
            <div className="border-b border-gray-100 p-3">
              <div className="space-y-1">
                {groupedSuggestions.product.map((suggestion, index) => {
                  const globalIndex = 
                    groupedSuggestions.recent.length + 
                    groupedSuggestions.trending.length + 
                    index
                  return (
                    <div
                      key={`product-${suggestion.slug}`}
                      id={`suggestion-${globalIndex}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(suggestion)}
                      tabIndex={0}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                        selectedIndex === globalIndex
                          ? 'bg-orange-50 text-orange-700'
                          : 'hover:bg-gray-50'
                      )}
                    >
                      {suggestion.image ? (
                        <img
                          src={suggestion.image}
                          alt=""
                          className="h-10 w-10 rounded-lg bg-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          <HighlightMatch text={suggestion.text} query={query} />
                        </p>
                        {suggestion.price && (
                          <p className="text-sm font-semibold text-orange-600">
                            {formatPrice(suggestion.price, suggestion.currency || 'EUR', locale)}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gray-300" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* Category & Brand Suggestions */}
          {hasCategories && (
            <div className="p-3">
              <div className="flex flex-wrap gap-2">
                {[...groupedSuggestions.category, ...groupedSuggestions.brand].map((suggestion, index) => {
                  const globalIndex = 
                    groupedSuggestions.recent.length + 
                    groupedSuggestions.trending.length + 
                    groupedSuggestions.product.length +
                    index
                  return (
                    <div
                      key={`cat-${suggestion.text}`}
                      id={`suggestion-${globalIndex}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(suggestion)}
                      tabIndex={0}
                      className={cn(
                        'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors',
                        selectedIndex === globalIndex
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      )}
                    >
                      <SuggestionIcon type={suggestion.type} />
                      <span>{suggestion.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* Search for query footer */}
          {query && (
            <div className="border-t border-gray-100 bg-gray-50 p-3">
              <button
                type="submit"
                className="flex w-full items-center gap-2 text-sm text-gray-600 transition-colors hover:text-orange-600"
              >
                <Search className="h-4 w-4" />
                <span>
                  {t.searchFor} &quot;<strong>{query}</strong>&quot;
                </span>
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Voice listening overlay */}
      {isListening && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <Mic className="h-10 w-10 animate-pulse text-orange-600" />
            </div>
            <p className="text-lg font-medium text-gray-900">
              {locale === 'it' ? 'Ascoltando...' : 'Listening...'}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {locale === 'it' ? 'Parla ora' : 'Speak now'}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={stopListening}
            >
              {locale === 'it' ? 'Annulla' : 'Cancel'}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
