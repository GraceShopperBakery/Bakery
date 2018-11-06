import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeProduct, increaseQty, decreaseQty, prodTotal} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleIncreaseQty = this.handleIncreaseQty.bind(this)
    this.handleDecreaseQty = this.handleDecreaseQty.bind(this)
  }

  handleRemove(productName) {
    this.props.removeProduct(productName)
    if(prodTotal>0){
      document.getElementById('cart').innerHTML = `Cart: ${prodTotal}`
    }else{
      document.getElementById('cart').innerHTML = `Cart`
    }
  }

  handleIncreaseQty(productName) {
    this.props.increaseQty(productName)
    document.getElementById('cart').innerHTML = `Cart: ${prodTotal}`
  }

  handleDecreaseQty(productName) {
    this.props.decreaseQty(productName)
    if(prodTotal>0){
      document.getElementById('cart').innerHTML = `Cart: ${prodTotal}`
    }else{
      document.getElementById('cart').innerHTML = `Cart`
    }
  }

  render() {
    const cartProducts = Object.keys(this.props.cart)
    let total = 0

    if (cartProducts.length===0){
      return(
        <div className="cartError">
          <h1>CART</h1>
          <div className ="error">Your cart does not contain any products yet.</div>
          <button className="return" type="button"><Link to="/shop">Browse Products</Link></button>
        </div>
      )
    }else{
      return (
        <div className="cart">
          <h1>CART</h1>
          <div className="orderContainer">
          <table className="orderTable">
            <thead>
              <tr>
                <th className="center"/>
                <th className="productTitle">Product</th>
                <th className="center">Price</th>
                <th className="center">Quantity</th>
                <th className="center">Subtotal</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map(productName => {
                const product = this.props.cart[productName]
                total += product.price * product.quantity
  
                return (
                  <tr key={product.id}>
                    <td><img src={product.imageURL} height="150px" width="150px"/></td>
                    <td id="productTitle">
                      <Link to={`/products/{product.id}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td className="centertbody">${(product.price).toFixed(2)}</td>
                    <td id="quantity" className="center">
                      <div id="quantityIncrease">
                      <button
                        type="button"
                        onClick={() => this.handleDecreaseQty(product.title)}
                      >
                        -
                      </button>
                      <li className="centertbody">{product.quantity}</li>
                      <button
                        type="button"
                        onClick={() => this.handleIncreaseQty(product.title)}
                      >
                        +
                      </button>
                      </div>
                    </td>
                    <td className="centertbody">${(product.price * product.quantity).toFixed(2)}</td>
                    <td className="centertbody" id="remove">
                    <button type="button" onClick={() => this.handleRemove(product.title)}>
                      X
                    </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
          </table>
          <div className="total">
            <h1>Total: {total.toFixed(2)}</h1>
            <button type="button">CHECKOUT</button>
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
    removeProduct: productName => dispatch(removeProduct(productName)),
    increaseQty: productName => dispatch(increaseQty(productName)),
    decreaseQty: productName => dispatch(decreaseQty(productName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
