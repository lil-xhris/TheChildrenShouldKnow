"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { AuthBanner } from "../../components/auth-banner"
import { useAuth } from "../../context/auth-context"
import { Search, Trash2, Edit, Eye, Plus, Calendar, Star } from "lucide-react"

export default function AdminWriters() {
  const { user, isLoading, isAdmin, getAllWriters, deleteWriter, featureWriter } = useAuth()
  const router = useRouter()
  const [writers, setWriters] = useState([])
  const [filteredWriters, setFilteredWriters] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin())) {
      router.push("/admin-login")
    }

    if (user && isAdmin()) {
      const allWriters = getAllWriters()
      setWriters(allWriters)
      setFilteredWriters(allWriters)
    }
  }, [user, isLoading, router, isAdmin, getAllWriters])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredWriters(writers)
    } else {
      const filtered = writers.filter(
        (writer) =>
          writer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          writer.era.toLowerCase().includes(searchTerm.toLowerCase()) ||
          writer.quote.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredWriters(filtered)
    }
  }, [searchTerm, writers])

  const handleDeleteWriter = (writerId) => {
    if (confirm("Are you sure you want to delete this writer? This action cannot be undone.")) {
      deleteWriter(writerId)
      const updatedWriters = getAllWriters()
      setWriters(updatedWriters)
      setFilteredWriters(updatedWriters)
    }
  }

  const handleFeatureWriter = (writerId) => {
    featureWriter(writerId)
    const updatedWriters = getAllWriters()
    setWriters(updatedWriters)
    setFilteredWriters(updatedWriters)
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
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-purple-700">Manage Writers</h1>
                <Link
                  href="/admin-dashboard/writers/new"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Writer
                </Link>
              </div>
              <p className="text-gray-600">Add, edit, or remove writers from the platform</p>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search writers..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="text-gray-600">
                  Showing {filteredWriters.length} of {writers.length} writers
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Writer</th>
                      <th className="py-3 px-6 text-left">Era</th>
                      <th className="py-3 px-6 text-left">Quote</th>
                      <th className="py-3 px-6 text-center">Featured</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {filteredWriters.map((writer) => (
                      <tr key={writer.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <Image
                                src={writer.image || "/placeholder.svg"}
                                alt={writer.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </div>
                            <span className="font-medium">{writer.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">{writer.era}</td>
                        <td className="py-3 px-6 text-left truncate max-w-xs">"{writer.quote.substring(0, 60)}..."</td>
                        <td className="py-3 px-6 text-center">
                          {writer.featured ? (
                            <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">Current</span>
                          ) : (
                            <button
                              onClick={() => handleFeatureWriter(writer.id)}
                              className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-xs hover:bg-purple-200"
                            >
                              Feature
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <Link
                              href={`/writers/${writer.id}`}
                              className="w-8 h-8 mr-2 transform hover:text-purple-500 hover:scale-110 flex items-center justify-center"
                            >
                              <Eye size={16} />
                            </Link>
                            <Link
                              href={`/admin-dashboard/writers/edit/${writer.id}`}
                              className="w-8 h-8 mr-2 transform hover:text-blue-500 hover:scale-110 flex items-center justify-center"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteWriter(writer.id)}
                              className="w-8 h-8 transform hover:text-red-500 hover:scale-110 flex items-center justify-center"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredWriters.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No writers found matching your search criteria.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-purple-700">Featured Writer Schedule</h2>
              <p className="text-gray-600">Upcoming featured writers for the "Writer of the Week" section</p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Writer</th>
                      <th className="py-3 px-6 text-center">Start Date</th>
                      <th className="py-3 px-6 text-center">End Date</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {writers
                      .filter((w) => w.featuredStartDate)
                      .sort((a, b) => new Date(a.featuredStartDate).getTime() - new Date(b.featuredStartDate).getTime())
                      .map((writer) => {
                        const startDate = new Date(writer.featuredStartDate)
                        const endDate = new Date(writer.featuredEndDate)
                        const now = new Date()
                        const status =
                          now >= startDate && now <= endDate ? "current" : now < startDate ? "upcoming" : "past"

                        return (
                          <tr key={writer.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <Image
                                    src={writer.image || "/placeholder.svg"}
                                    alt={writer.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                  />
                                </div>
                                <span className="font-medium">{writer.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">{startDate.toLocaleDateString()}</td>
                            <td className="py-3 px-6 text-center">{endDate.toLocaleDateString()}</td>
                            <td className="py-3 px-6 text-center">
                              {status === "current" && (
                                <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                                  Current
                                </span>
                              )}
                              {status === "upcoming" && (
                                <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs">
                                  Upcoming
                                </span>
                              )}
                              {status === "past" && (
                                <span className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-xs">Past</span>
                              )}
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <Link
                                  href={`/admin-dashboard/writers/schedule/${writer.id}`}
                                  className="w-8 h-8 mr-2 transform hover:text-blue-500 hover:scale-110 flex items-center justify-center"
                                >
                                  <Calendar size={16} />
                                </Link>
                                {status !== "current" && (
                                  <button
                                    onClick={() => handleFeatureWriter(writer.id)}
                                    className="w-8 h-8 transform hover:text-yellow-500 hover:scale-110 flex items-center justify-center"
                                    title="Feature Now"
                                  >
                                    <Star size={16} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>

              {writers.filter((w) => w.featuredStartDate).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No scheduled featured writers.</p>
                  <p className="text-gray-500 mt-2">
                    Use the "Feature" button in the writers table to feature a writer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
