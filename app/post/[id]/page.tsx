"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Post {
  id: string
  title: string
  content: string
  userId: string
  views?: number
}

interface User {
  id: string
}

const PostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Mock user data (replace with actual authentication)
    setUser({ id: "user123" })

    // Mock post data (replace with actual data fetching)
    const posts = JSON.parse(localStorage.getItem("posts") || "[]")
    const foundPost = posts.find((p: any) => p.id === id)
    setPost(foundPost)
  }, [id])

  useEffect(() => {
    if (post && user && post.userId !== user.id) {
      // Track view
      const views = JSON.parse(localStorage.getItem("postViews") || "{}")
      const viewKey = `${post.id}-${user.id}`
      if (!views[viewKey]) {
        views[viewKey] = true
        localStorage.setItem("postViews", JSON.stringify(views))

        // Update post views count
        const posts = JSON.parse(localStorage.getItem("posts") || "[]")
        const updatedPosts = posts.map((p: any) => (p.id === post.id ? { ...p, views: (p.views || 0) + 1 } : p))
        localStorage.setItem("posts", JSON.stringify(updatedPosts))
      }
    }
  }, [post, user])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Views: {post.views || 0}</p>
    </div>
  )
}

export default PostPage
