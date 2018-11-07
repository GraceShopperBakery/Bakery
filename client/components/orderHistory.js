import React, {Component} from 'react'
import {connect} from 'react-redux'
import Order from './order'
import {fetchOrders} from '../store/orderHistory'

class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    return (
      <div>
        <h1>Order History</h1>
        <div>
          {this.props.orderHistory.map(order => (
            <Order order={order} key={order.id} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderHistory: state.orderHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
