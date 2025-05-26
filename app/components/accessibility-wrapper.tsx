"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface AccessibilityWrapperProps {
  children: React.ReactNode
}

export const AccessibilityWrapper: React.FC<AccessibilityWrapperProps> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState("normal")
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check for user preferences
    const savedHighContrast = localStorage.getItem("accessibility_high_contrast") === "true"
    const savedFontSize = localStorage.getItem("accessibility_font_size") || "normal"
    const savedReducedMotion = localStorage.getItem("accessibility_reduced_motion") === "true"

    setHighContrast(savedHighContrast)
    setFontSize(savedFontSize)
    setReducedMotion(savedReducedMotion)

    // Apply preferences to document
    if (savedHighContrast) {
      document.documentElement.classList.add("high-contrast")
    }
    if (savedFontSize !== "normal") {
      document.documentElement.classList.add(`font-size-${savedFontSize}`)
    }
    if (savedReducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    }
  }, [])

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem("accessibility_high_contrast", newValue.toString())

    if (newValue) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const changeFontSize = (size: string) => {
    // Remove old font size class
    document.documentElement.classList.remove(`font-size-${fontSize}`)

    setFontSize(size)
    localStorage.setItem("accessibility_font_size", size)

    if (size !== "normal") {
      document.documentElement.classList.add(`font-size-${size}`)
    }
  }

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion
    setReducedMotion(newValue)
    localStorage.setItem("accessibility_reduced_motion", newValue.toString())

    if (newValue) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }
  }

  return (
    <>
      {/* Accessibility Controls */}
      <div className="fixed top-0 left-0 z-50 bg-white border-b border-gray-200 p-2 flex gap-2 text-sm">
        <button
          onClick={toggleHighContrast}
          className={`px-2 py-1 rounded ${highContrast ? "bg-black text-white" : "bg-gray-200"}`}
          aria-label="Toggle high contrast mode"
        >
          High Contrast
        </button>
        <select
          value={fontSize}
          onChange={(e) => changeFontSize(e.target.value)}
          className="px-2 py-1 border rounded"
          aria-label="Change font size"
        >
          <option value="small">Small Text</option>
          <option value="normal">Normal Text</option>
          <option value="large">Large Text</option>
          <option value="xl">Extra Large Text</option>
        </select>
        <button
          onClick={toggleReducedMotion}
          className={`px-2 py-1 rounded ${reducedMotion ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          aria-label="Toggle reduced motion"
        >
          Reduced Motion
        </button>
      </div>

      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
      >
        Skip to main content
      </a>

      <div id="main-content">{children}</div>
    </>
  )
}
