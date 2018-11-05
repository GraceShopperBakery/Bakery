const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    const newUser = User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
})
