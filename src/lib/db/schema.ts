// Database schema types for Cloudflare D1

export interface Product {
  id: string
  slug: string
  brand: string
  category_id: string
  gtin: string | null
  specs: string // JSON string
  image_url: string | null
  created_at: string
}

export interface ProductTranslation {
  product_id: string
  locale: string
  name: string
  description: string | null
  seo_title: string | null
  seo_description: string | null
}

export interface Merchant {
  id: string
  name: string
  country_code: string
  logo_url: string | null
  affiliate_program: string | null
  base_url: string
}

export interface Price {
  id: number
  product_id: string
  merchant_id: string
  country_code: string
  price: number // in cents
  currency: string
  url: string | null
  in_stock: number // 0 or 1
  updated_at: string
}

export interface PriceHistory {
  id: number
  product_id: string
  merchant_id: string
  country_code: string
  price: number
  currency: string
  recorded_at: string
}

export interface Category {
  id: string
  slug: string
  parent_id: string | null
  icon: string | null
}

export interface CategoryTranslation {
  category_id: string
  locale: string
  name: string
  description: string | null
}

// API Response types
export interface ProductWithDetails extends Product {
  name: string
  description: string | null
  lowest_price: number
  currency: string
  offer_count: number
}

export interface OfferWithMerchant extends Price {
  merchant_name: string
  merchant_logo: string | null
}

// SQL for creating tables
export const createTablesSQL = `
-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT,
  category_id TEXT,
  gtin TEXT,
  specs TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product translations
CREATE TABLE IF NOT EXISTS product_translations (
  product_id TEXT NOT NULL,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  seo_title TEXT,
  seo_description TEXT,
  PRIMARY KEY (product_id, locale),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Merchants
CREATE TABLE IF NOT EXISTS merchants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  logo_url TEXT,
  affiliate_program TEXT,
  base_url TEXT
);

-- Current prices
CREATE TABLE IF NOT EXISTS prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT NOT NULL,
  merchant_id TEXT NOT NULL,
  country_code TEXT NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT NOT NULL,
  url TEXT,
  in_stock INTEGER DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(product_id, merchant_id, country_code),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id) ON DELETE CASCADE
);

-- Price history
CREATE TABLE IF NOT EXISTS price_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT NOT NULL,
  merchant_id TEXT NOT NULL,
  country_code TEXT NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT NOT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id) ON DELETE CASCADE
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  parent_id TEXT,
  icon TEXT,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Category translations
CREATE TABLE IF NOT EXISTS category_translations (
  category_id TEXT NOT NULL,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  PRIMARY KEY (category_id, locale),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_prices_product ON prices(product_id);
CREATE INDEX IF NOT EXISTS idx_prices_country ON prices(country_code);
CREATE INDEX IF NOT EXISTS idx_prices_merchant ON prices(merchant_id);
CREATE INDEX IF NOT EXISTS idx_price_history_product ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_recorded ON price_history(recorded_at);
`
