import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class NavbarMobile extends Component {
  render() {
    return (
      <div id="NavbarMobile">
        <div id="mainNav">
          {/* <nav id="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/myAccount">
            {this.props.isLoggedIn ? 'My Account' : 'Login / Sign up'}
          </Link>
          <Link to="/cart" id="cart">
            {this.props.cartQty <= 0 ? 'Cart' : `Cart: ${this.props.cartQty}`}
          </Link>
        </nav> */}
          <img src="/images/menuIcon.png" id="menuIcon" alt="menu icon" />
          <div className="title">
            <Link to="/">
              <h1>Hopper</h1>
            </Link>
          </div>
          <Link to="/cart" id="cartIcon">
            <img src="/images/cart.png" alt="cart icon" />
          </Link>
        </div>
        {this.props.cartQty > 0 ? <span id="cartAmount">{this.props.cartQty}</span> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartQty: state.cart.qty
  }
}

export default connect(mapStateToProps)(NavbarMobile)
