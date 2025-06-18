export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      {/* Header */}
      <header className="p-6 border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">WRITERS</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-white hover:text-purple-300">
              Home
            </a>
            <a href="/writers" className="text-white hover:text-purple-300">
              Writers
            </a>
            <a href="/poetry" className="text-white hover:text-purple-300">
              Poetry
            </a>
            <a href="/videos" className="text-white hover:text-purple-300">
              Videos
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
              WRITERS
            </h1>
            <p className="text-2xl text-white mb-8">Unleashing Creativity Through the Power of Words</p>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Discover the world's greatest writers, explore timeless literature, and ignite your passion for
              storytelling.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/writers"
                className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Explore Writers
              </a>
              <a
                href="/videos"
                className="px-8 py-4 bg-white/20 text-white rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-colors"
              >
                Watch Videos
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Explore Our Content</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Literary Classics</h3>
                <p className="text-gray-300 text-center">
                  Explore timeless works from Shakespeare to modern masters, with insights into their cultural impact.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Great Authors</h3>
                <p className="text-gray-300 text-center">
                  Meet the literary giants who shaped human thought, from ancient philosophers to contemporary voices.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="w-16 h-16 bg-pink-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Creative Inspiration</h3>
                <p className="text-gray-300 text-center">
                  Find your voice through the wisdom of master storytellers, with quotes and insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 px-6 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <a
                href="/poetry"
                className="bg-purple-600/20 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Poetry</h3>
                <p className="text-gray-300 text-sm">Beautiful verses</p>
              </a>

              <a
                href="/projects"
                className="bg-blue-600/20 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Projects</h3>
                <p className="text-gray-300 text-sm">Educational programs</p>
              </a>

              <a
                href="/booklets"
                className="bg-green-600/20 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">Booklets</h3>
                <p className="text-gray-300 text-sm">Reading materials</p>
              </a>

              <a
                href="/about"
                className="bg-yellow-600/20 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">About</h3>
                <p className="text-gray-300 text-sm">Our mission</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">WRITERS</h3>
          <p className="text-gray-300 mb-6">
            Inspiring creativity and fostering a love for literature through the exploration of great writers.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:info@writers.com" className="text-gray-300 hover:text-white">
              Email
            </a>
            <a href="https://wa.me/1234567890" className="text-gray-300 hover:text-white">
              WhatsApp
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">© 2024 WRITERS. Inspiring creativity through the power of words.</p>
        </div>
      </footer>
    </div>
  )
}
