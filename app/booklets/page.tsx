import Link from 'next/link'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default function Booklets() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Why TheChildrenShouldKnow?</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              Ever wondered what the future holds for your child or your students? Let's cut to the chase: the world is changing faster than your Wi-Fi connection during an important Zoom call! And guess who's caught in the crossfire of misinformation, flashy trends, and questionable TikTok dances? Yep, our kids and teenagers.
            </p>

            <p className="mb-4">
              At TheChildrenShouldKnow, we've made it our mission to stop the madness. This is more than an awareness campaign—it's a life-changing movement! We're here to arm kids and teens with the real-life skills they actually need. No more whispering into the void or Googling "life hacks." We answer the tough questions, bust the myths, and equip the next generation with tools to thrive in this wild, unpredictable world.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-4">What Makes Us Different?</h2>

            <p className="mb-4">
              Here's the secret sauce: we talk WITH kids, not AT them.
              Our conversations about children's issues are led by children. Teenagers open up about what's affecting their lives with other teenagers. This isn't a boring lecture; it's a collaboration between kids, teens, parents, and educators—a true powerhouse team that creates a ripple effect of change in our fast-paced society.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-4">What Do We Talk About?</h2>

            <p className="mb-4">Oh, just the stuff that actually matters:</p>

            <ol className="list-decimal list-inside mb-4 pl-4">
              <li className="mb-2">Life Education – Because "adulting" shouldn't feel like an Olympic sport.</li>
              <li className="mb-2">Emotional Intelligence – Helping kids manage their feelings without throwing a tantrum…or their phone.</li>
              <li className="mb-2">Financial Literacy – Say goodbye to piggy bank economics and hello to future millionaires.</li>
              <li className="mb-2">Success Philosophy – Because hustle culture doesn't have to mean burnout.</li>
              <li className="mb-2">Personal Hygiene – No more battles over brushing teeth or deodorant.</li>
              <li className="mb-2">Mental Health – Let's make "talking it out" cooler than bottling it up.</li>
              <li className="mb-2">Safety – Stranger danger, cyber creeps, and staying street-smart.</li>
              <li className="mb-2">Code of Conduct – Because knowing how to act right is always in style.</li>
            </ol>

            <p className="mb-4">…and SO MUCH MORE!</p>

            <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-4">Why It Matters</h2>

            <p className="mb-4">
              Here's the deal: if the children know, they grow—and guess what? When they grow, society grows too. It's as simple as that. This initiative is the ultimate win-win for parents, teachers, and most importantly, the kids.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-4">Join Us Today</h2>

            <p className="mb-4">
              So, what are you waiting for? A handwritten invitation? Your child or student's bright future is just a click, a call, or a conversation away. Let's raise a generation that knows what's up, not just what's trending.
            </p>

            <p className="mb-4">
              Because if you think life is tough now, imagine a world where kids don't know the basics of mental health, financial literacy, or—heaven forbid—how to do laundry!
            </p>

            <p className="mb-4">
              Join TheChildrenShouldKnow today. Your kids will thank you later (probably with a shoutout on their Instagram story).
            </p>

            <p className="italic mt-6">
              P.S. No refunds on all the "thank yous" and bear hugs you're about to get for being part of this awesome movement!
            </p>
          </div>

          <div className="mt-8 text-center space-x-4">
            <Link href="/" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Back to Home
            </Link>
            <Link href="/booklets/read-more" className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
              Read More
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
