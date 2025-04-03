'use client'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaSearch, FaTimes } from 'react-icons/fa'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [debouncedQuery] = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/search?q=${debouncedQuery}`)
    }
  }, [debouncedQuery, router])

  const clearSearch = () => {
    setQuery('')
    router.push('/search')
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <FaTimes className="text-gray-400 hover:text-white" />
        </button>
      )}
    </div>
  )
}
