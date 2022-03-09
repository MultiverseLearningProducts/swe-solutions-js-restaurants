const Menu = require('./Menu')

const db = require('better-sqlite3')('./db.sqlite')

class Restaurant {
    static all = []
    constructor(name, id) {
        this.name = name
        this.menus = []
        db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY, name TEXT);').run()
        db.prepare('CREATE TABLE IF NOT EXISTS menus (id INTEGER PRIMARY KEY, restaurant_id INTEGER, title TEXT);').run()
        if (id) {
            this.id = id
            const menus = db.prepare('SELECT * FROM menus WHERE restaurant_id = ?').all(this.id)
            this.menus = menus.map(row => new Menu(row.title))
        } else {
            const insert = db.prepare('INSERT INTO restaurants (name) VALUES (?);')
            const info = insert.run(this.name)
            this.id = info.lastInsertRowid
        }
        Restaurant.all.push(this)
    }
    addMenu(menu) {
        this.menus.push(menu)
        const insertStmt = db.prepare('INSERT INTO menus (restaurant_id, title) VALUES (?, ?);')
        insertStmt.run(this.id, menu.title)
    }
}

module.exports = Restaurant