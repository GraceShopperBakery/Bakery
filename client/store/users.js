import axios from 'axios'

// ACTION TYPES
const GET_USERS = 'GET_USERS'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const MAKE_ADMIN = 'MAKE_ADMIN'

// INITIAL STATE
const initialState = []

// ACTION CREATORS
const getUsers = users => ({type: GET_USERS, users})
export const addUser = user => ({type: ADD_USER, user})
export const removeUser = userId => {
  return {
    type: REMOVE_USER,
    userId
  }
}
export const makeAdmin = userId => {
  type: UPDATE_USER, user
}

// THUNK CREATORS

export const fetchUsers = () => async dispatch => {
  try {
    const response = await axios.get('/api/users')
    dispatch(getUsers(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const postUser = user => async dispatch => {
  try {
    const response = await axios.post('/api/users', user)
    const action = addUser(response.data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(removeUser(userId))
  } catch (err) {
    console.log(err)
  }
}

export const fetchAdmin = userId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}`)
    dispatch(makeAdmin(data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case ADD_USER:
      return [...state, action.user]
    case REMOVE_USER: {
      const index = state.findIndex(elem => elem.id === action.userId)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
    case MAKE_ADMIN:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    default:
      return state
  }
}
