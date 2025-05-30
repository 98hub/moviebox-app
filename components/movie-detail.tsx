"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import type { Movie } from "@/types/movie"

interface MovieDetailProps {
  movie: Movie
  onClose: () => void
}

export default function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const [isReady, setIsReady] = useState(false)
  const [imageError, setImageError] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsReady(false)
    setTimeout(() => {
      onClose()
    }, 500)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Fungsi untuk menangani URL gambar dari API lokal
  const getImageUrl = (imageUrl: string) => {
    // Jika URL sudah lengkap (dimulai dengan http atau https), gunakan apa adanya
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl
    }

    // Jika URL relatif, tambahkan base URL API lokal
    return `http://103.185.38.29:3000${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
  }

  return (
    <div ref={detailRef} className={`detail ${isReady ? "ready" : ""}`} onClick={handleBackdropClick}>
      <svg className="close" onClick={handleClose}>
        <use xlinkHref="#close"></use>
      </svg>
      <article className="movie">
        {imageError ? (
          <div className="poster-fallback-detail">
            <div className="fallback-content">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                  fill="#ccc"
                />
              </svg>
              <span>No Image Available</span>
            </div>
          </div>
        ) : (
          <img
            ref={posterRef}
            src={movie.image ? getImageUrl(movie.image) : "/placeholder.svg"}
            alt={movie.title}
            className="poster"
            onError={handleImageError}
          />
        )}
        <div className="title">{movie.title}</div>
        <div className="info">
          <span className="length">{movie.duration} mins</span>
          <span className="year">{movie.year}</span>
        </div>
        <div className="desc">{movie.description}</div>
        <button className="play">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 232.153 232.153"
            xmlSpace="preserve"
            width="10px"
            height="10px"
          >
            <g id="Play">
              <path
                style={{ fillRule: "evenodd", clipRule: "evenodd" }}
                d="M203.791,99.628L49.307,2.294c-4.567-2.719-10.238-2.266-14.521-2.266   c-17.132,0-17.056,13.227-17.056,16.578v198.94c0,2.833-0.075,16.579,17.056,16.579c4.283,0,9.955,0.451,14.521-2.267   l154.483-97.333c12.68-7.545,10.489-16.449,10.489-16.449S216.471,107.172,203.791,99.628z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
          {" play movie"}
        </button>
      </article>
    </div>
  )
}
