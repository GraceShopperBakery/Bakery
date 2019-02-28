import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store/user'
import {fetchCart} from '../store/cart'
import OrderHistory from './orderHistory'

/**
 * COMPONENT
 */
export const UserHome = props => {

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

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout()).then(() => dispatch(fetchCart()))
    }
  }
}

export default connect(null, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
