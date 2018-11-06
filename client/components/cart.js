import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {addOrUpdateProduct, removeProduct, prodTotal} from '../store/cart'


class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)
  }

  handleRemove(productId) {
    this.props.removeProduct(productId)
    
    if(prodTotal>0){
      document.getElementById('cart').innerHTML = `Cart: ${prodTotal}`
    }else{
      document.getElementById('cart').innerHTML = `Cart`
    }
  }

  handleQtyChange(productId, newQty) {
    if (newQty < 1) this.props.removeProduct(productId)
    else this.props.updateProduct(productId, newQty)
    
    document.getElementById('cart').innerHTML = `Cart: ${prodTotal}`
  }

  render() {
    const cartProducts = this.props.cart.products || []
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
              {cartProducts.map(product => {
                const orderQty = product.orderQty.quantity
                total += product.price * orderQty
  
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
                        onClick={() => this.handleQtyChange(product.id, orderQty - 1)}
                      >
                        -
                      </button>
                      <li className="centertbody">orderQty</li>
                      <button
                        type="button"
                        onClick={() => this.handleQtyChange(product.id, orderQty + 1)}
                      >
                        +
                      </button>
                      </div>
                    </td>
                    <td className="centertbody">${(product.price * orderQty).toFixed(2)}</td>
                    <td className="centertbody" id="remove">
                    <button type="button" onClick={() => this.handleRemove(product.id)}>
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
    removeProduct: productId => dispatch(removeProduct(productId)),
    updateProduct: (productId, qty) =>
      dispatch(addOrUpdateProduct(productId, qty))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
