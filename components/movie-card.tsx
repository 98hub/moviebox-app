"use client"

import { useState } from "react"
import type { Movie } from "@/types/movie"

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  // Fungsi untuk menangani URL gambar dari API lokal
  const getImageUrl = (imageUrl: string) => {
    // Jika URL sudah lengkap (dimulai dengan http atau https), gunakan apa adanya
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl
    }

    // Jika URL relatif, tambahkan base URL API lokal
    return `http://103.167.137.108:3000${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
  }

  return (
    <div className="movie" onClick={onClick}>
      <div className="poster-container">
        {imageLoading && (
          <div className="poster-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
        {imageError ? (
          <div className="poster-fallback">
            <div className="fallback-content">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                  fill="#ccc"
                />
              </svg>
              <span>No Image</span>
            </div>
          </div>
        ) : (
          <img
            src={movie.image ? getImageUrl(movie.image) : "/placeholder.svg"}
            alt={movie.title}
            className="poster"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? "none" : "block" }}
          />
        )}
      </div>
      <div className="title">{movie.title}</div>
      <div className="info">
        <span className="length">{movie.duration} mins</span>
        <span className="year">{movie.year}</span>
      </div>
      <div className="desc">{movie.description}</div>
    </div>
  )
}
