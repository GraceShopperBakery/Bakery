import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = props => (
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
      <Link to="/myAccount">My Account</Link>
      <Link to="/cart" id="cart">
        Cart
      </Link>
      <ToastContainer />
    </nav>
  </div>
)

export default Navbar
