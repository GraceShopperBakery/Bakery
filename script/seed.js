'use strict'

const db = require('../server/db')
const {User, Product, Order, Review, Category} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'admin@bakery.com', password: '123', isAdmin: true})
  ])

  const order = await Promise.all([
    Order.create(),
    Order.create(),
    Order.create(),
    Order.create(),
    Order.create()
  ])

  await Promise.all([
    order[0].setUser(users[0]),
    order[1].setUser(users[0]),
    order[2].setUser(users[1]),
    order[3].setUser(users[1]),
    order[4].setUser(users[1])
  ])

  const cakeProduct = await Product.create({
    title: 'Classic Chocolate Cake',
    description: 'light and fluffy'
  })
  const cakeProduct1 = await Product.create({
    title: 'Confetti Cake',
    description: 'vanilla flavor filled with colorful confetti sprinkles'
  })
  const cakeProduct2 = await Product.create({
    title: 'Carrot Cake',
    description: 'moist and fluffy'
  })
  const cakeProduct3 = await Product.create({
    title: 'Banana Cake',
    description: 'light and fluffy'
  })
  const cakeProduct4 = await Product.create({
    title: 'Coffee Cake',
    description: 'tasty and rich in flavor'
  })
  const cakeProduct5 = await Product.create({
    title: 'German Chocolate Cake',
    description: 'fluffy rich chocolate'
  })
  const cakeProduct6 = await Product.create({
    title: 'Red Velvet Cake',
    description: 'delicious fluffy chocolate'
  })
  const cakeProduct7 = await Product.create({
    title: 'Lemon Cake',
    description: 'golden yellow, rich in flavor'
  })

  const cupcakeProduct = await Product.create({
    title: 'Red Velvet Cupcake',
    description: 'rich and fluffy',
    imageURL:
      'http://fullhdwall.com/wp-content/uploads/2018/02/Nice-Cupcake-360x260.jpg'
  })
  const cupcakeProduct1 = await Product.create({
    title: 'Classic Yellow Cupcake',
    description: 'moist, golden yellow',
    imageURL:
      'http://fullhdwall.com/wp-content/uploads/2018/02/Nice-Cupcake-360x260.jpg'
  })
  const cupcakeProduct2 = await Product.create({
    title: 'Mini Cupcake',
    description: 'rich chocolate flavor',
    imageURL:
      'http://fullhdwall.com/wp-content/uploads/2018/02/Nice-Cupcake-360x260.jpg'
  })
  const cupcakeProduct3 = await Product.create({
    title: 'Pumpkin Cupcake',
    description: 'moist, light, and, golden brown',
    imageURL:
      'http://fullhdwall.com/wp-content/uploads/2018/02/Nice-Cupcake-360x260.jpg'
  })
  const cupcakeProduct4 = await Product.create({
    title: 'Chocolate Cupcake',
    description: 'rich chocolate flavor',
    imageURL:
      'http://fullhdwall.com/wp-content/uploads/2018/02/Nice-Cupcake-360x260.jpg'
  })
  const cupcakeProduct5 = await Product.create({
    title: 'Carrot Cupcake',
    description: 'light and fluffy',
    imageURL:
      'http://fullhdwall.com/wp-content/uploads/2018/02/Nice-Cupcake-360x260.jpg'
  })
  const cupcakeProduct6 = await Product.create({
    title: 'Coconut Cupcake',
    description: 'light and rich flavor',
    imageURL:
      'http://fullhdwall.com/wp-content/uploads/2018/02/Nice-Cupcake-360x260.jpg'
  })

  const cookieProduct = await Product.create({
    title: 'Chocolate Chip Cookie',
    description: 'extra chips',
    imageURL: 'https://bit.ly/2AF1skX'
  })
  const cookieProduct1 = await Product.create({
    title: 'Peanut Butter Cookie',
    description: 'soft and chunky',
    imageURL: 'https://bit.ly/2AF1skX'
  })
  const cookieProduct2 = await Product.create({
    title: 'Shortbread Cookie',
    description: 'buttery golden yellow',
    imageURL: 'https://bit.ly/2AF1skX'
  })
  const cookieProduct3 = await Product.create({
    title: 'Oatmeal Raisin Cookie',
    description: 'soft and crunchy',
    imageURL: 'https://bit.ly/2AF1skX'
  })
  const cookieProduct4 = await Product.create({
    title: 'White Chocolate Chip',
    description: 'chunky chips',
    imageURL: 'https://bit.ly/2AF1skX'
  })
  const cookieProduct5 = await Product.create({
    title: 'Cookie Sandwich',
    description: 'filled with vanilla buttercream',
    imageURL: 'https://bit.ly/2AF1skX'
  })

  const products = [
    cakeProduct,
    cupcakeProduct,
    cookieProduct,
    cakeProduct1,
    cakeProduct2,
    cakeProduct3,
    cakeProduct4,
    cakeProduct5,
    cakeProduct6,
    cakeProduct7,
    cupcakeProduct1,
    cupcakeProduct2,
    cupcakeProduct3,
    cupcakeProduct4,
    cupcakeProduct5,
    cupcakeProduct6,
    cookieProduct1,
    cookieProduct2,
    cookieProduct3,
    cookieProduct4,
    cookieProduct5
  ]

  const category = await Promise.all([
    Category.create({name: 'cake'}),
    Category.create({name: 'chocolate'}),
    Category.create({name: 'sweet'}),
    Category.create({name: 'cupcake'}),
    Category.create({name: 'cookie'}),
    Category.create({name: 'lowfat'}),
    Category.create({name: 'soft'})
  ])

  await Promise.all([
    cakeProduct.addCategories([category[0], category[1], category[2]]),
    cakeProduct1.addCategories([category[0], category[2], category[6]]),
    cakeProduct2.addCategories([
      category[0],
      category[2],
      category[5],
      category[6]
    ]),
    cakeProduct3.addCategories([category[0], category[2], category[5]]),
    cakeProduct4.addCategories([category[0], category[2]]),
    cakeProduct5.addCategories([category[0], category[1], category[2]]),
    cakeProduct6.addCategories([
      category[0],
      category[1],
      category[2],
      category[6]
    ]),
    cakeProduct7.addCategories([category[0], category[2], category[5]]),
    cupcakeProduct.addCategories([category[1], category[3], category[2]]),
    cupcakeProduct1.addCategories([category[2], category[3], category[6]]),
    cupcakeProduct2.addCategories([category[2], category[3]]),
    cupcakeProduct3.addCategories([category[3], category[5]]),
    cupcakeProduct4.addCategories([category[1], category[2], category[3]]),
    cupcakeProduct5.addCategories([category[3]]),
    cupcakeProduct6.addCategories([category[2], category[3]]),
    cookieProduct.addCategories([
      category[5],
      category[2],
      category[1],
      category[4]
    ]),
    cookieProduct1.addCategories([category[5], category[4]]),
    cookieProduct2.addCategories([category[2], category[4]]),
    cookieProduct3.addCategories([category[2], category[4], category[6]]),
    cookieProduct4.addCategories([category[1], category[2], category[4]]),
    cookieProduct5.addCategories([category[2], category[4], category[6]])
  ])

  await Promise.all([
    order[0].addProduct(cupcakeProduct, {
      through: {quantity: 2, priceWhenOrdered: cupcakeProduct.price}
    }),
    order[0].addProduct(cakeProduct, {
      through: {quantity: 1, priceWhenOrdered: cakeProduct.price}
    }),
    order[1].addProduct(cookieProduct, {
      through: {quantity: 1, priceWhenOrdered: cookieProduct.price}
    }),
    order[1].addProduct(cupcakeProduct, {
      through: {quantity: 4, priceWhenOrdered: cupcakeProduct.price}
    }),
    order[2].addProduct(cookieProduct, {
      through: {quantity: 5, priceWhenOrdered: cookieProduct.price}
    }),
    order[2].addProduct(cakeProduct, {
      through: {quantity: 2, priceWhenOrdered: cakeProduct.price}
    }),
    order[3].addProduct(cupcakeProduct, {
      through: {quantity: 1, priceWhenOrdered: cupcakeProduct.price}
    }),
    order[3].addProduct(cakeProduct, {
      through: {quantity: 3, priceWhenOrdered: cakeProduct.price}
    }),
    order[4].addProduct(cookieProduct, {
      through: {quantity: 2, priceWhenOrdered: cookieProduct.price}
    })
  ])

  const review = await Promise.all([
    Review.create({
      rating: 5,
      content: "this cake was extra delicious. can'nt wait to order another.",
      productId: 1,
      userId: 1
    }),
    Review.create({
      rating: 2,
      content: 'this cupcake was gross, tasted icky',
      productId: 2,
      userId: 2
    }),
    Review.create({
      rating: 3,
      content: 'this cookie was dry',
      productId: 3,
      userId: 2
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${order.length} orders`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${review.length} reviews`)
  console.log(`seeded ${category.length} categories`)
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
