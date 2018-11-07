import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CheckoutForm from './checkoutForm'
import CheckoutForStripe from './stripeCheckout'

class Checkout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <CheckoutForm />
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
