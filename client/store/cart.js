import axios from 'axios'

/**
 * ACTION TYPES
 */
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */

const defaultCart = {}

/**
 * ACTION CREATORS
 */

const deleteProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

export const setCart = cart => ({type: SET_CART, cart})
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

export const updateCart = formData => async dispatch => {
  try {
    await axios.put('/api/cart/payment', formData)
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

export const removeProduct = productId => async dispatch => {
  try {
    await axios.delete(`/api/cart/${productId}`)
    dispatch(deleteProduct(productId))
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
        products: [
          ...state.products.filter(product => product.id !== action.productId)
        ]
      }
    default:
      return state
  }
}
