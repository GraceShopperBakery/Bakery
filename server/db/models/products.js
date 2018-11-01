const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    git: true,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL:{
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "https://goo.gl/uQaUUp"
  },
  inventoryQuantity:{
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 3.99,
  }
});

// add class methods ? to count inventory, etc, or hook?
// add virtual column (?) to get total cost

module.exports = Product
