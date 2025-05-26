"use client"

import React from "react"

export interface OfflineAction {
  id: string
  type: string
  data: any
  timestamp: number
  retryCount: number
}

export class OfflineManager {
  private static instance: OfflineManager
  private isOnline = true
  private pendingActions: OfflineAction[] = []
  private maxRetries = 3

  private constructor() {
    this.setupEventListeners()
    this.loadPendingActions()
  }

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager()
    }
    return OfflineManager.instance
  }

  private setupEventListeners(): void {
    if (typeof window === "undefined") return

    window.addEventListener("online", () => {
      this.isOnline = true
      this.processPendingActions()
    })

    window.addEventListener("offline", () => {
      this.isOnline = false
    })

    this.isOnline = navigator.onLine
  }

  private loadPendingActions(): void {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem("offline_pending_actions")
    if (stored) {
      try {
        this.pendingActions = JSON.parse(stored)
      } catch (error) {
        console.error("Failed to load pending actions:", error)
        this.pendingActions = []
      }
    }
  }

  private savePendingActions(): void {
    if (typeof window === "undefined") return

    localStorage.setItem("offline_pending_actions", JSON.stringify(this.pendingActions))
  }

  addPendingAction(type: string, data: any): string {
    const action: OfflineAction = {
      id: `action_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    }

    this.pendingActions.push(action)
    this.savePendingActions()

    return action.id
  }

  async processPendingActions(): Promise<void> {
    if (!this.isOnline || this.pendingActions.length === 0) return

    const actionsToProcess = [...this.pendingActions]

    for (const action of actionsToProcess) {
      try {
        await this.executeAction(action)
        this.removePendingAction(action.id)
      } catch (error) {
        console.error("Failed to execute pending action:", error)
        action.retryCount++

        if (action.retryCount >= this.maxRetries) {
          this.removePendingAction(action.id)
          console.error("Max retries reached for action:", action)
        }
      }
    }

    this.savePendingActions()
  }

  private async executeAction(action: OfflineAction): Promise<void> {
    // This would be implemented based on your specific action types
    switch (action.type) {
      case "create_post":
        // Execute create post action
        break
      case "like_post":
        // Execute like post action
        break
      case "follow_user":
        // Execute follow user action
        break
      default:
        console.warn("Unknown action type:", action.type)
    }
  }

  private removePendingAction(id: string): void {
    this.pendingActions = this.pendingActions.filter((action) => action.id !== id)
  }

  isOffline(): boolean {
    return !this.isOnline
  }

  getPendingActionsCount(): number {
    return this.pendingActions.length
  }

  clearPendingActions(): void {
    this.pendingActions = []
    this.savePendingActions()
  }
}

// React hook for offline support
export const useOffline = () => {
  const [isOffline, setIsOffline] = React.useState(false)
  const [pendingCount, setPendingCount] = React.useState(0)

  React.useEffect(() => {
    const manager = OfflineManager.getInstance()

    const updateStatus = () => {
      setIsOffline(manager.isOffline())
      setPendingCount(manager.getPendingActionsCount())
    }

    updateStatus()

    const interval = setInterval(updateStatus, 1000)

    return () => clearInterval(interval)
  }, [])

  return {
    isOffline,
    pendingCount,
    addPendingAction: OfflineManager.getInstance().addPendingAction.bind(OfflineManager.getInstance()),
  }
}
