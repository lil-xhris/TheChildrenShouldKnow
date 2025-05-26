'use client'

import { useState } from 'react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Upload, Video } from 'lucide-react'

export default function Videos() {
  const [videos, setVideos] = useState<{ name: string; url: string }[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideos([...videos, { name: file.name, url }])
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Video Section</h1>
          
          <div className="mb-8">
            <label htmlFor="video-upload" className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-600">Click to upload video</span>
              </span>
              <input
                id="video-upload"
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <video controls className="w-full h-48 object-cover">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 truncate">{video.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {videos.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <Video className="w-16 h-16 mx-auto mb-4" />
              <p>No videos uploaded yet. Upload a video to get started!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
