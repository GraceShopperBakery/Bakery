import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = (props) => (
  <div>
    <h1>Grace's Cakes</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/myAccount">My Account</Link>
      
    </nav>
    <hr />
  </div>
)

export default Navbar


