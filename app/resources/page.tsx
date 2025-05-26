import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { FileText, Download, BookOpen, Lightbulb, PenTool } from "lucide-react"

export default function Resources() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-rose-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Writing Resources</h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center mb-12 text-gray-700">
              Explore our collection of resources designed to help you develop your writing skills, find inspiration,
              and share your creative voice with the world
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
                <div className="flex items-center mb-4">
                  <FileText className="text-indigo-500 mr-3" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Writing Templates</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Download our professionally designed templates for various writing formats, including poetry, short
                  stories, essays, and more.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700">
                    <Download className="text-indigo-400 mr-2" size={16} />
                    Poetry Structure Templates
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-indigo-400 mr-2" size={16} />
                    Short Story Outline
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-indigo-400 mr-2" size={16} />
                    Character Development Worksheet
                  </li>
                </ul>
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View All Templates
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-purple-500 mr-3" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Writing Guides</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Access comprehensive guides on various aspects of writing, from grammar and style to publishing and
                  marketing your work.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700">
                    <Download className="text-purple-400 mr-2" size={16} />
                    The Elements of Style: Simplified
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-purple-400 mr-2" size={16} />
                    Guide to Poetry Forms
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-purple-400 mr-2" size={16} />
                    Self-Publishing for Beginners
                  </li>
                </ul>
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Browse All Guides
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500">
                <div className="flex items-center mb-4">
                  <Lightbulb className="text-pink-500 mr-3" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Writing Prompts</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Find inspiration with our collection of writing prompts designed to spark creativity and help you
                  overcome writer's block.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700">
                    <Download className="text-pink-400 mr-2" size={16} />
                    100 Poetry Prompts
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-pink-400 mr-2" size={16} />
                    30-Day Writing Challenge
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-pink-400 mr-2" size={16} />
                    Character-Driven Story Starters
                  </li>
                </ul>
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Get Inspired
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-rose-500">
                <div className="flex items-center mb-4">
                  <PenTool className="text-rose-500 mr-3" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Workshops & Events</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Join our virtual and in-person workshops, writing circles, and events designed to help you develop
                  your skills and connect with other writers.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700">
                    <Download className="text-rose-400 mr-2" size={16} />
                    Upcoming Workshop Schedule
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-rose-400 mr-2" size={16} />
                    Writing Circle Registration
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Download className="text-rose-400 mr-2" size={16} />
                    Annual Poetry Competition Details
                  </li>
                </ul>
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Join an Event
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl text-center">
              <h2 className="text-2xl font-bold mb-4 text-purple-700">Join Our Writing Community</h2>
              <p className="text-gray-700 mb-6">
                Connect with fellow writers, share your work, receive feedback, and participate in collaborative
                projects. Our community is open to writers of all levels and backgrounds.
              </p>
              <a
                href="https://chat.whatsapp.com/IRe0nZAgBOM8SvLTydfuCt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                Join WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
