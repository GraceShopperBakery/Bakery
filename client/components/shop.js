import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'


class Shop extends Component {

  componentDidMount(){
    this.props.fetchProducts()
  }
  render() {
    console.log('!!!!!', this.props.products)
  
    return (
      <div>
        
        { this.props.products.map(product => (
          <div key={product.id}>
          <figure className="product">
            <div className="product-figure">
              <Link to={`/shop/${product.id}`}>{product.title}</Link>
            </div>
            <img src={product.imageURL} alt={product.title} width="200px" height="200px" />
          </figure>
          </div>
        ))}
      </div>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
