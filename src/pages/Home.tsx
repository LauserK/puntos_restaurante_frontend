import { FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Movimiento } from '../types'
import { User } from '../types/auth'
import authService from '../services/authService'

const Home = () => {
  const [usuario, setUsuario] = useState<User | null>(null)
  const [movimientos, setMovimientos] = useState<Movimiento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [usuarioData, movimientosData] = await Promise.all([
          authService.getCurrentUser(),
          api.getMovimientos()
        ])
        setUsuario(usuarioData)
        setMovimientos(movimientosData)
      } catch (error) {
        console.error('Error al cargar datos:', error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-red-600">Error al cargar los datos del usuario</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mensaje de bienvenida */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          ¡Hola, <span className="text-red-600">{usuario.first_name}</span>!
        </h1>
        <p className="text-gray-600 mt-1">
          Bienvenido a tu panel de puntos. Aquí podrás ver tu saldo y tus movimientos recientes.
        </p>
      </div>

      {/* Tarjeta de puntos */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Tus Puntos</h2>
            <p className="text-white-100">Saldo actual</p>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <FaCoins className="text-3xl" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-4xl font-bold">{usuario.puntos.toLocaleString()}</p>
        </div>
      </div>

      {/* Historial de movimientos */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Últimos movimientos</h3>
        <div className="space-y-4">
          {movimientos.map((movimiento) => (
            <div
              key={movimiento.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  movimiento.tipo === 'ganancia' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {movimiento.tipo === 'ganancia' ? <FaArrowUp /> : <FaArrowDown />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{movimiento.descripcion}</p>
                  <p className="text-sm text-gray-500">{new Date(movimiento.fecha).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
              <div className={`font-semibold ${
                movimiento.tipo === 'ganancia' ? 'text-green-600' : 'text-red-600'
              }`}>
                {movimiento.tipo === 'ganancia' ? '+' : '-'}{movimiento.cantidad} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home 