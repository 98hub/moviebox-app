"use client"

import type { Movie } from "@/types/movie"
import MovieCard from "./movie-card"

interface MovieGridProps {
  movies: Movie[]
  onMovieClick: (movie: Movie, sourceElement: HTMLElement) => void
}

export default function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  const handleMovieClick = (movie: Movie) => {
    onMovieClick(movie, document.activeElement as HTMLElement)
  }

  return (
    <section className="movies">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} onClick={() => handleMovieClick(movie)} />
      ))}
    </section>
  )
}
