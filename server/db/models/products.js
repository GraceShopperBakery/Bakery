const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    allowNull: false,
    get () {
      return this.getDataValue('tags'), join(',')
    }
  },
  imageURL:{
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/Mint-Patty-Cake_exps140673_CMT2426390C08_17_2b_RMS.jpg"
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
