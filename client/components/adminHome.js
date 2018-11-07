import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {connect} from 'react-redux'

const AdminHome = props => {
  return (
    <div className="adminHome">
      <table className="adminTable">
        <thead>
          <tr>
            <th id='head'>Welcome to your Hopper Admin Dashboard</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to="/admin/addProduct">Add Product</Link>
            </td>
            <td>Add a brand new product to the Hopper menu</td>
          </tr>

          <tr>
            <td>
              <Link to="/admin/updateProduct">Update Product</Link>
            </td>
            <td>Update an existing product</td>
          </tr>

          <tr>
            <td>
              <Link to="/admin/users">User Management</Link>
            </td>
            <td>
              View all users, add a new user, update an existing user to have
              admin priviledges, or remove a user
            </td>
          </tr>

          <tr>
            <td>
              <Link to="/admin/orders">Order Management</Link>
            </td>
            <td>View current and past orders</td>
          </tr>
        </tbody>
      </table>
      <a href="#" onClick={props.handleClick}>
        Logout
      </a>
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