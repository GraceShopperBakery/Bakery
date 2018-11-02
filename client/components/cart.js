import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeProduct, increaseQty, decreaseQty} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleIncreaseQty = this.handleIncreaseQty.bind(this)
    this.handleDecreaseQty = this.handleDecreaseQty.bind(this)
  }

  handleRemove(productName) {
    this.props.removeProduct(productName)
  }

  handleIncreaseQty(productName) {
    this.props.increaseQty(productName)
  }

  handleDecreaseQty(productName) {
    this.props.decreaseQty(productName)
  }

  render() {
    const cartProducts = Object.keys(this.props.cart)
    console.log('this.props.cart', this.props.cart)
    let total = 0

    return (
      <div>
        {cartProducts.map(productName => {
          const product = this.props.cart[productName]
          total += product.price * product.quantity

          return (
            <div key={product.id}>
              <Link to={`/products/{product.id}`}>
                <li>Product: {product.title}</li>
              </Link>
              <li>Price per unit: {product.price}</li>
              <div>
                <li>Quantity: {product.quantity}</li>
                <button
                  type="button"
                  onClick={() => this.handleIncreaseQty(product.title)}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => this.handleDecreaseQty(product.title)}
                >
                  -
                </button>
              </div>
              <li>Subtotal: {(product.price * product.quantity).toFixed(2)}</li>
              <button
                type="button"
                onClick={() => this.handleRemove(product.title)}
              >
                Remove
              </button>
            </div>
          )
        })}
        <div>Total: {total.toFixed(2)}</div>
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
  return {
    removeProduct: productName => dispatch(removeProduct(productName)),
    increaseQty: productName => dispatch(increaseQty(productName)),
    decreaseQty: productName => dispatch(decreaseQty(productName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
