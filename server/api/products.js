const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  let productInst;
  Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.body.imageURL,
    inventoryQuantity: req.body.inventoryQuantity
  })
    .then(product => { 
      productInst = product;
      let categories = req.body.category.map(category => Category.findOrCreate({ where: { name: category } }))
      return Promise.all(categories)
    })
    .then(categories => {
      let catArray = categories.map(category => category[0])
      productInst.addCategories(catArray)
      return productInst
    })
    .then(product => res.status(201).send(product))
    .catch()
});