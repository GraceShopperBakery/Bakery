const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.cartId) {
      const newCart = await Order.create()
      req.session.cartId = newCart.id
    }
    let cart = await Order.findById(req.session.cartId, {
      include: {model: Product}
    })
    res.json(cart)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let cart = await Order.findById(req.params.id, {
      include: {model: Product}
    })
    res.json(cart)
  } catch (err) {
    console.log(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let cart = await Order.findById(req.session.cartId)

    //adding a product to cart
    console.log('***req.body', req.body)
    const productId = req.body.productId
    const orderQty = req.body.orderQty
    const product = await Product.findById(productId)

    //await product.setOrder(cart, {through: {quantity: orderQty}})

    //TODO orderQty should default to 1

    await cart.addProduct(product, {through: {quantity: orderQty}})

    //increasing quantity on product

    //uncomment next line to add new query to DB to return updated Cart
    //cart = await Order.findById(req.params.id, {
    //   include: {model: Product}
    // })
    res.send(product)
  } catch (err) {
    console.log(err)
  }
})

// ALTERNATIVE SYNTAX FOR PUT ROUTE
// router.put('/:id', (req, res, next) => {
//   let orderInst
//   Order.findById(req.params.id, {
//     include: {
//       model: Product
//     }
//   })
//     .then(order => {
//       orderInst = order
//       let product = Product.findById(req.body.productId)
//       return product
//     })
//     .then(product => {
//       orderInst.addProduct(product)
//       return orderInst
//     })
//     .then(order => res.send(order))
//     .catch()
// })
