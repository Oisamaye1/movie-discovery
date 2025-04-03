'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MovieGrid from '../components/MovieGrid'
import { getDiscoverMovies, getGenres } from '../lib/tmdb'
import PaginationControls from '../components/PaginationControls'
import SortFilterControls from '../components/SortFilterControls'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [movies, setMovies] = useState<any[]>([])
  const [genres, setGenres] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Get URL params with proper type conversion
  const page = parseInt(searchParams.get('page') || '1')
  const sortBy = searchParams.get('sort') || 'popularity.desc'
  const genre = searchParams.get('genre') || ''

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [moviesData, genresData] = await Promise.all([
          getDiscoverMovies(page, sortBy, genre),
          getGenres()
        ])
        setMovies(moviesData || [])
        setGenres(genresData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setMovies([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [page, sortBy, genre])

  const updateURL = (params: {page?: number, sort?: string, genre?: string}) => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (params.page) newParams.set('page', params.page.toString())
    if (params.sort) newParams.set('sort', params.sort)
    if (params.genre !== undefined) {
      params.genre ? newParams.set('genre', params.genre) : newParams.delete('genre')
    }
    router.push(`?${newParams.toString()}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>
      
      <SortFilterControls 
        selectedSort={sortBy}
        selectedGenre={genre}
        onSortChange={(sort) => updateURL({sort, page: 1})}
        onGenreChange={(genre) => updateURL({genre, page: 1})}
        genres={genres}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} />
          <PaginationControls 
            currentPage={page} 
            totalPages={10}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-red-500">No movies found</p>
          <p className="text-gray-400 mt-2">
            Try adjusting your filters or check your connection
          </p>
        </div>
      )}
    </main>
  )
}
