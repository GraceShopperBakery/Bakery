import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link, Redirect} from 'react-router-dom'
import AuthForm, {Login, Signup} from './auth-form'

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
            <tbody>
              <tr>
                <h3>First time hare... I mean here?</h3>
              </tr>
              <td>
                <Signup />
              </td>
            </tbody>

            <tbody>
              <tr>
                <h3>Already have an account?</h3>
              </tr>
              <td>
                <Login />
              </td>
            </tbody>
          </div>
        </div>
      )}
    </div>
  )
}

{
  /* <Link to="/signup">Sign Up</Link>
<Link to="/login">Login</Link> */
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
      dispatch(logout())
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
