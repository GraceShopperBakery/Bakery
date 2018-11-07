import React from 'react'
import {Link} from 'react-router-dom'

const Order = props => {
  const products = props.order.products

  return (
    <div className="orderContainer">
      <div>Order Id: {props.order.id}</div>
      <div>Order Total: {props.order.finalTotal}</div>
      <table className="orderTable">
        <thead>
          <tr>
            <th className="center" />
            <th className="productTitle">Product</th>
            <th className="center">Price</th>
            <th className="center">Quantity</th>
            <th className="center">Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const orderQty = product.orderQty.quantity
            const price = product.orderQty.priceWhenOrdered

            return (
              <tr key={product.id}>
                <td>
                  <img src={product.imageURL} height="150px" width="150px" />
                </td>
                <td id="productTitle">
                  <Link to={`/products/{product.id}`}>{product.title}</Link>
                </td>
                <td className="centertbody">${price.toFixed(2)}</td>
                <td id="quantity" className="center">
                  <div id="quantityIncrease">
                    <li className="centertbody">{orderQty}</li>
                  </div>
                </td>
                <td className="centertbody">
                  ${(price * orderQty).toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Order
