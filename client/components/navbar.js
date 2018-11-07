import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class Navbar extends Component {
  render() {
    return (
      <div id="NavBar">
        <div id="title">
          <Link to="/">
            <h1>Hopper</h1>
          </Link>
        </div>
        <nav id="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/myAccount">
            {this.props.isLoggedIn ? 'My Account' : 'Login / Sign up'}
          </Link>
          <Link to="/cart" id="cart">
            {this.props.cartQty <= 0 ? 'Cart' : `Cart: ${this.props.cartQty}`}
          </Link>
        </nav>
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

export default connect(mapStateToProps)(Navbar)
