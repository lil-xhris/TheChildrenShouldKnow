import Link from 'next/link'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'

export default function Dreamers() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Dreamers</h1>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">by Emekegbuna Chiemerie</h2>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              We are all dreamers. From the moment we are children, we dream of great things—bold ideas, limitless possibilities. Yet too often, society tells us that these dreams are impractical, that our thoughts are childish and unrealistic. And so, we bury them. We abandon the spark of creativity and courage within us, trading it for the safety of old ideas and conventional paths.
            </p>

            <p className="mb-4">
              But this is not the way forward. This is how we inhibit growth, stifle innovation, and resist the very change the world so desperately needs. We forget one essential truth: every person who has ever achieved greatness was once a dreamer. Every innovator, every pioneer, every leader once stood where you stand now—seeing possibility where others saw nothing.
            </p>

            <p className="mb-4">
              For the children of today, it is vital that we do not extinguish their dreams. To the children reading this, and to the adults who still carry the dreams of their youth: Stop resisting change. Stop resisting life's way of teaching you through challenges and failures. Embrace the truth that you are capable, no matter what anyone says.
            </p>

            <p className="mb-4">
              They may tell you, "You cannot do it." Perhaps they'll say it's because you're too young, because you lack resources, because you don't fit their idea of success. But here is the truth: you can do it.
            </p>

            <p className="mb-4">
              It doesn't matter if you were born in poverty. It doesn't matter if you've been cast aside, told you're dull, or made to feel invisible. None of that defines you. You are more than their labels. You are perfect in your potential.
            </p>

            <p className="mb-4">
              Sit down today and dream. And don't stop there—work on those dreams. It doesn't matter if you don't have the money. It doesn't matter if the path ahead feels impossible. What matters is your desire to try, your refusal to accept failure, and your courage to believe in yourself.
            </p>

            <p className="mb-4">
              At The Children Should Know, we believe every child has the right to dream—and not just dream, but to chase those dreams fiercely. We are here to remind every child, and every adult who once felt small, that their dreams are valid. We are here to empower, to teach, and to help you transform those dreams into reality.
            </p>

            <p className="mb-4">
              Start today. Dream big. Work hard. And know that you have the power to change your life and, in doing so, the world around you.
            </p>

            <p className="mb-4">
              The world needs dreamers like you. And it's time to show them what dreamers can do.
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
