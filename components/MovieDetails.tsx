'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart, FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa'
import dynamic from 'next/dynamic'

const YouTube = dynamic(() => import('react-youtube'), { ssr: false })

export default function MovieDetails({ movie }: { movie: any }) {
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

  const trailer = movie.videos?.results.find((video: any) => video.type === 'Trailer')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full md:w-48 lg:w-56 xl:w-64">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-2">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400 text-sm sm:text-base" />
                  <span className="font-semibold text-sm sm:text-base">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
                
                {movie.runtime && (
                  <div className="flex items-center space-x-1 text-gray-400 text-sm sm:text-base">
                    <FaClock />
                    <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                  </div>
                )}
                
                {movie.release_date && (
                  <div className="flex items-center space-x-1 text-gray-400 text-sm sm:text-base">
                    <FaCalendarAlt />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={toggleFavorite}
              className="p-2 sm:p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition flex-shrink-0"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isClient && (isFavorite ? (
                <FaHeart className="text-red-500 text-lg sm:text-xl" />
              ) : (
                <FaRegHeart className="text-white text-lg sm:text-xl" />
              ))}
            </button>
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              {movie.overview || 'No overview available.'}
            </p>
          </div>

          {/* Trailer */}
          {trailer && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Trailer</h2>
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
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
