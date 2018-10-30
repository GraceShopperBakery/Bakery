'use strict'

const db = require('../server/db')
const {User, Product, Order, Review, OrderQty} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const order = await Promise.all([
    Order.create({userId: 1}),
    Order.create({userId:1}),
    Order.create({userId:2}),
    Order.create({userId:2}),
    Order.create({userId:2}),
  ])

  const products = await Promise.all([
    Product.create({title: 'Cake', description: 'fluffy', category: ['cake', 'chocolate']}),
    Product.create({title: 'Cupcake', description: 'red velvet', category: ['cupcake', 'chocolate', 'lowfat']}),
    Product.create({title: 'Chocolate Chip Cookie', description: 'extra chips', category: ['cookie', 'soft']}),
  ])

  const review = await Promise.all([
    Review.create({rating: 5, content: 'this cake was extra delicious. can\'nt wait to order another.', productId: 1, userId: 1}),
    Review.create({rating: 2, content: 'this cupcake was gross, tasted icky', productId: 2, userId: 2}),
    Review.create({rating: 3, content: 'this cookie was dry', productId: 3, userId: 2}),
  ])

  const quantity = await Promise.all([
    OrderQty.create({quantity:2, orderId: 1, productId:2}),
    OrderQty.create({quantity:3, orderId: 1, productId:1}),
    OrderQty.create({quantity:1, orderId: 2, productId:1}),
    OrderQty.create({quantity:2, orderId: 3, productId:1}),
    OrderQty.create({quantity:2, orderId: 3, productId:2}),
    OrderQty.create({quantity:2, orderId: 3, productId:3}),
    OrderQty.create({quantity:2, orderId: 4, productId:1}),
    OrderQty.create({quantity:2, orderId: 5, productId:2}),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${order.length} orders`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${review.length} reviews`)
  console.log(`seeded ${quantity.length} quantities`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
