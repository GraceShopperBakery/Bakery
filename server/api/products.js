const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include:{model: Category}
    });
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/categories', async (req,res,next) => {
  try{
    const categories = await Category.findAll({
      include:{model: Product}
    });

    let result = []
    categories.map(category => {
      if (category.products.length > 0) {
        result.push(category)
      }
    })

    res.json(result)
  } catch(err){
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const products = await Product.findOne({
      where:{
        id: req.params.productId
      },
      include:{model: Category}
    });
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
      let categories = req.body.category.map(category => 
        Category.findOrCreate({ where: { name: category } }))
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

router.put('/:id', (req, res, next) => {
  let productInst;
  if(req.body.category){
    Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => {
      productInst = product;
      let categories = req.body.category.map(category => Category.findOrCreate({ where: { name: category }}))
      return Promise.all(categories)
    })
    .then(categories => {
      let catArray = categories.map(category => category[0])
      productInst.setCategories(catArray)
      return productInst
    })
    .then(product => res.send(product))
    .catch()
  }else{
    Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch()
  }
  
})
