"use client"

import Image from "next/image"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ExternalLink, Heart, MessageSquare } from "lucide-react"
import { useState } from "react"

type Writer = {
  id: string
  name: string
  years: string
  bio: string
  notableWorks: string[]
  imageUrl: string
  likes: number
  liked: boolean
  comments: number
}

export default function Writers() {
  const [writers, setWriters] = useState<Writer[]>([
    {
      id: "1",
      name: "Chinua Achebe",
      years: "1930-2013",
      bio: "Nigerian novelist, poet, and critic who is regarded as the dominant figure of modern African literature. His first novel, Things Fall Apart (1958), is the most widely read book in modern African literature.",
      notableWorks: ["Things Fall Apart", "No Longer at Ease", "Arrow of God"],
      imageUrl: "/placeholder.svg?height=300&width=400&text=Chinua+Achebe",
      likes: 245,
      liked: false,
      comments: 32,
    },
    {
      id: "2",
      name: "Chimamanda Ngozi Adichie",
      years: "1977-present",
      bio: "Nigerian writer whose works range from novels to short stories to nonfiction. She is known for her feminism and her exploration of the African diaspora.",
      notableWorks: ["Purple Hibiscus", "Half of a Yellow Sun", "Americanah"],
      imageUrl: "/placeholder.svg?height=300&width=400&text=Chimamanda+Ngozi+Adichie",
      likes: 312,
      liked: false,
      comments: 47,
    },
    {
      id: "3",
      name: "Wole Soyinka",
      years: "1934-present",
      bio: "Nigerian playwright, novelist, poet, and essayist who was awarded the 1986 Nobel Prize in Literature, the first African to be honored in that category.",
      notableWorks: ["Death and the King's Horseman", "The Lion and the Jewel", "Aké: The Years of Childhood"],
      imageUrl: "/placeholder.svg?height=300&width=400&text=Wole+Soyinka",
      likes: 189,
      liked: false,
      comments: 28,
    },
    {
      id: "4",
      name: "Ben Okri",
      years: "1959-present",
      bio: "Nigerian poet and novelist who is one of the foremost African authors in the post-modern and post-colonial traditions, and has been compared favorably to authors such as Salman Rushdie and Gabriel García Márquez.",
      notableWorks: ["The Famished Road", "Songs of Enchantment", "Infinite Riches"],
      imageUrl: "/placeholder.svg?height=300&width=400&text=Ben+Okri",
      likes: 156,
      liked: false,
      comments: 19,
    },
  ])

  const handleLike = (id: string) => {
    setWriters((prevWriters) =>
      prevWriters.map((writer) => {
        if (writer.id === id) {
          return {
            ...writer,
            likes: writer.liked ? writer.likes - 1 : writer.likes + 1,
            liked: !writer.liked,
          }
        }
        return writer
      }),
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-indigo-50 to-pink-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Famous Writers</h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center mb-12 text-gray-700">
              Discover the literary giants whose words have shaped cultures, challenged perspectives, and stood the test
              of time
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {writers.map((writer) => (
                <div
                  key={writer.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={writer.imageUrl || "/placeholder.svg"}
                      alt={writer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">{writer.name}</h2>
                    <p className="text-gray-600 mb-4">{writer.years}</p>
                    <p className="text-gray-700 mb-4">{writer.bio}</p>
                    <p className="text-gray-700 mb-4">
                      <strong>Notable Works:</strong> {writer.notableWorks.join(", ")}
                    </p>

                    <div className="flex justify-between items-center">
                      <a
                        href={`https://en.wikipedia.org/wiki/${writer.name.replace(/ /g, "_")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                      >
                        Learn more <ExternalLink className="ml-1" size={14} />
                      </a>

                      <div className="flex items-center space-x-4">
                        <button
                          className={`flex items-center ${writer.liked ? "text-red-500" : ""} hover:text-red-500 transition-colors`}
                          onClick={() => handleLike(writer.id)}
                        >
                          <Heart size={18} className="mr-1" fill={writer.liked ? "currentColor" : "none"} />
                          <span>{writer.likes}</span>
                        </button>
                        <div className="flex items-center text-gray-500">
                          <MessageSquare size={18} className="mr-1" />
                          <span>{writer.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
