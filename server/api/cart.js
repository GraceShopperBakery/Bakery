const router = require('express').Router()
const {Order, Product, OrderQty} = require('../db/models')
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

    await cart.addProduct(product, {through: {quantity: orderQty}})

    //increasing quantity on product

    //uncomment next line to add new query to DB to return updated Cart
    //cart = await Order.findById(req.params.id, {
    //   include: {model: Product}
    // })
    // cart = await Order.findById(req.session.cartId, {
    //   include: {model: Product}
    // })
    // console.log('*** product returned from add product route*', product)
    // let selectedProduct = cart.products.find(
    //   productInCart => productInCart.id === product.id
    // )
    // console.log('**selected product**', selectedProduct)
    //console.log('**Cart before sending it back from route', cart)
    res.send(product)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const productToDelete = await Product.findById(req.params.productId)
    const cart = await Order.findById(req.session.cartId)
    await cart.removeProduct(productToDelete)
    res.send('product deleted')
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
