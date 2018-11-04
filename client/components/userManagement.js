// import { addUser } from '../store/user'

import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  // handleChange(event) {}

  // handleSubmit(event) {
  //   event.preventDefault()
  // }

  render() {
    return (
      // <div className="adminManageUsers">
      //   <form
      //     className="form"
      //     // onChange={this.handleChange}
      //     // onSubmit={this.handleSubmit}
      //   >
      //     <h3>Add a user</h3>
      //     <div className="form-group">
      //       <label htmlFor="email">Email *</label>
      //       <div className="form-control">
      //         <input name="email" type="text" className="input" required />
      //       </div>
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="password">Password *</label>
      //       <div className="form-control">
      //         <input name="password" type="text" className="input" required />
      //       </div>
      //     </div>
      //     {/* <div className="form-group">
      //       <label htmlFor="isAdmin">Make admin? *</label>
      //       <div className="form-control">
      //         <input name="isAdmin" type="radio" className="input" />
      //       </div>
      //       <div className="form-control">
      //         <input name="isAdmin" type="radio" className="input" />
      //       </div>
      //     </div> */}
      //   </form>
      // </div>
      <div>hi there</div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     //newUser: state.users.newUser
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     //addUser: user => dispatch(addUser(user))
//   }
// }

//export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)

export default UserManagement
