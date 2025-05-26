"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { AuthBanner } from "../components/auth-banner"
import { useAuth } from "../context/auth-context"
import { Bookmark, Heart, MessageSquare, Repeat } from "lucide-react"

export default function BookmarksPage() {
  const { user, isLoading, getAllPosts, getAllUsers, unsavePost } = useAuth()
  const router = useRouter()
  const [savedPosts, setSavedPosts] = useState([])
  const [users, setUsers] = useState({})

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    if (user) {
      // Get all posts
      const allPosts = getAllPosts()

      // Filter to only saved posts
      const userSavedPosts = allPosts.filter((post) => post.savedBy.includes(user.id))
      setSavedPosts(userSavedPosts)

      // Create a map of user IDs to user objects for quick lookup
      const userMap = {}
      getAllUsers().forEach((user) => {
        userMap[user.id] = user
      })
      setUsers(userMap)
    }
  }, [user, isLoading, router, getAllPosts, getAllUsers])

  const handleUnsavePost = (postId) => {
    unsavePost(postId)
    setSavedPosts(savedPosts.filter((post) => post.id !== postId))
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
            <h1 className="text-2xl font-bold mb-6">Saved Posts</h1>

            {savedPosts.length > 0 ? (
              <div className="space-y-6">
                {savedPosts.map((post) => {
                  const author = users[post.authorId]
                  if (!author) return null

                  return (
                    <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <Link href={`/user/${author.id}`} className="flex items-center">
                            <Image
                              src={author.profileImage || "/placeholder.svg"}
                              alt={author.username}
                              width={40}
                              height={40}
                              className="rounded-full mr-3"
                            />
                            <div>
                              <p className="font-medium">{author.username}</p>
                              <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                          </Link>

                          <button
                            onClick={() => handleUnsavePost(post.id)}
                            className="ml-auto text-blue-500 hover:text-blue-700"
                            title="Remove from saved"
                          >
                            <Bookmark size={20} fill="currentColor" />
                          </button>
                        </div>

                        <Link href={`/post/${post.id}`}>
                          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                          <div className="prose mb-4">
                            {post.content.slice(0, 3).map((line, index) => (
                              <p key={index}>{line}</p>
                            ))}
                            {post.content.length > 3 && (
                              <p className="text-purple-600 hover:text-purple-800">Read more...</p>
                            )}
                          </div>
                        </Link>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div>
                            {post.likes.length > 0 && (
                              <span className="flex items-center">
                                <Heart size={14} className="mr-1" />
                                {post.likes.length}
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-4">
                            {post.comments.length > 0 && (
                              <span className="flex items-center">
                                <MessageSquare size={14} className="mr-1" />
                                {post.comments.length}
                              </span>
                            )}
                            {post.repostedBy.length > 0 && (
                              <span className="flex items-center">
                                <Repeat size={14} className="mr-1" />
                                {post.repostedBy.length}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Bookmark size={48} className="mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-bold mb-2">No saved posts yet</h2>
                <p className="text-gray-600 mb-4">When you save posts, they'll appear here.</p>
                <Link
                  href="/home"
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Browse posts
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
