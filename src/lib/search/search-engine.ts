/**
 * Search Engine - Enterprise-grade search implementation
 * 
 * Features:
 * - Inverted index for O(1) lookups
 * - Fuzzy matching (Levenshtein distance)
 * - N-gram tokenization for partial matches
 * - TF-IDF scoring for relevance
 * - Configurable weights per field
 */

export interface SearchableItem {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  [key: string]: string | number | boolean
}

export interface SearchResult<T> {
  item: T
  score: number
  matches: SearchMatch[]
}

export interface SearchMatch {
  field: string
  indices: [number, number][]
  value: string
}

interface IndexEntry {
  docId: string
  field: string
  positions: number[]
  tf: number // Term frequency
}

interface SearchConfig {
  fields: {
    name: string
    weight: number
  }[]
  fuzzyThreshold: number // 0-1, lower = stricter
  minMatchLength: number
  maxResults: number
}

const DEFAULT_CONFIG: SearchConfig = {
  fields: [
    { name: 'name', weight: 3 },
    { name: 'brand', weight: 2 },
    { name: 'category', weight: 1 },
  ],
  fuzzyThreshold: 0.7,
  minMatchLength: 2,
  maxResults: 50,
}

/**
 * Calculate Levenshtein distance between two strings
 * Optimized with early termination
 */
function levenshteinDistance(a: string, b: string, maxDist: number = Infinity): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  
  // Early termination if length difference exceeds max distance
  if (Math.abs(a.length - b.length) > maxDist) return maxDist + 1
  
  const matrix: number[][] = []
  
  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      )
      rowMin = Math.min(rowMin, matrix[i][j])
    }
    // Early termination if all values in row exceed max distance
    if (rowMin > maxDist) return maxDist + 1
  }
  
  return matrix[a.length][b.length]
}

/**
 * Calculate similarity score (0-1) using Levenshtein distance
 */
function similarityScore(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 1
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase(), maxLen)
  return 1 - distance / maxLen
}

/**
 * Generate n-grams for a string
 */
function generateNgrams(str: string, n: number = 2): string[] {
  const normalized = str.toLowerCase().trim()
  if (normalized.length < n) return [normalized]
  
  const ngrams: string[] = []
  for (let i = 0; i <= normalized.length - n; i++) {
    ngrams.push(normalized.slice(i, i + n))
  }
  return ngrams
}

/**
 * Tokenize text into searchable terms
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2)
}

/**
 * Highlight matching portions of text
 */
export function highlightMatches(text: string, query: string): string {
  const terms = tokenize(query)
  let result = text
  
  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi')
    result = result.replace(regex, '<mark>$1</mark>')
  })
  
  return result
}

/**
 * Enterprise Search Engine Class
 */
export class SearchEngine<T extends SearchableItem> {
  private items: T[] = []
  private index: Map<string, IndexEntry[]> = new Map()
  private ngramIndex: Map<string, Set<string>> = new Map()
  private config: SearchConfig
  private documentCount: number = 0
  private idf: Map<string, number> = new Map() // Inverse document frequency
  
  constructor(config: Partial<SearchConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }
  
  /**
   * Build search index from items
   * Time complexity: O(n * m) where n = items, m = avg fields
   */
  buildIndex(items: T[]): void {
    this.items = items
    this.index.clear()
    this.ngramIndex.clear()
    this.documentCount = items.length
    
    const termDocFreq: Map<string, Set<string>> = new Map()
    
    items.forEach(item => {
      this.config.fields.forEach(fieldConfig => {
        const value = item[fieldConfig.name]
        if (typeof value !== 'string') return
        
        const tokens = tokenize(value)
        const tokenCounts: Map<string, number> = new Map()
        
        // Count term frequency
        tokens.forEach((token, position) => {
          tokenCounts.set(token, (tokenCounts.get(token) || 0) + 1)
          
          // Track document frequency for IDF
          if (!termDocFreq.has(token)) {
            termDocFreq.set(token, new Set())
          }
          termDocFreq.get(token)!.add(item.id)
          
          // Build n-gram index for fuzzy matching
          generateNgrams(token, 2).forEach(ngram => {
            if (!this.ngramIndex.has(ngram)) {
              this.ngramIndex.set(ngram, new Set())
            }
            this.ngramIndex.get(ngram)!.add(token)
          })
        })
        
        // Store in inverted index
        tokenCounts.forEach((count, token) => {
          if (!this.index.has(token)) {
            this.index.set(token, [])
          }
          this.index.get(token)!.push({
            docId: item.id,
            field: fieldConfig.name,
            positions: tokens.reduce((acc, t, i) => t === token ? [...acc, i] : acc, [] as number[]),
            tf: count / tokens.length, // Normalized term frequency
          })
        })
      })
    })
    
    // Calculate IDF for all terms
    termDocFreq.forEach((docs, term) => {
      this.idf.set(term, Math.log(this.documentCount / docs.size))
    })
  }
  
