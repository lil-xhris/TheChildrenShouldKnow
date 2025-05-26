"use client"

import React from "react"

export class MemoryManager {
  private static instance: MemoryManager
  private observers: Set<MutationObserver> = new Set()
  private intervals: Set<number> = new Set()
  private timeouts: Set<number> = new Set()
  private eventListeners: Map<EventTarget, Map<string, EventListener>> = new Map()

  private constructor() {}

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager()
    }
    return MemoryManager.instance
  }

  addObserver(observer: MutationObserver): void {
    this.observers.add(observer)
  }

  addInterval(id: number): void {
    this.intervals.add(id)
  }

  addTimeout(id: number): void {
    this.timeouts.add(id)
  }

  addEventListener(target: EventTarget, event: string, listener: EventListener): void {
    if (!this.eventListeners.has(target)) {
      this.eventListeners.set(target, new Map())
    }
    this.eventListeners.get(target)!.set(event, listener)
    target.addEventListener(event, listener)
  }

  cleanup(): void {
    // Disconnect observers
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()

    // Clear intervals
    this.intervals.forEach((id) => clearInterval(id))
    this.intervals.clear()

    // Clear timeouts
    this.timeouts.forEach((id) => clearTimeout(id))
    this.timeouts.clear()

    // Remove event listeners
    this.eventListeners.forEach((events, target) => {
      events.forEach((listener, event) => {
        target.removeEventListener(event, listener)
      })
    })
    this.eventListeners.clear()
  }

  getMemoryUsage(): {
    observers: number
    intervals: number
    timeouts: number
    eventListeners: number
  } {
    let totalEventListeners = 0
    this.eventListeners.forEach((events) => {
      totalEventListeners += events.size
    })

    return {
      observers: this.observers.size,
      intervals: this.intervals.size,
      timeouts: this.timeouts.size,
      eventListeners: totalEventListeners,
    }
  }
}

// Hook for automatic cleanup
export const useMemoryCleanup = () => {
  React.useEffect(() => {
    const manager = MemoryManager.getInstance()

    return () => {
      manager.cleanup()
    }
  }, [])
}
