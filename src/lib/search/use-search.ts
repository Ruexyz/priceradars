'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

const RECENT_SEARCHES_KEY = 'priceradars_recent_searches'
const MAX_RECENT_SEARCHES = 10
const DEBOUNCE_MS = 150

export interface SearchSuggestion {
  type: 'recent' | 'trending' | 'product' | 'category' | 'brand'
  text: string
  slug?: string
  image?: string
  price?: number
  currency?: string
}

export interface UseSearchOptions {
  locale: string
  country: string
  onSearch?: (query: string) => void
  debounceMs?: number
}

export interface UseSearchReturn {
  query: string
  setQuery: (query: string) => void
  suggestions: SearchSuggestion[]
  isLoading: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  recentSearches: string[]
  clearRecentSearches: () => void
  addRecentSearch: (query: string) => void
  removeRecentSearch: (query: string) => void
  handleKeyDown: (e: React.KeyboardEvent) => void
  handleSubmit: (e?: React.FormEvent) => void
  highlightedSuggestion: SearchSuggestion | null
}

// Trending searches (mock - in production, fetch from analytics)
const TRENDING_SEARCHES: Record<string, string[]> = {
  it: ['iPhone 15 Pro', 'MacBook Air M3', 'Samsung Galaxy S24', 'PlayStation 5', 'AirPods Pro'],
  en: ['iPhone 15 Pro', 'MacBook Air M3', 'Samsung Galaxy S24', 'PlayStation 5', 'AirPods Pro'],
}

// Category suggestions
const CATEGORY_SUGGESTIONS: Record<string, { text: string; slug: string }[]> = {
  it: [
    { text: 'Smartphone', slug: 'smartphone' },
    { text: 'Laptop', slug: 'laptop' },
    { text: 'TV', slug: 'tv' },
    { text: 'Audio', slug: 'audio' },
    { text: 'Gaming', slug: 'gaming' },
  ],
  en: [
    { text: 'Smartphones', slug: 'smartphones' },
    { text: 'Laptops', slug: 'laptops' },
    { text: 'TVs', slug: 'tv' },
    { text: 'Audio', slug: 'audio' },
    { text: 'Gaming', slug: 'gaming' },
  ],
}

/**
 * Custom hook for search functionality with:
 * - Debounced input
 * - Recent searches (localStorage)
 * - Trending searches
 * - Product suggestions
 * - Keyboard navigation
 */
export function useSearch({
  locale,
  country,
  onSearch,
  debounceMs = DEBOUNCE_MS,
}: UseSearchOptions): UseSearchReturn {
  const [query, setQueryInternal] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  
  const debounceRef = useRef<NodeJS.Timeout>()
  const abortControllerRef = useRef<AbortController>()
  
  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (stored) {
        setRecentSearches(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])
  
  // Save recent searches to localStorage
  const saveRecentSearches = useCallback((searches: string[]) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
    } catch {
      // Ignore localStorage errors
    }
  }, [])
  
  // Add recent search
  const addRecentSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== searchQuery.toLowerCase())
      const updated = [searchQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES)
      saveRecentSearches(updated)
      return updated
    })
  }, [saveRecentSearches])
  
  // Remove recent search
  const removeRecentSearch = useCallback((searchQuery: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(s => s !== searchQuery)
      saveRecentSearches(updated)
      return updated
    })
  }, [saveRecentSearches])
  
  // Clear all recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
    }
  }, [])
  
  // Debounced query setter
  const setQuery = useCallback((value: string) => {
    setQueryInternal(value)
    setSelectedIndex(-1)
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(value)
    }, debounceMs)
  }, [debounceMs])
  
  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      // Show recent + trending when no query
      const recentSuggestions: SearchSuggestion[] = recentSearches.slice(0, 5).map(text => ({
        type: 'recent',
        text,
      }))
      
      const trendingSuggestions: SearchSuggestion[] = (TRENDING_SEARCHES[locale] || TRENDING_SEARCHES.en)
        .filter(text => !recentSearches.includes(text))
        .slice(0, 5)
        .map(text => ({
          type: 'trending',
          text,
        }))
      
      setSuggestions([...recentSuggestions, ...trendingSuggestions])
      return
    }
    
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    
    const fetchSuggestions = async () => {
      setIsLoading(true)
      
      try {
        const response = await fetch(
          `/api/v1/search/suggestions?q=${encodeURIComponent(debouncedQuery)}&locale=${locale}&country=${country}`,
          { signal: abortController.signal }
        )
        
        if (!response.ok) throw new Error('Failed to fetch suggestions')
        
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
        
        // Fallback: filter recent searches + categories locally
        const queryLower = debouncedQuery.toLowerCase()
        
        const matchingRecent: SearchSuggestion[] = recentSearches
          .filter(s => s.toLowerCase().includes(queryLower))
          .slice(0, 3)
          .map(text => ({ type: 'recent', text }))
        
        const matchingCategories: SearchSuggestion[] = (CATEGORY_SUGGESTIONS[locale] || CATEGORY_SUGGESTIONS.en)
          .filter(c => c.text.toLowerCase().includes(queryLower))
          .slice(0, 2)
          .map(c => ({ type: 'category', text: c.text, slug: c.slug }))
        
        setSuggestions([...matchingRecent, ...matchingCategories])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSuggestions()
    
    return () => {
      abortController.abort()
    }
  }, [debouncedQuery, locale, country, recentSearches])
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true)
        e.preventDefault()
      }
      return
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
        
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
        
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSelectedIndex(-1)
        break
        
      case 'Enter':
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          e.preventDefault()
          const selected = suggestions[selectedIndex]
          setQueryInternal(selected.text)
          addRecentSearch(selected.text)
          setIsOpen(false)
          onSearch?.(selected.text)
        }
        break
        
      case 'Tab':
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          e.preventDefault()
          setQueryInternal(suggestions[selectedIndex].text)
        }
        break
    }
  }, [isOpen, suggestions, selectedIndex, addRecentSearch, onSearch])
  
  // Handle form submit
  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return
    
    addRecentSearch(query)
    setIsOpen(false)
    onSearch?.(query)
  }, [query, addRecentSearch, onSearch])
  
  // Currently highlighted suggestion
  const highlightedSuggestion = useMemo(() => {
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      return suggestions[selectedIndex]
    }
    return null
  }, [selectedIndex, suggestions])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])
  
  return {
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
    addRecentSearch,
    removeRecentSearch,
    handleKeyDown,
    handleSubmit,
    highlightedSuggestion,
  }
}
