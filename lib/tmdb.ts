const API_KEY = '501c878c72ae3bba87af476a081f0cd7'
const BASE_URL = 'https://api.themoviedb.org/3'

export const getDiscoverMovies = async (
  page: number = 1, 
  sortBy: string = 'popularity.desc', 
  genre?: string
): Promise<any[]> => {
  try {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}`
    if (genre) url += `&with_genres=${genre}`
    
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

export const getGenres = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return data.genres || []
  } catch (error) {
    console.error('Error fetching genres:', error)
    return []
  }
}

export const searchMovies = async (
  query: string, 
  page: number = 1
): Promise<{results: any[], totalPages: number}> => {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1
    }
  } catch (error) {
    console.error('Error searching movies:', error)
    return {
      results: [],
      totalPages: 1
    }
  }
}

export const getMovieDetails = async (id: string | number): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}
