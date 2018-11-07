import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'

/**
 * INITIAL STATE
 */
const defaultState = []

/**
 * ACTION CREATORS
 */
const gotOrders = orders => ({type: GOT_ORDERS, orders})
/**
 * THUNK CREATORS
 */

export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/orderHistory')
    dispatch(gotOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return state
  }
}
