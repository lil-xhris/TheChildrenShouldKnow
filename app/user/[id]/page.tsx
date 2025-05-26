"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getUser } from "@/lib/actions/user.actions"

interface User {
  _id: string
  id: string
  name: string
  username: string
  image: string
  bio: string
  threads: any[]
  onboarded: boolean
}

const UserProfile = () => {
  const params = useParams()
  const [profileUser, setProfileUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true)
        // Load user data
        const userData = await getUser(params.id as string)
        setProfileUser(userData)
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [params.id])

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  if (!profileUser) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {profileUser.id}</p>
      <p>Name: {profileUser.name}</p>
      <p>Username: {profileUser.username}</p>
      <img src={profileUser.image || "/placeholder.svg"} alt="Profile" />
      <p>Bio: {profileUser.bio}</p>
    </div>
  )
}

export default UserProfile
