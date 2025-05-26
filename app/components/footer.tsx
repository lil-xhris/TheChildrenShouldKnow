"use client"

import { MessageSquare, Mail, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 W R I T E R S. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a
            href="https://chat.whatsapp.com/IRe0nZAgBOM8SvLTydfuCt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageSquare size={24} />
          </a>
          <a
            href="mailto:thechildrenshouldknow@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
          <a
            href="https://www.facebook.com/share/15HfGSqNaV/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}
