import cookies from 'js-cookie'
import { ActionTypes } from './actions'
import type { CartAction, CartState } from './types'

export const storageCartKey = '@ignite-shop:cart-state-v1.0'

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  const setCartInLocalStorage = (newCartState: CartState) => {
    cookies.set(storageCartKey, JSON.stringify(newCartState))
  }

  switch (action.type) {
    case ActionTypes.ADD_PRODUCT: {
      const cartDraft = [...state.cart]

      console.log(cartDraft)

      const product = cartDraft.find(
        ({ id }) => id === action.payload!.product.id,
      )

      if (product) {
        return state
      }

      cartDraft.push(action.payload!.product)

      const newCartState: CartState = {
        cart: cartDraft,
        totalPrice: state.totalPrice + action.payload!.product.price,
      }

      setCartInLocalStorage(newCartState)

      console.log(newCartState)

      return newCartState
    }

    case ActionTypes.REMOVE_PRODUCT: {
      const cartDraft = [...state.cart]

      const productIndex = state.cart.findIndex(
        (product) => product.id === action.payload!.productId,
      )

      const productNotFoundInCart = productIndex < 0

      if (productNotFoundInCart) {
        return state
      }

      cartDraft.splice(productIndex, 1)

      const product = state.cart[productIndex]

      const newCartState: CartState = {
        cart: cartDraft,
        totalPrice: state.totalPrice - product.price,
      }

      setCartInLocalStorage(newCartState)

      return newCartState
    }

    case ActionTypes.EMPTY_CART: {
      const newCartState: CartState = {
        cart: [],
        totalPrice: 0,
      }

      setCartInLocalStorage(newCartState)

      return newCartState
    }

    default: {
      return state
    }
  }
}
