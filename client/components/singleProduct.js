import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../store/products'
import { addOrUpdateProduct } from '../store/cart'
class SingleProduct extends Component {

  // constructor(props) { 
  //   super(props)
  //   // this.handleAddToCart = this.handleAddToCart.bind(this)
  // }

  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.fetchProduct(id)
  }


  handleAddToCart(event) {
    event.preventDefault()
    if (event.target.orderQty.value) {
      let productOrderQty = Number(event.target.orderQty.value)
      let productInCart = this.props.cart.products.find(
        product => product.id === this.props.product.id
      )
      if (productInCart) {
        productOrderQty += productInCart.orderQty.quantity
      }
      this.props.addProduct(this.props.product.id, productOrderQty, this.props.product.price)
      event.target.orderQty.value = null
    }
  }
  
  render() {
    const product = this.props.product;
    const availableOrderQty = [...Array(11).keys()].slice(1)

    return (
      product === {} ?
        <div id="invalid">
          <h1>This product does not exist.</h1>
        </div>
        :
        <div>
          <div className="shop">
            <h2>{product.title}</h2>
            <div className='product-info'>
              <img src={product.imageURL} alt={product.title} width="200px" height="200px" />
              <div className="product-description">
                <p>{product.description}</p>
                <div className="product-price-checkout">
                  <li>Price: ${product.price}</li>
                  <div>
                    <form
                      className="checkout"
                      onSubmit={event =>
                        this.handleAddToCart(event)
                      }
                    >
                      <div className="quantity">
                        <button
                          className="addToCart"
                          type="submit"
                          name={product.title}
                        >
                          Add To Cart
                        </button>
                        <label>
                          Qty:&nbsp;
                          <select
                            className="qtyFilter"
                            label="Quantity"
                            name="orderQty"
                          >
                            <option value={null} />
                            {availableOrderQty.map(num => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          <h2 id="end">&nbsp;</h2>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.product,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    addProduct: (productId, qty, price) =>
      dispatch(addOrUpdateProduct(productId, qty, price))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)