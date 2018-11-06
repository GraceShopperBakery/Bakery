import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers, deleteUser, fetchAdmin} from '../store/users'

class Users extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleAdmin = this.handleAdmin.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleRemove(event, userId) {
    event.preventDefault()
    this.props.deleteUser(userId)
  }

  handleAdmin(event, userId) {
    this.props.fetchAdmin(userId)
  }

  render() {
    const users = this.props.users
    return (
      <div className="allUsersPage">
        <h2>Current users: </h2>
        {users.map(user => (
          <div key={user.id}>
            <h4>{user.email}</h4>
            <button
              type="button"
              onClick={event => this.handleRemove(event, user.id)}
            >
              Remove
            </button>
            <button
              type="button"
              name="isAdmin"
              onClick={event => this.handleAdmin(event, user.id)}
            >
              Make Admin
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: userId => dispatch(deleteUser(userId)),
    fetchAdmin: userId => dispatch(fetchAdmin(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
