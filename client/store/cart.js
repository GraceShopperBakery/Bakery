import axios from 'axios'

/**
 * ACTION TYPES
 */
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */

const defaultCart = {
  id: null,
  isCart: true,
  email: null,
  addressline1: null,
  addressline2: null,
  city: null,
  state: null,
  zip: null,
  finalTotal: 0,
  qty: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  userId: null,
  products: []
}

/**
 * ACTION CREATORS
 */

const deleteProduct = (productId, qtyToRemove) => ({
  type: REMOVE_PRODUCT,
  productId,
  qtyToRemove
})

export const setCart = cart => {
  console.log('NEW CART TO BE SET', cart)
  return {type: SET_CART, cart}
}
/**
 * THUNK CREATORS
 */

export const fetchCart = () => async dispatch => {
  try {
    const response = await axios.get('/api/cart')
    const cart = response.data
    const action = setCart(cart)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const updateCart = async formData => {
  try {
    await axios.put('/api/cart/payment', formData)
  } catch (err) {
    console.log(err)
  }
}

export const resetCart = () => async dispatch => {
  try {
    console.log('defaultCart', defaultCart)
    const action = setCart(defaultCart)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const addOrUpdateProduct = (
  productId,
  orderQty,
  productPrice
) => async dispatch => {
  try {
    await axios.put(`/api/cart`, {productId, orderQty, productPrice})
    dispatch(fetchCart())
  } catch (err) {
    console.log(err)
  }
}

export const removeProduct = (productId, qtyToRemove) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${productId}`)
    dispatch(deleteProduct(productId, qtyToRemove))
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
    case REMOVE_PRODUCT:
      return {
        ...state,
        qty: state.qty - action.qtyToRemove,
        products: [
          ...state.products.filter(product => product.id !== action.productId)
        ]
      }
    default:
      return state
  }
}
