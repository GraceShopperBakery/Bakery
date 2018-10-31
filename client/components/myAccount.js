import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Link, Redirect} from 'react-router-dom'

const MyAccount = ({handleClick, isLoggedIn, isAdmin}) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {isAdmin ? <Redirect to="/admin">Home</Redirect> : <Redirect to="/home">Home</Redirect>}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
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
