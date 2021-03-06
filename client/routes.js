import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Home,
  About,
  Shop,
  MyAccount,
  Cart,
  AdminHome,
  SingleProduct,
  AddProduct,
  UpdateProduct,
  UserManagement,
  Checkout,
  OrderSuccess
} from './components'
import {me} from './store'
import {fetchCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchCart()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/shop/:productId" component={SingleProduct} />
        <Route exact path="/shop" component={Shop} />
        <Route path="/myAccount" component={MyAccount} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderSuccess" component={OrderSuccess} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route path="/home" component={UserHome} />
            {isAdmin && (
              <Switch>
                {/* Routes placed here are only available to admin after logging in */}

                <Route path="/admin/addProduct" component={AddProduct} />
                <Route path="/admin/updateProduct" component={UpdateProduct} />
                <Route path="/admin/users" component={UserManagement} />
                <Route path="/admin" component={AdminHome} />
              </Switch>
            )}
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchCart() {
      dispatch(fetchCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
