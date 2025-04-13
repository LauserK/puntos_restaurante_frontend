import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Premios App</h1>
            </div>
            
            {/* Menú hamburguesa para móvil */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Menú de escritorio */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Inicio
              </Link>
              <Link to="/premios" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Premios
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Iniciar sesión
              </Link>
            </div>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/premios"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Premios
                </Link>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-2">
        {children}
      </main>
    </div>
  )
}

export default Layout 