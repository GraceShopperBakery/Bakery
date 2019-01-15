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
      let [usersCart] = await user.getOrders({where: {isCart: true}})
      //the if block is not needed, but is left in as a catch all
      if (usersCart===undefined){
        usersCart = await Order.create({userId: user.id})
      }
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

router.put('/payment', async (req, res, next) => {
  try {
    let order = await Order.findById(req.session.cartId)
    const finalTotal = await order.getTotal()
    order.update({
      isCart: false,
      email: req.body.email,
      addressline1: req.body.addressLine1,
      addressline2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      finalTotal: finalTotal
    })
    let newCart;
    if (req.user) {
      newCart = await Order.create({userId: req.user.id})
    } else{
      newCart = await Order.create()
    }
    req.session.cartId = newCart.id

    //decrease inventoryQty of product
    res.send(order)
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
