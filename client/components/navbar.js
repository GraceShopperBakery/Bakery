import React from 'react'
import {Link, Redirect} from 'react-router-dom'


const Navbar = (props) => (
  <div id="NavBar">
    <div id="title">
      <h1>Hopper</h1>
    </div>
    <nav id="links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/myAccount">My Account</Link>
      <Link to="/cart">Cart</Link>  
    </nav>
    <hr />
  </div>
)

export default Navbar


