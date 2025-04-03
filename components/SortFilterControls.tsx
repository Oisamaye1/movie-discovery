'use client'
import { useState, useEffect } from 'react'

interface SortFilterControlsProps {
  selectedSort: string
  selectedGenre: string
  onSortChange: (sort: string) => void
  onGenreChange: (genre: string) => void
  genres: Array<{id: number, name: string}>
}

export default function SortFilterControls({
  selectedSort,
  selectedGenre,
  onSortChange,
  onGenreChange,
  genres
}: SortFilterControlsProps) {
  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Top Rated' },
    { value: 'release_date.desc', label: 'Newest Releases' },
    { value: 'revenue.desc', label: 'Highest Revenue' }
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="w-full sm:w-48">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-300 mb-1">
          Sort By
        </label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-48">
        <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
          Filter by Genre
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
