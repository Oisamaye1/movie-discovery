'use client'
import { useEffect, useState } from 'react'
import MovieGrid from '../../components/MovieGrid'
import { getMovieDetails } from '../../lib/tmdb'
import LoadingSkeleton from '../../components/LoadingSkeleton'

export default function FavoritesPage() {
  const [movies, setMovies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const movieDetails = await Promise.all(
          favorites.map(async (id: number) => {
            const details = await getMovieDetails(id)
            return {
              id: details.id,
              title: details.title,
              poster_path: details.poster_path,
              vote_average: details.vote_average,
              release_date: details.release_date
            }
          })
        )
        setMovies(movieDetails.filter(movie => movie.id))
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      {isLoading ? (
        <LoadingSkeleton />
      ) : movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No favorites yet</p>
          <p className="text-gray-500 mt-2">
            Click the heart icon on movies to add them
          </p>
        </div>
      )}
    </div>
  )
}
