const router = require('express').Router()
const {User, Product} = require('../db/models')
const {isAdminMW} = require('./index.js')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/orderHistory', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const orderHistory = await user.getOrders({
      where: {isCart: false},
      include: {model: Product}
    })
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdminMW, async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin || false
    })
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdminMW, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdminMW, async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.params.id)
    const updatedUser = await userToUpdate.update({isAdmin: true})
    res.status(201)
    res.json(updatedUser)
  } catch (err) {
    next(console.log(err))
  }
})
