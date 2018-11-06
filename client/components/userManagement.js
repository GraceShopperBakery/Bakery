import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser, updateUser} from '../store/users'
import Users from './users'

class UserManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isAdmin: false
    }
    this.handleMakeAdmin = this.handleMakeAdmin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if (event.target.isAdmin === 'true') {
      console.log('ADMIN IS TRUE STRING')
    }
    const property = event.target.name
    let value = event.target.value
    console.log('is admin value IN HANDLE CHANGE', event.target.isAdmin)
    this.setState({[property]: value})
  }

  handleMakeAdmin(event) {
    const user = {
      email: this.state.email,
      password: this.state.password,
      isAdmin: true
    }
    //this.props.makeAdmin(user)
  }
  async handleSubmit(event) {
    event.preventDefault()
    await this.props.postUser(this.state)
    this.setState({
      email: '',
      password: ''
      //isAdmin
    })
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
          <div className="form-group">
            <label htmlFor="isAdmin"> Make admin </label>
            <input
              name="isAdmin"
              type="radio"
              className="input"
              value="true"
              onClick={event => this.handleMakeAdmin(event)}
            />
          </div>

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
    postUser: user => dispatch(postUser(user)),
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
