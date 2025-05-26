"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { AuthBanner } from "../components/auth-banner"
import { useAuth } from "../context/auth-context"
import { ActivityFeed } from "../components/activity-feed"
import { Filter } from "lucide-react"

export default function ActivityPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState("all") // all, likes, comments, follows, etc.

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

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
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b flex justify-between items-center">
                <h1 className="text-xl font-bold">Activity Feed</h1>
                <div className="relative">
                  <button className="flex items-center text-gray-600 hover:text-purple-600">
                    <Filter size={16} className="mr-1" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="p-4">
                <ActivityFeed limit={50} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
