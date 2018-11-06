import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchCategories} from '../store/products'
import {addProduct} from '../store/cart'

class Shop extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.formRef = 1

    this.state = {
      filteredProducts: []
    }
  }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  handleChange(event) {
    let filteredProducts = []
    this.props.products.map(product =>
      product.categories.map(
        category =>
          category.name === event.target.value
            ? filteredProducts.push(product)
            : null
      )
    )
    this.setState({filteredProducts: filteredProducts})
  }

  handleClear() {
    this.setState({filteredProducts: []})
  }

  handleAddToCart(event, productId) {
    event.preventDefault()
    this.props.addProduct(productId, event.target.orderQty.value)
    this.formRef.reset()
    event.target.orderQty.value = '1'
  }

  render() {
    let currentProduct = []
    this.state.filteredProducts.length > 0
      ? (currentProduct = this.state.filteredProducts)
      : (currentProduct = this.props.products)
    const availableOrderQty = [...Array(11).keys()].slice(1)

    return (
      <div className="allProductsPage">
        <div className="categoryFilters">
          <select onChange={this.handleChange}>
            <option>All</option>
            {this.props.categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="box">
            <h1>Need a custom order?</h1>
            <a href="mailto:customerservicer@hopper.com">Contact us!</a>
          </div>
        </div>
        <div className="products">
          {currentProduct.map(product => (
            <div key={product.id}>
              <figure className="product">
                <div className="spacing">
                  <div className="product-figure">
                    <Link to={`/shop/${product.id}`}>{product.title}</Link>
                  </div>

                  <img
                    src={product.imageURL}
                    alt={product.title}
                    width="300px"
                    height="300px"
                  />

                  <div className="checkout">
                    <li>${product.price.toFixed(2)}</li>
                    <form
                      onSubmit={event =>
                        this.handleAddToCart(event, product.id)
                      }
                      ref={ref => {
                        this.formRef = ref
                      }}
                    >
                      <label>
                        Quantity:&nbsp;
                        <select
                          className="qtyFilter"
                          label="Quantity"
                          name="orderQty"
                        >
                          {availableOrderQty.map(num => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button type="submit" name={product.title}>
                        Add To Cart
                      </button>
                    </form>
                  </div>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    categories: state.products.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    addProduct: productId => dispatch(addProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
