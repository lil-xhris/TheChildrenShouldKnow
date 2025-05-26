import Link from 'next/link'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'

export default function YouthBuilders() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Youths: The Builders of Tomorrow</h1>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">by Okoye Christopher</h2>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              Youth is the most dynamic and transformative phase of life. It is a period of exploration, growth, and learning, where dreams are big and possibilities seem endless. However, amidst the excitement and freedom, it is crucial for young people to remember their role as the architects of the future.
            </p>

            <p className="mb-4">
              One of the most valuable pieces of advice for the youth is to embrace education—not just in classrooms but through experiences, failures, and challenges. Education equips them with knowledge, critical thinking, and the ability to make informed decisions. In a world constantly evolving with technology and new challenges, adaptability and continuous learning are key.
            </p>

            <p className="mb-4">
              Another essential lesson is the importance of resilience. Life is not always fair, and setbacks are inevitable. What truly matters is how you respond. Learn to see failures as stepping stones to success rather than roadblocks. Stay determined, and remember that persistence often leads to extraordinary outcomes.
            </p>

            <p className="mb-4">
              Young people must also recognize the significance of building strong, meaningful relationships. Surround yourself with individuals who inspire you, challenge you, and support your growth. The people you associate with can profoundly influence your path, so choose wisely.
            </p>

            <p className="mb-4">
              Lastly, remember to give back. Whether through community service, mentoring others, or simply spreading kindness, contributing to society brings fulfillment and creates a ripple effect of positive change.
            </p>

            <p className="mb-4">
              The youth hold the potential to shape a better, brighter future. By focusing on education, resilience, relationships, and service, they can not only achieve their dreams but also leave an indelible mark on the world. As the saying goes, "The future belongs to those who prepare for it today."
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/booklets/read-more" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Back to Books
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
