"use client"

import type React from "react"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  color?: string
  text?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "purple-500",
  text = "Loading...",
}) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  }

  return (
    <div className="flex flex-col items-center justify-center p-4" role="status" aria-live="polite">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-${color} ${sizeClasses[size]}`}></div>
      {text && (
        <p className="mt-2 text-gray-600 text-sm" aria-label={text}>
          {text}
        </p>
      )}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  )
}

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} aria-hidden="true">
      <span className="sr-only">Loading content...</span>
    </div>
  )
}
