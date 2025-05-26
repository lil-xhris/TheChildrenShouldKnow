"use client"

import type React from "react"
import { createContext, useState, useEffect, type ReactNode, useContext } from "react"

interface User {
  id: string
  email: string
  displayName: string
  username: string
  photoURL?: string
  bio?: string
  followers: string[]
  following: string[]
  posts: string[]
  savedPosts: string[]
  repostedPosts: string[]
  profileViews: Array<{ userId: string; date: string }>
  blocked: string[]
  badges: string[]
  streak: { lastUpdate: string; count: number }
  isAdmin?: boolean
  joinedAt: string
}

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string
  authorId: string
  authorName: string
  authorUsername: string
  createdAt: string
  likes: Array<{ userId: string; createdAt: string }>
  comments: Array<{
    id: string
    userId: string
    userName: string
    content: string
    createdAt: string
    likes: Array<{ userId: string }>
  }>
  repostedBy: Array<{ userId: string; createdAt: string }>
  savedBy: string[]
  views: Array<{ userId: string; date: string }>
  tags: string[]
}

interface AuthContextProps {
  user: User | null
  signUp: (email: string, password: string, displayName: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  adminLogin: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  signOutUser: () => Promise<void>
  updateUserProfile: (data: Partial<User>) => Promise<void>
  loading: boolean
  // Post functions
  createPost: (title: string, content: string, imageUrl?: string) => Promise<Post | null>
  getPosts: () => Post[]
  getUserPosts: (userId: string) => Post[]
  likePost: (postId: string) => void
  commentOnPost: (postId: string, content: string) => void
  repostPost: (postId: string) => void
  savePost: (postId: string) => void
  viewPost: (postId: string) => void
  // User functions
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void
  getUser: (userId: string) => User | null
  getAllUsers: () => User[]
  searchUsers: (query: string) => User[]
  // Notification functions
  getNotifications: () => any[]
  markNotificationAsRead: (notificationId: string) => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

// Initialize data
const initializeData = () => {
  if (typeof window === "undefined") return

  // Initialize admin user if not exists
  const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
  if (users.length === 0) {
    const adminUser: User = {
      id: "admin_001",
      email: "admin@writers.com",
      displayName: "Admin",
      username: "admin",
      bio: "Platform Administrator",
      followers: [],
      following: [],
      posts: [],
      savedPosts: [],
      repostedPosts: [],
      profileViews: [],
      blocked: [],
      badges: ["admin", "founder"],
      streak: { lastUpdate: new Date().toISOString(), count: 1 },
      isAdmin: true,
      joinedAt: new Date().toISOString(),
    }
    users.push(adminUser)
    localStorage.setItem("writers_users", JSON.stringify(users))
  }

  // Initialize posts if not exists
  const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
  if (posts.length === 0) {
    const welcomePost: Post = {
      id: "post_001",
      title: "Welcome to WRITERS Platform!",
      content:
        "This is the beginning of a new era in creative writing and literary expression. Share your stories, connect with fellow writers, and let your creativity flourish!",
      authorId: "admin_001",
      authorName: "Admin",
      authorUsername: "admin",
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      repostedBy: [],
      savedBy: [],
      views: [],
      tags: ["welcome", "announcement"],
    }
    posts.push(welcomePost)
    localStorage.setItem("writers_posts", JSON.stringify(posts))
  }

  // Initialize notifications
  const notifications = JSON.parse(localStorage.getItem("writers_notifications") || "[]")
  localStorage.setItem("writers_notifications", JSON.stringify(notifications))
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeData()

    // Check for existing session
    const currentUserId = localStorage.getItem("writers_current_user_id")
    if (currentUserId) {
      const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
      const foundUser = users.find((u: User) => u.id === currentUserId)
      if (foundUser) {
        setUser(foundUser)
      } else {
        localStorage.removeItem("writers_current_user_id")
      }
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, displayName: string, username: string) => {
    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")

    // Check if user already exists
    if (users.find((u: User) => u.email === email || u.username === username)) {
      throw new Error("User with this email or username already exists")
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      displayName,
      username,
      bio: "",
      followers: [],
      following: [],
      posts: [],
      savedPosts: [],
      repostedPosts: [],
      profileViews: [],
      blocked: [],
      badges: [],
      streak: { lastUpdate: new Date().toISOString(), count: 1 },
      joinedAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("writers_users", JSON.stringify(users))
    localStorage.setItem("writers_current_user_id", newUser.id)
    setUser(newUser)
  }

  const signIn = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
    const foundUser = users.find((u: User) => u.email === email)

    if (!foundUser) {
      throw new Error("Invalid credentials")
    }

    localStorage.setItem("writers_current_user_id", foundUser.id)
    setUser(foundUser)
  }

  const adminLogin = async (username: string, password: string) => {
    if (username.toUpperCase() === "WRITER" && password === "#write_admin7") {
      const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
      const adminUser = users.find((u: User) => u.isAdmin)

      if (adminUser) {
        localStorage.setItem("writers_current_user_id", adminUser.id)
        setUser(adminUser)
        return { success: true }
      }
    }
    return { success: false, message: "Invalid admin credentials" }
  }

  const signOutUser = async () => {
    localStorage.removeItem("writers_current_user_id")
    setUser(null)
  }

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return

    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
    const userIndex = users.findIndex((u: User) => u.id === user.id)

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data }
      localStorage.setItem("writers_users", JSON.stringify(users))
      setUser(users[userIndex])
    }
  }

  const createPost = async (title: string, content: string, imageUrl?: string): Promise<Post | null> => {
    if (!user) return null

    const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
    const newPost: Post = {
      id: `post_${Date.now()}`,
      title,
      content,
      imageUrl,
      authorId: user.id,
      authorName: user.displayName,
      authorUsername: user.username,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      repostedBy: [],
      savedBy: [],
      views: [],
      tags: [],
    }

    posts.unshift(newPost)
    localStorage.setItem("writers_posts", JSON.stringify(posts))

    // Update user's posts
    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
    const userIndex = users.findIndex((u: User) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex].posts.push(newPost.id)
      localStorage.setItem("writers_users", JSON.stringify(users))
      setUser(users[userIndex])
    }

    return newPost
  }

  const getPosts = (): Post[] => {
    return JSON.parse(localStorage.getItem("writers_posts") || "[]")
  }

  const getUserPosts = (userId: string): Post[] => {
    const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
    return posts.filter((post: Post) => post.authorId === userId)
  }

  const likePost = (postId: string) => {
    if (!user) return

    const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
    const postIndex = posts.findIndex((p: Post) => p.id === postId)

    if (postIndex !== -1) {
      const likeIndex = posts[postIndex].likes.findIndex((like: any) => like.userId === user.id)

      if (likeIndex === -1) {
        posts[postIndex].likes.push({ userId: user.id, createdAt: new Date().toISOString() })
      } else {
        posts[postIndex].likes.splice(likeIndex, 1)
      }

      localStorage.setItem("writers_posts", JSON.stringify(posts))
    }
  }

  const commentOnPost = (postId: string, content: string) => {
    if (!user) return

    const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
    const postIndex = posts.findIndex((p: Post) => p.id === postId)

    if (postIndex !== -1) {
      const comment = {
        id: `comment_${Date.now()}`,
        userId: user.id,
        userName: user.displayName,
        content,
        createdAt: new Date().toISOString(),
        likes: [],
      }

      posts[postIndex].comments.push(comment)
      localStorage.setItem("writers_posts", JSON.stringify(posts))
    }
  }

  const repostPost = (postId: string) => {
    if (!user) return

    const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
    const postIndex = posts.findIndex((p: Post) => p.id === postId)

    if (postIndex !== -1) {
      const repostIndex = posts[postIndex].repostedBy.findIndex((repost: any) => repost.userId === user.id)

      if (repostIndex === -1) {
        posts[postIndex].repostedBy.push({ userId: user.id, createdAt: new Date().toISOString() })

        // Add to user's reposts
        const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
        const userIndex = users.findIndex((u: User) => u.id === user.id)
        if (userIndex !== -1) {
          users[userIndex].repostedPosts.push(postId)
          localStorage.setItem("writers_users", JSON.stringify(users))
          setUser(users[userIndex])
        }
      }

      localStorage.setItem("writers_posts", JSON.stringify(posts))
    }
  }

  const savePost = (postId: string) => {
    if (!user) return

    const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
    const postIndex = posts.findIndex((p: Post) => p.id === postId)

    if (postIndex !== -1) {
      const saveIndex = posts[postIndex].savedBy.indexOf(user.id)

      if (saveIndex === -1) {
        posts[postIndex].savedBy.push(user.id)

        // Add to user's saved posts
        const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
        const userIndex = users.findIndex((u: User) => u.id === user.id)
        if (userIndex !== -1) {
          users[userIndex].savedPosts.push(postId)
          localStorage.setItem("writers_users", JSON.stringify(users))
          setUser(users[userIndex])
        }
      } else {
        posts[postIndex].savedBy.splice(saveIndex, 1)

        // Remove from user's saved posts
        const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
        const userIndex = users.findIndex((u: User) => u.id === user.id)
        if (userIndex !== -1) {
          const savedIndex = users[userIndex].savedPosts.indexOf(postId)
          if (savedIndex !== -1) {
            users[userIndex].savedPosts.splice(savedIndex, 1)
            localStorage.setItem("writers_users", JSON.stringify(users))
            setUser(users[userIndex])
          }
        }
      }

      localStorage.setItem("writers_posts", JSON.stringify(posts))
    }
  }

  const viewPost = (postId: string) => {
    if (!user) return

    const posts = JSON.parse(localStorage.getItem("writers_posts") || "[]")
    const postIndex = posts.findIndex((p: Post) => p.id === postId)

    if (postIndex !== -1) {
      const today = new Date().toISOString().split("T")[0]
      const alreadyViewedToday = posts[postIndex].views.some(
        (view: any) => view.userId === user.id && view.date.startsWith(today),
      )

      if (!alreadyViewedToday) {
        posts[postIndex].views.push({ userId: user.id, date: new Date().toISOString() })
        localStorage.setItem("writers_posts", JSON.stringify(posts))
      }
    }
  }

  const followUser = (userId: string) => {
    if (!user || user.id === userId) return

    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
    const currentUserIndex = users.findIndex((u: User) => u.id === user.id)
    const targetUserIndex = users.findIndex((u: User) => u.id === userId)

    if (currentUserIndex !== -1 && targetUserIndex !== -1) {
      if (!users[currentUserIndex].following.includes(userId)) {
        users[currentUserIndex].following.push(userId)
        users[targetUserIndex].followers.push(user.id)

        localStorage.setItem("writers_users", JSON.stringify(users))
        setUser(users[currentUserIndex])
      }
    }
  }

  const unfollowUser = (userId: string) => {
    if (!user || user.id === userId) return

    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
    const currentUserIndex = users.findIndex((u: User) => u.id === user.id)
    const targetUserIndex = users.findIndex((u: User) => u.id === userId)

    if (currentUserIndex !== -1 && targetUserIndex !== -1) {
      const followingIndex = users[currentUserIndex].following.indexOf(userId)
      const followerIndex = users[targetUserIndex].followers.indexOf(user.id)

      if (followingIndex !== -1) {
        users[currentUserIndex].following.splice(followingIndex, 1)
      }
      if (followerIndex !== -1) {
        users[targetUserIndex].followers.splice(followerIndex, 1)
      }

      localStorage.setItem("writers_users", JSON.stringify(users))
      setUser(users[currentUserIndex])
    }
  }

  const getUser = (userId: string): User | null => {
    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
    return users.find((u: User) => u.id === userId) || null
  }

  const getAllUsers = (): User[] => {
    return JSON.parse(localStorage.getItem("writers_users") || "[]")
  }

  const searchUsers = (query: string): User[] => {
    const users = JSON.parse(localStorage.getItem("writers_users") || "[]")
    return users.filter(
      (u: User) =>
        u.displayName.toLowerCase().includes(query.toLowerCase()) ||
        u.username.toLowerCase().includes(query.toLowerCase()),
    )
  }

  const getNotifications = () => {
    return JSON.parse(localStorage.getItem("writers_notifications") || "[]")
  }

  const markNotificationAsRead = (notificationId: string) => {
    const notifications = JSON.parse(localStorage.getItem("writers_notifications") || "[]")
    const notificationIndex = notifications.findIndex((n: any) => n.id === notificationId)

    if (notificationIndex !== -1) {
      notifications[notificationIndex].read = true
      localStorage.setItem("writers_notifications", JSON.stringify(notifications))
    }
  }

  const value: AuthContextProps = {
    user,
    signUp,
    signIn,
    adminLogin,
    signOutUser,
    updateUserProfile,
    loading,
    createPost,
    getPosts,
    getUserPosts,
    likePost,
    commentOnPost,
    repostPost,
    savePost,
    viewPost,
    followUser,
    unfollowUser,
    getUser,
    getAllUsers,
    searchUsers,
    getNotifications,
    markNotificationAsRead,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthContext
