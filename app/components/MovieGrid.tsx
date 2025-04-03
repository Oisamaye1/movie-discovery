import MovieCard from './MovieCard'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date?: string
}

interface MovieGridProps {
  movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">No favorites yet</p>
        <p className="text-gray-500 mt-2">Add movies to your favorites to see them here</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
