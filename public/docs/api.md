# PriceRadars API Documentation

## Base URL
```
https://priceradars.com/api/v1
```

## Authentication
Include your API key in the Authorization header:
```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Search Products
```http
GET /search
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search query |
| country | string | No | Country code (it, uk, us, de, fr, es). Default: uk |
| page | integer | No | Page number. Default: 1 |
| limit | integer | No | Results per page (max 100). Default: 20 |
| sort | string | No | Sort order: relevance, price_asc, price_desc, newest |
| brand | string | No | Filter by brand name |
| category | string | No | Filter by category slug |
| minPrice | integer | No | Minimum price in cents |
| maxPrice | integer | No | Maximum price in cents |

**Example Request:**
```bash
curl -X GET "https://priceradars.com/api/v1/search?q=iphone&country=uk&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example Response:**
```json
{
  "products": [
    {
      "id": "prod_iphone15pro",
      "name": "iPhone 15 Pro 256GB",
      "slug": "iphone-15-pro-256gb",
      "brand": "Apple",
      "category": "smartphones",
      "image": "https://images.priceradars.com/products/iphone-15-pro.jpg",
      "lowest_price": 99900,
      "currency": "GBP",
      "offer_count": 8,
      "in_stock": true
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "pages": 5,
    "limit": 10
  }
}
```

### Get Product
```http
GET /products/{slug}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| country | string | No | Country code. Default: uk |

**Example Request:**
```bash
curl -X GET "https://priceradars.com/api/v1/products/iphone-15-pro-256gb?country=uk" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example Response:**
```json
{
  "id": "prod_iphone15pro",
  "name": "iPhone 15 Pro 256GB",
  "slug": "iphone-15-pro-256gb",
  "brand": "Apple",
  "category": "smartphones",
  "description": "iPhone 15 Pro with A17 Pro chip...",
  "specs": {
    "Display": "6.1\" Super Retina XDR",
    "Processor": "A17 Pro",
    "Storage": "256GB",
    "Camera": "48MP + 12MP + 12MP"
  },
  "image": "https://images.priceradars.com/products/iphone-15-pro.jpg",
  "images": [
    "https://images.priceradars.com/products/iphone-15-pro.jpg",
    "https://images.priceradars.com/products/iphone-15-pro-back.jpg"
  ],
  "gtin": "194253939054",
  "offers": [
    {
      "id": "offer_1",
      "merchant_id": "amazon-uk",
      "merchant_name": "Amazon.co.uk",
      "price": 99900,
      "currency": "GBP",
      "url": "https://priceradars.com/go/amazon-uk/iphone-15-pro",
      "in_stock": true,
      "stock_status": "in_stock",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "lowest_price": 99900,
  "currency": "GBP"
}
```

### Get Price History
```http
GET /products/{slug}/history
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| country | string | No | Country code. Default: uk |
| days | integer | No | Number of days. Default: 30, Max: 365 |

**Example Request:**
```bash
curl -X GET "https://priceradars.com/api/v1/products/iphone-15-pro-256gb/history?country=uk&days=30" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example Response:**
```json
{
  "product_id": "prod_iphone15pro",
  "product_slug": "iphone-15-pro-256gb",
  "country": "uk",
  "currency": "GBP",
  "history": [
    {
      "date": "2024-01-15",
      "lowest_price": 99900,
      "average_price": 104500,
      "highest_price": 109900,
      "offer_count": 8
    },
    {
      "date": "2024-01-14",
      "lowest_price": 101900,
      "average_price": 105000,
      "highest_price": 109900,
      "offer_count": 7
    }
  ]
}
```

### Get Categories
```http
GET /categories
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| country | string | No | Country code. Default: uk |
| parent | string | No | Parent category slug for subcategories |

**Example Response:**
```json
{
  "categories": [
    {
      "id": "cat_smartphones",
      "slug": "smartphones",
      "name": "Smartphones",
      "product_count": 1250,
      "subcategories": [
        {
          "slug": "smartphones/apple",
          "name": "Apple",
          "product_count": 45
        }
      ]
    }
  ]
}
```

## Error Responses

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The 'q' parameter is required",
    "status": 400
  }
}
```

**Error Codes:**
| Status | Code | Description |
|--------|------|-------------|
| 400 | invalid_request | Invalid request parameters |
| 401 | unauthorized | Invalid or missing API key |
| 404 | not_found | Resource not found |
| 429 | rate_limited | Too many requests |
| 500 | internal_error | Server error |

## Rate Limits

| Plan | Requests/Hour | Requests/Day |
|------|---------------|--------------|
| Free | 100 | 1,000 |
| Pro | 1,000 | 10,000 |
| Enterprise | Custom | Custom |

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705320000
```

## SDKs

Coming soon:
- JavaScript/TypeScript
- Python
- PHP

## Support

- Email: api@priceradars.com
- Documentation: https://priceradars.com/docs
