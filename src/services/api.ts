import { Movimiento, Premio } from '../types'
import { User } from '../types/auth'

const movimientos: Movimiento[] = [
  { id: 1, tipo: 'ganancia', cantidad: 100, descripcion: 'Pedido #122222', fecha: '2024-03-15' },
  { id: 2, tipo: 'gasto', cantidad: 50, descripcion: 'Canje de premio', fecha: '2024-03-14' },
  { id: 3, tipo: 'ganancia', cantidad: 200, descripcion: 'Pedido #333555', fecha: '2024-03-13' },
  { id: 4, tipo: 'gasto', cantidad: 75, descripcion: 'Canje de premio', fecha: '2024-03-12' },
  { id: 5, tipo: 'ganancia', cantidad: 150, descripcion: 'Pedido #112255', fecha: '2024-03-11' },
]

const premios: Premio[] = [
  { 
    id: 1, 
    nombre: 'Café Premium', 
    puntos: 100, 
    imagen: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    descripcion: "Disfruta de un delicioso café premium de especialidad" 
  },
  { 
    id: 2, 
    nombre: 'Desayuno Completo', 
    puntos: 250, 
    imagen: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    descripcion: "Desayuno completo con jugo natural y pan artesanal" 
  },
  { 
    id: 3, 
    nombre: 'Cena para Dos', 
    puntos: 500, 
    imagen: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    descripcion: "Una cena romántica para dos personas" 
  },
  { 
    id: 4, 
    nombre: 'Noche de Hotel', 
    puntos: 1000, 
    imagen: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    descripcion: "Una noche en nuestro hotel premium" 
  },
  { 
    id: 5, 
    nombre: 'Spa Day', 
    puntos: 750, 
    imagen: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    descripcion: "Día completo de spa y relajación" 
  },
]

// Simulación de llamadas a API
export const api = {

  // Movimientos
  getMovimientos: async (): Promise<Movimiento[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return movimientos
  },

  // Premios
  getPremios: async (): Promise<Premio[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return premios
  },

  // Canjear premio
  canjearPremio: async (): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      success: true,
      message: 'Premio canjeado exitosamente'
    }
  }
} 