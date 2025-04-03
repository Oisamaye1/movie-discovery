import Link from 'next/link'
import { FaSearch, FaHome, FaHeart } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition">
          MovieDiscovery
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link href="/search" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <FaSearch />
            <span>Search</span>
          </Link>
          <Link href="/favorites" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <FaHeart />
            <span>Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
