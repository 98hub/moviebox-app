"use client"

import { useState, useEffect } from "react"
import type { Movie } from "@/types/movie"
import MovieGrid from "@/components/movie-grid"
import MovieDetail from "@/components/movie-detail"
import Header from "@/components/header"

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      // Menggunakan API lokal yang sudah berjalan
      const response = await fetch("http://103.167.137.108:3000/api/movies")

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()
      setMovies(data)
      setLoading(false)

      // Auto demo - show first movie after 300ms, close after 1700ms
      setTimeout(() => {
        if (data.length > 0) {
          setSelectedMovie(data[0])
        }
      }, 300)

      setTimeout(() => {
        setSelectedMovie(null)
      }, 1700)
    } catch (err) {
      console.error("Error fetching movies:", err)
      setError("Gagal mengambil data film. Pastikan API lokal berjalan di port 3000.")
      setLoading(false)
    }
  }

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseDetail = () => {
    setSelectedMovie(null)
  }

  if (loading) {
    return (
      <div className="app">
        <Header />
        <h2>Loading...</h2>
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <h2>Error</h2>
        <div className="error-container">
          <p>{error}</p>
          <button className="retry-button" onClick={fetchMovies}>
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <h2>Most Popular Movies</h2>
      <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
      {selectedMovie && <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />}
    </div>
  )
}
