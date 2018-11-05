import axios from 'axios'

// ACTION TYPES
const GET_USERS = 'GET_USERS'
//const GOT_USER = 'GOT_USER'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

// INITIAL STATE
const initialState = {
  users: []
}

// ACTION CREATORS
const getUsers = users => ({type: GET_USERS, users})
// * BELOW ACTION CREATOR ISN'T BEING USED - BUT DO WE WANT TO GET NEW USER FROM OUR COMPONENT OR FROM DB - OR EITHER?
//const gotUser = user => ({type: GOT_USER, user})
export const addUser = user => ({type: ADD_USER, user})
export const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})
export const updateUser = (user, id) => {
  type: UPDATE_USER, user, id
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
    // const newUser = response.data
    // const action = gotUser(newUser)
    // dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    // DO WE NEED TO PROMISE CHAIN? ***
    const action = removeUser(userId)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

// to update admin status of user:
export const adminUserUpdate = (id, user) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${id}`, user)
    dispatch(updateUser(data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}
    case ADD_USER:
      return {...state, users: [...state.users, action.user]}
    case REMOVE_USER:
      return {
        ...state,
        users: [...state.users.filter(user => user.id !== action.userId)]
      }
    // const updatedUsers = {...state}
    // const userId = +userId
    // delete updatedUsers.users[action.userId]
    // return updatedUsers
    case UPDATE_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    default:
      return state
  }
}
