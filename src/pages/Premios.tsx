import { FaGift, FaCoins } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Premio } from '../types'

const Premios = () => {
  const [premios, setPremios] = useState<Premio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarPremios = async () => {
      try {
        const premiosData = await api.getPremios()
        setPremios(premiosData)
      } catch (error) {
        setError('Error al cargar los premios')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    cargarPremios()
  }, [])

  const handleCanjearPremio = async (premioId: number) => {
    try {
      const resultado = await api.canjearPremio(premioId)
      if (resultado.success) {
        // Aquí podrías actualizar el estado de los puntos del usuario
        alert(resultado.message)
      }
    } catch (error) {
      console.error('Error al canjear premio:', error)
      alert('Error al canjear el premio')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaGift className="text-blue-600" />
          Premios Disponibles
        </h1>
        <p className="text-gray-600 mt-1">
          Canjea tus puntos por increíbles premios y experiencias
        </p>
      </div>

      {/* Grid de premios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premios.map((premio) => (
          <div
            key={premio.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={premio.imagen}
                alt={premio.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                <FaCoins />
                <span>{premio.puntos}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {premio.nombre}
              </h3>
              <p className="text-gray-600 mb-4">
                {premio.descripcion}
              </p>
              {/*<button 
                onClick={() => handleCanjearPremio(premio.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Canjear premio
              </button>*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Premios 