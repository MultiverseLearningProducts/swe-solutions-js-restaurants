const Menu = require('./Menu')

const db = require('better-sqlite3')('./db.sqlite')

class Restaurant {
    static init = () => {
        db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY, name TEXT, imageURL Text);').run()
        
        const restaurants_rows = db.prepare('SELECT * FROM restaurants;').all()
        
        for(let restaurant_row of restaurants_rows) {
            const restaurant = new Restaurant(restaurant_row.name, restaurant_row.imageURL, restaurant_row.id)
            const menus_rows = db.prepare('SELECT * FROM menus WHERE restaurant_id = ?;').all(restaurant.id)
            for(const menu_row of menus_rows) {
                const menu = new Menu(menu_row.restaurant_id, menu_row.title, menu_row.id)
                restaurant.addMenu(menu)
            }
        }
    }
    
    static all = []

    constructor(name, imageURL, id) {
        this.name = name
        this.imageURL = imageURL
        this.menus = []
        if (id) {
            this.id = id
        } else {
            const insert = db.prepare('INSERT INTO restaurants (name, imageURL) VALUES (?,?);')
            const row = insert.run(this.name, this.imageURL)
            this.id = row.lastInsertRowid
        }
        
        Restaurant.all.push(this)
    }

    update(updates) {
        this.name     = updates.name     || this.name
        this.imageURL = updates.imageURL || this.imageURL
        this.menus    = updates.menus    || this.menus
        const update = db.prepare('UPDATE restaurants SET name=?, imageURL=? WHERE id=?;')
        update.run(this.name, this.imageURL, this.id)
    }

    delete() {
        db.prepare('DELETE FROM restaurants WHERE id = ?;').run(this.id)
        const index = Restaurant.all.indexOf(this)
        Restaurant.all.splice(index, 1)
    }

    addMenu(menu) {
        if (!menu.id) {
            // add to database
        } else {
            this.menus.push(menu)
        }
    }
}

module.exports = Restaurant