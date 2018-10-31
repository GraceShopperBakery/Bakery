import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>

      <div>
      <a href="#" onClick={props.handleClick}>
        Logout
      </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
