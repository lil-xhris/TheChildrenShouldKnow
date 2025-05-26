"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createPost, getPosts } from "@/lib/actions"
import Post from "@/components/Post"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostImage, setNewPostImage] = useState<File | null>(null)
  const [isCreatingPost, setIsCreatingPost] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const initialPosts = await getPosts()
      setPosts(initialPosts)
    }

    fetchPosts()
  }, [])

  const handleCreatePost = async (content: string, image?: File) => {
    try {
      setIsCreatingPost(true)
      await createPost(content, image)
      // Refresh posts
      const updatedPosts = await getPosts()
      setPosts(updatedPosts)
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post. Please try again.")
    } finally {
      setIsCreatingPost(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPostContent.trim() === "") {
      alert("Post content cannot be empty.")
      return
    }

    await handleCreatePost(newPostContent, newPostImage || undefined)
    setNewPostContent("")
    setNewPostImage(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewPostImage(e.target.files[0])
    } else {
      setNewPostImage(null)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded mb-2"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={isCreatingPost}
        >
          {isCreatingPost ? "Creating..." : "Create Post"}
        </button>
      </form>

      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
