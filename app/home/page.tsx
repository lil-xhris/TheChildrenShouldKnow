"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/auth-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

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

export default function Home() {
  const { user, getPosts, createPost, likePost, commentOnPost, savePost, repostPost, viewPost } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostImage, setNewPostImage] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    loadPosts()
  }, [user, router])

  const loadPosts = () => {
    const allPosts = getPosts()
    setPosts(allPosts)
  }

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() && !newPostContent.trim()) return

    setIsCreating(true)
    try {
      const post = await createPost(newPostTitle, newPostContent, newPostImage)
      if (post) {
        setNewPostTitle("")
        setNewPostContent("")
        setNewPostImage("")
        setShowCreateForm(false)
        loadPosts()
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleLike = (postId: string) => {
    likePost(postId)
    loadPosts()
  }

  const handleComment = (postId: string) => {
    const content = commentInputs[postId]
    if (!content?.trim()) return

    commentOnPost(postId, content)
    setCommentInputs({ ...commentInputs, [postId]: "" })
    loadPosts()
  }

  const handleSave = (postId: string) => {
    savePost(postId)
    loadPosts()
  }

  const handleRepost = (postId: string) => {
    repostPost(postId)
    loadPosts()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const isLikedByUser = (post: Post) => {
    return user ? post.likes.some((like) => like.userId === user.id) : false
  }

  const isSavedByUser = (post: Post) => {
    return user ? post.savedBy.includes(user.id) : false
  }

  if (!user) {
    return <div>Redirecting to login...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Home</h1>
          <p className="text-gray-600">Welcome back, {user.displayName}!</p>
        </div>

        {/* Create Post */}
        <Card className="mb-6">
          <CardContent className="p-4">
            {!showCreateForm ? (
              <Button
                onClick={() => setShowCreateForm(true)}
                className="w-full text-left justify-start"
                variant="ghost"
              >
                What's on your mind, {user.displayName}?
              </Button>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Post title (optional)"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreatePost}
                    disabled={isCreating || (!newPostTitle.trim() && !newPostContent.trim())}
                  >
                    {isCreating ? "Posting..." : "Post"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false)
                      setNewPostTitle("")
                      setNewPostContent("")
                      setNewPostImage("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No posts yet. Be the first to share something!</p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={post.authorName} />
                        <AvatarFallback>{post.authorName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{post.authorName}</p>
                        <p className="text-xs text-gray-500">
                          @{post.authorUsername} • {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {post.title && <h3 className="font-semibold text-lg">{post.title}</h3>}
                    {post.content && <p className="text-gray-800 leading-relaxed">{post.content}</p>}

                    {post.imageUrl && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={post.imageUrl || "/placeholder.svg"}
                          alt="Post image"
                          className="w-full h-auto object-cover max-h-96"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=300&width=500"
                          }}
                        />
                      </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 ${
                            isLikedByUser(post) ? "text-red-500" : "text-gray-500"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isLikedByUser(post) ? "fill-current" : ""}`} />
                          <span className="text-xs">{post.likes.length}</span>
                        </Button>

                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs">{post.comments.length}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRepost(post.id)}
                          className="flex items-center space-x-1 text-gray-500"
                        >
                          <Share className="h-4 w-4" />
                          <span className="text-xs">{post.repostedBy.length}</span>
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(post.id)}
                        className={`${isSavedByUser(post) ? "text-blue-500" : "text-gray-500"}`}
                      >
                        <Bookmark className={`h-4 w-4 ${isSavedByUser(post) ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {post.comments.length > 0 && (
                      <div className="space-y-3 pt-3 border-t">
                        {post.comments.slice(0, 3).map((comment) => (
                          <div key={comment.id} className="flex space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {comment.userName.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-lg p-2">
                                <p className="font-semibold text-xs">{comment.userName}</p>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{formatDate(comment.createdAt)}</p>
                            </div>
                          </div>
                        ))}
                        {post.comments.length > 3 && (
                          <p className="text-xs text-gray-500 pl-10">View {post.comments.length - 3} more comments</p>
                        )}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="flex space-x-2 pt-3 border-t">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{user.displayName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleComment(post.id)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
