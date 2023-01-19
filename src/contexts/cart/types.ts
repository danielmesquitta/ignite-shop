import { ReactNode } from 'react'
import { Product } from '~/types/Product'

export interface CartContextProviderProps {
  children: ReactNode
}

export interface CartContextData {
  cart: Product[]
  totalPrice: number
  addProduct: (product: Product) => void
  removeProduct: (id: string) => void
  emptyCart: () => void
}
