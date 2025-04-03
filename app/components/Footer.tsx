export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} MovieDiscovery. All movie data provided by TMDB.</p>
      </div>
    </footer>
  )
}
