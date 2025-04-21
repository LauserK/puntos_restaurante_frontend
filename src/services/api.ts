import { Movimiento, Premio } from '../types'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1/'

const movimientos: Movimiento[] = [
  { id: 1, tipo: 'ganancia', cantidad: 100, descripcion: 'Pedido #122222', fecha: '2024-03-15' },
  { id: 2, tipo: 'gasto', cantidad: 50, descripcion: 'Canje de premio', fecha: '2024-03-14' },
  { id: 3, tipo: 'ganancia', cantidad: 200, descripcion: 'Pedido #333555', fecha: '2024-03-13' },
  { id: 4, tipo: 'gasto', cantidad: 75, descripcion: 'Canje de premio', fecha: '2024-03-12' },
  { id: 5, tipo: 'ganancia', cantidad: 150, descripcion: 'Pedido #112255', fecha: '2024-03-11' },
]

export const api = {

  // Movimientos
  getMovimientos: async (): Promise<Movimiento[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return movimientos
  },

  // Premios
  getPremios: async (): Promise<Premio[]> => {
    const tokens = JSON.parse(localStorage.getItem('authTokens') || '{}');

    const response = await axios.get(`${API_URL}recompensas/`, {
      headers: {
      'Authorization': `Bearer ${tokens.access}`
      }
    });

    return response.data
  },
} 