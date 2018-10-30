const User = require('./user')
const Order = require('./order')
const Product = require('./products')
const Review = require('./review')
const OrderQty = require('./orderQty')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Product.hasMany(Review);
User.hasMany(Order);
User.hasMany(Review);

Order.belongsTo(User);
Order.hasMany(OrderQty)

Review.belongsTo(User);
Review.belongsTo(Product);

OrderQty.belongsTo(Order);
OrderQty.belongsTo(Product);
Product.hasMany(OrderQty);

module.exports = {
  User, Product, Review, Order, OrderQty
}
