import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CheckoutForStripe from './stripeCheckout'
import {updateCart} from '../store/cart'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleClick() {
    this.props.updateCart(this.state)
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div className="checkOutForm">
            <form className="form" onChange={this.handleChange}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="form-control">
                  <input
                    name="email"
                    type="email"
                    className="input"
                    value={this.state.email}
                    required
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

            <div className="stripe" onClick={this.handleClick}>
              <CheckoutForStripe
                name={'Checkout with Stripe'}
                description={'Payment'}
                amount={this.props.cart.finalTotal}
              />
            </div>
          </div>
        ) : (
          <div className="checkOutForm">
            <form className="form" onChange={this.handleChange}>
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
                    required
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

            <div className="stripe" onClick={this.handleClick}>
              <CheckoutForStripe
                name={'Checkout with Stripe'}
                description={'Payment'}
                amount={this.props.cart.finalTotal}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: formData => dispatch(updateCart(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
