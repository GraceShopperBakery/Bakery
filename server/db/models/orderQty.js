const Sequelize = require('sequelize')
const db = require('../db')

const OrderQty = db.define('orderQty', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  priceWhenOrdered: {
    type: Sequelize.FLOAT
  }
  // total: {
  //   type: Sequelize.FLOAT,
  //   get() {
  //     return (
  //       this.getDataValue('quantity') * this.getDataValue('priceWhenOrdered')
  //     )
  //   }
  // }
})

module.exports = OrderQty
