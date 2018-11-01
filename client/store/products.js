import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const WRITE_PRODUCT = 'WRITE_PRODUCT'
const GOT_NEW_PRODUCT_FROM_SERVER = 'GOT_NEW_PRODUCT_FROM_SERVER'
const ADMIN_UPDATE_PRODUCT = 'ADMIN_UPDATE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  newProduct: {},
  product: {},
}


/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products })
export const writeProduct = inputContent => ({ type: WRITE_PRODUCT, newProduct: inputContent })
const gotNewProductFromServer = product => ({ type: GOT_NEW_PRODUCT_FROM_SERVER, product})
export const adminUpdateProduct = product => ({ type: ADMIN_UPDATE_PRODUCT, product})


/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const postProduct = product => async dispatch => { 
  try { 
    const response = await axios.post('/api/products', product)
    const newProduct = response.data
    const action = gotNewProductFromServer(newProduct)
    dispatch(action)
  } catch (err) { 
    console.log(err)
  }
}

export const updateProduct = (productId, product) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products${productId}`, product)
    dispatch(adminUpdateProduct(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case WRITE_PRODUCT:
      return { ...state, newProduct: action.newProduct }
    case GOT_NEW_PRODUCT_FROM_SERVER:
      return { ...state, products: [ ...state.products, action.product]}
    case ADMIN_UPDATE_PRODUCT:
      return { ...state, product: action.product}
    default:
      return state
  }
}
