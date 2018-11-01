const Sequelize = require('sequelize')
const db = require('../db')
const OrderQty = require('./orderQty')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.Boolean,
    defaultValue: true
  },
  finalTotal: {
    type: Sequelize.FLOAT,
    get() {
      const totals =  OrderQty.findAll({
        where: {
          orderId: this.id
        },
        include: ['total']
      })
    },
    set() {
      this.getDataValue()
    }
  }
})



module.exports = Order


Order.prototype.getTotal = async function () {
  const totals = await OrderQty.findAll({
    where: {
      orderId: this.id
    }
  })
  console.log(totals, '******totals')
}
// Order.beforeCreate(async function (instance) {
//   const totals = await OrderQty.findAll({
//     where: {
//       orderId: instance.id
//     }
//   })
//   console.log(totals, '******totals')
// })


