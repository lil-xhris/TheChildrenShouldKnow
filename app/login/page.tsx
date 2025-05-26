"use client"

import { useSearchParams } from "next/navigation"

export default function Login() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")

  return (
    <div>
      <h1>Login</h1>
      {redirect && <p>Redirecting to: {redirect}</p>}
      {/* Add your login form here */}
    </div>
  )
}
