import Link from 'next/link'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'

export default function ReadMore() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Our Books</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-full">
              <h2 className="text-xl font-bold mb-4 text-center">Free Books</h2>
              <div className="grid gap-4">
                <Link href="/booklets/dreamers" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-bold mb-2">Dreamers</h3>
                  <p className="text-gray-600">by Emekegbuna Chiemerie</p>
                </Link>
                <Link href="/booklets/youth-builders" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-bold mb-2">Youths: The Builders of Tomorrow</h3>
                  <p className="text-gray-600">by Okoye Christopher</p>
                </Link>
                <a href="https://medium.com/@emekegbunac/conquering-death-itself-79f935b215dc" target="_blank" rel="noopener noreferrer" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-bold mb-2">Conquering death itself</h3>
                  <p className="text-gray-600">by Emekegbuna Chiemerie</p>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/booklets" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Back to Booklets
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
