"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/auth-context"
import Link from "next/link"
import { Heart, MessageSquare, UserPlus, Eye } from "lucide-react"

export function ActivityFeed({ limit = 10 }) {
  const { user, getAllActivities } = useAuth()
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      try {
        const allActivities = getAllActivities()

        // Sort by date (newest first)
        const sortedActivities = [...allActivities].sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )

        // Limit the number of activities
        const limitedActivities = sortedActivities.slice(0, limit)

        setActivities(limitedActivities)
      } catch (error) {
        console.error("Error loading activities:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [user, getAllActivities, limit])

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="font-bold mb-4">Recent Activity</h2>
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="font-bold mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-center py-4">No recent activity</p>
      </div>
    )
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-red-500" />
      case "comment":
        return <MessageSquare size={16} className="text-blue-500" />
      case "follow":
        return <UserPlus size={16} className="text-green-500" />
      case "view":
        return <Eye size={16} className="text-purple-500" />
      default:
        return null
    }
  }

  const getActivityText = (activity) => {
    const { type, userId, targetId, targetType } = activity

    // Ensure we're not rendering objects directly
    const userIdStr = typeof userId === "object" ? JSON.stringify(userId) : userId
    const targetIdStr = typeof targetId === "object" ? JSON.stringify(targetId) : targetId

    switch (type) {
      case "like":
        return (
          <>
            <Link href={`/user/${userIdStr}`} className="font-medium hover:underline">
              {activity.username || "A user"}
            </Link>{" "}
            liked a{" "}
            <Link href={`/post/${targetIdStr}`} className="font-medium hover:underline">
              post
            </Link>
          </>
        )
      case "comment":
        return (
          <>
            <Link href={`/user/${userIdStr}`} className="font-medium hover:underline">
              {activity.username || "A user"}
            </Link>{" "}
            commented on a{" "}
            <Link href={`/post/${targetIdStr}`} className="font-medium hover:underline">
              post
            </Link>
          </>
        )
      case "follow":
        return (
          <>
            <Link href={`/user/${userIdStr}`} className="font-medium hover:underline">
              {activity.username || "A user"}
            </Link>{" "}
            followed{" "}
            <Link href={`/user/${targetIdStr}`} className="font-medium hover:underline">
              {activity.targetUsername || "a user"}
            </Link>
          </>
        )
      case "view":
        return (
          <>
            <Link href={`/user/${userIdStr}`} className="font-medium hover:underline">
              {activity.username || "A user"}
            </Link>{" "}
            viewed your profile
          </>
        )
      default:
        return "Unknown activity"
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="font-bold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-3 mt-1">{getActivityIcon(activity.type)}</div>
            <div>
              <p className="text-sm">{getActivityText(activity)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : "Unknown time"}
              </p>
            </div>
          </div>
        ))}
      </div>
      {activities.length > 0 && (
        <div className="mt-4 text-center">
          <Link href="/activity" className="text-sm text-purple-600 hover:text-purple-800">
            View all activity
          </Link>
        </div>
      )}
    </div>
  )
}
