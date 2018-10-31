import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'


class Shop extends Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.handleClear=this.handleClear.bind(this);
    this.state = {
      filteredProducts: []
    }
  }

  componentDidMount(){
    this.props.fetchProducts()
  }

  handleChange(event){
    let filteredProducts = this.props.products.filter(product => product.category.includes(event.target.value))
    this.setState({filteredProducts: filteredProducts})
  }
  
  handleClear(){
    this.setState({filteredProducts: []})
  }

  render() {
  
    let categories=[]

    this.props.products.map((product) =>
      product.category.map(item => !categories.includes(item) ? categories.push(item) : null)
    )

    let currentProduct; 
    this.state.filteredProducts.length> 0 ? currentProduct = this.state.filteredProducts : currentProduct = this.props.products;
    
    return (
      <div>
        
        <div>
          {categories.map(category => (
            <button key={category} type="button" onClick={this.handleChange} value={category}>{category}</button>
            ))}
          <button type="button" value="Clear Filer" onClick={this.handleClear}>Clear Filters</button>
        </div>
        { currentProduct.map(product => (
          <div key={product.id}>
          <figure className="product">
            <div className="product-figure">
              <Link to={`/shop/${product.id}`}>{product.title}</Link>
            </div>
            <img src={product.imageURL} alt={product.title} width="200px" height="200px" />
            <li>Price: ${product.price}</li>
          </figure>
          </div>
        ))}
      </div>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
