"use client"

import { useEffect } from "react"
import { setCSRFToken, validateCSRFToken } from "@/app/lib/csrf"

interface User {
  isAdmin: boolean
}

const AdminDashboard = () => {
  // Mock user for demonstration purposes
  const user: User = { isAdmin: true }

  useEffect(() => {
    if (user?.isAdmin) {
      setCSRFToken()
    }
  }, [user])

  const handleAdminAction = async (action: string, data: any) => {
    const token = sessionStorage.getItem("csrf_token")
    if (!token || !validateCSRFToken(token)) {
      alert("Security token invalid. Please refresh the page.")
      return
    }

    // Proceed with admin action
    console.log(`Admin action: ${action}`, data)
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => handleAdminAction("deleteUser", { userId: 123 })}>Delete User</button>
    </div>
  )
}

export default AdminDashboard
