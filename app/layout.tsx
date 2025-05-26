import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./styles/fonts.css"
import { AuthProvider } from "./context/auth-context"

export const metadata: Metadata = {
  title: "WRITERS",
  description: "Unleashing creativity through the power of words",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
