"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"
import { AuthBanner } from "../../../components/auth-banner"
import { useAuth } from "../../../context/auth-context"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"

export default function NewWriter() {
  const { user, isLoading, isAdmin, addWriter } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    era: "",
    quote: "",
    lesson: "",
    bio: "",
    image: "",
    works: [""],
    achievements: [""],
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin())) {
      router.push("/admin-login")
    }
  }, [user, isLoading, router, isAdmin])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return {
        ...prev,
        [field]: newArray,
      }
    })
  }

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (index, field) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray.splice(index, 1)
      return {
        ...prev,
        [field]: newArray,
      }
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }))
      setImagePreview(imageUrl)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.era.trim()) newErrors.era = "Era is required"
    if (!formData.quote.trim()) newErrors.quote = "Quote is required"
    if (!formData.lesson.trim()) newErrors.lesson = "Lesson is required"
    if (!formData.bio.trim()) newErrors.bio = "Bio is required"
    if (!formData.image) newErrors.image = "Image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      addWriter(formData)
      router.push("/admin-dashboard/writers")
    } catch (error) {
      console.error("Error adding writer:", error)
      setErrors({ submit: "Failed to add writer. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b flex items-center">
              <Link
                href="/admin-dashboard/writers"
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-purple-700">Add New Writer</h1>
                <p className="text-gray-600">Add a new writer to the platform</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Writer Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="e.g. William Shakespeare"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="era" className="block text-sm font-medium text-gray-700 mb-1">
                      Era/Period*
                    </label>
                    <input
                      type="text"
                      id="era"
                      name="era"
                      value={formData.era}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.era ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="e.g. 16th Century, Renaissance"
                    />
                    {errors.era && <p className="mt-1 text-sm text-red-500">{errors.era}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">
                      Notable Quote*
                    </label>
                    <textarea
                      id="quote"
                      name="quote"
                      value={formData.quote}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-3 py-2 border ${
                        errors.quote ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="A famous quote by this writer"
                    ></textarea>
                    {errors.quote && <p className="mt-1 text-sm text-red-500">{errors.quote}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="lesson" className="block text-sm font-medium text-gray-700 mb-1">
                      What We Can Learn*
                    </label>
                    <textarea
                      id="lesson"
                      name="lesson"
                      value={formData.lesson}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-3 py-2 border ${
                        errors.lesson ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="What readers can learn from this writer's work"
                    ></textarea>
                    {errors.lesson && <p className="mt-1 text-sm text-red-500">{errors.lesson}</p>}
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                      Writer Image*
                    </label>
                    <div
                      className={`border-2 border-dashed ${
                        errors.image ? "border-red-500" : "border-gray-300"
                      } rounded-lg p-4 text-center`}
                    >
                      {imagePreview ? (
                        <div className="relative">
                          <Image
                            src={imagePreview || "/placeholder.svg"}
                            alt="Writer preview"
                            width={200}
                            height={200}
                            className="mx-auto rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null)
                              setFormData((prev) => ({ ...prev, image: "" }))
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="py-8">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
                          imagePreview ? "pointer-events-none" : ""
                        }`}
                      />
                    </div>
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Biography*
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-3 py-2 border ${
                        errors.bio ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="A brief biography of the writer"
                    ></textarea>
                    {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Notable Works</h3>
                {formData.works.map((work, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={work}
                      onChange={(e) => handleArrayChange(e, index, "works")}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g. Hamlet"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "works")}
                      className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      disabled={formData.works.length === 1}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("works")}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-800"
                >
                  + Add another work
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Achievements</h3>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleArrayChange(e, index, "achievements")}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g. Pulitzer Prize"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "achievements")}
                      className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      disabled={formData.achievements.length === 1}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("achievements")}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-800"
                >
                  + Add another achievement
                </button>
              </div>

              {errors.submit && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">{errors.submit}</div>}

              <div className="mt-8 flex justify-end">
                <Link
                  href="/admin-dashboard/writers"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Writer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
