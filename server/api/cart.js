const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.cartId) {
      const newCart = await Order.create()
      req.session.cartId = newCart.id
    }
    if (req.user) {
      const user = await User.findById(req.user.id)
      const [usersCart] = await user.getOrders({where: {isCart: true}})
      console.log('usersCarts', usersCart)
      req.session.cartId = usersCart.id
    }
    let cart = await Order.findById(req.session.cartId, {
      include: {model: Product}
    })
    const finalTotal = await cart.getTotal()
    cart.finalTotal = finalTotal
    const finalQty = await cart.getQty()
    cart.qty = await finalQty
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

    const productId = req.body.productId
    const orderQty = req.body.orderQty
    const productPrice = req.body.productPrice

    const product = await Product.findById(productId)

    await cart.addProduct(product, {
      through: {quantity: orderQty, priceWhenOrdered: productPrice}
    })
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
