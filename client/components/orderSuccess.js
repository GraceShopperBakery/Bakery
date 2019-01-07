import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class OrderSuccess extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div className="cartError">
        <h1>Payment Successful</h1>
        <div className="error">Thank you for shopping with us!</div>
        <button className="return" type="button">
          <Link to="/shop">Browse Products</Link>
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart() {
      dispatch(fetchCart())
    }
  }
}

export default connect(null, mapDispatchToProps)(OrderSuccess)
