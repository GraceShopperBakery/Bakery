import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'

/**
 * INITIAL STATE
 */
const initialState = {
}

export let prodTotal = 0


/**
 * ACTION CREATORS
 */

export const addProduct = product => ({type: ADD_PRODUCT, product})
export const removeProduct = productName => ({
  type: REMOVE_PRODUCT,
  productName
})
export const increaseQty = productName => ({type: INCREASE_QTY, productName})
export const decreaseQty = productName => ({type: DECREASE_QTY, productName})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      if (!state[action.product.title]) {
        const newProduct = {...action.product}
        newProduct.quantity = 1
        prodTotal++
        return {...state, [newProduct.title]: newProduct}
      } else {
        const updatedProduct = {...state[action.product.title]}
        updatedProduct.quantity++
        prodTotal++
        return {...state, [action.product.title]: updatedProduct}
      }
    case INCREASE_QTY:
      {
        const productToIncrease = {...state[action.productName]}
        productToIncrease.quantity++
        prodTotal++
        console.log('prodTotal',prodTotal)
        return {...state, [action.productName]: productToIncrease}
      }
    case REMOVE_PRODUCT:
      {
        const updatedCart = {...state}
        prodTotal-={...state}[action.productName].quantity
        delete updatedCart[action.productName]
        return updatedCart
      }
    case DECREASE_QTY:
      {
        const productToDecrease = {...state[action.productName]}
        if (productToDecrease.quantity > 1) {
          productToDecrease.quantity--
          prodTotal--
          console.log('prodTotal',prodTotal)
          return {...state, [action.productName]: productToDecrease}
        } else {
          const newCart = {...state}
          delete newCart[action.productName]
          prodTotal--
          return newCart
        }
      }
    default:
      return state
  }
}
