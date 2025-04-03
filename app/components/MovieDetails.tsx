'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart, FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa'
import Link from 'next/link'
import YouTube from 'react-youtube'

interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  runtime: number
  release_date: string
  genres: { id: number; name: string }[]
  videos?: {
    results: {
      key: string
      type: string
    }[]
  }
}

export default function MovieDetails({ movie }: { movie: MovieDetails }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(movie.id))
  }, [movie.id])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const newFavorites = isFavorite
      ? favorites.filter((id: number) => id !== movie.id)
      : [...favorites, movie.id]
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const trailer = movie.videos?.results.find(video => video.type === 'Trailer')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative h-64 md:h-96 w-full">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full md:w-64 lg:w-80">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
              
              <div className="flex items-center space-x-6 mt-2">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                
                {movie.runtime && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <FaClock />
                    <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                  </div>
                )}
                
                {movie.release_date && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <FaCalendarAlt />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={toggleFavorite}
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isClient && (isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-white text-xl" />
              ))}
            </button>
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300">{movie.overview || 'No overview available.'}</p>
          </div>

          {/* Trailer */}
          {trailer && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <YouTube
                  videoId={trailer.key}
                  opts={{
                    width: '100%',
                    playerVars: {
                      autoplay: 0,
                      modestbranding: 1,
                    },
                  }}
                  className="w-full h-64 md:h-96 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
