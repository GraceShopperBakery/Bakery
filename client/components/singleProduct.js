import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct, fetchProductReviews } from '../store/products'
import ReviewForm from './reviewForm'

class SingleProduct extends Component { 

  componentDidMount () {
    let id = this.props.match.params.productId
    this.props.fetchProduct(id)
    this.props.fetchProductReviews(id)
  }
  
  render() {
    const reviews = this.props.reviews
    return (
      this.props.product === {} ?
        <div id="invalid">
            <h1>This product does not exist.</h1>
        </div>
      :
        <div>
          <div className="shop">
          <figure>
            <div className="product-figure">
              <h3>{this.props.product.title}</h3>
            </div>
            <img src={this.props.product.imageURL} alt={this.props.product.title} width="200px" height="200px" />
          </figure>
          <div>
            <li>Price: ${this.props.product.price}</li>
            <p>{this.props.product.description}</p>
            </div>
          
          
          <div className="product-reviews">
            <div><h3>Reviews</h3></div>
              <div>
                {
                  reviews && reviews.length > 0 ? reviews.map(review => (
                    (
                      <p key={review.id}>
                        {review.content}
                      </p>
                    )
                  )) : 'There are currently no reviews posted.'
                }
              </div>
            
            </div>
          <div>
            <ReviewForm />
          </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.product,
    reviews: state.products.reviews.reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    fetchProductReviews: (id) => dispatch(fetchProductReviews(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)