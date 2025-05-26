"use client"

import type React from "react"
import { useState } from "react"

const ImagePostForm = () => {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const compressedFile = await compressImage(file)
      setImage(compressedFile)
      setPreview(URL.createObjectURL(compressedFile))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission with the image
    if (image) {
      console.log("Image to upload:", image)
      // You can upload the image here using a service or API
    } else {
      console.warn("No image selected.")
    }
  }

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      const img = new Image()

      img.onload = () => {
        const maxWidth = 800
        const maxHeight = 600
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob!], file.name, { type: "image/jpeg" }))
          },
          "image/jpeg",
          0.8,
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Select Image:</label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
      </div>
      {preview && (
        <div>
          <img src={preview || "/placeholder.svg"} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
        </div>
      )}
      <button type="submit">Post</button>
    </form>
  )
}

export { ImagePostForm }
export default ImagePostForm
