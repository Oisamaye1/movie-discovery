'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
}

export default function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const searchParams = useSearchParams()
  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `?${params.toString()}`
  }

  return (
    <div className="flex justify-center gap-4 mt-8">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
          !hasPrevPage
            ? 'text-gray-500 pointer-events-none'
            : 'text-white hover:bg-gray-800'
        }`}
      >
        <FaArrowLeft className="text-sm" />
        Previous
      </Link>

      <span className="flex items-center px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
          !hasNextPage
            ? 'text-gray-500 pointer-events-none'
            : 'text-white hover:bg-gray-800'
        }`}
      >
        Next
        <FaArrowRight className="text-sm" />
      </Link>
    </div>
  )
}
