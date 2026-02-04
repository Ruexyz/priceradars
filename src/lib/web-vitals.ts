/**
 * Web Vitals reporting utility
 * Tracks Core Web Vitals for performance monitoring
 */

export type WebVitalMetric = {
  id: string
  name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'prerender'
}

// Thresholds based on Google's Core Web Vitals
const thresholds = {
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  FID: [100, 300],
  INP: [200, 500],
  LCP: [2500, 4000],
  TTFB: [800, 1800],
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[name as keyof typeof thresholds]
  if (!threshold) return 'good'
  
  if (value <= threshold[0]) return 'good'
  if (value <= threshold[1]) return 'needs-improvement'
  return 'poor'
}

/**
 * Report web vitals to analytics endpoint
 */
export function reportWebVitals(metric: WebVitalMetric): void {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to custom analytics endpoint
    const body = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      page: window.location.pathname,
      timestamp: Date.now(),
    })

    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body)
    } else {
      fetch('/api/analytics/vitals', {
        method: 'POST',
        body,
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  } else {
    // Log in development
    console.log(`[Web Vital] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    })
  }
}

/**
 * Initialize web vitals tracking using browser Performance API
 * No external dependencies required
 */
export function initWebVitals(): void {
  if (typeof window === 'undefined') return
  if (typeof PerformanceObserver === 'undefined') return

  try {
    // Observe LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }
      if (lastEntry) {
        reportWebVitals({
          id: `lcp-${Date.now()}`,
          name: 'LCP',
          value: lastEntry.startTime,
          rating: getRating('LCP', lastEntry.startTime),
          delta: lastEntry.startTime,
          entries: [lastEntry],
          navigationType: 'navigate',
        })
      }
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

    // Observe FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const fcpEntry = entries.find(e => e.name === 'first-contentful-paint') as PerformanceEntry & { startTime: number }
      if (fcpEntry) {
        reportWebVitals({
          id: `fcp-${Date.now()}`,
          name: 'FCP',
          value: fcpEntry.startTime,
          rating: getRating('FCP', fcpEntry.startTime),
          delta: fcpEntry.startTime,
          entries: [fcpEntry],
          navigationType: 'navigate',
        })
      }
    })
    fcpObserver.observe({ type: 'paint', buffered: true })

    // Observe CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value
        }
      }
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })

    // Report CLS on page hide
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && clsValue > 0) {
        reportWebVitals({
          id: `cls-${Date.now()}`,
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          delta: clsValue,
          entries: [],
          navigationType: 'navigate',
        })
      }
    })

  } catch {
    // Performance Observer not supported
    console.warn('Performance Observer not available')
  }
}
