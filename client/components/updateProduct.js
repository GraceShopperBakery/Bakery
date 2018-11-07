import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct, fetchProducts, fetchProduct, fetchCategories } from '../store/products'

const initialState = {
  title: "",
  description: "",
  imageURL: "",
  category: [],
  price: "",
  inventoryQuantity: "",
}
class UpdateProduct extends Component { 
  constructor(props) { 
    super(props)
    this.state = initialState;

    this.id = 0;
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleChange(event) {
    const property = event.target.name;
    let updateVal = event.target.value
    if (property === 'category'){
      updateVal = updateVal.split(',')
    }
    if (property === 'inventoryQuantity'){
      updateVal = parseInt(updateVal,10)
    }
    if (property === 'price'){
      updateVal = parseFloat(updateVal)
    }
    this.setState({
      [property]: updateVal
    });
  }

  async handleSubmit(evt) { 
    evt.preventDefault()
    const updatedProduct = {};
    if (this.state.title) { updatedProduct.title = this.state.title }
    if (this.state.description) { updatedProduct.description = this.state.description }
    if (this.state.imageURL) { updatedProduct.imageURL = this.state.imageURL }
    if (this.state.category.length > 1) { updatedProduct.category = this.state.category }
    if (this.state.price) { updatedProduct.price = this.state.price }
    if (this.state.inventoryQuantity) { updatedProduct.inventoryQuantity = this.state.inventoryQuantity }
    
    this.props.adminUpdateProduct(this.id, updatedProduct)
    await this.setState({
      title: "",
      description: "",
      imageURL: "",
      category: [],
      price: "",
      inventoryQuantity: "",
    })
    console.log('State after cleared', this.state)
  }

  handleSelect(evt){
    this.id = evt.target.value
    this.props.fetchProduct(this.id)
  }

  render() {
    // console.log('PROPS', this.props)
    const categories = Object.keys(this.props.product).length > 0 ? this.props.product.categories.map(category => category.name).join(', ') : ''

    return (
      <div>
      <form className="form"  onSubmit={this.handleSubmit}>
        <h3>Update a Product</h3>
        <div>
          <h5>Pick product to update.</h5>
          <select onChange={this.handleSelect}>
          <option value={null} />
          {this.props.products.map(product =>
            <option value={product.id} key={product.id}>{product.title}</option>
          )}
          </select>
          <div>
          {this.id ? (
            <div>
              <div>
                <h3>{this.props.product.title}</h3>
              </div>
              <img src={this.props.product.imageURL}   width="200px" height="200px" />
              <li>Price: ${this.props.product.price}</li>
              <li>Description: {this.props.product.description}</li>
              <li>Categories: {categories}</li>
              <li>Inventory Qty: {this.props.product.inventoryQuantity}</li>
            </div>
          ) : null}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="title" >Name</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="title" type="text" className="input" value={this.state.title}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description" >Description</label>
          <div className="form-control">
            <textarea onChange={this.handleChange} name="description" type="text" className="input" value={this.state.description} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="imageURL" >Image Url</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="imageURL" type="text" className="input" value={this.state.imageURL}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price" >Price</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="price" type="number" className="input" value={this.state.price} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category" >'Category (separate by comma if more than one)'</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="category" type="text" className="input" value={this.state.category} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inventoryQuantity">Inventory Quantity</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="inventoryQuantity" type="number" className="input" value={this.state.inventoryQuantity} />
          </div>
        </div>
        <div className="form-group">
            <button id="button" type="submit">submit</button>
        </div>
      </form>
      </div>
    )
  }
}

const maptStateToProps = state => {
  return {
    products: state.products.products,
    product: state.products.product,
    // categories: state.products.categories
  }
}
const mapDispatchToProps = dispatch => { 
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    adminUpdateProduct: (id, product) => dispatch(updateProduct(id, product)),
    // fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(maptStateToProps, mapDispatchToProps)(UpdateProduct)