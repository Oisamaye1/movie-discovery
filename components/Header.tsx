import Link from 'next/link'
import { FaSearch, FaHome, FaHeart } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition">
          MovieDiscovery
        </Link>
        
        <nav className="flex items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <FaHome className="text-sm sm:text-base" />
            <span>Home</span>
          </Link>
          <Link href="/search" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <FaSearch className="text-sm sm:text-base" />
            <span>Search</span>
          </Link>
          <Link href="/favorites" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <FaHeart className="text-sm sm:text-base" />
            <span>Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
