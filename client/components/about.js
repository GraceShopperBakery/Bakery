import React from 'react'

const About = props => {
  return (
    //put jsx here
    <div className="about">
      <div className="ourStory">
      <h1>Our Story</h1>
      <p>
        A bakery for bunny enthusiasts and bunnies alike,
        Hopper is a dessert empire and lifestyle brand, called “one of the most exciting bakeries in the country” by Bon Appétit magazine. 
        Hopper opened its doors in NYC’s Financial District in 2018, and quickly became a cult sensation. 
        With wildly popular storefronts in New York City, Washington, D.C., Toronto, Dallas, Vienna, Newburgh, Las Vegas and most recently, Los Angeles, Hopper is known for its familiar yet unexpected desserts 
        including Carrot Compost Cookie, “naked” layer cakes with unfrosted sides, and Carrot macarons, among other playful and craveable treats. Hop on over&nbsp;today!
      </p>
      </div>
      <div className="Team">
        <h1>Our Team</h1>
        <div className="teamContainer">
        <figure>
          <img src="./images/team/alizah.jpg" />
          <h5>Alizah</h5>
          <span>Pastry Chef</span>
          <p>Alizah studied the art of pastry making in Paris, France.
            She crafts every pastry with a bunny in&nbsp;mind.
          </p>
        </figure>
        <figure>
          <img src="./images/team/micaela.jpg" />
          <h5>Micaela</h5>
          <span>Bunny Keeper</span>
          <p>Micaela is our resident bunny expert.
            She enjoys long walks on the beach, with a carrot in&nbsp;hand.
          </p>
        </figure>
        <figure>
          <img src="./images/team/magdalena.JPG" />
          <h5>Magdalena</h5>
          <span>Taste Tester</span>
          <p>Magdalena loved our pastries so much, we hired her to taste them professionally.
            If Magdalena doesn't taste it, we don't sell&nbsp;it.
          </p>
        </figure>
        <figure>
          <img src="./images/team/maria.jpg" />
          <h5>Maria</h5>
          <span>Pastry Artist</span>
          <p>Every pastry is a work of art, and Maria ensures your treat is not only delicious, 
            but aesthetically pleasing.</p>
        </figure>
        </div>
      </div>
    </div>
  )
}

export default About
