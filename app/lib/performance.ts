"use client"

import React from "react"

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(name: string): () => void {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      this.recordMetric(name, duration)
    }
  }

  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }

    const values = this.metrics.get(name)!
    values.push(value)

    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift()
    }
  }

  getMetrics(name: string): {
    average: number
    min: number
    max: number
    count: number
  } | null {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return null

    return {
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    }
  }

  getAllMetrics(): Record<string, any> {
    const result: Record<string, any> = {}

    for (const [name] of this.metrics) {
      result[name] = this.getMetrics(name)
    }

    return result
  }

  measureComponentRender<T extends React.ComponentType<any>>(Component: T, name: string): T {
    return ((props: any) => {
      const stopTimer = this.startTimer(`component_render_${name}`)

      React.useEffect(() => {
        stopTimer()
      })

      return React.createElement(Component, props)
    }) as T
  }
}

// Web Vitals monitoring
export const measureWebVitals = () => {
  if (typeof window === "undefined") return

  // Measure Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log("LCP:", lastEntry.startTime)
  }).observe({ entryTypes: ["largest-contentful-paint"] })

  // Measure First Input Delay (FID)
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      console.log("FID:", entry.processingStart - entry.startTime)
    })
  }).observe({ entryTypes: ["first-input"] })

  // Measure Cumulative Layout Shift (CLS)
  let clsValue = 0
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })
    console.log("CLS:", clsValue)
  }).observe({ entryTypes: ["layout-shift"] })
}
