export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
  userId?: string
  sessionId?: string
}

export class Analytics {
  private static instance: Analytics
  private events: AnalyticsEvent[] = []
  private sessionId: string
  private userId: string | null = null

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.loadUserId()
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }

  private loadUserId(): void {
    if (typeof window !== "undefined") {
      this.userId = localStorage.getItem("analytics_user_id")
    }
  }

  setUserId(userId: string): void {
    this.userId = userId
    if (typeof window !== "undefined") {
      localStorage.setItem("analytics_user_id", userId)
    }
  }

  track(name: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
      userId: this.userId || undefined,
      sessionId: this.sessionId,
    }

    this.events.push(event)

    // Keep only last 1000 events in memory
    if (this.events.length > 1000) {
      this.events.shift()
    }

    // In a real app, you would send this to your analytics service
    console.log("Analytics Event:", event)
  }

  trackPageView(path: string, title?: string): void {
    this.track("page_view", {
      path,
      title: title || document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    })
  }

  trackUserAction(action: string, target: string, properties?: Record<string, any>): void {
    this.track("user_action", {
      action,
      target,
      ...properties,
    })
  }

  trackError(error: Error, context?: string): void {
    this.track("error", {
      message: error.message,
      stack: error.stack,
      context,
      url: window.location.href,
    })
  }

  trackPerformance(metric: string, value: number, unit = "ms"): void {
    this.track("performance", {
      metric,
      value,
      unit,
    })
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  clearEvents(): void {
    this.events = []
  }

  exportEvents(): string {
    return JSON.stringify(this.events, null, 2)
  }
}

// React hook for analytics
export const useAnalytics = () => {
  const analytics = Analytics.getInstance()

  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserAction: analytics.trackUserAction.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
  }
}
