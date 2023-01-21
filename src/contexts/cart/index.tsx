'use client'

import cookies from 'js-cookie'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { cartReducer, storageCartKey } from '~/reducers/cart'
import {
  addProductAction,
  emptyCartAction,
  removeProductAction
} from '~/reducers/cart/actions'
import { Product } from '~/types/Product'
import { useAsideContext } from '../aside'
import type { CartContextData, CartContextProviderProps } from './types'

const CartContext = createContext({} as CartContextData)

const initialCartState = {
  cart: [],
  totalPrice: 0,
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const { setIsVisible } = useAsideContext()

  const [cartState, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    () => {
      const storedStateAsJSON = cookies.get(storageCartKey)

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialCartState
    },
  )

  const addProduct = useCallback((product: Product) => {
    dispatch(addProductAction(product))
  }, [])

  const removeProduct = useCallback((productId: string) => {
    dispatch(removeProductAction(productId))
  }, [])

  const emptyCart = useCallback(() => {
    dispatch(emptyCartAction())
  }, [])

  useEffect(() => {
    if (cartState.cart.length === 0) {
      setIsVisible(false)
    }
  }, [cartState.cart, setIsVisible])

  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        totalPrice: cartState.totalPrice,
        addProduct,
        removeProduct,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider')
  }

  return context
}
