interface CacheItem<T> {
  data: T
  timestamp: number
  expiry: number
}

export class Cache {
  private static instance: Cache
  private cache: Map<string, CacheItem<any>> = new Map()

  private constructor() {}

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }
    return Cache.instance
  }

  set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttlMs,
    }
    this.cache.set(key, item)
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }

  size(): number {
    this.cleanup()
    return this.cache.size
  }
}

// Auto cleanup every 5 minutes
if (typeof window !== "undefined") {
  setInterval(
    () => {
      Cache.getInstance().cleanup()
    },
    5 * 60 * 1000,
  )
}
