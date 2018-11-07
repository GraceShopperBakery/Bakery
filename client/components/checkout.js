import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CheckoutForStripe from './stripeCheckout'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: ''
    }
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <form className="form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="form-control">
                  <input
                    name="email"
                    type="email"
                    className="input"
                    value={this.state.email}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1</label>
                <div className="form-control">
                  <input
                    name="addressLine1"
                    type="text"
                    className="input"
                    value={this.state.addressLine1}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2</label>
                <div className="form-control">
                  <input
                    name="addressLine2"
                    type="text"
                    className="input"
                    value={this.state.addressLine2}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <div className="form-control">
                  <input
                    name="city"
                    type="text"
                    className="input"
                    value={this.state.city}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <div className="form-control">
                  <input
                    name="state"
                    type="text"
                    className="input"
                    value={this.state.state}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="zip">Zip</label>
                <div className="form-control">
                  <input
                    name="zip"
                    type="text"
                    className="input"
                    value={this.state.zip}
                  />
                </div>
              </div>
            </form>

            <CheckoutForStripe
              name={'Checkout with Stripe'}
              description={'Payment'}
              amount={1}
            />
          </div>
        ) : (
          <div>
            <div>
              <p>
                If you would like to check out as a user please login or sign
                up:
              </p>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
            <p>Check out as guest:</p>
            <CheckoutForStripe />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps)(Checkout)
