import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct } from '../store/products'

const initialState = {
  title: "",
  description: "",
  imageURL: "https://goo.gl/uQaUUp",
  category: [],
  price: 0.00,
  inventoryQuantity: 0
}

class UpdateProduct extends Component { 
  constructor(props) { 
    super(props)
    this.state = initialState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) { 
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(evt) { 
    evt.preventDefault()
    const updatedProduct = {};
    if (this.state.title) { updatedProduct.title= this.state.title }
    if (this.state.description) { updatedProduct.description = this.state.description }
    if (this.state.imageURL) { updatedProduct.imageURL = this.state.imageURL }
    if (this.state.category) { updatedProduct.category = this.state.category }
    if (this.state.price) { updatedProduct.price = this.state.price }
    if (this.state.inventoryQuantity) { updatedProduct.inventoryQuantity = this.state.inventoryQuantity }
  
    this.props.updateProduct(this.props.id, updatedProduct)
    this.setState(initialState)
  }

  render() { 
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h3>Update a Product</h3>
        <div className="form-group">
          <label htmlFor="title" >Name</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="title" type="text" className="input" value={this.state.title}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description" >Description</label>
          <div className="form-control">
            <textarea onChange={this.handleChange} name="description" type="text" className="input" />
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
            <input onChange={this.handleChange} name="price" type="float" className="input" value={this.state.price} />
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
    )
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    adminUpdateProduct: (id, product) => dispatch(updateProduct(id, product))
  }
}

export default connect(null, mapDispatchToProps)(UpdateProduct)