"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { AuthBanner } from "../components/auth-banner"
import { useAuth } from "../context/auth-context"
import { FileText, ImageIcon } from "lucide-react"
import { ImagePostForm } from "../components/image-post-form"

export default function CreatePost() {
  const { user, isLoading, createPost } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [postType, setPostType] = useState("text") // "text" or "image"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || isSubmitting) return

    setIsSubmitting(true)

    // Split content by newlines
    const contentLines = content.split("\n").filter((line) => line.trim() !== "")

    // Create post
    const newPost = {
      title,
      content: contentLines,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      repostedBy: [],
      savedBy: [],
      tags: [],
    }

    createPost(newPost)
    router.push("/home")
  }

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <AuthBanner />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AuthBanner />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-purple-700">Create New Post</h1>

            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 font-medium ${
                    postType === "text" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                  }`}
                  onClick={() => setPostType("text")}
                >
                  <FileText className="inline-block mr-1" size={16} />
                  Text Post
                </button>
                <button
                  className={`flex-1 py-3 font-medium ${
                    postType === "image" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                  }`}
                  onClick={() => setPostType("image")}
                >
                  <ImageIcon className="inline-block mr-1" size={16} />
                  Image Post
                </button>
              </div>
            </div>

            {postType === "text" ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-bold mb-4 flex items-center">
                  <FileText className="mr-2" size={20} />
                  Create Text Post
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Write your post content here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px]"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      disabled={!title.trim() || !content.trim() || isSubmitting}
                    >
                      {isSubmitting ? "Posting..." : "Post"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <ImagePostForm />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
