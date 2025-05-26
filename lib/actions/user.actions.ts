"use server"

// Mock user data (in a real app, this would be a database)
let USERS = [
  {
    id: "user1",
    username: "admin",
    displayName: "Admin User",
    email: "admin@writers.com",
    bio: "Platform administrator",
    followers: [],
    following: [],
    posts: [],
    savedPosts: [],
    profileViews: [],
    joinedAt: new Date().toISOString(),
    isAdmin: true,
  },
]

export async function getUser(userId: string) {
  try {
    // In a real app, fetch from database
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("writers_users")
      if (storedUsers) {
        USERS = JSON.parse(storedUsers)
      }
    }

    const user = USERS.find((u) => u.id === userId)
    if (!user) {
      throw new Error("User not found")
    }

    // Don't return sensitive information like password
    const { password, ...safeUser } = user as any
    return safeUser
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export async function getUserByUsername(username: string) {
  try {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("writers_users")
      if (storedUsers) {
        USERS = JSON.parse(storedUsers)
      }
    }

    const user = USERS.find((u) => u.username === username)
    if (!user) {
      throw new Error("User not found")
    }

    const { password, ...safeUser } = user as any
    return safeUser
  } catch (error) {
    console.error("Error fetching user by username:", error)
    return null
  }
}

export async function updateUser(userId: string, updateData: any) {
  try {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("writers_users")
      if (storedUsers) {
        USERS = JSON.parse(storedUsers)
      }
    }

    const userIndex = USERS.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update user data
    USERS[userIndex] = { ...USERS[userIndex], ...updateData }

    // Save to storage
    if (typeof window !== "undefined") {
      localStorage.setItem("writers_users", JSON.stringify(USERS))
    }

    const { password, ...safeUser } = USERS[userIndex] as any
    return { success: true, user: safeUser }
  } catch (error) {
    console.error("Error updating user:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function followUser(followerId: string, followingId: string) {
  try {
    if (followerId === followingId) {
      throw new Error("Cannot follow yourself")
    }

    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("writers_users")
      if (storedUsers) {
        USERS = JSON.parse(storedUsers)
      }
    }

    const followerIndex = USERS.findIndex((u) => u.id === followerId)
    const followingIndex = USERS.findIndex((u) => u.id === followingId)

    if (followerIndex === -1 || followingIndex === -1) {
      throw new Error("User not found")
    }

    // Check if already following
    if (USERS[followerIndex].following?.includes(followingId)) {
      throw new Error("Already following this user")
    }

    // Add to following list
    if (!USERS[followerIndex].following) {
      USERS[followerIndex].following = []
    }
    USERS[followerIndex].following.push(followingId)

    // Add to followers list
    if (!USERS[followingIndex].followers) {
      USERS[followingIndex].followers = []
    }
    USERS[followingIndex].followers.push(followerId)

    // Save to storage
    if (typeof window !== "undefined") {
      localStorage.setItem("writers_users", JSON.stringify(USERS))
    }

    return { success: true }
  } catch (error) {
    console.error("Error following user:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function unfollowUser(followerId: string, followingId: string) {
  try {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("writers_users")
      if (storedUsers) {
        USERS = JSON.parse(storedUsers)
      }
    }

    const followerIndex = USERS.findIndex((u) => u.id === followerId)
    const followingIndex = USERS.findIndex((u) => u.id === followingId)

    if (followerIndex === -1 || followingIndex === -1) {
      throw new Error("User not found")
    }

    // Remove from following list
    if (USERS[followerIndex].following) {
      USERS[followerIndex].following = USERS[followerIndex].following.filter((id) => id !== followingId)
    }

    // Remove from followers list
    if (USERS[followingIndex].followers) {
      USERS[followingIndex].followers = USERS[followingIndex].followers.filter((id) => id !== followerId)
    }

    // Save to storage
    if (typeof window !== "undefined") {
      localStorage.setItem("writers_users", JSON.stringify(USERS))
    }

    return { success: true }
  } catch (error) {
    console.error("Error unfollowing user:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Additional user-related functions
export async function getAllUsers() {
  try {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("writers_users")
      if (storedUsers) {
        USERS = JSON.parse(storedUsers)
      }
    }

    // Return users without sensitive information
    return USERS.map(({ password, ...user }: any) => user)
  } catch (error) {
    console.error("Error fetching all users:", error)
    return []
  }
}

export async function searchUsers(query: string) {
  try {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("writers_users")
      if (storedUsers) {
        USERS = JSON.parse(storedUsers)
      }
    }

    const filteredUsers = USERS.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.displayName.toLowerCase().includes(query.toLowerCase()),
    )

    // Return users without sensitive information
    return filteredUsers.map(({ password, ...user }: any) => user)
  } catch (error) {
    console.error("Error searching users:", error)
    return []
  }
}
