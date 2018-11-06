import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'
const SET_CART = 'SET_CART'
const SET_PRODUCT = 'SET_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const setProduct = product => ({type: SET_PRODUCT, product})
export const setNewProduct = product => ({type: ADD_PRODUCT, product})
export const removeProduct = productName => ({
  type: REMOVE_PRODUCT,
  productName
})
export const increaseQty = productName => ({type: INCREASE_QTY, productName})
export const decreaseQty = productName => ({type: DECREASE_QTY, productName})
export const setCart = cart => ({type: SET_CART, cart})
/**
 * THUNK CREATORS
 */

export const fetchCart = () => async dispatch => {
  try {
    const response = await axios.get('/api/cart')
    const action = setCart(response.data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const addOrUpdateProduct = (productId, orderQty) => async dispatch => {
  try {
    const response = await axios.put(`/api/cart`, {productId, orderQty})
    const action = setProduct(response.data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case SET_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    case ADD_PRODUCT:
      if (!state[action.product.title]) {
        const newProduct = {...action.product}
        newProduct.quantity = 1
        return {...state, [newProduct.title]: newProduct}
      } else {
        const updatedProduct = {...state[action.product.title]}
        updatedProduct.quantity++
        return {...state, [action.product.title]: updatedProduct}
      }
    case INCREASE_QTY:
      const productToIncrease = {...state[action.productName]}
      productToIncrease.quantity++
      return {...state, [action.productName]: productToIncrease}
    case REMOVE_PRODUCT:
      const updatedCart = {...state}
      delete updatedCart[action.productName]
      return updatedCart
    case DECREASE_QTY:
      const productToDecrease = {...state[action.productName]}
      if (productToDecrease.quantity > 1) {
        productToDecrease.quantity--
        return {...state, [action.productName]: productToDecrease}
      } else {
        const newCart = {...state}
        delete newCart[action.productName]
        return newCart
      }
    default:
      return state
  }
}
