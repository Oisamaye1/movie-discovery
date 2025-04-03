import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie Discovery',
  description: 'Discover your next favorite movie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
