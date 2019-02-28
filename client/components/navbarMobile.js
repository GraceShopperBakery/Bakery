import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class NavbarMobile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState(state => ({expanded: !state.expanded}))
  }

  
  render() {
    return (
      <div id="NavbarMobile" >
        <div id="mainNav">
          {this.state.expanded ? <img onClick={this.toggleMenu} src="/images/closeIcon.png" id="menuIcon" alt="close menu icon" /> : <img onClick={this.toggleMenu} src="/images/menuIcon.png" id="menuIcon" alt="menu icon" />}  
          <div className="title">
            <Link to="/">
              <h1>Hopper</h1>
            </Link>
          </div>
          <Link to="/cart" id="cartIconContainer">
            <img id="cartIcon" src="/images/cart.png" alt="cart icon" />
            {this.props.cartQty > 0 ? <div id="cartAmount">{this.props.cartQty}</div> : null}
          </Link>
        </div>
        <div onClick={this.toggleMenu} hidden={this.state.expanded ? false : true} id="expandedMenu" >
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
