// Database query helpers for Cloudflare D1

import type {
  Product,
  ProductWithDetails,
  OfferWithMerchant,
  Category,
} from './schema'

// Type for D1 database (will be injected by Cloudflare)
export type D1Database = {
  prepare: (query: string) => D1PreparedStatement
  batch: <T>(statements: D1PreparedStatement[]) => Promise<D1Result<T>[]>
  exec: (query: string) => Promise<D1ExecResult>
}

type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement
  first: <T>() => Promise<T | null>
  all: <T>() => Promise<D1Result<T>>
  run: () => Promise<D1Result<unknown>>
}

type D1Result<T> = {
  results: T[]
  success: boolean
  meta: {
    duration: number
  }
}

type D1ExecResult = {
  count: number
  duration: number
}

// Search products
export async function searchProducts(
  db: D1Database,
  options: {
    query: string
    country: string
    locale: string
    page?: number
    limit?: number
    sort?: string
    brand?: string
    category?: string
    minPrice?: number
    maxPrice?: number
  }
): Promise<{ products: ProductWithDetails[]; total: number }> {
  const {
    query,
    country,
    locale,
    page = 1,
    limit = 20,
    sort = 'relevance',
    brand,
    category,
    minPrice,
    maxPrice,
  } = options

  const offset = (page - 1) * limit

  let orderBy = 'pt.name ASC'
  if (sort === 'price_asc') orderBy = 'MIN(pr.price) ASC'
  else if (sort === 'price_desc') orderBy = 'MIN(pr.price) DESC'
  else if (sort === 'newest') orderBy = 'p.created_at DESC'

  const conditions: string[] = ['pt.name LIKE ?']
  const params: unknown[] = [`%${query}%`]

  if (brand) {
    conditions.push('p.brand = ?')
    params.push(brand)
  }

  if (category) {
    conditions.push('p.category_id = ?')
    params.push(category)
  }

  const whereClause = conditions.join(' AND ')

  const sql = `
    SELECT 
      p.id,
      p.slug,
      p.brand,
      p.category_id,
      p.image_url,
      pt.name,
      pt.description,
      MIN(pr.price) as lowest_price,
      pr.currency,
      COUNT(DISTINCT pr.merchant_id) as offer_count
    FROM products p
    JOIN product_translations pt ON p.id = pt.product_id AND pt.locale = ?
    LEFT JOIN prices pr ON p.id = pr.product_id AND pr.country_code = ?
    WHERE ${whereClause}
    ${minPrice ? 'AND pr.price >= ?' : ''}
    ${maxPrice ? 'AND pr.price <= ?' : ''}
    GROUP BY p.id
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `

  const queryParams = [
    locale,
    country.toUpperCase(),
    ...params,
    ...(minPrice ? [minPrice] : []),
    ...(maxPrice ? [maxPrice] : []),
    limit,
    offset,
  ]

  const result = await db.prepare(sql).bind(...queryParams).all<ProductWithDetails>()

  // Get total count
  const countSql = `
    SELECT COUNT(DISTINCT p.id) as total
    FROM products p
    JOIN product_translations pt ON p.id = pt.product_id AND pt.locale = ?
    LEFT JOIN prices pr ON p.id = pr.product_id AND pr.country_code = ?
    WHERE ${whereClause}
  `

  const countResult = await db
    .prepare(countSql)
    .bind(locale, country.toUpperCase(), ...params)
    .first<{ total: number }>()

  return {
    products: result.results,
    total: countResult?.total || 0,
  }
}

// Get product by slug
export async function getProductBySlug(
  db: D1Database,
  slug: string,
  country: string,
  locale: string
): Promise<ProductWithDetails | null> {
  const sql = `
    SELECT 
      p.id,
      p.slug,
      p.brand,
      p.category_id,
      p.gtin,
      p.specs,
      p.image_url,
      pt.name,
      pt.description,
      pt.seo_title,
      pt.seo_description,
      MIN(pr.price) as lowest_price,
      pr.currency,
      COUNT(DISTINCT pr.merchant_id) as offer_count
    FROM products p
    JOIN product_translations pt ON p.id = pt.product_id AND pt.locale = ?
    LEFT JOIN prices pr ON p.id = pr.product_id AND pr.country_code = ?
    WHERE p.slug = ?
    GROUP BY p.id
  `

  return db
    .prepare(sql)
    .bind(locale, country.toUpperCase(), slug)
    .first<ProductWithDetails>()
}

