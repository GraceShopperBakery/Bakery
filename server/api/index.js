const router = require('express').Router()
const isAdminMW = (req, res, next) =>
  req.user && req.user.isAdmin ? next() : res.send('Access denied')

module.exports = {router, isAdminMW}

router.use('/products', require('./products'))
router.use('/users', require('./users'))
router.use('/cart', require('./cart'))
router.use('/payment', require('./payment'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
