import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Redirect} from 'react-router-dom'
import {fetchCart} from '../store/cart'
import {Login, Signup} from './auth-form'

const MyAccount = ({handleClick, isLoggedIn, isAdmin}) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {isAdmin ? (
            <Redirect to="/admin">Home</Redirect>
          ) : (
            <Redirect to="/home">Home</Redirect>
          )}
        </div>
      ) : (
        <div>
          <div id="myAccount">
            <div id= 'loginContainer'>
              <li id="loginhead">
                First time hare... I mean here?
              </li>
              <li>
                <Signup />
              </li>
            </div>

            <div id= 'loginContainer'>
              <li id="loginhead">
                Already have an account?
              </li>
              <li>
                <Login />
              </li>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout()).then(() => dispatch(fetchCart()))
    }
  }
}

/**
 * PROP TYPES
 */
MyAccount.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

export default connect(mapState, mapDispatch)(MyAccount)
