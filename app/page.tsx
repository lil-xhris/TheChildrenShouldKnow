"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { AuthBanner } from "./components/auth-banner"
import { DynamicRiddles } from "./components/dynamic-riddles"
import { useCallback, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { BookOpen, Pen, Award, FileText, ArrowRight } from "lucide-react"
import { useAuth } from "./context/auth-context"
import { WriterOfTheWeek } from "./components/writer-of-the-week"

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-center p-4">
      <p>Something went wrong:</p>
      <pre className="text-red-500">{error.message}</pre>
      <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  )
}

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect logged-in users to the home feed
  useEffect(() => {
    if (user) {
      router.push("/home")
    }
  }, [user, router])

  const [isLoaded, setIsLoaded] = useState(false)
  const { isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/home")
    }
  }, [user, isLoading, router])

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <AuthBanner />
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-purple-100 to-pink-100 py-12 sm:py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/writers-logo.png"
                  alt="WRITERS Logo"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                W R I T E R S
              </h1>
              <p className="text-xl sm:text-2xl mb-6 sm:mb-10 text-gray-700">
                Unleashing creativity through the power of words
              </p>
            </div>
          </section>

          <section className="py-12 sm:py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-purple-700">Our Mission</h2>
              <p className="text-xl text-center mb-12 max-w-4xl mx-auto text-gray-700">
                To inspire and nurture the next generation of writers, poets, and storytellers. We believe in the
                transformative power of words and their ability to change lives, shape cultures, and create lasting
                impact across generations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <Link href="/projects" className="group">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 sm:p-8 rounded-xl text-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <BookOpen
                        size={56}
                        className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                      Projects
                    </h3>
                    <p className="text-gray-700">Collaborative writing initiatives and community projects</p>
                  </div>
                </Link>

                <Link href="/poetry" className="group">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 sm:p-8 rounded-xl text-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <Pen
                        size={56}
                        className="text-purple-500 group-hover:text-purple-600 transition-colors duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-purple-600 transition-colors duration-300">
                      Poetry
                    </h3>
                    <p className="text-gray-700">Explore our collection of poems and poetic expressions</p>
                  </div>
                </Link>

                <Link href="/writers" className="group">
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 sm:p-8 rounded-xl text-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <Award
                        size={56}
                        className="text-pink-500 group-hover:text-pink-600 transition-colors duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-pink-600 transition-colors duration-300">
                      Writers
                    </h3>
                    <p className="text-gray-700">Discover famous writers and their impactful works</p>
                  </div>
                </Link>

                <Link href="/resources" className="group">
                  <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 sm:p-8 rounded-xl text-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <FileText
                        size={56}
                        className="text-rose-500 group-hover:text-rose-600 transition-colors duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-rose-600 transition-colors duration-300">
                      Resources
                    </h3>
                    <p className="text-gray-700">Writing guides, templates, and educational materials</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-20 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-purple-700">
                Featured Project: POETIC POWER
              </h2>
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <Image
                      src="/images/poetic-power.png"
                      alt="Poetic Power Project"
                      width={300}
                      height={300}
                      className="h-full w-full object-contain md:w-64"
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">New Project</div>
                    <h3 className="mt-1 text-2xl font-bold text-gray-900 leading-tight">POETIC POWER</h3>
                    <p className="mt-2 text-gray-700">
                      A collection of powerful poems that inspire, challenge, and transform. Join us in exploring the
                      depth and beauty of poetic expression.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/projects/poetic-power"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Learn more <ArrowRight className="ml-1" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Writer of the Week Section */}
          <section className="py-12 sm:py-20 bg-gradient-to-b from-purple-100 to-pink-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-purple-700">
                Writer of the Week
              </h2>
              <WriterOfTheWeek />
            </div>
          </section>

          <section className="py-12 sm:py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-purple-700">Literary Knowledge</h2>
              <DynamicRiddles />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
