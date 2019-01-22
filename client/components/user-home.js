import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {fetchCart} from '../store/cart'
import OrderHistory from './orderHistory'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>

      <div id='logout'>
        <a href="#" onClick={props.handleClick}>
          Logout
        </a>
      </div>
      <OrderHistory />
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
      dispatch(logout()).then(() => dispatch(fetchCart()))
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
