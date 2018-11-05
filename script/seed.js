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

  const carrotCookie = await Product.create({
    title: 'Carrot Compost Cookie',
    description: "Our signature item, the cookie that started it all- a medley of sweet and salty flavors on your pallete. Pretzels, carrots, potato chips, coffee, oats, graham cracker, butterscotch, chocolate chips.",
    imageURL: "https://bit.ly/2Opener",
    price: 3.00
  })
  const carrotCake = await Product.create({
    title: 'Naked Carrot Layer Cake',
    description: 'Vanilla spice carrot cake, milk crumbs, roasted pumpkin ganache, dulce de leche, and roasted pepitas.',
    imageURL:"https://bit.ly/2qx5t4V",
    price: 20.00
  })
  const carrotMacaron = await Product.create({
    title: 'Carrot Macarons',
    description: 'Set of 3 macarons. Perfectly crunchy. Perfectly soft. Perfect.',
    imageURL:"https://bit.ly/2F1pMS7",
    price: 7.00
  })
  const honeyBunny = await Product.create({
    title: 'Honey Bunny',
    description: 'Set of 4 whimsical bunny buns. Flavors change on a daily basis.',
    imageURL:"https://bit.ly/2DmXa4h",
    price: 10.00
  })
  const hopPocket = await Product.create({
    title: 'Hop Pocket',
    description: 'Savory, flaky pastry. Ham, Cheese, Love.',
    imageURL:"https://bit.ly/2SL8ueZ",
    price: 5.50
  })
  const chocolateEclair = await Product.create({
    title: 'Chocolate Eclhare',
    description: 'Vanilla pastry cream filling, rich ganache chocolate glaze.',
    imageURL:"https://bit.ly/2ANxQlv",
    price: 3.50
  })
  const pbj = await Product.create({
    title: 'Peanut Bunny and Jelly',
    description: 'Crunchy peanut butter, with a rotating flavor of seasonal jam. Crustless just like mom used to make it.',
    imageURL:"https://bit.ly/2D4gfHx",
    price: 7.00
  })
  const bananaPudding = await Product.create({
    title: 'Bunnana Surprise',
    description: 'Vanilla-banana pudding, vanilla infused milk, white chocolate, walnuts.',
    imageURL:"https://bit.ly/2qvCUFc",
    price: 6.50
  })

  const cupcake = await Product.create({
    title: 'Peep Cupcake',
    description: 'Vanilla cake, rainbow cake crumbs, marshmallow frosting.',
    imageURL:
      'https://bit.ly/2F6MfO1',
    price: 3.50
  })
  const bundt = await Product.create({
    title: 'Bunny Bundts',
    description: "Make your friends and family 'hoppy' with this mosit cholocate cake with velvety cream cheese frosting.",
    imageURL: 'https://bit.ly/2JFbg1l',
    price: 25.00
  })
  const bagel = await Product.create({
    title: 'Hoppyseed Bagel',
    description: 'A New York staple, now avaialble at all our stores worldwide.',
    imageURL:
      'https://bit.ly/2SNHATS',
    price: 3.00
  })
  const cheeseBread = await Product.create({
    title: 'Hopbañero Cheese Bread',
    description: 'Golden brown. Crispy on the outside, soft on the inside. A perfect blend of cheesy and spicy.',
    imageURL:
      'https://bit.ly/2RE4ko1',
    price: 8.00
  })
  const cinammonRoll = await Product.create({
    title: 'Cinnabun Roll',
    description: 'Flour, cinnamon, sugar, and butter. Heavenly smell, heavenly taste.',
    imageURL:
      'https://bit.ly/2ANRApg',
    price: 5.00
  })
  const cookie = await Product.create({
    title: 'Ear-resistable Cookie',
    description: "Sugar cookie, vanilla frosting. Melts in your mouth.",
    imageURL:
      'https://bit.ly/2AOUNox',
    price: 3.00
  })
  const bunnyChow = await Product.create({
    title: 'Bunny Chow',
    description: '10 oz. Cereal, melted chocolate, peanut butter, and powdered sugar.',
    imageURL:
      'https://bit.ly/2Orzi0y',
    price: 10.00
  })

  const lemonPie = await Product.create({
    title: 'Lemon Hareingue Pie',
    description: 'Lemon custard filling with a fluffy meringue topping.',
    imageURL: 'https://bit.ly/2yUG7Te',
    price: 18.00
  })
  const oats = await Product.create({
    title: 'Bunny Bunches of Oats',
    description: 'Peaches, oats, almond milk, chia seeds.',
    imageURL: 'https://bit.ly/2RwrxrY',
    price: 6.50
  })
  const iceCream = await Product.create({
    title: 'Bunnycomb Ice Cream',
    description: 'Warm puff pastry, milk ice cream, corn flakes, brûlée bananas, whipped cream, white chocolate honey comb.',
    imageURL: 'https://bit.ly/2qrKgcM',
    price: 10.00
  })
  const nutBread = await Product.create({
    title: 'Bunnana Nut Bread',
    description: 'One slice- bananas, flour, eggs, honey, walnuts.',
    imageURL: 'https://bit.ly/2qt2kmH',
    price: 5.00
  })
  const cobblerPie = await Product.create({
    title: 'Hoppler Pie',
    description: 'Flaky crust, melt in your mouth filling with pecans, peaches, and sugar.',
    imageURL: 'https://bit.ly/2EZPab0',
    price: 18.00
  })
  const carrot = await Product.create({
    title: 'Carrot',
    description: 'Hard chocolate shell, with soft carrot filling. perfect for your little ones for no mess eating.',
    imageURL: 'https://bit.ly/2SN87k7',
    price: 7.00
  })

  const products = [
    carrotCookie,
    carrotCake,
    carrotMacaron,
    honeyBunny,
    hopPocket,
    chocolateEclair,
    pbj,
    bananaPudding,
    cupcake,
    bundt,
    bagel,
    cheeseBread,
    cinammonRoll,
    cookie,
    bunnyChow,
    lemonPie,
    oats,
    iceCream,
    nutBread,
    cobblerPie,
    carrot
  ]

  const category = await Promise.all([
    Category.create({name: 'cake'}), //0
    Category.create({name: 'cookie'}), //1
    Category.create({name: 'pie'}), //2
    Category.create({name: 'chocolate'}), //3
    Category.create({name: 'sweet'}), //4
    Category.create({name: 'savory'}), //5
    Category.create({name: 'carrot'}), //6
  ])

  await Promise.all([
    carrotCookie.addCategories([category[1], category[3], category[4], category[5], category[6]]),
    carrotCake.addCategories([category[0], category[4], category[6]]),
    carrotMacaron.addCategories([category[4], category[6]]),
    honeyBunny.addCategories([category[4]]),
    hopPocket.addCategories([category[5]]),
    chocolateEclair.addCategories([category[3], category[4]]),
    pbj.addCategories([category[4], category[5]]),
    bananaPudding.addCategories([category[4]]),
    cupcake.addCategories([category[0], category[4]]),
    bundt.addCategories([category[0], category[4], category[3]]),
    bagel.addCategories([category[5]]),
    cheeseBread.addCategories([category[5]]),
    cinammonRoll.addCategories([category[4]]),
    cookie.addCategories([category[1], category[4]]),
    bunnyChow.addCategories([category[4], category[5]]),
    lemonPie.addCategories([category[2], category[4]]),
    oats.addCategories([category[4]]),
    iceCream.addCategories([category[4]]),
    nutBread.addCategories([category[4]]),
    cobblerPie.addCategories([category[2], category[4]]),
    carrot.addCategories([category[3], category[4], category[6]])
  ])

  await Promise.all([
    order[0].addProduct(carrot, {
      through: {quantity: 2, priceWhenOrdered: carrot.price}
    }),
    order[0].addProduct(iceCream, {
      through: {quantity: 1, priceWhenOrdered: iceCream.price}
    }),
    order[1].addProduct(nutBread, {
      through: {quantity: 1, priceWhenOrdered: nutBread.price}
    }),
    order[1].addProduct(cobblerPie, {
      through: {quantity: 4, priceWhenOrdered: cobblerPie.price}
    }),
    order[2].addProduct(bagel, {
      through: {quantity: 5, priceWhenOrdered: bagel.price}
    }),
    order[2].addProduct(cupcake, {
      through: {quantity: 2, priceWhenOrdered: cupcake.price}
    }),
    order[3].addProduct(hopPocket, {
      through: {quantity: 1, priceWhenOrdered: hopPocket.price}
    }),
    order[4].addProduct(carrotMacaron, {
      through: {quantity: 2, priceWhenOrdered: carrotMacaron.price}
    })
  ])

  const review = await Promise.all([
    Review.create({
      rating: 5,
      content: "this was extra delicious. can'nt wait to order another.",
      productId: 1,
      userId: 1
    }),
    Review.create({
      rating: 2,
      content: 'this was gross, tasted icky',
      productId: 2,
      userId: 2
    }),
    Review.create({
      rating: 3,
      content: 'this was dry',
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
