import React, {Component} from 'react'
import {connect} from 'react-redux'
import {users, postUser} from '../store/users'

// addUser will add to front end
// postUser will add to database
// want to render all users ?

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
    this.setState({[property]: value})
    // not adding it to front end for now
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postUser(this.state)
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
            <label htmlFor="isAdmin">Make admin? *</label>

            <label htmlFor="true">Yes</label>
            <input name="isAdmin" type="radio" className="input" id="true" />

            <label htmlFor="false">No</label>
            <input name="isAdmin" type="radio" className="input" id="false" />
          </div>
          <div className="required">
            All fields marked with a * are required.
          </div>
          <button id="button" type="submit">
            Submit
          </button>
        </form>
        <div className="users" />
        {/* add component to render all users? */}
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
