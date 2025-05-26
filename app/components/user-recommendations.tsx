"use client"

import { useAuth } from "@/app/context/auth-context"
import Link from "next/link"
import { UserPlus } from "lucide-react"
import { useState, useEffect } from "react"

export function UserRecommendations() {
  const { getAllUsers, user, followUser } = useAuth()
  const [recommendedUsers, setRecommendedUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    // Get all users except current user and those already followed
    const allUsers = getAllUsers()
    const filteredUsers = allUsers.filter((u) => u.id !== user.id && !user.following.includes(u.id))

    // Take up to 3 users as recommendations
    setRecommendedUsers(filteredUsers.slice(0, 3))
    setLoading(false)
  }, [getAllUsers, user])

  const handleFollow = (userId) => {
    followUser(userId)
    // Remove from recommendations
    setRecommendedUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Recommended Users</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (recommendedUsers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Recommended Users</h3>
        <p className="text-gray-500 text-sm">No recommendations at this time.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-3">Recommended Users</h3>
      <div className="space-y-3">
        {recommendedUsers.map((recommendedUser) => (
          <div key={recommendedUser.id} className="flex items-center justify-between">
            <Link href={`/user/${recommendedUser.id}`} className="flex items-center">
              <img
                src={recommendedUser.profileImage || "/placeholder.svg"}
                alt={recommendedUser.username}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-medium">{recommendedUser.username}</p>
                <p className="text-xs text-gray-500">{recommendedUser.bio.substring(0, 30)}...</p>
              </div>
            </Link>
            <button onClick={() => handleFollow(recommendedUser.id)} className="text-purple-600 hover:text-purple-800">
              <UserPlus size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
