const Sequelize = require('sequelize')
const db = require('../db')
const OrderQty = require('./orderQty')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  finalTotal: {
    type: Sequelize.FLOAT,
    get() {
      const totals = OrderQty.findAll({
        where: {
          orderId: this.id
        }
      })
    },
    set() {
      this.getDataValue()
    }
  }
})

module.exports = Order

// TODO: complete instance methods below

//Order.prototype.increasQty = async function () {
//   const order = await Order.findAll({
//     where: {
//       orderId: this.id
//     }
//   })
// }

// Order.prototype.getTotal = async function() {
//   const totals = await OrderQty.findAll({
//     where: {
//       orderId: this.id
//     }
//   })
//   //console.log(totals, '******totals')
// }
// Order.beforeCreate(async function (instance) {
//   const totals = await OrderQty.findAll({
//     where: {
//       orderId: instance.id
//     }
//   })
//   console.log(totals, '******totals')
// })
