const User = require('./user')
const Order = require('./order')
const Product = require('./products')
const Review = require('./review')
const OrderQty = require('./orderQty')
const Category = require('./categories')

/**
 * Associations
 */

Product.hasMany(Review);
User.hasMany(Order);
User.hasMany(Review);

Product.belongsToMany(Category, {through: 'product-categories'})
Category.belongsToMany(Product, {through: 'product-categories'})

Order.belongsToMany(Product, {through: OrderQty})
Product.belongsToMany(Order, {through: OrderQty})

Order.belongsTo(User);
Order.hasMany(OrderQty)

Review.belongsTo(User);
Review.belongsTo(Product);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User, Product, Review, Order, OrderQty
}
