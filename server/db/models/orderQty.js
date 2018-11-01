const Sequelize = require('sequelize')
const db = require('../db');
const Product = require('./products')

const OrderQty = db.define('orderqty', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  priceWhenOrdered: {
    type: Sequelize.FLOAT,
  },
  total: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('quantity') * this.getDataValue('priceWhenOrdered')
    }
  }
});

module.exports = OrderQty
