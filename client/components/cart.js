import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends Component {
  render() {
    const cartProducts = Object.keys(this.props.cart)
    let total = 0
    return (
      <div>
        {cartProducts.map(productName => {
          const product = this.props.cart[productName]
          total += product.price * product.quantity
          return (
            <div key={product.id}>
              <li>Product: {product.title}</li>
              <li>Price per unit: {product.price}</li>
              <li>Quantity: {product.quantity}</li>
              <li>Subtotal: {product.price * product.quantity}</li>
            </div>
          )
        })}
        <div>Total: {total}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