  /**
   * Find similar terms using n-gram index
   */
  private findSimilarTerms(term: string): string[] {
    const ngrams = generateNgrams(term, 2)
    const candidates: Map<string, number> = new Map()
    
    ngrams.forEach(ngram => {
      const terms = this.ngramIndex.get(ngram)
      if (terms) {
        terms.forEach(t => {
          candidates.set(t, (candidates.get(t) || 0) + 1)
        })
      }
    })
    
    // Filter by similarity threshold
    return Array.from(candidates.entries())
      .filter(([candidate]) => {
        const similarity = similarityScore(term, candidate)
        return similarity >= this.config.fuzzyThreshold
      })
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([t]) => t)
  }
  
  /**
   * Search with TF-IDF scoring and fuzzy matching
   */
  search(query: string): SearchResult<T>[] {
    if (!query || query.length < this.config.minMatchLength) {
      return []
    }
    
    const queryTerms = tokenize(query)
    const scores: Map<string, { score: number; matches: SearchMatch[] }> = new Map()
    
    queryTerms.forEach(term => {
      // Get exact matches
      let matchingTerms = [term]
      
      // Add fuzzy matches if no exact matches
      if (!this.index.has(term)) {
        matchingTerms = this.findSimilarTerms(term)
      }
      
      matchingTerms.forEach(matchTerm => {
        const entries = this.index.get(matchTerm) || []
        const termIdf = this.idf.get(matchTerm) || 1
        
        entries.forEach(entry => {
          const fieldWeight = this.config.fields.find(f => f.name === entry.field)?.weight || 1
          
          // TF-IDF score with field weight
          const tfidf = entry.tf * termIdf * fieldWeight
          
          // Boost exact matches
          const exactBoost = matchTerm === term ? 1.5 : 1
          
          // Boost phrase matches (consecutive terms)
          const phraseBoost = entry.positions.length > 1 ? 1.2 : 1
          
          const score = tfidf * exactBoost * phraseBoost
          
          if (!scores.has(entry.docId)) {
            scores.set(entry.docId, { score: 0, matches: [] })
          }
          
          const docScore = scores.get(entry.docId)!
          docScore.score += score
          
          const item = this.items.find(i => i.id === entry.docId)
          if (item) {
            const fieldValue = String(item[entry.field])
            docScore.matches.push({
              field: entry.field,
              value: fieldValue,
              indices: entry.positions.map(p => [p, p + matchTerm.length] as [number, number]),
            })
          }
        })
      })
    })
    
    // Convert to results and sort by score
    const results: SearchResult<T>[] = Array.from(scores.entries())
      .map(([docId, { score, matches }]) => ({
        item: this.items.find(i => i.id === docId)!,
        score,
        matches,
      }))
      .filter(r => r.item)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.config.maxResults)
    
    return results
  }
  
  /**
   * Get search suggestions (autocomplete)
   */
  getSuggestions(query: string, limit: number = 8): string[] {
    if (!query || query.length < 2) return []
    
    const queryLower = query.toLowerCase()
    const suggestions: Map<string, number> = new Map()
    
    // Get terms that start with query
    this.index.forEach((_, term) => {
      if (term.startsWith(queryLower)) {
        const entries = this.index.get(term)!
        suggestions.set(term, entries.length)
      }
    })
    
    // Also check fuzzy matches
    const similarTerms = this.findSimilarTerms(queryLower)
    similarTerms.forEach(term => {
      const entries = this.index.get(term)!
      if (!suggestions.has(term)) {
        suggestions.set(term, entries.length * 0.8) // Slightly lower weight for fuzzy
      }
    })
    
    return Array.from(suggestions.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([term]) => term)
  }
  
  /**
   * Get product suggestions for autocomplete
   */
  getProductSuggestions(query: string, limit: number = 5): T[] {
    const results = this.search(query)
    return results.slice(0, limit).map(r => r.item)
  }
}

// Singleton instance for the app
let searchEngineInstance: SearchEngine<SearchableItem> | null = null

export function getSearchEngine(): SearchEngine<SearchableItem> {
  if (!searchEngineInstance) {
    searchEngineInstance = new SearchEngine()
  }
  return searchEngineInstance
}

export function initializeSearchEngine(items: SearchableItem[]): void {
  const engine = getSearchEngine()
  engine.buildIndex(items)
}
