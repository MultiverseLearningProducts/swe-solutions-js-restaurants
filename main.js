const Restaurant = require('./Restaurant')
const Menu = require('./Menu')
const db = require('better-sqlite3')('./db.sqlite');

// const restaurants = [
//     "Appleseeds",
//     "Random house",
//     "Five Guys",
//     "Bayroot"
// ].map(name => {
//     return new Restaurant(name)
// })

const allRestaurants = db.prepare('SELECT * FROM restaurants;').all()
allRestaurants.forEach(row => {
    const restaurant = new Restaurant(row.name, row.id)
    const menu = new Menu("Mains")
    restaurant.addMenu(menu)
})
console.log(Restaurant.all)