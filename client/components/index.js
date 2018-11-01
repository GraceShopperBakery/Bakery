/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as Home} from './home'
export {default as About} from './about'
export {default as Shop} from './shop'
export {default as MyAccount} from './myAccount'
export {default as AdminHome} from './adminHome'
export {default as SingleProduct} from './singleProduct'
export {default as AddProduct} from './addProduct'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
