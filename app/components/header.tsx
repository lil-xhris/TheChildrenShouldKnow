"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Pen, Award, Menu, X, User, LogIn, Search, ShieldAlert } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useAuth } from "../context/auth-context"
import { Notifications } from "./notifications"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/projects", icon: BookOpen, label: "Projects" },
    { href: "/poetry", icon: Pen, label: "Poetry" },
    { href: "/writers", icon: Award, label: "Writers" },
    { href: "/search", icon: Search, label: "Search" },
  ]

  return (
    <header>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center z-10">
            <Image src="/images/writers-logo.png" alt="WRITERS Logo" width={60} height={60} className="mr-3" />
            <span className="text-white text-2xl sm:text-3xl font-bold tracking-widest">W R I T E R S</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-white z-10" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMenuOpen(false)} />
          )}

          {/* Mobile menu */}
          <nav
            className={`
            fixed inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            flex items-center justify-center
            transition-transform duration-300 ease-in-out
            md:hidden z-50
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
          >
            <ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${pathname === item.href ? "text-yellow-300" : "text-white"} hover:text-yellow-300 flex items-center text-lg`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="mr-2" size={14} />
                    {item.label}
                  </Link>
                </li>
              ))}
              {user && <Notifications />}
              {user ? (
                <li>
                  <Link
                    href="/profile"
                    className={`${pathname === "/profile" ? "text-yellow-300" : "text-white"} hover:text-yellow-300 flex items-center text-lg`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mr-2" size={14} />
                    Profile
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className={`${pathname === "/login" ? "text-yellow-300" : "text-white"} hover:text-yellow-300 flex items-center text-lg`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="mr-2" size={14} />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className={`${pathname === "/signup" ? "text-yellow-300" : "text-white"} hover:text-yellow-300 flex items-center text-lg`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-2" size={14} />
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin-login"
                      className={`${pathname === "/admin-login" ? "text-yellow-300" : "text-white"} hover:text-yellow-300 flex items-center text-lg`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShieldAlert className="mr-2" size={14} />
                      Admin
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${pathname === item.href ? "text-yellow-300" : "text-white"} hover:text-yellow-300 flex items-center`}
                  >
                    <item.icon className="mr-1" size={14} />
                    {item.label}
                  </Link>
                </li>
              ))}

              {user && <Notifications />}

              {user ? (
                <li>
                  <Link
                    href="/profile"
                    className="bg-white text-purple-600 px-3 py-1 rounded-full hover:bg-yellow-100 transition-colors flex items-center"
                  >
                    <User className="mr-1" size={14} />
                    Profile
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="bg-white text-purple-600 px-3 py-1 rounded-full hover:bg-yellow-100 transition-colors flex items-center mr-2"
                    >
                      <LogIn className="mr-1" size={14} />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="bg-white text-purple-600 px-3 py-1 rounded-full hover:bg-yellow-100 transition-colors flex items-center"
                    >
                      <User className="mr-1" size={14} />
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Secondary navigation row - only show when not logged in */}
      {!user && (
        <div className="bg-purple-700 py-2">
          <div className="container mx-auto flex justify-center items-center">
            <ul className="flex space-x-8 text-white text-sm">
              <li>
                <Link href="/login" className="hover:text-yellow-300 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-yellow-300 transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/admin-login" className="hover:text-yellow-300 transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
