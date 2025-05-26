import Link from "next/link"
import Image from "next/image"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ArrowRight } from "lucide-react"

export default function Projects() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Our Projects</h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center mb-12 text-gray-700">
              Explore our creative writing projects and initiatives designed to inspire, educate, and showcase the power
              of words in our community.
            </p>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
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
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Featured Project</div>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 leading-tight">POETIC POWER</h2>
                  <p className="mt-2 text-gray-700">
                    A collection of powerful poems that inspire, challenge, and transform. This project brings together
                    poets from diverse backgrounds to share their unique perspectives and creative expressions.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/projects/poetic-power"
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Explore Project <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Writers Workshop"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover md:w-64"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-pink-500 font-semibold">Upcoming Project</div>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 leading-tight">Writers Workshop</h2>
                  <p className="mt-2 text-gray-700">
                    A collaborative space for writers to share their work, receive feedback, and improve their craft
                    through guided exercises and professional mentorship.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/projects/workshop"
                      className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Coming Soon <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Young Writers Initiative"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover md:w-64"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-purple-500 font-semibold">Community Project</div>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900 leading-tight">Young Writers Initiative</h2>
                  <p className="mt-2 text-gray-700">
                    Empowering young voices through creative writing programs, contests, and publication opportunities
                    designed specifically for children and teenagers.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/projects/young-writers"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Learn More <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
