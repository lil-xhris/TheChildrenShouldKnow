"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Check } from "lucide-react"

interface ImageCropperProps {
  imageUrl: string
  onCrop: (croppedImageUrl: string) => void
  onCancel: () => void
}

export function ImageCropper({ imageUrl, onCrop, onCancel }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Load the image and set up initial position
  useEffect(() => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = imageUrl

    image.onload = () => {
      imageRef.current = image

      // Center the image initially
      const canvas = canvasRef.current
      if (canvas) {
        const size = canvas.width
        const scale = size / Math.min(image.width, image.height)
        setScale(scale)

        // Center the image
        setPosition({
          x: (size - image.width * scale) / 2,
          y: (size - image.height * scale) / 2,
        })

        drawImage()
      }
    }
  }, [imageUrl])

  // Draw the image on the canvas
  const drawImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const image = imageRef.current

    if (canvas && ctx && image) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw image
      ctx.save()
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(
        image,
        position.x / scale,
        position.y / scale,
        canvas.width / scale,
        canvas.height / scale,
        0,
        0,
        canvas.width,
        canvas.height,
      )

      // Draw circle overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()
    }
  }

  // Update canvas when position or scale changes
  useEffect(() => {
    drawImage()
  }, [position, scale])

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle zoom
  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = Number.parseFloat(e.target.value)
    setScale(newScale)
  }

  // Crop the image and return the data URL
  const handleCrop = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const croppedImageUrl = canvas.toDataURL("image/png")
      onCrop(croppedImageUrl)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Crop Profile Picture</h2>
        <p className="text-gray-600 mb-4">Drag to position and use the slider to zoom.</p>

        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border rounded-full cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="zoom" className="block text-sm font-medium text-gray-700 mb-1">
            Zoom
          </label>
          <input
            id="zoom"
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={scale}
            onChange={handleZoom}
            className="w-full"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
          >
            <X size={18} className="mr-1" />
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Check size={18} className="mr-1" />
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
