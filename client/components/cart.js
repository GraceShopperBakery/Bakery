import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  addOrUpdateProduct,
  removeProduct,
  increaseQty,
  decreaseQty
} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleIncreaseQty = this.handleIncreaseQty.bind(this)
    this.handleDecreaseQty = this.handleDecreaseQty.bind(this)
  }

  handleRemove(productName) {
    this.props.removeProduct(productName)
  }

  handleQtyChange(productId, newQty) {
    this.props.updateProduct(productId, newQty)
  }

  handleAddToCart(event, productId) {
    event.preventDefault()
    this.props.addProduct(productId, Number(event.target.orderQty.value))
    event.target.orderQty.value = '1'
  }

  handleIncreaseQty(productName) {
    this.props.increaseQty(productName)
  }

  handleDecreaseQty(productName) {
    this.props.decreaseQty(productName)
  }

  render() {
    const cartProducts = this.props.cart.products || []
    let total = 0
    console.log('***cartProducts', cartProducts)
    return cartProducts.length < 1 ? (
      <div>Loading Cart</div>
    ) : (
      <div>
        {cartProducts.map(product => {
          let orderQty = product.orderqty.quantity
          total += product.price * orderQty

          return (
            <div key={product.id}>
              <Link to={`/products/{product.id}`}>
                <li>Product: {product.title}</li>
              </Link>
              <li>Price per unit: {product.price}</li>
              <div>
                <li>Quantity: {orderQty}</li>
                <button
                  type="button"
                  onClick={() => this.handleQtyChange(product.id, orderQty + 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => this.handleQtyChange(product.id, orderQty - 1)}
                >
                  -
                </button>
              </div>
              <li>Subtotal: {(product.price * orderQty).toFixed(2)}</li>
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
    updateProduct: (productId, qty) =>
      dispatch(addOrUpdateProduct(productId, qty)),
    increaseQty: productName => dispatch(increaseQty(productName)),
    decreaseQty: productName => dispatch(decreaseQty(productName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
