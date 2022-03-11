# Restaurants

Install these ORM classes to your node projects like this

```sh
npm install MultiverseLearningProducts/swe-solutions-js-restaurants
```
Then import them like this
```javascript
const { Restaurant, Menu, Item } = require('studentbeans-restaurants')

Item.init()
Menu.init()
Restaurant.init()
```

Get you own project installed like this.

1. create a `main.js` file that imports each class and exports them all in an object
1. in `package.json` make sure `"main"` is set to point to your `main.js` file. That is the entrypoint for `require` when you import the package.
1. push it all to version control
1. install to a new npm project with `npm install MultiverseLearningProducts/swe-solutions-js-restaurants`
1. require the package by it's 'name' `const { Restaurant, Menu, Item } = require('studentbeans-restaurants')` which you will find in `package.json` under the `"name"` property.

Bon Appétit
