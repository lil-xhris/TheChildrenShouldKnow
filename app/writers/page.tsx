export default function Writers() {
  const writers = [
    {
      name: "William Shakespeare",
      years: "1564-1616",
      nationality: "English",
      bio: "English poet, playwright, and actor, widely regarded as the greatest writer in the English language.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
    },
    {
      name: "Chinua Achebe",
      years: "1930-2013",
      nationality: "Nigerian",
      bio: "Nigerian novelist, poet, and critic regarded as the dominant figure of modern African literature.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Chinua_Achebe_-_Buffalo_25Sep2008.jpg",
    },
    {
      name: "Maya Angelou",
      years: "1928-2014",
      nationality: "American",
      bio: "American poet, memoirist, and civil rights activist known for her autobiographical works.",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Maya_Angelou_visits_YCP_College_%28cropped%29.jpg",
    },
    {
      name: "Gabriel García Márquez",
      years: "1927-2014",
      nationality: "Colombian",
      bio: "Colombian novelist and journalist, known for popularizing magical realism.",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg",
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
            <a href="/writers" className="text-purple-300">
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

      <main className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Literary Masters
          </h1>
          <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover the greatest writers who have shaped human thought and literature across cultures and centuries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {writers.map((writer, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 mb-6">
                    <img
                      src={writer.image || "/placeholder.svg"}
                      alt={writer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{writer.name}</h3>
                  <p className="text-purple-300 mb-2">{writer.years}</p>
                  <p className="text-gray-300 mb-4">{writer.nationality}</p>
                  <p className="text-gray-300 leading-relaxed">{writer.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
