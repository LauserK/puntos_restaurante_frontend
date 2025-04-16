export interface Movimiento {
  id: number
  tipo: 'ganancia' | 'gasto'
  cantidad: number
  descripcion: string
  fecha: string
}

export interface Premio {
  id: number
  nombre: string
  puntos: number
  imagen: string
  descripcion: string
} 