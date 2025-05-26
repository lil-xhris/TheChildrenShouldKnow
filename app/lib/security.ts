// CSRF Token Management
export class CSRFManager {
  private static instance: CSRFManager
  private token: string | null = null

  private constructor() {}

  static getInstance(): CSRFManager {
    if (!CSRFManager.instance) {
      CSRFManager.instance = new CSRFManager()
    }
    return CSRFManager.instance
  }

  generateToken(): string {
    this.token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("csrf_token", this.token)
    }
    return this.token
  }

  getToken(): string | null {
    if (!this.token && typeof window !== "undefined") {
      this.token = sessionStorage.getItem("csrf_token")
    }
    return this.token
  }

  validateToken(token: string): boolean {
    const storedToken = this.getToken()
    return token === storedToken && token !== null
  }

  clearToken(): void {
    this.token = null
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("csrf_token")
    }
  }
}

// Rate Limiting
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()

  isAllowed(identifier: string, maxAttempts = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now()
    const userAttempts = this.attempts.get(identifier) || []

    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter((attempt) => now - attempt < windowMs)

    if (recentAttempts.length >= maxAttempts) {
      return false
    }

    // Add current attempt
    recentAttempts.push(now)
    this.attempts.set(identifier, recentAttempts)

    return true
  }

  getRemainingTime(identifier: string, windowMs: number = 15 * 60 * 1000): number {
    const userAttempts = this.attempts.get(identifier) || []
    if (userAttempts.length === 0) return 0

    const oldestAttempt = Math.min(...userAttempts)
    const timeElapsed = Date.now() - oldestAttempt

    return Math.max(0, windowMs - timeElapsed)
  }
}

// Input Sanitization
export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return ""

  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
}

// XSS Prevention
export const escapeHtml = (text: string): string => {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// Content Security Policy helpers
export const generateNonce = (): string => {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}
