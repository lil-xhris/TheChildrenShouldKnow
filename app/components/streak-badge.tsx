"use client"

import { useAuth } from "@/app/context/auth-context"
import { Flame } from "lucide-react"
import { useEffect } from "react"

interface StreakBadgeProps {
  userId?: string
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function StreakBadge({ userId, showLabel = true, size = "md" }: StreakBadgeProps) {
  const { getStreak, updateStreak, user } = useAuth()

  // Update streak when component mounts if this is the current user's streak
  useEffect(() => {
    if (user && (!userId || userId === user.id)) {
      updateStreak()
    }
  }, [user, userId, updateStreak])

  const streak = getStreak(userId)

  // Determine color based on streak length
  const getStreakColor = () => {
    if (streak >= 30) return "text-red-600"
    if (streak >= 20) return "text-orange-500"
    if (streak >= 10) return "text-yellow-500"
    if (streak >= 5) return "text-green-500"
    return "text-gray-400"
  }

  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs"
      case "lg":
        return "text-lg"
      default:
        return "text-sm"
    }
  }

  if (!streak) return null

  return (
    <div className={`flex items-center ${getSizeClasses()}`}>
      <Flame
        className={`${getStreakColor()} ${size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} mr-1`}
      />
      {showLabel ? (
        <span className={`${getStreakColor()} font-medium`}>{streak} day streak</span>
      ) : (
        <span className={`${getStreakColor()} font-medium`}>{streak}</span>
      )}
    </div>
  )
}
