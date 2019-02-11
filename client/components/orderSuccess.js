import React from 'react'
import {Link} from 'react-router-dom'

const OrderSuccess = props => {
  return (
    <div className="cartError">
      <h1>Payment Successful</h1>
      <div className="error">Thank you for shopping with us!</div>
      <button className="return" type="button">
        <Link to="/shop">Browse<br />Products</Link>
      </button>
    </div>
  )
}

export default OrderSuccess
