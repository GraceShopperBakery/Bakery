import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = props => (
  <div>
    <h1>Grace's Cakes</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/myAccount">My Account</Link>
      <Link to="/cart">Cart</Link>
      <ToastContainer />
    </nav>
    <hr />
  </div>
)

export default Navbar

// add original biolerplate mapToState part
