"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { AuthBanner } from "../components/auth-banner"
import { useAuth } from "../context/auth-context"
import { Search, User, FileText, Hash, UserPlus } from "lucide-react"

export default function SearchPage() {
  const { user, isLoading, getAllUsers, getAllPosts, followUser } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all") // all, users, posts, topics
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
    topics: [],
  })

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults({
        users: [],
        posts: [],
        topics: [],
      })
      return
    }

    const lowerCaseQuery = query.toLowerCase()

    // Search users
    const allUsers = getAllUsers()
    const matchedUsers = allUsers.filter(
      (u) => u.username.toLowerCase().includes(lowerCaseQuery) || u.bio.toLowerCase().includes(lowerCaseQuery),
    )

    // Search posts
    const allPosts = getAllPosts()
    const matchedPosts = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerCaseQuery) ||
        p.content.some((line) => line.toLowerCase().includes(lowerCaseQuery)),
    )

    // Mock topics search
    const mockTopics = [
      { id: "1", name: "Poetry", count: 24 },
      { id: "2", name: "CreativeWriting", count: 18 },
      { id: "3", name: "ShortStories", count: 15 },
      { id: "4", name: "WritingPrompts", count: 12 },
      { id: "5", name: "WritingTips", count: 9 },
    ]

    const matchedTopics = mockTopics.filter((t) => t.name.toLowerCase().includes(lowerCaseQuery))

    setSearchResults({
      users: matchedUsers,
      posts: matchedPosts,
      topics: matchedTopics,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(searchQuery)

    // Update URL with search query
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    router.push(`/search?${params.toString()}`)
  }

  const handleFollow = (userId) => {
    followUser(userId)
    // Update UI to show followed state
    setSearchResults((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === userId ? { ...u, followers: [...u.followers, user.id] } : u)),
    }))
  }

  if (isLoading) {
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

  const totalResults = searchResults.users.length + searchResults.posts.length + searchResults.topics.length

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AuthBanner />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-4">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for users, posts, or topics..."
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 text-purple-600 hover:text-purple-800"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>

            {searchQuery && (
              <>
                <div className="flex border-b mb-6">
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "all" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    All ({totalResults})
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "users" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("users")}
                  >
                    Users ({searchResults.users.length})
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "posts" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("posts")}
                  >
                    Posts ({searchResults.posts.length})
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "topics" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("topics")}
                  >
                    Topics ({searchResults.topics.length})
                  </button>
                </div>

                {totalResults === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <Search size={48} className="mx-auto mb-4 text-gray-400" />
                    <h2 className="text-xl font-bold mb-2">No results found</h2>
                    <p className="text-gray-600">
                      We couldn't find anything matching "{searchQuery}". Try different keywords.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Users section */}
                    {(activeTab === "all" || activeTab === "users") && searchResults.users.length > 0 && (
                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b flex items-center">
                          <User size={18} className="text-purple-600 mr-2" />
                          <h2 className="font-bold">Users</h2>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {searchResults.users.map((foundUser) => (
                              <div key={foundUser.id} className="flex items-center justify-between">
                                <Link href={`/user/${foundUser.id}`} className="flex items-center">
                                  <Image
                                    src={foundUser.profileImage || "/placeholder.svg"}
                                    alt={foundUser.username}
                                    width={48}
                                    height={48}
                                    className="rounded-full mr-3"
                                  />
                                  <div>
                                    <p className="font-medium">{foundUser.username}</p>
                                    <p className="text-sm text-gray-500">
                                      {foundUser.bio
                                        ? foundUser.bio.substring(0, 60) + (foundUser.bio.length > 60 ? "..." : "")
                                        : "No bio"}
                                    </p>
                                  </div>
                                </Link>
                                {user.id !== foundUser.id &&
                                  (user.following.includes(foundUser.id) ? (
                                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                                      Following
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleFollow(foundUser.id)}
                                      className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full hover:bg-purple-700 flex items-center"
                                    >
                                      <UserPlus size={12} className="mr-1" />
                                      Follow
                                    </button>
                                  ))}
                              </div>
                            ))}
                          </div>
                          {activeTab === "all" && searchResults.users.length > 3 && (
                            <div className="mt-4 text-center">
                              <button
                                onClick={() => setActiveTab("users")}
                                className="text-purple-600 hover:text-purple-800"
                              >
                                View all users
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Posts section */}
                    {(activeTab === "all" || activeTab === "posts") && searchResults.posts.length > 0 && (
                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b flex items-center">
                          <FileText size={18} className="text-purple-600 mr-2" />
                          <h2 className="font-bold">Posts</h2>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {(activeTab === "all" ? searchResults.posts.slice(0, 3) : searchResults.posts).map(
                              (post) => {
                                const postAuthor = getAllUsers().find((u) => u.id === post.authorId)
                                if (!postAuthor) return null

                                return (
                                  <Link key={post.id} href={`/post/${post.id}`} className="block">
                                    <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                      <div className="flex items-center mb-2">
                                        <Image
                                          src={postAuthor.profileImage || "/placeholder.svg"}
                                          alt={postAuthor.username}
                                          width={24}
                                          height={24}
                                          className="rounded-full mr-2"
                                        />
                                        <span className="text-sm text-gray-600">{postAuthor.username}</span>
                                      </div>
                                      <h3 className="font-medium">{post.title}</h3>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {post.content[0]?.substring(0, 100)}
                                        {post.content[0]?.length > 100 ? "..." : ""}
                                      </p>
                                    </div>
                                  </Link>
                                )
                              },
                            )}
                          </div>
                          {activeTab === "all" && searchResults.posts.length > 3 && (
                            <div className="mt-4 text-center">
                              <button
                                onClick={() => setActiveTab("posts")}
                                className="text-purple-600 hover:text-purple-800"
                              >
                                View all posts
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Topics section */}
                    {(activeTab === "all" || activeTab === "topics") && searchResults.topics.length > 0 && (
                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 border-b flex items-center">
                          <Hash size={18} className="text-purple-600 mr-2" />
                          <h2 className="font-bold">Topics</h2>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-3">
                            {searchResults.topics.map((topic) => (
                              <Link
                                key={topic.id}
                                href={`/search?q=${topic.name}`}
                                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <div className="flex items-center">
                                  <Hash size={16} className="text-gray-400 mr-1" />
                                  <span>{topic.name}</span>
                                </div>
                                <span className="text-sm text-gray-500">{topic.count} posts</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
