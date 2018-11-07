import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postUser} from '../store/users'
import Users from './users'

class UserManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isAdmin: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    const name = event.target.name

    this.setState({[name]: value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.postUser(this.state)

    this.setState({
      email: '',
      password: '',
      isAdmin: true
    })
  }

  render() {
    return (
      <div className="adminManageUsers">
        <div>
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h3>Add a user</h3>
          <div className="form-group" >
            <label htmlFor="email">Email *</label>
            <div className="form-control">
              <input
                name="email"
                value={this.state.email}
                type="text"
                className="input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div className="form-control">
              <input
                name="password"
                value={this.state.password}
                type="text"
                className="input"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="isAdmin"> Make admin </label>
            <input
              name="isAdmin"
              type="checkbox"
              className="input"
              checked={this.state.isAdmin}
              defaultChecked
            />
          </div>

          <div className="required">
            All fields marked with a * are required.
          </div>
          <button id="button" type="submit">
            Submit
          </button>
        </form>
        </div>
        <div className="users" >
          <br />
          <Users />
        </div>
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
