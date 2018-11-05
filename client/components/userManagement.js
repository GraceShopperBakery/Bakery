import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser, addUser, updateUser} from '../store/users'
import Users from './users'

class UserManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isAdmin: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMakeAdmin = this.handleMakeAdmin.bind(this)
  }

  handleChange(event) {
    const property = event.target.name
    let value = event.target.value
    this.setState({[property]: value})
  }

  handleMakeAdmin() {
    this.props.updateUser(user, id)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.postUser(this.state)
    this.props.addUser(this.state)
  }

  render() {
    return (
      <div className="adminManageUsers">
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h3>Add a user</h3>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <div className="form-control">
              <input name="email" type="text" className="input" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div className="form-control">
              <input name="password" type="text" className="input" required />
            </div>
          </div>
          <button type="button" onClick={this.handleMakeAdmin}>
            Make admin
          </button>
          <div className="required">
            All fields marked with a * are required.
          </div>
          <button id="button" type="submit">
            Submit
          </button>
        </form>
        <div className="users" />
        <br />
        <Users />
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
    addUser: user => dispatch(addUser(user)),
    postUser: user => dispatch(postUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
