"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "../context/auth-context"
import { TrendingUp } from "lucide-react"

export function TrendingTopics() {
  const { getAllPosts } = useAuth()
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const posts = getAllPosts()

      // Extract all tags from posts
      const allTags = []
      posts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
          allTags.push(...post.tags)
        }
      })

      // Count occurrences of each tag
      const tagCounts = {}
      allTags.forEach((tag) => {
        if (typeof tag === "string") {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        }
      })

      // Convert to array and sort by count
      const sortedTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5) // Get top 5

      setTopics(sortedTags)
    } catch (error) {
      console.error("Error loading trending topics:", error)
    } finally {
      setIsLoading(false)
    }
  }, [getAllPosts])

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="font-bold mb-4">Trending Topics</h2>
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    )
  }

  if (topics.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="font-bold mb-4">Trending Topics</h2>
        <p className="text-gray-500 text-center py-4">No trending topics yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="font-bold mb-4">Trending Topics</h2>
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <Link
            key={index}
            href={`/search?q=${encodeURIComponent(topic.tag)}`}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">#{index + 1}</span>
              <span>{topic.tag}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp size={14} className="mr-1 text-green-500" />
              <span>
                {topic.count} {topic.count === 1 ? "post" : "posts"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
