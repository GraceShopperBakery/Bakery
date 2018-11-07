import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { postReview } from '../store/products'

class ReviewForm extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      rating: "",
      content: "",  
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addReview(this.state)
    this.setState({
      rating: "",
      content: "",
    })
  }

  render() {
    return (
      <div className='addReviewForm'>
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Review Rating</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="rating" type="text" placeholder='Enter a rating from 1 to 5' />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Write a Review</label>
          <div className="form-control">
            <input onChange={this.handleChange} name="content" type="text" />
          </div>
        </div>
        <div>
          <button id="button" type="submit">submit</button>
        </div>
      </form>
      </div>
    )
  }
}

// const mapStateToProps = state => { 
//   return {
//     reviews: state.products.reviews.reviews
//   }
// }

const mapDispatchToProps = dispatch => ({
  addReview: (review) => dispatch(postReview(review))
})

export default connect(null, mapDispatchToProps)(ReviewForm)
