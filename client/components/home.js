import React from 'react'
import SlideShow from 'react-image-show'

const Home = props => {
  return (
    <div id="slideshow">
      <SlideShow
        images={[
          './images/image1.jpg',
          './images/image2.jpg',
          './images/image3.jpg',
          './images/image4.jpg'
        ]}
        width="100%"
        imagesWidth="100%"
        imagesHeight="400px"
        imagesHeightMobile="56vw"
        infinite
        indicators
      />
    </div>
  )
}

export default Home
