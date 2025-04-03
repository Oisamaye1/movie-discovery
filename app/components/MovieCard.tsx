'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import Link from 'next/link'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date?: string
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(movie.id))
  }, [movie.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const newFavorites = isFavorite
      ? favorites.filter((id: number) => id !== movie.id)
      : [...favorites, movie.id]
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/movies/${movie.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all duration-300"
      >
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            
            {movie.release_date && (
              <span className="text-sm text-gray-400">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isClient && (isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-white" />
          ))}
        </button>
      </motion.div>
    </Link>
  )
}
