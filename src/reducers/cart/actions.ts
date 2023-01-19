import { Product } from '~/types/Product'

export enum ActionTypes {
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  EMPTY_CART = 'EMPTY_CART',
}

export const addProductAction = (product: Product) => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload: {
      product,
    },
  }
}

export const removeProductAction = (productId: string) => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: {
      productId,
    },
  }
}

export const emptyCartAction = () => {
  return {
    type: ActionTypes.EMPTY_CART,
  }
}
