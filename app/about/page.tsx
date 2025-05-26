'use client'

import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Facebook, Instagram, Twitter, Youtube, Mail, MessageCircle } from 'lucide-react'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">About Us</h1>
          <p className="text-lg sm:text-xl text-center mb-6 sm:mb-8">
            We are a dedicated team passionate about empowering children with the knowledge and skills they need to thrive in today's world. Our mission is to provide valuable resources and create a supportive community where children can learn, grow, and develop into confident, responsible individuals.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
            <div className="flex flex-col space-y-4 text-center">
              <div className="flex items-center justify-center">
                <strong className="mr-2">
                  <a href="https://www.facebook.com/profile.php?id=61571426085747&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-blue-600">
                    <Facebook className="mr-1" size={16} /> Facebook
                  </a>
                </strong>
              </div>
              <div className="flex items-center justify-center">
                <strong className="mr-2">
                  <a href="https://x.com/emekegbuna4514?t=Na4nayFXo8u0TjNbJN1lDQ&s=08" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-gray-700">
                    <Twitter className="mr-1" size={16} /> Twitter/X
                  </a>
                </strong>
              </div>
              <div className="flex items-center justify-center">
                <strong className="mr-2">
                  <a href="https://www.instagram.com/thechildrenshouldknow123/?utm_source=qr&r=nametag" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-pink-600">
                    <Instagram className="mr-1" size={16} /> Instagram
                  </a>
                </strong>
              </div>
              <div className="flex items-center justify-center">
                <strong className="mr-2">
                  <a href="https://youtube.com/@thechildrenshouldknow?si=VBpspweeG2uKXqRR" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-red-600">
                    <Youtube className="mr-1" size={16} /> YouTube
                  </a>
                </strong>
              </div>
              <div className="flex items-center justify-center">
                <strong className="mr-2">
                  <a href="mailto:thechildrenshouldknow@gmail.com" className="inline-flex items-center hover:text-red-600">
                    <Mail className="mr-1" size={16} /> thechildrenshouldknow@gmail.com
                  </a>
                </strong>
              </div>
              <div className="flex items-center justify-center">
                <strong className="mr-2">
                  <a href="https://wa.me/+2347013975929" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-green-600">
                    <MessageCircle className="mr-1" size={16} /> WhatsApp
                  </a>
                </strong>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
