# Hopper

A project by:

* Micaela O'Herron
* Maria Sanchez
* Alizah Lalani
* Magdalena Aichinger

Hopper is an ecommerce website that where customers can view and order products.

## Setup

Live site: (https://hopperbakery.herokuapp.com/)

To fire up our bakery:

* Git clone this repo and run the following commands:

```
npm install
create db bakery
npm run seed
npm run start-dev
```

* In secrets.js, update your google client appropriately:

 ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush'
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

