import axios from 'axios'

// ACTION TYPES

const GOT_USER = 'GOT_USER'

// INITIAL STATE
const initialState = {
  users: []
}

// ACTION CREATORS
// going to get this user arg. passed in through event handler
// const addUser = user => ({type: ADD_USER, user})
const gotUser = user => ({type: GOT_USER, user})

// THUNK CREATORS
export const postUser = user => async dispatch => {
  try {
    const response = await axios.post('/api/users', user)
    const newUser = response.data
    const action = gotUser(newUser)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return {...state, users: [...state.users, action.user]}
    default:
      return state
  }
}
