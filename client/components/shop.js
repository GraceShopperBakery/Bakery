import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchCategories} from '../store/products'
import {addProduct} from '../store/cart'
import {toast} from 'react-toastify'

class Shop extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)

    this.state = {
      filteredProducts: []
    }
  }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }
  notify = () => {
    toast('Default Notification !')
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

  handleAddToCart(event) {
    const productToAdd = this.props.products.find(
      product => product.title === event.target.name
    )
    this.props.addProduct(productToAdd)
  }

  render() {
    let currentProduct = []
    this.state.filteredProducts.length > 0
      ? (currentProduct = this.state.filteredProducts)
      : (currentProduct = this.props.products)

    return (
      <div className="allProductsPage">
        <div>
          {this.props.categories.map(category => (
            <button
              key={category.id}
              type="button"
              onClick={this.handleChange}
              value={category.name}
            >
              {category.name}
            </button>
          ))}
          <button type="button" value="Clear Filer" onClick={this.handleClear}>
            Clear Filters
          </button>
        </div>
        <div className="products">
          {currentProduct.map(product => (
            <div key={product.id}>
              <figure className="product">
                <div className="product-figure">
                  <Link to={`/shop/${product.id}`}>{product.title}</Link>
                </div>
                <img
                  src={product.imageURL}
                  alt={product.title}
                  width="200px"
                  height="200px"
                />
                <li>Price: ${product.price}</li>
                <button
                  type="button"
                  name={product.title}
                  onClick={this.handleAddToCart}
                >
                  Add To Cart
                </button>
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
    categories: state.products.categories,
    cart: state.cart,
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
