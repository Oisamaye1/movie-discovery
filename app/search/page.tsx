'use client'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useSearchParams, useRouter } from 'next/navigation'
import MovieGrid from '../../components/MovieGrid'
import { searchMovies, getGenres } from '../../lib/tmdb'
import LoadingSkeleton from '../../components/LoadingSkeleton'
import PaginationControls from '../../components/PaginationControls'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [debouncedQuery] = useDebounce(query, 500)
  const [data, setData] = useState({ results: [], totalPages: 1 })
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState<any[]>([])
  const page = parseInt(searchParams.get('page') || '1')
  const sortBy = searchParams.get('sort') || ''
  const genre = searchParams.get('genre') || ''

  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await getGenres()
      setGenres(genreList)
    }
    fetchGenres()
  }, [])

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedQuery.trim()) {
        setIsLoading(true)
        try {
          const searchData = await searchMovies(debouncedQuery, page)
          setData(searchData)
        } catch (error) {
          console.error('Search error:', error)
          setData({ results: [], totalPages: 1 })
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchSearchResults()
  }, [debouncedQuery, page])

  const updateUrl = (params: {q?: string, page?: number}) => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (params.q !== undefined) newParams.set('q', params.q)
    if (params.page !== undefined) newParams.set('page', params.page.toString())
    router.push(`?${newParams.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            updateUrl({ q: e.target.value, page: 1 })
          }}
          placeholder="Search movies..."
          className="w-full p-4 text-lg border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <MovieGrid movies={data.results} />
          {data.results.length > 0 && (
            <PaginationControls 
              currentPage={page}
              totalPages={data.totalPages}
            />
          )}
        </>
      )}
    </div>
  )
}
