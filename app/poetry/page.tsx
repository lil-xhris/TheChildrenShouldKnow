export default function Poetry() {
  const poems = [
    {
      title: "The Journey",
      author: "Emekegbuna Chiemerie",
      content: [
        "The road stretches far beyond sight,",
        "Each step a choice, a moment bright,",
        "Through valleys deep and mountains high,",
        "We write our story 'gainst the sky.",
      ],
    },
    {
      title: "Whispers of Dawn",
      author: "Guest Poet",
      content: [
        "Morning whispers secrets new,",
        "Painted skies of golden hue,",
        "Dew-kissed grass beneath my feet,",
        "Where night and day gently meet.",
      ],
    },
  ]

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
            <a href="/poetry" className="text-purple-300">
              Poetry
            </a>
            <a href="/videos" className="text-white hover:text-purple-300">
              Videos
            </a>
          </nav>
        </div>
      </header>

      <main className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Poetry Collection
          </h1>
          <p className="text-xl text-center text-gray-300 mb-12">
            Explore our collection of poems that capture the beauty and power of human experience.
          </p>

          <div className="space-y-10">
            {poems.map((poem, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-3">{poem.title}</h2>
                <p className="text-purple-300 mb-6">by {poem.author}</p>
                <div className="space-y-2">
                  {poem.content.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-gray-300 leading-relaxed text-lg">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