// Get product offers
export async function getProductOffers(
  db: D1Database,
  productId: string,
  country: string
): Promise<OfferWithMerchant[]> {
  const sql = `
    SELECT 
      pr.id,
      pr.product_id,
      pr.merchant_id,
      pr.price,
      pr.currency,
      pr.url,
      pr.in_stock,
      pr.updated_at,
      m.name as merchant_name,
      m.logo_url as merchant_logo
    FROM prices pr
    JOIN merchants m ON pr.merchant_id = m.id
    WHERE pr.product_id = ? AND pr.country_code = ?
    ORDER BY pr.price ASC
  `

  const result = await db
    .prepare(sql)
    .bind(productId, country.toUpperCase())
    .all<OfferWithMerchant>()

  return result.results
}

// Get price history
export async function getPriceHistory(
  db: D1Database,
  productId: string,
  country: string,
  days: number = 30
): Promise<{ date: string; price: number }[]> {
  const sql = `
    SELECT 
      DATE(recorded_at) as date,
      MIN(price) as price
    FROM price_history
    WHERE product_id = ? 
      AND country_code = ?
      AND recorded_at >= DATE('now', ?)
    GROUP BY DATE(recorded_at)
    ORDER BY date ASC
  `

  const result = await db
    .prepare(sql)
    .bind(productId, country.toUpperCase(), `-${days} days`)
    .all<{ date: string; price: number }>()

  return result.results
}

// Get categories
export async function getCategories(
  db: D1Database,
  locale: string,
  parentId?: string
): Promise<Category[]> {
  const sql = parentId
    ? `
      SELECT c.*, ct.name, ct.description
      FROM categories c
      JOIN category_translations ct ON c.id = ct.category_id AND ct.locale = ?
      WHERE c.parent_id = ?
      ORDER BY ct.name ASC
    `
    : `
      SELECT c.*, ct.name, ct.description
      FROM categories c
      JOIN category_translations ct ON c.id = ct.category_id AND ct.locale = ?
      WHERE c.parent_id IS NULL
      ORDER BY ct.name ASC
    `

  const params = parentId ? [locale, parentId] : [locale]
  const result = await db.prepare(sql).bind(...params).all<Category>()

  return result.results
}

// Get products by category
export async function getProductsByCategory(
  db: D1Database,
  categorySlug: string,
  country: string,
  locale: string,
  options: {
    page?: number
    limit?: number
    sort?: string
    brand?: string
    minPrice?: number
    maxPrice?: number
  } = {}
): Promise<{ products: ProductWithDetails[]; total: number }> {
  const { page = 1, limit = 20, sort = 'relevance', brand, minPrice, maxPrice } = options
  const offset = (page - 1) * limit

  let orderBy = 'pt.name ASC'
  if (sort === 'price_asc') orderBy = 'MIN(pr.price) ASC'
  else if (sort === 'price_desc') orderBy = 'MIN(pr.price) DESC'
  else if (sort === 'newest') orderBy = 'p.created_at DESC'

  const conditions: string[] = ['c.slug = ?']
  const params: unknown[] = [categorySlug]

  if (brand) {
    conditions.push('p.brand = ?')
    params.push(brand)
  }

  const whereClause = conditions.join(' AND ')

  const sql = `
    SELECT 
      p.id,
      p.slug,
      p.brand,
      p.category_id,
      p.image_url,
      pt.name,
      pt.description,
      MIN(pr.price) as lowest_price,
      pr.currency,
      COUNT(DISTINCT pr.merchant_id) as offer_count
    FROM products p
    JOIN product_translations pt ON p.id = pt.product_id AND pt.locale = ?
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN prices pr ON p.id = pr.product_id AND pr.country_code = ?
    WHERE ${whereClause}
    ${minPrice ? 'AND pr.price >= ?' : ''}
    ${maxPrice ? 'AND pr.price <= ?' : ''}
    GROUP BY p.id
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `

  const queryParams = [
    locale,
    country.toUpperCase(),
    ...params,
    ...(minPrice ? [minPrice] : []),
    ...(maxPrice ? [maxPrice] : []),
    limit,
    offset,
  ]

  const result = await db.prepare(sql).bind(...queryParams).all<ProductWithDetails>()

  return {
    products: result.results,
    total: result.results.length, // Simplified - should get actual count
  }
}
