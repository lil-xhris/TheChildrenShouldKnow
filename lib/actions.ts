"use server"

import { revalidatePath } from "next/cache"

// Mock data storage (in a real app, this would be a database)
let POSTS = [
  {
    id: "1",
    title: "Welcome to Writers Platform",
    content: "This is the first post on our platform.",
    authorId: "user1",
    authorName: "Admin",
    createdAt: new Date().toISOString(),
    likes: [],
    comments: [],
    views: [],
    tags: ["welcome", "announcement"],
  },
]

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const authorId = formData.get("authorId") as string
    const authorName = formData.get("authorName") as string
    const imageUrl = formData.get("imageUrl") as string

    if (!title || (!content && !imageUrl)) {
      throw new Error("Title and either content or image are required")
    }

    const newPost = {
      id: `post_${Date.now()}`,
      title,
      content: content || "",
      imageUrl: imageUrl || "",
      authorId: authorId || "anonymous",
      authorName: authorName || "Anonymous",
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      views: [],
      tags: [],
    }

    POSTS.unshift(newPost)

    // In a real app, save to database here
    if (typeof window !== "undefined") {
      localStorage.setItem("writers_posts", JSON.stringify(POSTS))
    }

    revalidatePath("/home")
    revalidatePath("/")

    return { success: true, post: newPost }
  } catch (error) {
    console.error("Error creating post:", error)
    return { success: false, error: error.message }
  }
}

export async function getPosts() {
  try {
    // In a real app, fetch from database
    if (typeof window !== "undefined") {
      const storedPosts = localStorage.getItem("writers_posts")
      if (storedPosts) {
        POSTS = JSON.parse(storedPosts)
      }
    }

    return POSTS.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function likePost(postId: string, userId: string) {
  try {
    const postIndex = POSTS.findIndex((p) => p.id === postId)
    if (postIndex === -1) {
      throw new Error("Post not found")
    }

    const post = POSTS[postIndex]
    const likeIndex = post.likes.findIndex((like) => like.userId === userId)

    if (likeIndex === -1) {
      // Add like
      post.likes.push({ userId, createdAt: new Date().toISOString() })
    } else {
      // Remove like
      post.likes.splice(likeIndex, 1)
    }

    // Save to storage
    if (typeof window !== "undefined") {
      localStorage.setItem("writers_posts", JSON.stringify(POSTS))
    }

    revalidatePath("/home")
    revalidatePath("/")

    return { success: true, likes: post.likes.length }
  } catch (error) {
    console.error("Error liking post:", error)
    return { success: false, error: error.message }
  }
}

export async function addComment(postId: string, userId: string, userName: string, content: string) {
  try {
    const postIndex = POSTS.findIndex((p) => p.id === postId)
    if (postIndex === -1) {
      throw new Error("Post not found")
    }

    const comment = {
      id: `comment_${Date.now()}`,
      userId,
      userName,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
    }

    POSTS[postIndex].comments.push(comment)

    // Save to storage
    if (typeof window !== "undefined") {
      localStorage.setItem("writers_posts", JSON.stringify(POSTS))
    }

    revalidatePath("/home")
    revalidatePath("/")

    return { success: true, comment }
  } catch (error) {
    console.error("Error adding comment:", error)
    return { success: false, error: error.message }
  }
}
