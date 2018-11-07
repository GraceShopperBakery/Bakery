import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { connect } from 'react-redux'


const AdminHome = props => {
  return (
    <div>
      <a href="#" onClick={props.handleClick}>
        Logout
      </a>
      <Link to="/admin/addProduct">Products - Add Product</Link>
      <Link to="/admin/updateProduct">Products - Update Product</Link>
      <Link to="/admin/users">User Management</Link>
      <Link to="/admin/orders">Order Management</Link>
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(AdminHome)
