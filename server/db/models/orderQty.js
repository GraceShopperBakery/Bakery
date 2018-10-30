const Sequelize = require('sequelize')
const db = require('../db');
const Product = require('./products')

const OrderQty = db.define('orderqty', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT,
  },
  total: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('quantity') * this.getDataValue('price')
    }
  }
});

OrderQty.beforeCreate(async function (instance) {
  try {
    const product = await Product.findById(instance.productId)
    instance.price = product.price
  } catch (err) {
    console.log(err)
  }
})





module.exports = OrderQty
