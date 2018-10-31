import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeProduct, postProduct } from '../store/products'

class AddProduct extends Component { 
  constructor(props) { 
    super(props)
    this.state = {
      title: "",
      description: "",
      imageURL: "https://goo.gl/uQaUUp",
      category: [],
      price: 0.00,
      inventoryQuantity: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) { 
    const property = evt.target.name;
    let updateVal = evt.target.value
    if (property === "category") { 
      updateVal = updateVal.split(',')
    }
    this.setState({ [property]: updateVal })
    this.props.write(this.state)
  }

  handleSubmit(evt) { 
    evt.preventDefault()
    this.props.post(this.state)
  }

  render() { 
    return (
      <form className="form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <h3>Add a New Product</h3>
        <div className="form-group">
          <label htmlFor="title" >Name</label>
          <div className="form-control">
            <input name="title" type="text" className="input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description" >Description</label>
          <div className="form-control">
            <textarea name="description" type="text" className="input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="imageURL" >Image Url</label>
          <div className="form-control">
            <input name="imageURL" type="text" className="input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price" >Price</label>
          <div className="form-control">
            <input name="price" type="float" className="input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category" >'Category (separate by comma if more than one)'</label>
          <div className="form-control">
            <input name="category" type="text" className="input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inventoryQuantity">Inventory Quantity</label>
          <div className="form-control">
            <input name="inventoryQuantity" type="number" className="input" />
          </div>
        </div>
        <div className="form-group">
            <button id= "button" type="submit">submit</button>
        </div>
      </form>
    )
  }
}


const mapStateToProps = state => { 
  return {
    newProduct: state.products.newProduct
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    write: (input) => dispatch(writeProduct(input)),
    post: (input) => dispatch(postProduct(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)