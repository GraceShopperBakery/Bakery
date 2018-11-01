import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {}


/**
 * ACTION CREATORS
 */

export const addProduct = product => ({ type: ADD_PRODUCT, product })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case (ADD_PRODUCT):
      if (!state[action.product.title]) { 
        const newProduct = { ...action.product }
        newProduct.quantity = 1;
        console.log('NEW PRODUCT', newProduct)
        console.log('NEW STATE TO RETURN', { ...state, [newProduct.title]: newProduct })
        return { ...state, [newProduct.title]: newProduct }
      }
      else {
        const updatedProduct = { ...state[action.product.title] }
        updatedProduct.quantity++
        return { ...state, [action.product.title]: updatedProduct }
      } 
    default:
      return state
  }
}


