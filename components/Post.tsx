"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import { likePost, addComment } from "../lib/actions"
import { useAuth } from "../app/context/auth-context"

interface PostProps {
  id: string
  title: string
  content: string
  imageUrl?: string
  authorId: string
  authorName: string
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
  views: Array<{ userId: string; date: string }>
  tags?: string[]
}

export default function Post({
  id,
  title,
  content,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  likes = [],
  comments = [],
  views = [],
  tags = [],
}: PostProps) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(user ? likes.some((like) => like.userId === user.id) : false)
  const [likesCount, setLikesCount] = useState(likes.length)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [postComments, setPostComments] = useState(comments)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const handleLike = async () => {
    if (!user) return

    try {
      const result = await likePost(id, user.id)
      if (result.success) {
        setIsLiked(!isLiked)
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const handleComment = async () => {
    if (!user || !newComment.trim()) return

    setIsSubmittingComment(true)
    try {
      const result = await addComment(id, user.id, user.displayName || "Anonymous", newComment.trim())
      if (result.success && result.comment) {
        setPostComments([...postComments, result.comment])
        setNewComment("")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsSubmittingComment(false)
    }
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

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={authorName} />
            <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{authorName}</p>
            <p className="text-xs text-muted-foreground">{formatDate(createdAt)}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {title && <h3 className="font-semibold text-lg">{title}</h3>}

          {content && <p className="text-sm leading-relaxed">{content}</p>}

          {imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Post image"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
                disabled={!user}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-xs">{likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-1 text-muted-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{postComments.length}</span>
              </Button>

              <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground">
                <Share className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          {showComments && (
            <div className="space-y-3 pt-3 border-t">
              {user && (
                <div className="flex space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {user.displayName?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <Button
                      size="sm"
                      onClick={handleComment}
                      disabled={!newComment.trim() || isSubmittingComment}
                      className="text-xs"
                    >
                      {isSubmittingComment ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {postComments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{comment.userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <p className="font-semibold text-xs">{comment.userName}</p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(comment.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
