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
    // DELETE HANDLE MAKE ADMIN
    this.handleMakeAdmin = this.handleMakeAdmin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleChange(event) {
    if (event.target.name === 'isAdmin') {
      console.log('IN ADMIN ', typeof event.target.value)
      console.log('STATE', this.state)
      // state is coming in with admin false - have to update it in method
      await this.props.makeAdmin(this.state)
    } else {
      const property = event.target.name
      let value = event.target.value
      this.setState({[property]: value})
    }
  }

  handleMakeAdmin(event) {
    const user = {
      email: this.state.email,
      password: this.state.password,
      isAdmin: true
    }
    // this.props.makeAdmin(user)
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
    makeAdmin: user => dispatch(makeAdmin(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
