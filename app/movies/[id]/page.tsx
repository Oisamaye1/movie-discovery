import { getMovieDetails } from '../../../lib/tmdb'
import MovieDetails from '../../../components/MovieDetails'

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id)

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Movie Not Found</h1>
        <p className="text-red-500">Failed to load movie details. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MovieDetails movie={movie} />
    </div>
  )
}
