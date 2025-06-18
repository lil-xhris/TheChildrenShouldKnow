"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/auth-context"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Notifications() {
  const { user, getNotifications, markNotificationAsRead } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (user) {
      const userNotifications = getNotifications()
      setNotifications(userNotifications)
      setUnreadCount(userNotifications.filter((n) => !n.read).length)
    }
  }, [user, getNotifications])

  const handleMarkAsRead = (notificationId) => {
    markNotificationAsRead(notificationId)
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="p-2">
          <h3 className="font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No notifications yet</p>
          ) : (
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-2 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div>
                    <p className="text-sm">{notification.content}</p>
                    <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleDateString()}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
