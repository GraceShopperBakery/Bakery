import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import STRIPE_PUBLISHABLE from '../constants/stripe'
import PAYMENT_SERVER_URL from '../constants/server'
import history from '../history'
import {resetCart} from '../store/cart'
import {connect} from 'react-redux'

const CURRENCY = 'USD'
const fromDollarToCent = amount => amount * 100

class Checkout extends React.Component {
  successPayment = data => {
    history.push('/orderSuccess')
    this.props.resetCart()
  }

  errorPayment = data => {
    alert('Payment Error')
  }

  onToken = (amount, description) => token => {
    axios
      .post(PAYMENT_SERVER_URL, {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromDollarToCent(amount)
      })
      .then(this.successPayment)
      .catch(this.errorPayment)
  }

  render() {
    return (
      <StripeCheckout
        name={this.props.name}
        description={this.props.description}
        amount={fromDollarToCent(this.props.amount)}
        token={this.onToken(this.props.amount, this.props.description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetCart: () => dispatch(resetCart())
  }
}

export default connect(null, mapDispatchToProps)(Checkout)
