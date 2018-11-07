const Sequelize = require('sequelize')
const db = require('../db')
const OrderQty = require('./orderQty')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  addressline1: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  addressline2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: [5, 5]
    }
  },
  finalTotal: {
    type: Sequelize.STRING
  },
  qty: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order

Order.prototype.getTotal = async function() {
  const orderQuantities = await OrderQty.findAll({
    where: {
      orderId: this.id
    }
  })

  const total = orderQuantities.reduce((finalTotal, element) => {
    return finalTotal + element.quantity * element.priceWhenOrdered
  }, 0)
  return total
}

Order.prototype.getQty = async function() {
  const orderQuantities = await OrderQty.findAll({
    where: {
      orderId: this.id
    }
  })

  const totalQty = orderQuantities.reduce((finalQty, element) => {
    return finalQty + element.quantity
  }, 0)
  return totalQty
}
