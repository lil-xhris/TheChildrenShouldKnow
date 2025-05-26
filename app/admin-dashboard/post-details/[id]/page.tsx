"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"
import { AuthBanner } from "../../../components/auth-banner"
import { useAuth } from "../../../context/auth-context"
import { ArrowLeft, Trash2, Heart, MessageSquare } from "lucide-react"

export default function PostDetails() {
  const { id } = useParams()
  const router = useRouter()
  const { user, isLoading, isAdmin, getPost, getAllUsers } = useAuth()
  const [post, setPost] = useState(null)
  const [users, setUsers] = useState({})
  const [activeTab, setActiveTab] = useState("likes")

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin())) {
      router.push("/admin-login")
      return
    }

    if (user && isAdmin()) {
      const fetchedPost = getPost(id)
      if (!fetchedPost) {
        router.push("/admin-dashboard")
        return
      }

      setPost(fetchedPost)

      // Create a map of user IDs to user objects for quick lookup
      const userMap = {}
      getAllUsers().forEach((user) => {
        userMap[user.id] = user
      })
      // Add admin user

      const adminUser = getAllUsers().find((u) => u.isAdmin)
      if (adminUser) {
        userMap[adminUser.id] = adminUser
      }
      setUsers(userMap)
    }
  }, [id, user, isLoading, router, getPost, getAllUsers, isAdmin])

  const handleDeleteComment = (commentId) => {
    if (!post) return

    if (confirm("Are you sure you want to delete this comment? This action cannot be undone.")) {
      // Filter out the comment
      const updatedComments = post.comments.filter((comment) => comment.id !== commentId)

      // Update the post
      setPost({
        ...post,
        comments: updatedComments,
      })

      // In a real app, this would also update the database
      alert("Comment deleted successfully")
    }
  }

  const handleDeleteReply = (commentId, replyId) => {
    if (!post) return

    if (confirm("Are you sure you want to delete this reply? This action cannot be undone.")) {
      // Find the comment
      const comment = post.comments.find((c) => c.id === commentId)
      if (!comment) return

      // Filter out the reply
      const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId)

      // Update the comment
      const updatedComments = post.comments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: updatedReplies,
          }
        }
        return c
      })

      // Update the post
      setPost({
        ...post,
        comments: updatedComments,
      })

      // In a real app, this would also update the database
      alert("Reply deleted successfully")
    }
  }

  if (isLoading || !post) {
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

  const author = users[post.authorId]
  if (!author) return null

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AuthBanner />
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Dashboard
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">Post Details</h1>

                <div className="flex items-center mb-4">
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
                      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                  </Link>
                </div>

                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <div className="prose mb-4 bg-gray-50 p-4 rounded-lg">
                  {post.content.map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <Heart size={16} className="text-red-500 mr-1" />
                    <span>{post.likes.length} likes</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={16} className="text-blue-500 mr-1" />
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b mb-4">
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "likes" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("likes")}
                  >
                    <Heart size={16} className="inline-block mr-1" />
                    Likes
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "comments" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("comments")}
                  >
                    <MessageSquare size={16} className="inline-block mr-1" />
                    Comments
                  </button>
                </div>

                {/* Tab content */}
                {activeTab === "likes" && (
                  <div>
                    <h3 className="font-medium mb-3">Users who liked this post</h3>
                    {post.likes.length > 0 ? (
                      <div className="space-y-3">
                        {post.likes.map((userId) => {
                          const likeUser = users[userId]
                          if (!likeUser) return null

                          return (
                            <Link href={`/user/${likeUser.id}`} key={likeUser.id}>
                              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <Image
                                  src={likeUser.profileImage || "/placeholder.svg"}
                                  alt={likeUser.username}
                                  width={40}
                                  height={40}
                                  className="rounded-full mr-3"
                                />
                                <div>
                                  <p className="font-medium">{likeUser.username}</p>
                                  <p className="text-sm text-gray-500">{likeUser.email}</p>
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500">No likes yet.</p>
                    )}
                  </div>
                )}

                {activeTab === "comments" && (
                  <div>
                    <h3 className="font-medium mb-3">Comments</h3>
                    {post.comments.length > 0 ? (
                      <div className="space-y-4">
                        {post.comments.map((comment) => {
                          const commentAuthor = users[comment.authorId]
                          if (!commentAuthor) return null

                          return (
                            <div key={comment.id} className="border-b pb-4">
                              <div className="flex items-start">
                                <Image
                                  src={commentAuthor.profileImage || "/placeholder.svg"}
                                  alt={commentAuthor.username}
                                  width={40}
                                  height={40}
                                  className="rounded-full mr-3 mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <Link href={`/user/${commentAuthor.id}`} className="font-medium">
                                        {commentAuthor.username}
                                      </Link>
                                      <p className="text-sm text-gray-500">
                                        {new Date(comment.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteComment(comment.id)}
                                      className="text-red-500 hover:text-red-700"
                                      title="Delete comment"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                  <div className="bg-gray-100 rounded-lg p-3 mt-2">
                                    <p>{comment.text}</p>
                                  </div>
                                  <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <Heart size={14} className="mr-1" />
                                      <span>{comment.likes.length} likes</span>
                                    </div>
                                    <div className="ml-4 flex items-center">
                                      <MessageSquare size={14} className="mr-1" />
                                      <span>{comment.replies.length} replies</span>
                                    </div>
                                  </div>

                                  {/* Replies */}
                                  {comment.replies.length > 0 && (
                                    <div className="mt-3 ml-6 space-y-3">
                                      {comment.replies.map((reply) => {
                                        const replyAuthor = users[reply.authorId]
                                        if (!replyAuthor) return null

                                        return (
                                          <div key={reply.id} className="flex items-start">
                                            <Image
                                              src={replyAuthor.profileImage || "/placeholder.svg"}
                                              alt={replyAuthor.username}
                                              width={32}
                                              height={32}
                                              className="rounded-full mr-2 mt-1"
                                            />
                                            <div className="flex-1">
                                              <div className="flex justify-between items-start">
                                                <div>
                                                  <Link href={`/user/${replyAuthor.id}`} className="font-medium">
                                                    {replyAuthor.username}
                                                  </Link>
                                                  <p className="text-xs text-gray-500">
                                                    {new Date(reply.createdAt).toLocaleString()}
                                                  </p>
                                                </div>
                                                <button
                                                  onClick={() => handleDeleteReply(comment.id, reply.id)}
                                                  className="text-red-500 hover:text-red-700"
                                                  title="Delete reply"
                                                >
                                                  <Trash2 size={14} />
                                                </button>
                                              </div>
                                              <div className="bg-gray-100 rounded-lg p-2 mt-1">
                                                <p className="text-sm">{reply.text}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500">No comments yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
