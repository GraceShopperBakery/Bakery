import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers, deleteUser, fetchAdmin} from '../store/users'

class Users extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   users: this.props.users
    // }
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
    console.log('USER ID', userId)
    this.props.makeAdmin(userId)
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

            <div className="form-group">
              <label htmlFor="isAdmin"> Make admin </label>
              <input
                name="isAdmin"
                type="radio"
                className="input"
                value="true"
                onClick={event => this.handleAdmin(event, user.id)}
              />
            </div>
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
