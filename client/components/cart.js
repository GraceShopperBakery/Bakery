import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {addOrUpdateProduct, removeProduct} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)
  }

  handleRemove(productId, qtyToRemove) {
    this.props.removeProduct(productId, qtyToRemove)
  }

  handleQtyChange(productId, newQty, price, qtyToRemove) {
    if (newQty < 1) this.props.removeProduct(productId, qtyToRemove)
    else this.props.updateProduct(productId, newQty, price)
  }

  render() {
    const cartProducts = this.props.cart.products || []
    let total = 0
    if (cartProducts.length === 0) {
      return (
        <div className="cartError cart">
          <h1>CART</h1>
          <div className="error">
            Your cart does not contain any products&nbsp;yet.
          </div>
          <button className="return" type="button">
            <Link to="/shop">Browse<br />Products</Link>
          </button>
        </div>
      )
    } else {
      return (
        <div className="cart">
          <h1>CART</h1>
          <div className="orderContainer">
            <table className="orderTable">
              <thead>
                <tr>
                  <th className="center" />
                  <th className="productTitle">Product</th>
                  <th className="center">Price</th>
                  <th className="center">Quantity</th>
                  <th className="center">Subtotal</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cartProducts.map(product => {
                  const orderQty = product.orderQty.quantity
                  total += product.price * orderQty

                  return (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.imageURL}
                          height="150px"
                          width="150px"
                        />
                      </td>
                      <td id="productTitle">
                        <Link to={`/products/{product.id}`}>
                          {product.title}
                        </Link>
                      </td>
                      <td className="centertbody">
                        ${product.price.toFixed(2)}
                      </td>
                      <td id="quantity" className="center">
                        <div id="quantityIncrease">
                          <button
                            type="button"
                            onClick={() =>
                              this.handleQtyChange(
                                product.id,
                                orderQty - 1,
                                product.price,
                                orderQty
                              )
                            }
                          >
                            -
                          </button>
                          <li className="centertbody">{orderQty}</li>
                          <button
                            type="button"
                            onClick={() =>
                              this.handleQtyChange(
                                product.id,
                                orderQty + 1,
                                product.price
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="centertbody">
                        ${(product.price * orderQty).toFixed(2)}
                      </td>
                      <td className="centertbody" id="remove">
                        <button
                          type="button"
                          onClick={() =>
                            this.handleRemove(product.id, orderQty)
                          }
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="total">
              <h1>Total: ${total.toFixed(2)}</h1>
              <Link to="/checkout">
                <button type="button">CHECKOUT</button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeProduct: (productId, qtyToRemove) =>
      dispatch(removeProduct(productId, qtyToRemove)),
    updateProduct: (productId, qty, price) =>
      dispatch(addOrUpdateProduct(productId, qty, price))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
