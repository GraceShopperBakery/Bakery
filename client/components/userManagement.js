import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser, makeAdmin} from '../store/users'
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
  }

  handleChange(event) {
    const property = event.target.name
    let value = event.target.value
    if (event.target.name === 'isAdmin') {
      event.target.value = true
    }
    this.setState({[property]: value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.postUser(this.state)
    // to clear form:
    this.setState({
      email: '',
      password: '',
      isAdmin: false
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
            <input name="isAdmin" type="radio" className="input" value="true" />
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
    postUser: user => dispatch(postUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
