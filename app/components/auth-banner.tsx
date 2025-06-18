"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "../context/auth-context"
import {
  Bell,
  Bookmark,
  Search,
  LogOut,
  Home,
  Activity,
  Heart,
  MessageSquare,
  UserPlus,
  Eye,
  Repeat,
  Flame,
  Award,
} from "lucide-react"
import { StreakBadge } from "./streak-badge"
import { Button } from "@/components/ui/button"

export function AuthBanner() {
  const { user, logout, getNotifications, markNotificationAsRead, markAllNotificationsAsRead } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const notificationRef = useRef(null)

  useEffect(() => {
    if (user) {
      setNotifications(getNotifications())
    }
  }, [user, getNotifications])

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNotificationClick = (notificationId) => {
    markNotificationAsRead(notificationId)
    setNotifications(
      notifications.map((n) => {
        if (n.id === notificationId) {
          return { ...n, read: true }
        }
        return n
      }),
    )
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead()
    setNotifications(
      notifications.map((n) => {
        return { ...n, read: true }
      }),
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!user)
    return (
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <p className="text-sm mr-4">Join our community of writers and storytellers!</p>
          <div className="flex space-x-2">
            <Link href="/signup">
              <Button size="sm" variant="secondary">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="sm"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )

  return (
    <div className="bg-white border-b shadow-sm py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/home" className="flex items-center text-purple-600 hover:text-purple-800">
            <Home size={20} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="/search" className="flex items-center text-gray-600 hover:text-purple-600">
            <Search size={20} className="mr-1" />
            <span className="hidden sm:inline">Search</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/activity" className="flex items-center text-gray-600 hover:text-purple-600">
            <Activity size={20} className="mr-1" />
            <span className="hidden sm:inline">Activity</span>
          </Link>

          <Link href="/bookmarks" className="flex items-center text-gray-600 hover:text-purple-600">
            <Bookmark size={20} className="mr-1" />
            <span className="hidden sm:inline">Saved</span>
          </Link>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center text-gray-600 hover:text-purple-600 relative"
            >
              <Bell size={20} className="mr-1" />
              <span className="hidden sm:inline">Notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={handleMarkAllAsRead} className="text-xs text-purple-600 hover:text-purple-800">
                      Mark all as read
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                ) : (
                  <div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? "bg-purple-50" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className="mr-3">
                            {notification.type === "like" && <Heart size={16} className="text-red-500" />}
                            {notification.type === "comment" && <MessageSquare size={16} className="text-blue-500" />}
                            {notification.type === "follow" && <UserPlus size={16} className="text-green-500" />}
                            {notification.type === "view" && <Eye size={16} className="text-purple-500" />}
                            {notification.type === "repost" && <Repeat size={16} className="text-orange-500" />}
                            {notification.type === "streak" && <Flame size={16} className="text-yellow-500" />}
                            {notification.type === "badge" && <Award size={16} className="text-indigo-500" />}
                          </div>
                          <div>
                            <p className="text-sm">
                              {notification.type === "like" && "Someone liked your post"}
                              {notification.type === "comment" && "Someone commented on your post"}
                              {notification.type === "follow" && "Someone followed you"}
                              {notification.type === "view" && "Someone viewed your profile"}
                              {notification.type === "repost" && "Someone reposted your post"}
                              {notification.type === "streak" && `You're on a ${user.streak?.count || 0} day streak!`}
                              {notification.type === "badge" && "You earned a new badge!"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <Link href={`/user/${user.id}`} className="flex items-center">
              <div className="relative">
                <Image
                  src={user.profileImage || "/placeholder.svg?height=32&width=32"}
                  alt={user.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="absolute -bottom-1 -right-1">
                  <StreakBadge size="sm" showCount={false} />
                </div>
              </div>
              <span className="ml-2 hidden sm:inline">{user.username}</span>
            </Link>
            <button onClick={logout} className="ml-4 text-gray-600 hover:text-red-600">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
