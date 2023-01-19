import { Product } from '~/types/Product'
import { ActionTypes } from './actions'

export interface CartState {
  cart: Product[]
  totalPrice: number
}

export interface CartAction {
  type: ActionTypes
  payload?: Record<string, any>
}
