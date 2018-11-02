import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const WRITE_PRODUCT = 'WRITE_PRODUCT'
const GOT_NEW_PRODUCT_FROM_SERVER = 'GOT_NEW_PRODUCT_FROM_SERVER'
const SET_PRODUCT = 'SET_PRODUCT'
const ADMIN_UPDATE_PRODUCT = 'ADMIN_UPDATE_PRODUCT'
const GET_PRODUCT = 'GET_PRODUCT'
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  product: {},
  updateProduct: {},
  newProduct: {},
  categories: []
}


/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products })
const getProduct = product => ({ type: GET_PRODUCT, product: product })
export const writeProduct = inputContent => ({ type: WRITE_PRODUCT, newProduct: inputContent })
const gotNewProductFromServer = product => ({ type: GOT_NEW_PRODUCT_FROM_SERVER, product})
export const setProduct = currentContent => ({ type: SET_PRODUCT, currentContent})
export const adminUpdateProduct = updateProduct => ({ type: ADMIN_UPDATE_PRODUCT, updateProduct})

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

export const fetchProduct = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getProduct(res.data))
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

export const updateProduct = (id, product) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, product)
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
    case GET_PRODUCT:
      return { ...state, product: action.product }
    case WRITE_PRODUCT:
      return { ...state, newProduct: action.newProduct }
    case GOT_NEW_PRODUCT_FROM_SERVER:
      return { ...state, products: [ ...state.products, action.product]}
    case SET_PRODUCT:
      return { ...state, updateProduct: action.updateProduct}
    case ADMIN_UPDATE_PRODUCT:
      return { ...state, updateProduct: action.updateProduct}
    case GET_CATEGORIES:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}
