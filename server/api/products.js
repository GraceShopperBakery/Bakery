const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => { 
  try {
    const newProduct = await Product.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      imageURL: req.body.imageURL,
      inventoryQuantity: req.body.inventoryQuantity
    })
    res.status(201).json(newProduct)
  } catch (err) { 
    next(err)
  }
})
