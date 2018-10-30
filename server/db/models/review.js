const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating:{
    type: Sequelize.INTEGER,
    validate:{
      min: 1,
      max: 5
    }
  },
  content: {
    type: Sequelize.TEXT,
  },
})

module.exports = Review
