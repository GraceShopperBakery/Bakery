import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Cart extends Component {
  render() { 
    //list of products, quantities and prices
    //total
  }
}

const mapStateToProps = state => { 
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Cart)