"use client"

import Link from "next/link"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { BookOpen, Heart, MessageSquare, Send } from "lucide-react"
import { useState } from "react"

type Comment = {
  id: string
  text: string
  author: string
  date: string
}

type Poem = {
  id: string
  title: string
  author: string
  content: string[]
  likes: number
  liked: boolean
  comments: Comment[]
  views: number
}

export default function Poetry() {
  const [poems, setPoems] = useState<Poem[]>([
    {
      id: "1",
      title: "The Journey",
      author: "Emekegbuna Chiemerie",
      content: [
        "The road stretches far beyond sight,",
        "Each step a choice, a moment bright,",
        "Through valleys deep and mountains high,",
        "We write our story 'gainst the sky.",
        "",
        "Not destination, but the way,",
        "Defines the person day by day,",
        "So journey on with hope and might,",
        "Your path illumined by inner light.",
      ],
      likes: 24,
      liked: false,
      comments: [
        {
          id: "1-1",
          text: "This poem really resonates with me. Beautiful imagery!",
          author: "Poetry Lover",
          date: "2 days ago",
        },
        {
          id: "1-2",
          text: "I love the message about the journey being more important than the destination.",
          author: "Thoughtful Reader",
          date: "1 day ago",
        },
      ],
      views: 142,
    },
    {
      id: "2",
      title: "Whispers of Dawn",
      author: "Guest Poet",
      content: [
        "Morning whispers secrets new,",
        "Painted skies of golden hue,",
        "Dew-kissed grass beneath my feet,",
        "Where night and day gently meet.",
        "",
        "Birds announce the breaking light,",
        "As shadows flee from morning bright,",
        "Promise hangs in misty air,",
        "A fresh beginning, clean and fair.",
      ],
      likes: 18,
      liked: false,
      comments: [
        {
          id: "2-1",
          text: "The imagery in this poem is so vivid. I can almost feel the morning dew.",
          author: "Nature Lover",
          date: "3 days ago",
        },
      ],
      views: 97,
    },
    {
      id: "3",
      title: "Urban Symphony",
      author: "Creative Contributor",
      content: [
        "Concrete canyons reach for clouds,",
        "Steel and glass in mighty shrouds,",
        "Footsteps echo, voices blend,",
        "Where strangers pass and sometimes friend.",
        "",
        "Neon lights paint evening sky,",
        "As dreams and hopes both multiply,",
        "The city breathes, alive with sound,",
        "Where countless stories can be found.",
      ],
      likes: 32,
      liked: false,
      comments: [
        {
          id: "3-1",
          text: "This perfectly captures the energy of city life!",
          author: "Urban Dweller",
          date: "5 days ago",
        },
        {
          id: "3-2",
          text: "I love how you've personified the city as breathing and alive.",
          author: "Literary Critic",
          date: "4 days ago",
        },
        {
          id: "3-3",
          text: "The contrast between the hard structures and human elements is beautiful.",
          author: "Poetry Enthusiast",
          date: "2 days ago",
        },
      ],
      views: 215,
    },
    {
      id: "4",
      title: "Silent Strength",
      author: "Anonymous",
      content: [
        "Not in thunder, not in flame,",
        "But quiet courage without name,",
        "The strength to stand when others fall,",
        "To hear within the silent call.",
        "",
        "Mountains move with patient force,",
        "Rivers carve their steady course,",
        "So too the soul of steadfast might,",
        "Transforms the world with gentle light.",
      ],
      likes: 41,
      liked: false,
      comments: [
        {
          id: "4-1",
          text: "This poem speaks to me on so many levels. Thank you for sharing.",
          author: "Quiet Observer",
          date: "1 week ago",
        },
        {
          id: "4-2",
          text: "The metaphor of mountains and rivers is so powerful.",
          author: "Deep Thinker",
          date: "5 days ago",
        },
      ],
      views: 189,
    },
  ])

  const [newComments, setNewComments] = useState<{ [key: string]: string }>({})

  const handleLike = (id: string) => {
    setPoems((prevPoems) =>
      prevPoems.map((poem) => {
        if (poem.id === id) {
          return {
            ...poem,
            likes: poem.liked ? poem.likes - 1 : poem.likes + 1,
            liked: !poem.liked,
          }
        }
        return poem
      }),
    )
  }

  const handleCommentChange = (id: string, value: string) => {
    setNewComments((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleCommentSubmit = (id: string) => {
    if (!newComments[id]?.trim()) return

    const newComment: Comment = {
      id: `${id}-${Date.now()}`,
      text: newComments[id],
      author: "You",
      date: "Just now",
    }

    setPoems((prevPoems) =>
      prevPoems.map((poem) => {
        if (poem.id === id) {
          return {
            ...poem,
            comments: [...poem.comments, newComment],
          }
        }
        return poem
      }),
    )

    // Clear the comment input
    setNewComments((prev) => ({
      ...prev,
      [id]: "",
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Poetry Collection</h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center mb-12 text-gray-700">
              Explore our collection of poems that capture the beauty, complexity, and power of human experience
            </p>

            <div className="space-y-10">
              {poems.map((poem) => (
                <div
                  key={poem.id}
                  className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 duration-300"
                >
                  <h2 className="text-2xl font-bold mb-3 text-gray-900">{poem.title}</h2>
                  <p className="text-gray-600 mb-4">by {poem.author}</p>
                  <div className="prose mb-6">
                    {poem.content.map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-gray-500 mb-4">
                    <button
                      className={`flex items-center ${poem.liked ? "text-red-500" : ""} hover:text-red-500 transition-colors`}
                      onClick={() => handleLike(poem.id)}
                    >
                      <Heart size={18} className="mr-1" fill={poem.liked ? "currentColor" : "none"} />
                      <span>{poem.likes}</span>
                    </button>
                    <div className="flex items-center">
                      <MessageSquare size={18} className="mr-1" />
                      <span>{poem.comments.length}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={18} className="mr-1" />
                      <span>{poem.views}</span>
                    </div>
                  </div>

                  {/* Comments section */}
                  <div className="mt-4 border-t pt-4">
                    <h3 className="font-semibold text-gray-700 mb-3">Comments</h3>
                    <div className="space-y-3 mb-4">
                      {poem.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded">
                          <p className="text-gray-800">{comment.text}</p>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{comment.author}</span>
                            <span>{comment.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add comment form */}
                    <div className="flex mt-3">
                      <input
                        type="text"
                        value={newComments[poem.id] || ""}
                        onChange={(e) => handleCommentChange(poem.id, e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleCommentSubmit(poem.id)
                          }
                        }}
                      />
                      <button
                        onClick={() => handleCommentSubmit(poem.id)}
                        className="bg-purple-600 text-white px-3 py-2 rounded-r-lg hover:bg-purple-700 transition-colors"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/projects/poetic-power"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Explore Poetic Power Project
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
