import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/products'

class SingleProduct extends Component { 

  componentDidMount () {
    let id = this.props.match.params.productId
    this.props.fetchProduct(id)
  }
  
  render() { 
    return (
      this.props.product === {} ?
        <div id="invalid">
            <h1>This product does not exist.</h1>
        </div>
      :
        <div>
          <figure className="product">
            <div className="product-figure">
              <h3>{this.props.product.title}</h3>
            </div>
            <img src={this.props.product.imageURL} alt={this.props.product.title} width="200px" height="200px" />
          </figure>
          <div>
            <li>Price: ${this.props.product.price}</li>
            <p>{this.props.product.description}</p>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.product,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)