"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "../context/auth-context"
import { ArrowRight } from "lucide-react"
import { getCurrentWeekWriter, getNextWeekWriter } from "../data/writers-database"

export function WriterOfTheWeek() {
  const {} = useAuth()
  const [writer, setWriter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      console.log("Fetching current week writer...")
      const currentWriter = getCurrentWeekWriter()
      console.log("Current writer:", currentWriter)
      setWriter(currentWriter)
    } catch (err) {
      console.error("Error fetching current week writer:", err)
      setError("Failed to load writer of the week")
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 p-8 rounded-xl shadow-xl text-center">
          <p className="text-red-600">{error}</p>
          <p className="mt-2 text-gray-700">Please try again later or contact an administrator.</p>
        </div>
      </div>
    )
  }

  if (!writer) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <p className="text-gray-700">No featured writer this week.</p>
          <p className="mt-2 text-gray-600">Check back soon for our next featured writer!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <div className="md:flex items-center">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <Image
              src={writer.image || "/placeholder.svg?height=200&width=200"}
              alt={writer.name}
              width={200}
              height={200}
              className="rounded-full border-4 border-purple-200"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h3 className="font-bold text-2xl mb-2 text-gray-800">{writer.name}</h3>
            <p className="text-purple-600 mb-4">{writer.era}</p>
            <div className="mb-4 italic text-gray-700 text-lg">"{writer.quote}"</div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-800">What We Can Learn:</h4>
              <p className="text-gray-700">{writer.lesson}</p>
            </div>
            <Link
              href={`/writers/${writer.id}`}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Learn more about {writer.name} <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 mt-4 rounded-md border border-gray-200">
        <h4 className="font-semibold text-gray-700">Next Week&apos;s Writer:</h4>
        {getNextWeekWriter() ? (
          <p className="text-gray-600">Get ready to learn from {getNextWeekWriter().name} next week!</p>
        ) : (
          <p className="text-gray-600">Stay tuned for next week&apos;s writer!</p>
        )}
      </div>
    </div>
  )
}
