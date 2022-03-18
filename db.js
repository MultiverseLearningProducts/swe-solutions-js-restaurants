const path = require("path");
const db = require("better-sqlite3")(path.join(__dirname, "db.sqlite"));

module.exports = db;
