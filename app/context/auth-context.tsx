"use client"

import type React from "react"
import { createContext, useState, useEffect, type ReactNode, useContext } from "react"

interface User {
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  id?: string | null
}

interface AuthContextProps {
  user: User | null
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOutUser: () => Promise<void>
  updateUserProfile: (displayName: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  loading: boolean
  viewPost: (postId: string) => void
  followUser: (userId: string) => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

// Mock data for posts (replace with your actual data source)
const POSTS = [
  { id: "1", title: "Post 1", views: [] },
  { id: "2", title: "Post 2", views: [] },
]

// Mock data for users
const USERS = [
  { id: "user1", username: "testuser", posts: [] },
  { id: "user2", username: "anotheruser", posts: [] },
]

// Mock data for notifications
let NOTIFICATIONS = [
  { id: "1", toUserId: "user1", type: "like", content: "Someone liked your post", createdAt: new Date().toISOString() },
  {
    id: "2",
    toUserId: "user1",
    type: "comment",
    content: "Someone commented on your post",
    createdAt: new Date().toISOString(),
  },
  { id: "3", toUserId: "user2", type: "follow", content: "Someone followed you", createdAt: new Date().toISOString() },
  { id: "4", type: "system", content: "Welcome to our platform!", createdAt: new Date().toISOString() },
]

// Mock data for activities
let ACTIVITIES = []

// Mock function to save data (replace with your actual data saving mechanism)
const saveData = (key, data) => {
  if (typeof window !== "undefined") {
    try {
      if (!key || data === undefined) {
        console.error("Invalid data for localStorage:", { key, data })
        return
      }
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }
}

// Mock function to create activity
const createActivity = (type, userId, targetId, activityType) => {
  const activity = {
    id: `activity_${Date.now()}`,
    type,
    userId,
    targetId,
    activityType,
    timestamp: new Date().toISOString(),
  }

  const activities = JSON.parse(localStorage.getItem("activities") || "[]")
  activities.push(activity)
  localStorage.setItem("activities", JSON.stringify(activities))
}

const cleanupOldData = () => {
  try {
    // Clean up notifications older than 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    NOTIFICATIONS = NOTIFICATIONS.filter((notification) => {
      const notificationDate = new Date(notification.createdAt || 0)
      return notificationDate > thirtyDaysAgo
    })

    // Clean up activities older than 30 days
    ACTIVITIES = ACTIVITIES.filter((activity) => {
      const activityDate = new Date(activity.timestamp || 0)
      return activityDate > thirtyDaysAgo
    })

    // Save cleaned data
    saveData("writers_notifications", NOTIFICATIONS)
    saveData("writers_activities", ACTIVITIES)
  } catch (error) {
    console.error("Error cleaning up old data:", error)
  }
}

const validateDataConsistency = () => {
  try {
    // Ensure all users have required fields
    USERS.forEach((user, index) => {
      if (!user.followers) USERS[index].followers = []
      if (!user.following) USERS[index].following = []
      if (!user.posts) USERS[index].posts = []
      if (!user.savedPosts) USERS[index].savedPosts = []
      if (!user.repostedPosts) USERS[index].repostedPosts = []
      if (!user.profileViews) USERS[index].profileViews = []
      if (!user.blocked) USERS[index].blocked = []
      if (!user.badges) USERS[index].badges = []
      if (!user.streak) {
        USERS[index].streak = {
          lastUpdate: new Date().toISOString(),
          count: 1,
        }
      }
    })

    // Ensure all posts have required fields
    POSTS.forEach((post, index) => {
      if (!post.likes) POSTS[index].likes = []
      if (!post.comments) POSTS[index].comments = []
      if (!post.repostedBy) POSTS[index].repostedBy = []
      if (!post.savedBy) POSTS[index].savedBy = []
      if (!post.views) POSTS[index].views = []
      if (!post.tags) POSTS[index].tags = []
    })

    // Save validated data
    saveData("writers_users", USERS)
    saveData("writers_posts", POSTS)
  } catch (error) {
    console.error("Error validating data consistency:", error)
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Rate limiting state
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lastAttempt, setLastAttempt] = useState(null)
  const [lockoutDuration, setLockoutDuration] = useState(0)

  // Session timeout state
  const [sessionTimeout, setSessionTimeout] = useState(null)
  const SESSION_DURATION = 3600 * 1000 // 1 hour

  useEffect(() => {
    const storedUser = localStorage.getItem("writers_current_user")
    if (storedUser) {
      try {
        const userId = JSON.parse(storedUser).id
        const foundUser = USERS.find((u) => u.id === userId)

        if (foundUser) {
          setUser(foundUser)
          resetSessionTimeout()
        }
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("writers_current_user")
      }
    }
    setLoading(false)
  }, [])

  // Session timeout handling
  const resetSessionTimeout = () => {
    if (sessionTimeout) clearTimeout(sessionTimeout)

    const timeout = setTimeout(() => {
      signOutUser()
      alert("Session timed out. Please log in again.")
    }, SESSION_DURATION)

    setSessionTimeout(timeout)
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one number and one special character
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    return re.test(password)
  }

  const validateUsername = (username) => {
    // Username must be at least 3 characters long and contain only alphanumeric characters
    const re = /^[a-zA-Z0-9]{3,}$/
    return re.test(username)
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    // Input validation
    if (!email || !password || !displayName) {
      throw new Error("All fields are required")
    }

    if (!validateEmail(email)) {
      throw new Error("Invalid email format")
    }

    if (!validatePassword(password)) {
      throw new Error(
        "Password must be at least 8 characters long and contain at least one number and one special character",
      )
    }

    if (!validateUsername(displayName)) {
      throw new Error("Username must be at least 3 characters long and contain only alphanumeric characters")
    }

    try {
      // Check if user already exists
      if (USERS.find((u) => u.email === email)) {
        throw new Error("User already exists")
      }

      const newUser = {
        id: `user_${Date.now()}`,
        email,
        displayName,
        password,
        followers: [],
        following: [],
        posts: [],
        savedPosts: [],
        repostedPosts: [],
        profileViews: [],
        blocked: [],
        badges: [],
        streak: {
          lastUpdate: new Date().toISOString(),
          count: 1,
        },
      }

      USERS.push(newUser)
      saveData("writers_users", USERS)

      // Log in the new user
      setUser(newUser)
      localStorage.setItem("writers_current_user", JSON.stringify({ id: newUser.id }))
      resetSessionTimeout()
    } catch (error: any) {
      console.error("Signup failed:", error.message)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    // Input validation
    if (!email || !password) {
      throw new Error("All fields are required")
    }

    if (lockoutDuration > 0) {
      const timeRemaining = lockoutDuration - Date.now()
      if (timeRemaining > 0) {
        throw new Error(`Too many login attempts. Please try again in ${Math.ceil(timeRemaining / 1000)} seconds.`)
      } else {
        setLockoutDuration(0)
        setLoginAttempts(0)
      }
    }

    try {
      const user = USERS.find((u) => u.email === email && u.password === password)
      if (!user) {
        // Rate limiting
        const now = Date.now()
        setLoginAttempts((prevAttempts) => prevAttempts + 1)
        setLastAttempt(now)

        if (loginAttempts >= 3) {
          const lockoutTime = 60 * 1000 // 60 seconds
          setLockoutDuration(now + lockoutTime)
          setLoginAttempts(0)
          throw new Error("Invalid credentials. Too many login attempts. Please try again in 60 seconds.")
        }

        throw new Error("Invalid credentials")
      }

      setUser(user)
      localStorage.setItem("writers_current_user", JSON.stringify({ id: user.id }))
      resetSessionTimeout()
    } catch (error: any) {
      console.error("Signin failed:", error.message)
      throw error
    }
  }

  const signOutUser = async () => {
    try {
      setUser(null)
      localStorage.removeItem("writers_current_user")
      if (sessionTimeout) clearTimeout(sessionTimeout)
    } catch (error: any) {
      console.error("Signout failed:", error.message)
      throw error
    }
  }

  const updateUserProfile = async (displayName: string) => {
    // Input validation
    if (!displayName) {
      throw new Error("Display name is required")
    }

    if (!validateUsername(displayName)) {
      throw new Error("Username must be at least 3 characters long and contain only alphanumeric characters")
    }

    try {
      if (!user) {
        throw new Error("No user logged in")
      }

      const userIndex = USERS.findIndex((u) => u.id === user.id)
      if (userIndex === -1) {
        throw new Error("User not found")
      }

      USERS[userIndex].displayName = displayName
      saveData("writers_users", USERS)

      const updatedUser = { ...user, displayName }
      setUser(updatedUser)
    } catch (error: any) {
      console.error("Update profile failed:", error.message)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    // Input validation
    if (!email) {
      throw new Error("Email is required")
    }

    if (!validateEmail(email)) {
      throw new Error("Invalid email format")
    }

    try {
      // Mock implementation: In a real app, you would send a password reset email
      console.log(`Password reset email sent to ${email}`)
    } catch (error: any) {
      console.error("Reset password failed:", error.message)
      throw error
    }
  }

  const cleanupOldActivities = () => {
    try {
      const activities = JSON.parse(localStorage.getItem("activities") || "[]")
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const recentActivities = activities.filter((activity: any) => new Date(activity.timestamp) > thirtyDaysAgo)

      localStorage.setItem("activities", JSON.stringify(recentActivities))
    } catch (error) {
      console.error("Error cleaning up activities:", error)
    }
  }

  const createPost = (postData) => {
    if (!user) {
      console.error("User must be logged in to create a post")
      return null
    }

    // Validate required fields
    if (!postData.title || (!postData.content && !postData.imageUrl)) {
      console.error("Post must have a title and either content or image")
      return null
    }

    try {
      const newPost = {
        id: `post_${Date.now()}`,
        authorId: user.id,
        likes: [],
        comments: [],
        repostedBy: [],
        savedBy: [],
        views: [], // Add views field
        createdAt: new Date().toISOString(),
        ...postData,
      }

      // Add post to the array
      POSTS.push(newPost)
      saveData("writers_posts", POSTS)

      // Update user's posts
      const userIndex = USERS.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) {
        if (!USERS[userIndex].posts) {
          USERS[userIndex].posts = []
        }
        USERS[userIndex].posts.push(newPost.id)
        saveData("writers_users", USERS)
      }

      // Create activity
      createActivity("post", user.id, newPost.id, "post")

      return newPost
    } catch (error) {
      console.error("Error creating post:", error)
      return null
    }
  }

  const viewPost = (postId) => {
    if (!user) return

    // Find post
    const postIndex = POSTS.findIndex((p) => p.id === postId)
    if (postIndex === -1) return

    // Initialize views array if it doesn't exist
    if (!POSTS[postIndex].views) {
      POSTS[postIndex].views = []
    }

    // Check if user already viewed this post today
    const today = new Date().toISOString().split("T")[0]
    const alreadyViewedToday = POSTS[postIndex].views.some(
      (view) => view.userId === user.id && view.date.startsWith(today),
    )

    if (!alreadyViewedToday) {
      POSTS[postIndex].views.push({
        userId: user.id,
        date: new Date().toISOString(),
      })
      saveData("writers_posts", POSTS)
    }
  }

  const getNotifications = () => {
    if (!user) return []

    try {
      // Get notifications for the current user
      const userNotifications = NOTIFICATIONS.filter((n) => {
        if (!n) return false
        return n.toUserId === user.id || (n.type === "system" && !n.toUserId)
      })

      return userNotifications.sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
      )
    } catch (error) {
      console.error("Error getting notifications:", error)
      return []
    }
  }

  // Call cleanup on login
  useEffect(() => {
    if (user) {
      cleanupOldActivities()
    }
  }, [user])

  const adminLogin = async (username, password) => {
    try {
      console.log("Admin login attempt:", { username, password })

      // Check if username and password match the admin credentials
      if (username.toUpperCase() === "WRITER" && password === "#write_admin7") {
        // Find admin user
        const adminUser = USERS.find((u) => u.isAdmin)

        if (adminUser) {
          console.log("Admin user found:", adminUser)

          // Don't include password in the user object
          const { password: _, ...userWithoutPassword } = adminUser
          setUser(userWithoutPassword)
          localStorage.setItem("writers_current_user", JSON.stringify({ id: adminUser.id }))
          resetSessionTimeout()

          // Update streak
          // updateStreak(adminUser.id)

          // Log admin login
          // logAdminActivity("login", "admin", adminUser.id)

          return { success: true }
        }
      }

      console.error("Admin login failed")
      return { success: false, message: "Invalid admin credentials" }
    } catch (error) {
      console.error("Error during admin login:", error)
      return { success: false, message: "Login error occurred" }
    }
  }

  const followUser = (userId) => {
    if (!user || user.id === userId) return

    try {
      // Validate userId exists
      const targetUser = USERS.find((u) => u.id === userId)
      if (!targetUser) {
        console.error("Target user not found:", userId)
        return
      }

      // Update current user's following
      const currentUserIndex = USERS.findIndex((u) => u.id === user.id)
      if (currentUserIndex === -1) return

      // Check if already following
      if (USERS[currentUserIndex].following && USERS[currentUserIndex].following.includes(userId)) return

      // Initialize arrays if they don't exist
      if (!USERS[currentUserIndex].following) {
        USERS[currentUserIndex].following = []
      }

      // Add to following
      USERS[currentUserIndex].following.push(userId)

      // Update target user's followers
      const targetUserIndex = USERS.findIndex((u) => u.id === userId)
      if (targetUserIndex === -1) return

      if (!USERS[targetUserIndex].followers) {
        USERS[targetUserIndex].followers = []
      }

      // Add to followers
      USERS[targetUserIndex].followers.push(user.id)
      saveData("writers_users", USERS)

      // Update current user state
      const { password: _, ...updatedUser } = USERS[currentUserIndex]
      setUser(updatedUser)

      // Create notification
      const notification = {
        id: `notif_${Date.now()}`,
        type: "follow",
        fromUserId: user.id,
        toUserId: userId,
        createdAt: new Date().toISOString(),
        read: false,
      }
      NOTIFICATIONS.push(notification)
      saveData("writers_notifications", NOTIFICATIONS)

      // Create activity
      createActivity("follow", user.id, userId, "user")
    } catch (error) {
      console.error("Error following user:", error)
    }
  }

  const value: AuthContextProps = {
    user,
    signUp,
    signIn,
    signOutUser,
    updateUserProfile,
    resetPassword,
    loading,
    viewPost,
    followUser,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

// Add this hook at the end of the file
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
export default AuthContext
