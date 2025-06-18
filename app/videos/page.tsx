export default function Videos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      {/* Header */}
      <header className="p-6 border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-white">
            WRITERS
          </a>
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
            <a href="/videos" className="text-purple-300">
              Videos
            </a>
          </nav>
        </div>
      </header>

      <main className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Educational Videos
          </h1>
          <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover inspiring content that nurtures young minds and promotes the power of writing and education.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
              <div className="relative h-64 bg-gray-800 flex items-center justify-center">
                <span className="text-6xl">🎬</span>
                <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">5:32</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">The Children Should Know - Movement Introduction</h3>
                <p className="text-gray-300 mb-4">
                  This movement is a team of children, teenagers and professionals to talk about issues affecting the
                  children.
                </p>
                <a
                  href="https://www.facebook.com/share/v/1HzTTqJ7zX/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
                >
                  Watch on Facebook →
                </a>
              </div>
            </div>

            {/* Video 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
              <div className="relative h-64 bg-gray-800 flex items-center justify-center">
                <span className="text-6xl">🎬</span>
                <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">7:45</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Building Tomorrow's Leaders</h3>
                <p className="text-gray-300 mb-4">
                  Empowering young minds through education and creative expression. Join us in creating a future we'll
                  all be proud of.
                </p>
                <a
                  href="https://www.facebook.com/share/v/14w3QLwaQL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
                >
                  Watch on Facebook →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
