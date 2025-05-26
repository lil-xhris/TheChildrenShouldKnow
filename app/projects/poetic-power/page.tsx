"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Download, Share2, MessageCircle } from "lucide-react"

export default function PoeticPower() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center text-purple-700">POETIC POWER</h1>
            <p className="text-xl text-center mb-12 text-gray-700">
              A collection of powerful poems that inspire, challenge, and transform
            </p>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
              <Image
                src="/images/poetic-power.png"
                alt="Poetic Power Banner"
                width={800}
                height={500}
                className="w-full object-contain"
              />
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">About the Project</h2>
                <p className="text-gray-700 mb-4">
                  POETIC POWER is a collaborative initiative that brings together poets from diverse backgrounds to
                  share their unique perspectives and creative expressions. The project aims to showcase the
                  transformative power of poetry in addressing social issues, personal growth, and cultural identity.
                </p>
                <p className="text-gray-700 mb-4">
                  Through this collection, we explore themes of resilience, hope, identity, and change. Each poem offers
                  a window into the human experience, inviting readers to reflect on their own journeys and connect with
                  others through the universal language of poetry.
                </p>
                <p className="text-gray-700 mb-6">
                  Join us in celebrating the beauty and power of words as we build a community of writers and readers
                  who believe in the ability of poetry to inspire, heal, and transform.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Download className="mr-2" size={16} />
                    Download PDF Collection
                  </a>
                  <a
                    href="https://chat.whatsapp.com/IRe0nZAgBOM8SvLTydfuCt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="mr-2" size={16} />
                    Join WhatsApp Group
                  </a>
                  <button
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert("Link copied to clipboard!")
                    }}
                  >
                    <Share2 className="mr-2" size={16} />
                    Share Project
                  </button>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Featured Poems</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900">The Power of Words</h3>
                <p className="text-gray-600 mb-2">by Emekegbuna Chiemerie</p>
                <div className="prose">
                  <p>Words dance across the page,</p>
                  <p>Like stars across the night,</p>
                  <p>They illuminate our darkest thoughts,</p>
                  <p>And guide us toward the light.</p>
                  <br />
                  <p>With ink and breath we shape our world,</p>
                  <p>Create futures yet unseen,</p>
                  <p>The power of a single phrase,</p>
                  <p>Can make reality from dreams.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Resilience</h3>
                <p className="text-gray-600 mb-2">by Anonymous Contributor</p>
                <div className="prose">
                  <p>I bend but do not break,</p>
                  <p>A sapling in the storm,</p>
                  <p>Roots deep within the earth,</p>
                  <p>Weathering life's transform.</p>
                  <br />
                  <p>Each challenge makes me stronger,</p>
                  <p>Each fall a chance to rise,</p>
                  <p>The scars I bear with honor,</p>
                  <p>My triumph in disguise.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
