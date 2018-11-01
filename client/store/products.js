import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GOT_NEW_PRODUCT_FROM_SERVER = 'GOT_NEW_PRODUCT_FROM_SERVER'
const WRITE_PRODUCT = "WRITE_PRODUCT"
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  newProduct: {},
  categories: []
}


/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products })
export const writeProduct = inputContent => ({ type: WRITE_PRODUCT, newProduct: inputContent })
const gotNewProductFromServer = product => ({ type: GOT_NEW_PRODUCT_FROM_SERVER, product})
const getCategories = categories => ({type: GET_CATEGORIES, categories })

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

export const fetchCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/categories')
    dispatch(getCategories(res.data))
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
    case GET_CATEGORIES:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}
